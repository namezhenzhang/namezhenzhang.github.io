const fs = require('fs');
const puppeteer = require('puppeteer');

// Google Scholar用户ID，从环境变量获取
const SCHOLAR_USER_ID = process.env.SCHOLAR_USER_ID || 'j71Y2-4AAAAJ'; // 默认使用你的ID

if (!SCHOLAR_USER_ID) {
  console.error('❌ SCHOLAR_USER_ID environment variable is required');
  process.exit(1);
}

async function fetchScholarPublications() {
  console.log('🔍 Starting Google Scholar sync...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--window-size=1920x1080'
    ]
  });
  
  try {
    const page = await browser.newPage();
    
    // 设置用户代理避免被检测
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    // 访问Google Scholar个人页面
    const scholarUrl = `https://scholar.google.com/citations?user=${SCHOLAR_USER_ID}&hl=en&sortby=pubdate`;
    console.log(`📖 Fetching from: ${scholarUrl}`);
    
    await page.goto(scholarUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // 等待页面加载，增加超时时间并添加重试机制
    try {
      await page.waitForSelector('#gsc_a_t', { timeout: 20000 });
    } catch (error) {
      console.log('⏳ First attempt failed, retrying...');
      await page.reload({ waitUntil: 'networkidle2' });
      await page.waitForSelector('#gsc_a_t', { timeout: 15000 });
    }
    
    // 提取出版物信息
    const publications = await page.evaluate(() => {
      const rows = document.querySelectorAll('#gsc_a_t tr.gsc_a_tr');
      const pubs = [];
      
      rows.forEach(row => {
        const titleElement = row.querySelector('.gsc_a_at');
        const authorsElement = row.querySelector('.gsc_a_at + .gs_gray');
        const venueElement = row.querySelector('.gs_gray:last-child');
        const yearTd = row.querySelector('.gsc_a_y');
        const citationsElement = row.querySelector('.gsc_a_c a');
        
        if (titleElement && authorsElement && venueElement && yearTd) {
          const title = titleElement.textContent.trim();
          const authors = authorsElement.textContent.trim();
          const venue = venueElement.textContent.trim();
          
          // 提取年份
          const yearSpan = yearTd.querySelector('span');
          const year = yearSpan && yearSpan.textContent.trim().match(/\d{4}/) 
            ? parseInt(yearSpan.textContent.trim()) 
            : 2024;
          const citations = citationsElement ? parseInt(citationsElement.textContent.trim()) || 0 : 0;
          const link = titleElement.href;
          
          pubs.push({
            title,
            authors: authors.split(',').map(a => a.trim()),
            venue,
            year,
            citations,
            link
          });
        }
      });
      
      return pubs;
    });
    
    console.log(`📚 Found ${publications.length} publications from Scholar`);
    return publications;
    
  } catch (error) {
    console.error('❌ Error fetching from Scholar:', error);
    return [];
  } finally {
    await browser.close();
  }
}

function parseVenueInfo(venue) {
  // 常见会议和期刊的映射
  const venueMap = {
    'CVPR': { type: 'conference', fullName: 'CVPR' },
    'ICCV': { type: 'conference', fullName: 'ICCV' },
    'ECCV': { type: 'conference', fullName: 'ECCV' },
    'NeurIPS': { type: 'conference', fullName: 'NeurIPS' },
    'ICML': { type: 'conference', fullName: 'ICML' },
    'ICLR': { type: 'conference', fullName: 'ICLR' },
    'AAAI': { type: 'conference', fullName: 'AAAI' },
    'IJCAI': { type: 'conference', fullName: 'IJCAI' },
    'WACV': { type: 'conference', fullName: 'WACV' },
    'arXiv': { type: 'preprint', fullName: 'arXiv' }
  };
  
  // 检查是否包含已知会议/期刊
  for (const [key, value] of Object.entries(venueMap)) {
    if (venue.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }
  
  // 默认处理
  if (venue.toLowerCase().includes('arxiv')) {
    return { type: 'preprint', fullName: 'arXiv' };
  } else if (venue.toLowerCase().includes('journal')) {
    return { type: 'journal', fullName: venue };
  } else {
    return { type: 'conference', fullName: venue };
  }
}

function checkDuplicateAcrossAllYears(newPub, existingConfig) {
  // 跨年份检测重复，收集所有年份的论文
  const allExistingPubs = [];
  for (const [year, pubs] of Object.entries(existingConfig.publications || {})) {
    if (Array.isArray(pubs)) {
      allExistingPubs.push(...pubs);
    }
  }
  
  for (const existing of allExistingPubs) {
    // 1. 完全标题匹配
    if (existing.title.toLowerCase() === newPub.title.toLowerCase()) {
      console.log(`🔍 Found exact title match: "${newPub.title}"`);
      return existing;
    }
    
    // 2. 标题相似度检测（去除标点符号后比较）
    const cleanNew = newPub.title.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
    const cleanExisting = existing.title.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
    if (cleanNew === cleanExisting) {
      console.log(`🔍 Found similar title: "${newPub.title}" vs "${existing.title}"`);
      return existing;
    }
    
    // 3. 核心词匹配（标题长度>20字符时）
    if (newPub.title.length > 20 && existing.title.length > 20) {
      const newWords = cleanNew.split(/\s+/).filter(w => w.length > 3);
      const existingWords = cleanExisting.split(/\s+/).filter(w => w.length > 3);
      const commonWords = newWords.filter(w => existingWords.includes(w));
      
      // 如果85%以上的重要词汇相同，认为是重复
      if (commonWords.length / Math.max(newWords.length, existingWords.length) > 0.85) {
        console.log(`🔍 Found word overlap match: "${newPub.title}" vs "${existing.title}"`);
        return existing;
      }
    }
    
    // 4. 作者+关键词匹配（不依赖年份，但要更严格避免误判）
    const newAuthors = newPub.authors.map(a => a.toLowerCase().trim());
    const existingAuthors = existing.authors?.map(a => a.toLowerCase().trim()) || [];
    const commonAuthors = newAuthors.filter(a => existingAuthors.some(ea => 
      a.length > 2 && ea.length > 2 && (ea.includes(a) || a.includes(ea))
    ));
    
    // 如果有共同作者且标题有重叠词汇，可能是重复
    // 但要更严格：需要更多的标题重叠和更高的作者重叠比例
    if (commonAuthors.length >= 3) {  // 至少3个共同作者
      const titleOverlap = cleanNew.split(/\s+/).filter(w => 
        w.length > 4 && cleanExisting.includes(w)
      ).length;
      
      // 对于survey论文，需要更严格的匹配条件
      const isSurveyNew = cleanNew.toLowerCase().includes('survey');
      const isSurveyExisting = cleanExisting.toLowerCase().includes('survey');
      
      if (isSurveyNew && isSurveyExisting) {
        // Survey论文需要更高的相似度阈值
        const newWords = cleanNew.split(/\s+/);
        const existingWords = cleanExisting.split(/\s+/);
        const overlapRatio = titleOverlap / Math.max(newWords.length, existingWords.length);
        
        if (overlapRatio >= 0.7) {
          console.log(`🔍 Found survey paper match: "${newPub.title}" vs "${existing.title}" (common authors: ${commonAuthors.length}, title overlap: ${titleOverlap}, ratio: ${overlapRatio.toFixed(2)})`);
          return existing;
        } else {
          console.log(`📝 Survey papers with similar authors but different topics: "${newPub.title.substring(0, 50)}..." vs "${existing.title.substring(0, 50)}..." (overlap ratio: ${overlapRatio.toFixed(2)})`);
        }
      } else {
        // 非survey论文使用原来的条件
        if (titleOverlap >= 5) {
          console.log(`🔍 Found author+title match: "${newPub.title}" vs "${existing.title}" (common authors: ${commonAuthors.length}, title overlap: ${titleOverlap})`);
          return existing;
        }
      }
    }
  }
  
  return null;
}

function isVenueUserCustomized(venue) {
  // 检测venue是否是用户手动设置的格式
  if (!venue) return false;
  
  // 1. 包含年份的格式（如 CVPR'22, WACV'25, NeurIPS'25, 3DV'24）
  if (venue.match(/^[A-Za-z0-9]+'[0-9]{2}$/)) {
    return true;
  }
  
  // 2. 包含完整年份的格式（如 CVPR 2022, WACV 2025）
  if (venue.match(/^[A-Za-z]+\s+20[0-9]{2}$/)) {
    return true;
  }
  
  // 3. 包含特殊格式的arXiv（如 arXiv'2508）
  if (venue.match(/^arXiv'[0-9]{4}$/)) {
    return true;
  }
  
  // 4. 包含特殊标识的venue（如 Under Review, Journal等）
  const specialVenues = ['Under Review', 'Journal', 'Conference'];
  if (specialVenues.includes(venue)) {
    return true;
  }
  
  // 5. 包含特殊字符或格式的venue
  if (venue.includes('(') || venue.includes(')') || venue.includes('&') || venue.includes('and')) {
    return true;
  }
  
  return false;
}

function updateExistingPublication(existing, scholarData) {
  // 只更新非手动编辑的基础信息，保护用户的手动修改
  let updated = false;
  
  // 1. 更新引用数相关的featured状态（如果用户没有手动设置）
  const shouldBeFeatured = scholarData.citations > 10;
  if (shouldBeFeatured && !existing.featured) {
    existing.featured = true;
    updated = true;
  }
  
  // 2. 保护用户手动设置的venue信息
  const isUserCustomizedVenue = isVenueUserCustomized(existing.venue);
  if (!isUserCustomizedVenue) {
    // 只在明显是默认值时更新venue信息
    if (existing.venue === 'Conference' || existing.venue === 'Journal' || 
        existing.venue === 'arXiv' || existing.venue_type === 'conference') {
      const venueInfo = parseVenueInfo(scholarData.venue);
      if (existing.venue !== venueInfo.fullName) {
        existing.venue = venueInfo.fullName;
        existing.venue_type = venueInfo.type;
        updated = true;
      }
    }
  } else {
    console.log(`🔒 Protected user-customized venue: "${existing.venue}"`);
  }
  
  // 3. 只在链接是默认占位符时更新
  const hasDefaultLink = existing.links?.some(link => 
    link.url === '#' || link.url === '' || link.name === 'Paper (Coming Soon)'
  );
  if (hasDefaultLink && scholarData.link && scholarData.link !== '#') {
    const defaultLinkIndex = existing.links.findIndex(link => 
      link.url === '#' || link.url === ''
    );
    if (defaultLinkIndex !== -1) {
      existing.links[defaultLinkIndex].url = scholarData.link;
      existing.links[defaultLinkIndex].name = 'Paper';
      updated = true;
    }
  }
  
  // 4. 保护手动设置的teaser图片，不覆盖
  // 手动维护的论文图片路径通常不是 teaser/preprint.jpg
  // 只有自动同步的论文才使用默认的 preprint.jpg
  
  // 5. 添加引用数信息（作为元数据，不显示在网站上）
  if (scholarData.citations > 0) {
    existing._scholar_citations = scholarData.citations;
    existing._scholar_last_updated = new Date().toISOString().split('T')[0];
  }
  
  return updated;
}

// 从arXiv URL中提取年份
function extractYearFromArxivUrl(url) {
  if (!url || !url.toLowerCase().includes('arxiv')) {
    return null;
  }
  
  // arXiv URL格式: https://arxiv.org/abs/YYMM.NNNNN 或 https://arxiv.org/abs/math-ph/YYMMnnn
  // 新格式 (2007年4月后): YYMM.NNNNN
  const newFormat = url.match(/arxiv\.org\/abs\/(\d{4})\./);
  if (newFormat) {
    const yymm = newFormat[1];
    const year = parseInt(yymm.substr(0, 2));
    // 2007年4月后的格式，YY是年份的后两位
    if (year >= 7) {  // 07-99 表示 2007-2099
      return 2000 + year;
    } else {  // 00-06 表示 2100-2106 (未来)
      return 2100 + year;
    }
  }
  
  // 旧格式 (2007年4月前): subject-class/YYMMnnn
  const oldFormat = url.match(/arxiv\.org\/abs\/[a-z-]+\/(\d{4})/);
  if (oldFormat) {
    const yymm = oldFormat[1];
    const year = parseInt(yymm.substr(0, 2));
    // 旧格式，91-06表示1991-2006，07-99表示2007-2099
    if (year >= 91) {
      return 1900 + year;
    } else {
      return 2000 + year;
    }
  }
  
  return null;
}

// 智能年份检测
function smartYearDetection(pub, venueInfo) {
  const currentYear = 2025;
  
  // 1. 尝试从arXiv链接提取年份（最准确）
  let arxivYear = null;
  if (pub.venue) {
    // 检查venue字段中是否包含arXiv ID信息
    // 匹配格式：arXiv:YYMM.NNNNN, arxiv.org/abs/YYMM.NNNNN, arXiv YYMM.NNNNN
    const arxivMatch = pub.venue.toLowerCase().match(/arxiv[:\s/]*(?:abs\/)?(\d{4})\./);
    if (arxivMatch) {
      const yymm = arxivMatch[1];
      const year = parseInt(yymm.substr(0, 2));
      // 2007年4月后的格式，YY是年份的后两位
      if (year >= 7) {  // 07-99 表示 2007-2099
        arxivYear = 2000 + year;
      } else {  // 00-06 表示 2100-2106 (未来)
        arxivYear = 2100 + year;
      }
    }
  }
  
  // 2. 尝试从venue信息中提取年份
  let venueYear = null;
  if (venueInfo.fullName) {
    const yearMatch = venueInfo.fullName.match(/20\d{2}/);
    if (yearMatch) {
      venueYear = parseInt(yearMatch[0]);
    }
  }
  
  // 3. Scholar提供的年份
  const scholarYear = pub.year;
  
  // 4. 智能选择优先级：arXiv > venue > Scholar
  if (arxivYear && arxivYear >= 2000 && arxivYear <= currentYear) {
    console.log(`📅 Using arXiv year ${arxivYear} for '${pub.title.substring(0, 50)}...'`);
    return arxivYear;
  } else if (venueYear && venueYear >= 2020 && venueYear <= currentYear) {
    console.log(`📅 Using venue year ${venueYear} for '${pub.title.substring(0, 50)}...'`);
    return venueYear;
  } else if (scholarYear >= 2020 && scholarYear <= currentYear) {
    console.log(`📅 Using Scholar year ${scholarYear} for '${pub.title.substring(0, 50)}...'`);
    return scholarYear;
  } else {
    // 都不合理，使用当前年份
    console.log(`⚠️  No reliable year found for '${pub.title.substring(0, 50)}...', using current year ${currentYear}`);
    return currentYear;
  }
}

function normalizeAuthorNames(authors, existingConfig) {
  // 从现有配置中提取作者姓名映射
  const authorMapping = {};
  
  // 从个人信息中获取主要作者的全名
  if (existingConfig.personal && existingConfig.personal.name) {
    const fullName = existingConfig.personal.name;
    const nameParts = fullName.split(' ');
    if (nameParts.length >= 2) {
      const firstName = nameParts[0];
      const lastName = nameParts[nameParts.length - 1];
      
      // 创建可能的缩写形式
      const abbreviations = [
        `${firstName[0]} ${lastName}`,  // S Dong
        `${firstName[0]}. ${lastName}`, // S. Dong
        `${firstName[0]}${lastName}`,   // SDong
        firstName,                      // Sixun
        lastName                        // Dong
      ];
      
      abbreviations.forEach(abbrev => {
        authorMapping[abbrev.toLowerCase()] = fullName;
      });
    }
  }
  
  // 从现有论文中学习其他作者的全名映射
  for (const [year, pubs] of Object.entries(existingConfig.publications || {})) {
    if (Array.isArray(pubs)) {
      pubs.forEach(pub => {
        if (pub.authors) {
          pub.authors.forEach(author => {
            if (author.length > 3) { // 认为是全名
              const nameParts = author.split(' ');
              if (nameParts.length >= 2) {
                const firstName = nameParts[0];
                const lastName = nameParts[nameParts.length - 1];
                
                // 添加缩写映射
                const abbreviations = [
                  `${firstName[0]} ${lastName}`,
                  `${firstName[0]}. ${lastName}`,
                  `${firstName[0]}${lastName}`
                ];
                
                abbreviations.forEach(abbrev => {
                  authorMapping[abbrev.toLowerCase()] = author;
                });
              }
            }
          });
        }
      });
    }
  }
  
  // 应用姓名标准化
  return authors.map(author => {
    const cleanAuthor = author.trim();
    const lowerAuthor = cleanAuthor.toLowerCase();
    
    // 检查是否有映射的全名
    if (authorMapping[lowerAuthor]) {
      console.log(`📝 Normalized author: "${cleanAuthor}" → "${authorMapping[lowerAuthor]}"`);
      return authorMapping[lowerAuthor];
    }
    
    return cleanAuthor;
  });
}

function convertToConfigFormat(scholarPubs, existingConfig) {
  console.log('🔄 Converting Scholar data to config format...');
  
  const publicationsByYear = {};
  
  scholarPubs.forEach(pub => {
    const venueInfo = parseVenueInfo(pub.venue);
    const smartYear = smartYearDetection(pub, venueInfo);
    const year = smartYear.toString();
    
    if (!publicationsByYear[year]) {
      publicationsByYear[year] = [];
    }
    
    // 标准化作者姓名
    const normalizedAuthors = normalizeAuthorNames(pub.authors, existingConfig);
    
    // 跨年份智能重复检测
    const existing = checkDuplicateAcrossAllYears({...pub, authors: normalizedAuthors}, existingConfig);
    
    if (!existing) {
      // 新论文：添加基础信息
      const configPub = {
        title: pub.title,
        authors: normalizedAuthors,
        venue: venueInfo.fullName,
        venue_type: venueInfo.type,
        image: "teaser/preprint.jpg",  // 自动同步的论文统一使用preprint图片
        auto_sync: true,  // 标记为自动同步，删除此标记后不再自动更新
        links: [
          {
            name: "Paper",
            url: pub.link || "#",
            icon: "ai ai-arxiv"
          }
        ]
      };
      
      // 如果引用数较高，标记为featured
      if (pub.citations > 10) {
        configPub.featured = true;
      }
      
      publicationsByYear[year].push(configPub);
      console.log(`✅ Added new: ${pub.title} (${year})`);
    } else {
      // 已存在的论文：检查是否允许自动更新
      if (existing.auto_sync === false) {
        console.log(`🔒 Protected: ${existing.title} (auto_sync disabled)`);
      } else {
        // 更新作者姓名（如果当前是缩写形式）
        if (existing.auto_sync !== false && existing.authors) {
          const updatedAuthors = normalizeAuthorNames(existing.authors, existingConfig);
          if (JSON.stringify(updatedAuthors) !== JSON.stringify(existing.authors)) {
            existing.authors = updatedAuthors;
            console.log(`📝 Updated authors for: ${existing.title}`);
          }
        }
        
        const wasUpdated = updateExistingPublication(existing, pub);
        if (wasUpdated) {
          console.log(`🔄 Updated: ${existing.title} (citations: ${pub.citations})`);
        } else {
          console.log(`ℹ️  Skipped: ${existing.title} (no updates needed)`);
        }
      }
    }
  });
  
  return publicationsByYear;
}

async function updateConfig() {
  try {
    console.log('📖 Reading current config.json...');
    const configPath = 'config.json';
    const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    
    console.log('🔍 Fetching publications from Google Scholar...');
    const scholarPubs = await fetchScholarPublications();
    
    if (scholarPubs.length === 0) {
      console.log('⚠️  No publications found, skipping update');
      return;
    }
    
    console.log('🔄 Merging with existing publications...');
    const newPubs = convertToConfigFormat(scholarPubs, configData);
    
    let addedCount = 0;
    let updatedCount = 0;
    
    // 合并新出版物到现有配置
    for (const [year, pubs] of Object.entries(newPubs)) {
      if (!configData.publications[year]) {
        configData.publications[year] = [];
      }
      
      // 添加新出版物（避免重复）
      pubs.forEach(newPub => {
        const exists = configData.publications[year].find(
          p => p.title.toLowerCase() === newPub.title.toLowerCase()
        );
        if (!exists) {
          configData.publications[year].push(newPub);
          console.log(`✅ Added: ${newPub.title} (${year})`);
          addedCount++;
        } else {
          updatedCount++;
        }
      });
    }
    
    // 更新Scholar同步信息
    if (!configData._scholar_sync) {
      configData._scholar_sync = {};
    }
    
    configData._scholar_sync.last_sync_date = new Date().toISOString().split('T')[0];
    configData._scholar_sync.last_sync_status = addedCount > 0 ? 
      `Added ${addedCount} new publications` : 
      `No new publications found (${updatedCount} existing checked)`;
    
    console.log('💾 Saving updated config.json...');
    fs.writeFileSync(configPath, JSON.stringify(configData, null, 2), 'utf8');
    
    console.log('🎉 Google Scholar sync completed successfully!');
    console.log(`📊 Summary: ${addedCount} added, ${updatedCount} checked`);
    
  } catch (error) {
    console.error('❌ Error updating config:', error);
    process.exit(1);
  }
}

// 运行同步
updateConfig(); 