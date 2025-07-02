#!/usr/bin/env python3
"""
Google Scholar Publications Sync Script
本地测试版本 - 用于验证Scholar同步功能
"""

import requests
import json
import re
from bs4 import BeautifulSoup
import time

# 你的Google Scholar用户ID
SCHOLAR_USER_ID = "j71Y2-4AAAAJ"

def fetch_scholar_publications():
    """从Google Scholar获取出版物列表"""
    print("🔍 Starting Google Scholar sync...")
    
    url = f"https://scholar.google.com/citations?user={SCHOLAR_USER_ID}&hl=en&sortby=pubdate"
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    try:
        print(f"📖 Fetching from: {url}")
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # 查找出版物表格
        pub_table = soup.find('table', {'id': 'gsc_a_t'})
        if not pub_table:
            print("❌ Could not find publications table")
            return []
        
        publications = []
        rows = pub_table.find_all('tr', class_='gsc_a_tr')
        
        for row in rows:
            try:
                # 提取标题
                title_elem = row.find('a', class_='gsc_a_at')
                if not title_elem:
                    continue
                title = title_elem.text.strip()
                
                # 提取作者
                author_elem = row.find('div', class_='gs_gray')
                authors = author_elem.text.strip() if author_elem else ""
                
                # 提取会议/期刊
                venue_elems = row.find_all('div', class_='gs_gray')
                venue = venue_elems[1].text.strip() if len(venue_elems) > 1 else ""
                
                # 提取年份
                year_elem = row.find('td', class_='gsc_a_y')
                if year_elem:
                    year_span = year_elem.find('span')
                    if year_span and year_span.text.strip().isdigit():
                        year = int(year_span.text.strip())
                    else:
                        year = 2024
                else:
                    year = 2024
                
                # 提取引用数
                cite_elem = row.find('a', class_='gsc_a_c')
                citations = int(cite_elem.text.strip()) if cite_elem and cite_elem.text.strip().isdigit() else 0
                
                publications.append({
                    'title': title,
                    'authors': [a.strip() for a in authors.split(',')],
                    'venue': venue,
                    'year': year,
                    'citations': citations
                })
                
            except Exception as e:
                print(f"⚠️  Error parsing row: {e}")
                continue
        
        print(f"📚 Found {len(publications)} publications from Scholar")
        return publications
        
    except Exception as e:
        print(f"❌ Error fetching from Scholar: {e}")
        return []

def parse_venue_info(venue):
    """解析会议/期刊信息"""
    venue_map = {
        'CVPR': {'type': 'conference', 'fullName': 'CVPR'},
        'ICCV': {'type': 'conference', 'fullName': 'ICCV'},
        'ECCV': {'type': 'conference', 'fullName': 'ECCV'},
        'NeurIPS': {'type': 'conference', 'fullName': 'NeurIPS'},
        'ICML': {'type': 'conference', 'fullName': 'ICML'},
        'ICLR': {'type': 'conference', 'fullName': 'ICLR'},
        'AAAI': {'type': 'conference', 'fullName': 'AAAI'},
        'IJCAI': {'type': 'conference', 'fullName': 'IJCAI'},
        'WACV': {'type': 'conference', 'fullName': 'WACV'},
        '3DV': {'type': 'conference', 'fullName': '3DV'},
    }
    
    # 检查已知会议
    for key, value in venue_map.items():
        if key.lower() in venue.lower():
            return value
    
    # 处理arXiv
    if 'arxiv' in venue.lower():
        return {'type': 'preprint', 'fullName': 'arXiv'}
    
    # 默认为会议
    return {'type': 'conference', 'fullName': venue}

def check_duplicate_across_all_years(new_pub, existing_config):
    """跨年份智能重复检测"""
    import re
    
    # 检查所有年份的所有论文
    all_existing_pubs = []
    for year, pubs in existing_config.get('publications', {}).items():
        if isinstance(pubs, list):
            all_existing_pubs.extend(pubs)
    
    for existing in all_existing_pubs:
        # 1. 完全标题匹配
        if existing['title'].lower() == new_pub['title'].lower():
            print(f"🔍 Found exact title match: \"{new_pub['title']}\"")
            return True
        
        # 2. 标题相似度检测（去除标点符号后比较）
        clean_new = re.sub(r'[^a-z0-9\s]', '', new_pub['title'].lower()).strip()
        clean_existing = re.sub(r'[^a-z0-9\s]', '', existing['title'].lower()).strip()
        if clean_new == clean_existing:
            print(f"🔍 Found similar title: \"{new_pub['title']}\" vs \"{existing['title']}\"")
            return True
        
        # 3. 核心词匹配（标题长度>20字符时）
        if len(new_pub['title']) > 20 and len(existing['title']) > 20:
            new_words = [w for w in clean_new.split() if len(w) > 3]
            existing_words = [w for w in clean_existing.split() if len(w) > 3]
            common_words = [w for w in new_words if w in existing_words]
            
            # 如果85%以上的重要词汇相同，认为是重复
            if len(common_words) / max(len(new_words), len(existing_words)) > 0.85:
                print(f"🔍 Found word overlap match: \"{new_pub['title']}\" vs \"{existing['title']}\"")
                return True
        
        # 4. 作者+关键词匹配（不依赖年份，但要更严格避免误判）
        # 检查共同作者
        new_authors = [a.lower().strip() for a in new_pub['authors']]
        existing_authors = [a.lower().strip() for a in existing.get('authors', [])]
        
        common_authors = []
        for na in new_authors:
            for ea in existing_authors:
                if len(na) > 2 and len(ea) > 2 and (na in ea or ea in na):
                    common_authors.append(na)
                    break
        
        # 如果有共同作者且标题有重叠词汇，可能是重复
        # 但要更严格：需要更多的标题重叠和更高的作者重叠比例
        if len(common_authors) >= 3:  # 至少3个共同作者
            title_overlap = len([w for w in clean_new.split() 
                               if len(w) > 4 and w in clean_existing])
            
            # 对于survey论文，需要更严格的匹配条件
            is_survey_new = 'survey' in clean_new.lower()
            is_survey_existing = 'survey' in clean_existing.lower()
            
            if is_survey_new and is_survey_existing:
                # Survey论文需要更高的相似度阈值
                # 需要至少70%的标题词汇重叠才认为是重复
                new_words = clean_new.split()
                existing_words = clean_existing.split()
                overlap_ratio = title_overlap / max(len(new_words), len(existing_words))
                
                if overlap_ratio >= 0.7:
                    print(f"🔍 Found survey paper match: \"{new_pub['title']}\" vs \"{existing['title']}\" (common authors: {len(common_authors)}, title overlap: {title_overlap}, ratio: {overlap_ratio:.2f})")
                    return True
                else:
                    print(f"📝 Survey papers with similar authors but different topics: \"{new_pub['title'][:50]}...\" vs \"{existing['title'][:50]}...\" (overlap ratio: {overlap_ratio:.2f})")
            else:
                # 非survey论文使用原来的条件
                if title_overlap >= 5:
                    print(f"🔍 Found author+title match: \"{new_pub['title']}\" vs \"{existing['title']}\" (common authors: {len(common_authors)}, title overlap: {title_overlap})")
                    return True
    
    return False

def update_existing_publication(existing, scholar_data):
    """只更新非手动编辑的基础信息，保护用户的手动修改"""
    updated = False
    
    # 1. 更新引用数相关的featured状态（如果用户没有手动设置）
    should_be_featured = scholar_data['citations'] > 10
    if should_be_featured and not existing.get('featured', False):
        existing['featured'] = True
        updated = True
    
    # 2. 只在明显是默认值时更新venue信息
    if existing.get('venue') in ['Conference', 'Journal', 'arXiv'] or \
       existing.get('venue_type') == 'conference':
        venue_info = parse_venue_info(scholar_data['venue'])
        if existing.get('venue') != venue_info['fullName']:
            existing['venue'] = venue_info['fullName']
            existing['venue_type'] = venue_info['type']
            updated = True
    
    # 3. 只在链接是默认占位符时更新
    links = existing.get('links', [])
    has_default_link = any(
        link.get('url') in ['#', ''] or link.get('name') == 'Paper (Coming Soon)'
        for link in links
    )
    
    if has_default_link:
        for link in links:
            if link.get('url') in ['#', '']:
                link['url'] = '#'  # Scholar链接通常需要手动获取
                link['name'] = 'Paper'
                updated = True
                break
    
    # 4. 保护手动设置的teaser图片，不覆盖
    # 手动维护的论文图片路径通常不是 teaser/preprint.jpg
    # 只有自动同步的论文才使用默认的 preprint.jpg
    
    # 5. 添加引用数信息（作为元数据）
    if scholar_data['citations'] > 0:
        existing['_scholar_citations'] = scholar_data['citations']
        existing['_scholar_last_updated'] = time.strftime('%Y-%m-%d')
    
    return updated

def extract_year_from_arxiv_url(url):
    """从arXiv URL中提取年份"""
    import re
    if not url or 'arxiv' not in url.lower():
        return None
    
    # arXiv URL格式: https://arxiv.org/abs/YYMM.NNNNN 或 https://arxiv.org/abs/math-ph/YYMMnnn
    # 新格式 (2007年4月后): YYMM.NNNNN
    new_format = re.search(r'arxiv\.org/abs/(\d{4})\.', url)
    if new_format:
        yymm = new_format.group(1)
        year = int(yymm[:2])
        # 2007年4月后的格式，YY是年份的后两位
        if year >= 7:  # 07-99 表示 2007-2099
            return 2000 + year
        else:  # 00-06 表示 2100-2106 (未来)
            return 2100 + year
    
    # 旧格式 (2007年4月前): subject-class/YYMMnnn
    old_format = re.search(r'arxiv\.org/abs/[a-z-]+/(\d{4})', url)
    if old_format:
        yymm = old_format.group(1)
        year = int(yymm[:2])
        # 旧格式，91-06表示1991-2006，07-99表示2007-2099
        if year >= 91:
            return 1900 + year
        else:
            return 2000 + year
    
    return None

def smart_year_detection(pub, venue_info):
    """智能年份检测，多源年份信息"""
    import re
    current_year = 2025
    
    # 1. 尝试从arXiv链接提取年份（最准确）
    arxiv_year = None
    if 'venue' in pub and pub['venue']:
        # 检查venue字段中是否包含arXiv ID信息
        # 匹配格式：arXiv:YYMM.NNNNN, arxiv.org/abs/YYMM.NNNNN, arXiv YYMM.NNNNN
        arxiv_match = re.search(r'arxiv[:\s/]*(?:abs/)?(\d{4})\.', pub['venue'].lower())
        if arxiv_match:
            yymm = arxiv_match.group(1)
            year = int(yymm[:2])
            # 2007年4月后的格式，YY是年份的后两位
            if year >= 7:  # 07-99 表示 2007-2099
                arxiv_year = 2000 + year
            else:  # 00-06 表示 2100-2106 (未来)
                arxiv_year = 2100 + year
    
    # 2. 尝试从venue信息中提取年份
    venue_year = None
    if venue_info['fullName']:
        year_match = re.search(r'20\d{2}', venue_info['fullName'])
        if year_match:
            venue_year = int(year_match.group())
    
    # 3. Scholar提供的年份
    scholar_year = pub['year']
    
    # 4. 智能选择优先级：arXiv > venue > Scholar
    if arxiv_year and 2000 <= arxiv_year <= current_year:
        print(f"📅 Using arXiv year {arxiv_year} for '{pub['title'][:50]}...'")
        return arxiv_year
    elif venue_year and 2020 <= venue_year <= current_year:
        print(f"📅 Using venue year {venue_year} for '{pub['title'][:50]}...'")
        return venue_year
    elif 2020 <= scholar_year <= current_year:
        print(f"📅 Using Scholar year {scholar_year} for '{pub['title'][:50]}...'")
        return scholar_year
    else:
        # 都不合理，使用当前年份
        print(f"⚠️  No reliable year found for '{pub['title'][:50]}...', using current year {current_year}")
        return current_year

def normalize_author_names(authors, existing_config):
    """标准化作者姓名，将缩写转换为全名"""
    author_mapping = {}
    
    # 从个人信息中获取主要作者的全名
    if existing_config.get('personal') and existing_config['personal'].get('name'):
        full_name = existing_config['personal']['name']
        name_parts = full_name.split()
        if len(name_parts) >= 2:
            first_name = name_parts[0]
            last_name = name_parts[-1]
            
            # 创建可能的缩写形式
            abbreviations = [
                f"{first_name[0]} {last_name}",  # S Dong
                f"{first_name[0]}. {last_name}",  # S. Dong
                f"{first_name[0]}{last_name}",   # SDong
                first_name,                      # Sixun
                last_name                        # Dong
            ]
            
            for abbrev in abbreviations:
                author_mapping[abbrev.lower()] = full_name
    
    # 从现有论文中学习其他作者的全名映射
    for year, pubs in existing_config.get('publications', {}).items():
        if isinstance(pubs, list):
            for pub in pubs:
                if pub.get('authors'):
                    for author in pub['authors']:
                        if len(author) > 3:  # 认为是全名
                            name_parts = author.split()
                            if len(name_parts) >= 2:
                                first_name = name_parts[0]
                                last_name = name_parts[-1]
                                
                                # 添加缩写映射
                                abbreviations = [
                                    f"{first_name[0]} {last_name}",
                                    f"{first_name[0]}. {last_name}",
                                    f"{first_name[0]}{last_name}"
                                ]
                                
                                for abbrev in abbreviations:
                                    author_mapping[abbrev.lower()] = author
    
    # 应用姓名标准化
    normalized_authors = []
    for author in authors:
        clean_author = author.strip()
        lower_author = clean_author.lower()
        
        # 检查是否有映射的全名
        if lower_author in author_mapping:
            normalized_name = author_mapping[lower_author]
            print(f"📝 Normalized author: \"{clean_author}\" → \"{normalized_name}\"")
            normalized_authors.append(normalized_name)
        else:
            normalized_authors.append(clean_author)
    
    return normalized_authors

def convert_to_config_format(scholar_pubs, existing_config):
    """转换为config.json格式"""
    print("🔄 Converting Scholar data to config format...")
    
    publications_by_year = {}
    
    for pub in scholar_pubs:
        venue_info = parse_venue_info(pub['venue'])
        
        # 智能年份检测
        smart_year = smart_year_detection(pub, venue_info)
        year = str(smart_year)
        
        if year not in publications_by_year:
            publications_by_year[year] = []
        
        # 标准化作者姓名
        normalized_authors = normalize_author_names(pub['authors'], existing_config)
        
        # 跨年份智能重复检测
        pub_with_normalized_authors = pub.copy()
        pub_with_normalized_authors['authors'] = normalized_authors
        exists = check_duplicate_across_all_years(pub_with_normalized_authors, existing_config)
        
        if not exists:
            # 新论文：添加基础信息
            config_pub = {
                'title': pub['title'],
                'authors': normalized_authors,
                'venue': venue_info['fullName'],
                'venue_type': venue_info['type'],
                'image': "teaser/preprint.jpg",  # 自动同步的论文统一使用preprint图片
                'auto_sync': True,  # 标记为自动同步，删除此标记后不再自动更新
                'links': [
                    {
                        'name': 'Paper',
                        'url': '#',  # 需要手动添加链接
                        'icon': 'ai ai-arxiv'
                    }
                ]
            }
            
            # 高引用论文标记为featured
            if pub['citations'] > 10:
                config_pub['featured'] = True
            
            publications_by_year[year].append(config_pub)
            print(f"✅ Added new: {pub['title']} ({year}) [Scholar year: {pub['year']}]")
        else:
            # 已存在的论文：跳过，不添加重复
            print(f"🔄 Skipped duplicate: {pub['title']} (already exists)")
    
    return publications_by_year

def update_config():
    """更新config.json文件"""
    try:
        print("📖 Reading current config.json...")
        with open('config.json', 'r', encoding='utf-8') as f:
            config_data = json.load(f)
        
        print("🔍 Fetching publications from Google Scholar...")
        scholar_pubs = fetch_scholar_publications()
        
        if not scholar_pubs:
            print("⚠️  No publications found, skipping update")
            return
        
        print("🔄 Merging with existing publications...")
        new_pubs = convert_to_config_format(scholar_pubs, config_data)
        
        # 更新现有论文的作者姓名（如果允许自动同步）
        updated_count = 0
        for year, pubs in config_data.get('publications', {}).items():
            if isinstance(pubs, list):
                for pub in pubs:
                    if pub.get('auto_sync') != False and pub.get('authors'):
                        original_authors = pub['authors'][:]
                        normalized_authors = normalize_author_names(pub['authors'], config_data)
                        if original_authors != normalized_authors:
                            pub['authors'] = normalized_authors
                            print(f"📝 Updated authors for: {pub['title']}")
                            updated_count += 1
        
        # 合并新出版物
        added_count = 0
        for year, pubs in new_pubs.items():
            if year not in config_data['publications']:
                config_data['publications'][year] = []
            
            for new_pub in pubs:
                # 使用跨年份重复检测
                exists = check_duplicate_across_all_years(new_pub, config_data)
                
                if not exists:
                    config_data['publications'][year].append(new_pub)
                    print(f"✅ Added: {new_pub['title']} ({year})")
                    added_count += 1
                else:
                    print(f"🔄 Skipped duplicate: {new_pub['title']} ({year})")
        
        if added_count > 0 or updated_count > 0:
            print("💾 Saving updated config.json...")
            with open('config.json', 'w', encoding='utf-8') as f:
                json.dump(config_data, f, indent=2, ensure_ascii=False)
            
            print(f"🎉 Scholar sync completed! Added {added_count} new publications, updated {updated_count} existing publications.")
        else:
            print("ℹ️  No changes to make.")
        
    except Exception as e:
        print(f"❌ Error updating config: {e}")

if __name__ == "__main__":
    update_config() 