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
                year_elem = row.find('span', class_='gsc_a_y')
                year = int(year_elem.text.strip()) if year_elem and year_elem.text.strip().isdigit() else 2024
                
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

def convert_to_config_format(scholar_pubs, existing_config):
    """转换为config.json格式"""
    print("🔄 Converting Scholar data to config format...")
    
    publications_by_year = {}
    
    for pub in scholar_pubs:
        year = str(pub['year'])
        if year not in publications_by_year:
            publications_by_year[year] = []
        
        venue_info = parse_venue_info(pub['venue'])
        
        # 检查是否已存在
        existing_pubs = existing_config.get('publications', {}).get(year, [])
        exists = any(
            existing['title'].lower() == pub['title'].lower() 
            for existing in existing_pubs
        )
        
        if not exists:
            config_pub = {
                'title': pub['title'],
                'authors': pub['authors'],
                'venue': venue_info['fullName'],
                'venue_type': venue_info['type'],
                'image': f"teaser/{re.sub(r'[^a-z0-9]', '', pub['title'].lower())}.jpg",
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
        
        # 合并新出版物
        added_count = 0
        for year, pubs in new_pubs.items():
            if year not in config_data['publications']:
                config_data['publications'][year] = []
            
            for new_pub in pubs:
                # 检查重复
                exists = any(
                    existing['title'].lower() == new_pub['title'].lower()
                    for existing in config_data['publications'][year]
                )
                
                if not exists:
                    config_data['publications'][year].append(new_pub)
                    print(f"✅ Added: {new_pub['title']} ({year})")
                    added_count += 1
        
        if added_count > 0:
            print("💾 Saving updated config.json...")
            with open('config.json', 'w', encoding='utf-8') as f:
                json.dump(config_data, f, indent=2, ensure_ascii=False)
            
            print(f"🎉 Scholar sync completed! Added {added_count} new publications.")
        else:
            print("ℹ️  No new publications to add.")
        
    except Exception as e:
        print(f"❌ Error updating config: {e}")

if __name__ == "__main__":
    update_config() 