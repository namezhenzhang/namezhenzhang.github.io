const fs = require('fs');
const puppeteer = require('puppeteer');

// Google Scholar用户ID，从环境变量获取
const SCHOLAR_USER_ID = process.env.SCHOLAR_USER_ID || 'j71Y2-4AAAAJ'; // 默认使用你的ID

async function fetchScholarPublications() {
  console.log('🔍 Starting Google Scholar sync...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // 设置用户代理避免被检测
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    // 访问Google Scholar个人页面
    const scholarUrl = `https://scholar.google.com/citations?user=${SCHOLAR_USER_ID}&hl=en&sortby=pubdate`;
    console.log(`📖 Fetching from: ${scholarUrl}`);
    
    await page.goto(scholarUrl, { waitUntil: 'networkidle2' });
    
    // 等待页面加载
    await page.waitForSelector('#gsc_a_t', { timeout: 10000 });
    
    // 提取出版物信息
    const publications = await page.evaluate(() => {
      const rows = document.querySelectorAll('#gsc_a_t tr.gsc_a_tr');
      const pubs = [];
      
      rows.forEach(row => {
        const titleElement = row.querySelector('.gsc_a_at');
        const authorsElement = row.querySelector('.gsc_a_at + .gs_gray');
        const venueElement = row.querySelector('.gs_gray:last-child');
        const yearElement = row.querySelector('.gsc_a_y span');
        const citationsElement = row.querySelector('.gsc_a_c a');
        
        if (titleElement && authorsElement && venueElement && yearElement) {
          const title = titleElement.textContent.trim();
          const authors = authorsElement.textContent.trim();
          const venue = venueElement.textContent.trim();
          const year = parseInt(yearElement.textContent.trim());
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

function convertToConfigFormat(scholarPubs, existingConfig) {
  console.log('🔄 Converting Scholar data to config format...');
  
  const publicationsByYear = {};
  
  scholarPubs.forEach(pub => {
    const year = pub.year.toString();
    if (!publicationsByYear[year]) {
      publicationsByYear[year] = [];
    }
    
    const venueInfo = parseVenueInfo(pub.venue);
    
    // 检查是否已存在（避免重复）
    const existing = existingConfig.publications[year]?.find(
      p => p.title.toLowerCase() === pub.title.toLowerCase()
    );
    
    if (!existing) {
      const configPub = {
        title: pub.title,
        authors: pub.authors,
        venue: venueInfo.fullName,
        venue_type: venueInfo.type,
        image: `teaser/${pub.title.toLowerCase().replace(/[^a-z0-9]/g, '')}.jpg`,
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
        }
      });
    }
    
    console.log('💾 Saving updated config.json...');
    fs.writeFileSync(configPath, JSON.stringify(configData, null, 2), 'utf8');
    
    console.log('🎉 Google Scholar sync completed successfully!');
    
  } catch (error) {
    console.error('❌ Error updating config:', error);
    process.exit(1);
  }
}

// 运行同步
updateConfig(); 