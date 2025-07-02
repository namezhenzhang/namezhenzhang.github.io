#!/usr/bin/env python3
"""
Config-Driven Academic Website Template
Local Website Builder
======================================

This script generates HTML files from config.json locally.

Author: Sixun Dong (ironieser)
Version: 1.0.0
License: MIT
Repository: https://github.com/Ironieser/ironieser.github.io
Description: Local development tool for the config-driven academic website template

Usage: python build_local.py
"""

import json
import os
from datetime import datetime


def load_config():
    """Load configuration from config.json"""
    if not os.path.exists('config.json'):
        raise FileNotFoundError('config.json file not found!')
    
    with open('config.json', 'r', encoding='utf-8') as f:
        return json.load(f)


def highlight_author_name(authors, target_name):
    """Highlight the target author name in the author list"""
    result = []
    for author in authors:
        if target_name in author:
            result.append(f'<span class="author-highlight">{author}</span>')
        else:
            result.append(author)
    return ', '.join(result)


def format_publication_venue(venue_type, venue, is_oral=False):
    """Format publication venue badge"""
    if venue_type == "under-review":
        badge = f'<span class="publication-venue-under-review">{venue}</span>'
    elif venue_type == "preprint":
        badge = f'<span class="publication-venue-preprint">{venue}</span>'
    elif venue_type == "working":
        badge = f'<span class="publication-venue-working">{venue}</span>'
    else:
        badge = f'<span class="publication-venue">{venue}</span>'
    
    if is_oral:
        badge += '<span class="publication-venue-oral">🏆 Oral</span>'
    
    return badge


def format_publication_links(links):
    """Format publication links"""
    if not links:
        return ""
    
    link_items = []
    for link in links:
        if link.get('coming_soon'):
            link_items.append(f'<i class="{link["icon"]}"></i> <span class="coming-soon">{link["name"]}</span>')
        else:
            link_items.append(f'<i class="{link["icon"]}"></i> <a href="{link["url"]}" target="_blank">{link["name"]}</a>')
    
    return ' / '.join(link_items)


def generate_navigation(personal, active_page):
    """Generate navigation HTML"""
    nav_links = {
        'Bio': 'index.html',
        'Publications': 'publications.html',
        'Blog': 'blog.html',
        'CV(PDF)': personal['cv_link']
    }
    
    nav_items = []
    for name, url in nav_links.items():
        is_active = 'active' if active_page == name else ''
        target = 'target="_blank"' if name == 'CV(PDF)' else ''
        nav_items.append(f'<a href="{url}" class="nav-link {is_active}" {target}>{name}</a>')
    
    return '\n                '.join(nav_items)


def generate_footer(personal):
    """Generate footer HTML"""
    current_year = datetime.now().year
    return f'''
    <footer class="footer">
        <div class="container">
            <!-- Visitor Map Section -->
            <div class="visitor-map-section">
                <div class="visitor-map-container">
                    <!-- Visitor Map Widget -->
                    <div class="visitor-map">
                        <!-- ClustrMaps Widget -->
                        <script type="text/javascript" id="clustrmaps" src="//clustrmaps.com/map_v2.js?d=r_cMMykDPAdqK2GTahWbR__mtnzcj9svUgejZ86OXnU&cl=ffffff&w=a"></script>
                    </div>
                </div>
            </div>

            <div class="footer-stats">
                <div class="stats-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span id="visitor-location">Loading...</span>
                </div>
                <div class="stats-item">
                    <i class="fas fa-clock"></i>
                    Last updated: <span id="last-updated"></span>
                </div>
            </div>
            <p>&copy; {current_year} {personal['name']}. All rights reserved.</p>
        </div>
    </footer>'''


def generate_common_scripts():
    """Generate common JavaScript"""
    return '''
    <script>
        // Get visitor location using IP API
        async function getVisitorLocation() {
            try {
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();
                const location = `${data.city}, ${data.country_name}`;
                document.getElementById('visitor-location').textContent = location;
            } catch (error) {
                document.getElementById('visitor-location').textContent = 'Unknown';
            }
        }
        
        // Set last updated time
        function setLastUpdated() {
            const now = new Date();
            const formatted = now.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
            document.getElementById('last-updated').textContent = formatted;
        }
        
        // Initialize on page load
        document.addEventListener('DOMContentLoaded', function() {
            getVisitorLocation();
            setLastUpdated();
        });
    </script>'''


def generate_index_page(config):
    """Generate complete index.html page"""
    personal = config['personal']
    research = config['research']
    news = config['news']
    experience = config['experience']
    education = config['education']
    service = config['service']
    publications = config['publications']
    
    # Get selected publications (featured first, then recent)
    selected_pubs = []
    sorted_years = sorted([year for year in publications.keys() if year != 'survey'], reverse=True)
    
    # Collect all publications
    all_pubs = []
    for year in sorted_years:
        all_pubs.extend(publications[year])
    
    # First, add featured publications
    featured_pubs = [pub for pub in all_pubs if pub.get('featured') == True]
    selected_pubs.extend(featured_pubs[:5])
    
    # If we need more, add recent publications (non-featured)
    if len(selected_pubs) < 5:
        recent_pubs = [pub for pub in all_pubs if not pub.get('featured')]
        needed = 5 - len(selected_pubs)
        selected_pubs.extend(recent_pubs[:needed])
    
    # Generate bio HTML
    bio_html = '\n                            '.join([f'<p>{para}</p>' for para in personal['bio']])
    
    # Generate social links
    links_html = []
    for link in personal['links']:
        links_html.append(f'''
            <a href="{link['url']}" class="hero-link" title="{link['name']}">
                <i class="{link['icon']}"></i> {link['name']}
            </a>''')
    
    # Generate news items
    news_html = []
    for item in news:
        news_html.append(f'''
            <div class="news-item" data-category="{item['category']}">
                <span class="news-date">{item['date']}</span>
                <span class="news-content">{item['content']}</span>
            </div>''')
    
    # Generate selected publications
    target_name = personal['name'].split()[0]  # Use first name for highlighting
    pubs_html = []
    for pub in selected_pubs:
        venue_badge = format_publication_venue(pub['venue_type'], pub['venue'], pub.get('is_oral', False))
        authors_formatted = highlight_author_name(pub['authors'], target_name)
        links_formatted = format_publication_links(pub['links'])
        
        pubs_html.append(f'''
            <div class="publication-item">
                <img src="{pub['image']}" alt="{pub['title']}" class="publication-image teaser" onerror="this.src='images/default-paper.png'">
                <div class="publication-content">
                    <p class="publication-title">{venue_badge} {pub['title']}</p>
                    <p class="publication-authors">{authors_formatted}</p>
                    <p class="publication-links">{links_formatted}</p>
                </div>
            </div>''')
    
    # Generate experience items
    exp_html = []
    for exp in experience:
        exp_html.append(f'''
            <div class="experience-item">
                <img src="{exp['logo']}" alt="{exp['company']}" class="experience-logo">
                <div class="experience-content">
                    <p class="experience-position">{exp['position']}</p>
                    <p class="experience-company">{exp['company']}</p>
                    <p class="experience-period">{exp['period']}</p>
                    <p class="experience-description">{exp['description']}</p>
                </div>
            </div>''')
    
    # Generate education items
    edu_html = []
    for edu in education:
        details = f'<p class="education-details">{edu["details"]}</p>' if edu['details'] else ''
        edu_html.append(f'''
            <div class="education-item">
                <span class="education-period">{edu['period']}</span>
                <div class="education-content">
                    <p class="education-degree">{edu['degree']}</p>
                    <p class="education-institution">{edu['institution']}</p>
                    {details}
                </div>
            </div>''')
    
    # Create complete HTML page
    return f'''<!DOCTYPE html>
<!-- 
  Generated by Config-Driven Academic Website Template
  Author: Sixun Dong (ironieser)
  Repository: https://github.com/Ironieser/ironieser.github.io
  License: MIT
-->
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{personal['name']} - Academic Homepage</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/jpswalsh/academicons@1/css/academicons.min.css">
    <script src="script.js" defer></script>
</head>
<body>
    <!-- Navigation -->
    <header class="header">
        <nav class="nav">
            <div class="nav-container">
                {generate_navigation(personal, 'Bio')}
            </div>
        </nav>
    </header>

    <!-- Main Content -->
    <main class="main">
        <!-- Hero Section -->
        <section class="hero">
            <div class="container">
                <div class="hero-content">
                    <!-- Left: Photo -->
                    <div class="hero-photo">
                        <img src="{personal['profile_image']}" alt="{personal['name']}" class="profile-image">
                    </div>
                    
                    <!-- Right: Introduction -->
                    <div class="hero-info">
                        <h1 class="hero-title">{personal['name']}</h1>
                        <p class="hero-subtitle">{personal['title']}</p>
                        <p class="hero-affiliation">{personal['affiliation']}</p>
                        
                        <div class="hero-description">
                            {bio_html}
                        </div>
                        
                        <div class="hero-links">
                            {''.join(links_html)}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Recent News Section -->
        <section class="section-alt">
            <div class="container">
                <h2 class="section-title">Recent News</h2>
                
                <div class="news-container">
                    <div class="news-sidebar">
                        <button class="filter-btn active" data-filter="all">All</button>
                        <button class="filter-btn" data-filter="papers">📄 Papers</button>
                        <button class="filter-btn" data-filter="career">💼 Career</button>
                        <button class="filter-btn" data-filter="projects">🚀 Projects</button>
                    </div>
                    
                    <div class="news-list">
                        {''.join(news_html)}
                    </div>
                </div>
            </div>
        </section>

        <!-- Selected Publications -->
        <section class="section section-alt">
            <div class="container">
                <h2 class="section-title">Selected Publications</h2>
                <div class="publications-list">
                    {''.join(pubs_html)}
                </div>
                
                <div class="section-footer">
                    <a href="publications.html" class="btn btn-more">View All Publications</a>
                </div>
            </div>
        </section>

        <!-- Experience -->
        <section class="section section-alt">
            <div class="container">
                <h2 class="section-title">Experience</h2>
                <div class="experience-list">
                    {''.join(exp_html)}
                </div>
            </div>
        </section>

        <!-- Academic Service -->
        <section class="section section-alt">
            <div class="container">
                <h2 class="section-title">Academic Service</h2>
                <div class="service-content">
                    <div class="service-summary">
                        <h3 class="service-title">Reviewer</h3>
                        <p class="service-description">
                            <strong>Conferences:</strong> {service['reviewer']['conferences']}
                        </p>
                        <p class="service-description">
                            <strong>Journals:</strong> {service['reviewer']['journals']}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Education -->
        <section class="section section-alt">
            <div class="container">
                <h2 class="section-title">Education</h2>
                <div class="education-list">
                    {''.join(edu_html)}
                </div>
            </div>
        </section>
    </main>

    {generate_footer(personal)}
    
    <script>
        // News filter functionality
        function initNewsFilter() {{
            const filterBtns = document.querySelectorAll('.filter-btn');
            const newsItems = document.querySelectorAll('.news-item');
            const categoryIndicators = document.querySelectorAll('.category-indicator');
            
            filterBtns.forEach(btn => {{
                btn.addEventListener('click', function() {{
                    const filter = this.getAttribute('data-filter');
                    
                    // Update active button
                    filterBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Update active category indicator
                    categoryIndicators.forEach(indicator => {{
                        indicator.classList.remove('active');
                        if (indicator.getAttribute('data-category') === filter) {{
                            indicator.classList.add('active');
                        }}
                    }});
                    
                    // Filter news items
                    newsItems.forEach(item => {{
                        if (filter === 'all' || item.getAttribute('data-category') === filter) {{
                            item.style.display = 'block';
                        }} else {{
                            item.style.display = 'none';
                        }}
                    }});
                }});
            }});
        }}
        
        // Initialize news filter on page load
        document.addEventListener('DOMContentLoaded', function() {{
            initNewsFilter();
        }});
    </script>
    
    {generate_common_scripts()}
</body>
</html>'''


def generate_publications_page(config):
    """Generate complete publications.html page"""
    personal = config['personal']
    research = config['research']
    publications = config['publications']
    
    # Generate publications by year
    year_sections = []
    target_name = personal['name'].split()[0]
    sorted_years = sorted([year for year in publications.keys() if year != 'survey'], reverse=True)
    
    for year in sorted_years:
        year_pubs = publications[year]
        pub_items = []
        
        for pub in year_pubs:
            venue_badge = format_publication_venue(pub['venue_type'], pub['venue'], pub.get('is_oral', False))
            authors_formatted = highlight_author_name(pub['authors'], target_name)
            links_formatted = format_publication_links(pub['links'])
            
            pub_items.append(f'''
                <div class="publication-item">
                    <img src="{pub['image']}" alt="{pub['title']}" class="publication-image teaser" onerror="this.src='images/default-paper.png'">
                    <div class="publication-content">
                        <p class="publication-title">{venue_badge} {pub['title']}</p>
                        <p class="publication-authors">{authors_formatted}</p>
                        <p class="publication-links">{links_formatted}</p>
                    </div>
                </div>''')
        
        year_sections.append(f'''
            <div class="year-group">
                <h3 class="year-title">{year}</h3>
                <div class="publications-list">
                    {''.join(pub_items)}
                </div>
            </div>''')
    
    # Generate survey papers section
    if 'survey' in publications:
        survey_items = []
        for pub in publications['survey']:
            venue_badge = format_publication_venue(pub['venue_type'], pub['venue'])
            authors_formatted = highlight_author_name(pub['authors'], target_name)
            links_formatted = format_publication_links(pub['links'])
            
            survey_items.append(f'''
                <div class="publication-item">
                    <img src="{pub['image']}" alt="{pub['title']}" class="publication-image teaser" onerror="this.src='images/default-paper.png'">
                    <div class="publication-content">
                        <p class="publication-title">{venue_badge} {pub['title']}</p>
                        <p class="publication-authors">{authors_formatted}</p>
                        <p class="publication-links">{links_formatted}</p>
                    </div>
                </div>''')
        
        year_sections.append(f'''
            <div class="year-group">
                <h3 class="year-title">Survey Papers</h3>
                <div class="publications-list">
                    {''.join(survey_items)}
                </div>
            </div>''')
    
    # Generate stats
    stats_html = ' <span class="stat-divider">•</span> '.join([f'<span class="stat-item">{stat}</span>' for stat in research['stats']])
    
    return f'''<!DOCTYPE html>
<!-- 
  Generated by Config-Driven Academic Website Template
  Author: Sixun Dong (ironieser)
  Repository: https://github.com/Ironieser/ironieser.github.io
  License: MIT
-->
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Publications - {personal['name']}</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/jpswalsh/academicons@1/css/academicons.min.css">
</head>
<body>
    <!-- Navigation -->
    <header class="header">
        <nav class="nav">
            <div class="nav-container">
                {generate_navigation(personal, 'Publications')}
            </div>
        </nav>
    </header>

    <!-- Main Content -->
    <main class="main">
        <!-- Page Header -->
        <section class="page-header">
            <div class="container">
                <div class="page-header-content">
                    <h1 class="page-title-left">Publications</h1>
                    <div class="research-intro">
                        <p>{research['description']}</p>
                    </div>
                    
                    <!-- Summary Stats Bar -->
                    <div class="publication-stats-bar">
                        {stats_html}
                    </div>
                </div>
            </div>
        </section>

        <!-- Publications -->
        <section class="section">
            <div class="container">
                {''.join(year_sections)}
            </div>
        </section>
    </main>

    {generate_footer(personal)}
    
    {generate_common_scripts()}
</body>
</html>'''


def main():
    """Main function to generate HTML files"""
    print('🚀 Building website locally from config.json...')
    
    try:
        # Load configuration
        config = load_config()
        print('✓ Configuration loaded successfully')
        
        # Generate HTML files
        print('📝 Generating index.html...')
        index_html = generate_index_page(config)
        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(index_html)
        print('✓ index.html generated successfully')
        
        print('📄 Generating publications.html...')
        publications_html = generate_publications_page(config)
        with open('publications.html', 'w', encoding='utf-8') as f:
            f.write(publications_html)
        print('✓ publications.html generated successfully')
        
        print('\n🎉 Local website generation completed!')
        print('\n💡 You can now run "python local_server.py" to preview your changes')
        
    except FileNotFoundError:
        print('❌ Error: config.json file not found!')
        print('Please make sure config.json exists in the current directory.')
    except json.JSONDecodeError as e:
        print(f'❌ Error: Invalid JSON in config.json: {e}')
        print('Please check your JSON syntax.')
    except Exception as e:
        print(f'❌ Error: {e}')


if __name__ == "__main__":
    main() 