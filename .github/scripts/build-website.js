/**
 * Config-Driven Academic Website Template
 * Build Script for GitHub Actions
 * 
 * @author Sixun Dong (ironieser)
 * @version 1.0.0
 * @license MIT
 * @repository https://github.com/Ironieser/ironieser.github.io
 * @description Generates HTML files from config.json for academic websites
 */

const fs = require('fs');
const path = require('path');

// Configuration and output files
const CONFIG_FILE = path.join(__dirname, '../../config.json');
const INDEX_OUTPUT = path.join(__dirname, '../../index.html');
const PUBLICATIONS_OUTPUT = path.join(__dirname, '../../publications.html');

function loadConfig() {
  console.log('Loading configuration from config.json...');
  
  if (!fs.existsSync(CONFIG_FILE)) {
    throw new Error('config.json file not found!');
  }
  
  try {
    const configContent = fs.readFileSync(CONFIG_FILE, 'utf-8');
    return JSON.parse(configContent);
  } catch (error) {
    throw new Error(`Error parsing config.json: ${error.message}`);
  }
}

function highlightAuthorName(authors, targetName) {
  return authors.map(author => {
    if (author.includes(targetName)) {
      return `<span class="author-highlight">${author}</span>`;
    }
    return author;
  }).join(', ');
}

function formatPublicationVenue(venueType, venue, isOral = false) {
  let badge;
  if (venueType === 'under-review') {
    badge = `<span class="publication-venue-under-review">${venue}</span>`;
  } else if (venueType === 'preprint') {
    badge = `<span class="publication-venue-preprint">${venue}</span>`;
  } else if (venueType === 'working') {
    badge = `<span class="publication-venue-working">${venue}</span>`;
  } else {
    badge = `<span class="publication-venue">${venue}</span>`;
  }
  
  if (isOral) {
    badge += '<span class="publication-venue-oral">🏆 Oral</span>';
  }
  
  return badge;
}

function formatPublicationLinks(links) {
  if (!links || links.length === 0) return '';
  
  const linkItems = links.map(link => {
    if (link.coming_soon) {
      return `<i class="${link.icon}"></i> <span class="coming-soon">${link.name}</span>`;
    } else {
      return `<i class="${link.icon}"></i> <a href="${link.url}" target="_blank">${link.name}</a>`;
    }
  });
  
  return linkItems.join(' / ');
}

function generateNavigation(personal, activePage) {
  const navLinks = {
    'Bio': 'index.html',
    'Publications': 'publications.html', 
    'Blog': 'blog.html',
    'CV(PDF)': personal.cv_link
  };
  
  const navItems = Object.entries(navLinks).map(([name, url]) => {
    const isActive = activePage === name ? 'active' : '';
    const target = name === 'CV(PDF)' ? 'target="_blank"' : '';
    return `<a href="${url}" class="nav-link ${isActive}" ${target}>${name}</a>`;
  });
  
  return navItems.join('\n                ');
}

function generateFooter(personal, templateInfo = null) {
  const currentYear = new Date().getFullYear();
  
  // Generate template credit if enabled
  const templateCredit = templateInfo && templateInfo.show_template_credit ? `
            <div class="template-credit">
                <p>Built with <a href="${templateInfo.repository}" target="_blank" rel="noopener">${templateInfo.name}</a> by <a href="${templateInfo.repository}" target="_blank" rel="noopener">${templateInfo.author}</a></p>
                ${templateInfo.acknowledgments ? `<p class="template-acknowledgments">${templateInfo.acknowledgments}</p>` : ''}
            </div>` : '';
  
  return `
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
                    Last updated from: <span id="owner-location">Loading...</span>
                </div>
                <div class="stats-item">
                    <i class="fas fa-clock"></i>
                    Content last updated: <span id="last-updated"></span>
                </div>
            </div>
            ${templateCredit}
            <p>&copy; ${currentYear} ${personal.name}. All rights reserved.</p>
        </div>
    </footer>`;
}

function generateCommonScripts() {
  // Get current build time (when GitHub Actions runs)
  const buildTime = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  
  return `
    <script>
        // Get website owner's location during build (not visitor's location)
        async function getOwnerLocation() {
            try {
                // Try primary API first
                let response = await fetch('https://ipapi.co/json/');
                let data = await response.json();
                
                if (data.city && data.country_name) {
                    const location = \`\${data.city}, \${data.country_name}\`;
                    document.getElementById('owner-location').textContent = location;
                    return;
                }
                
                // If primary API fails, try backup API
                response = await fetch('https://api.ipify.org?format=json');
                const ipData = await response.json();
                
                if (ipData.ip) {
                    // Use a different geolocation service
                    response = await fetch(\`https://ip-api.com/json/\${ipData.ip}\`);
                    data = await response.json();
                    
                    if (data.city && data.country) {
                        const location = \`\${data.city}, \${data.country}\`;
                        document.getElementById('owner-location').textContent = location;
                        return;
                    }
                }
                
                // If all APIs fail, show a default message
                document.getElementById('owner-location').textContent = 'Remote Server';
                
            } catch (error) {
                console.log('Location detection failed:', error);
                // For GitHub Actions builds, show a more appropriate message
                document.getElementById('owner-location').textContent = 'GitHub Actions';
            }
        }
        
        // Set last updated time (when GitHub Actions built the site)
        function setLastUpdated() {
            const buildDate = '${buildTime}';
            const date = new Date(buildDate);
            const formatted = date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
            document.getElementById('last-updated').textContent = formatted;
        }
        
        // Initialize on page load
        document.addEventListener('DOMContentLoaded', function() {
            getOwnerLocation();
            setLastUpdated();
        });
    </script>`;
}

function generateIndexPage(config) {
  console.log('Generating index.html...');
  
  const { personal, research, news, experience, education, service, publications, _template_info } = config;
  
  // Get selected publications (featured first, then recent)
  const selectedPubs = [];
  const sortedYears = Object.keys(publications).filter(year => year !== 'survey').sort().reverse();
  
  // Collect all publications
  const allPubs = [];
  for (const year of sortedYears) {
    allPubs.push(...publications[year]);
  }
  
  // First, add featured publications
  const featuredPubs = allPubs.filter(pub => pub.featured === true);
  selectedPubs.push(...featuredPubs.slice(0, 5));
  
  // If we need more, add recent publications (non-featured)
  if (selectedPubs.length < 5) {
    const recentPubs = allPubs.filter(pub => !pub.featured);
    const needed = 5 - selectedPubs.length;
    selectedPubs.push(...recentPubs.slice(0, needed));
  }
  
  // Generate bio HTML
  const bioHtml = personal.bio.map(para => `<p>${para}</p>`).join('\n                            ');
  
  // Generate social links
  const linksHtml = personal.links.map(link => `
            <a href="${link.url}" class="hero-link" title="${link.name}">
                <i class="${link.icon}"></i> ${link.name}
            </a>`).join('');
  
  // Generate news items
  const newsHtml = news.map(item => `
            <div class="news-item" data-category="${item.category}">
                <span class="news-date">${item.date}</span>
                <span class="news-content">${item.content}</span>
            </div>`).join('');
  
  // Generate selected publications
  const targetName = personal.name.split(' ')[0]; // Use first name for highlighting
  const pubsHtml = selectedPubs.map(pub => {
    const venueBadge = formatPublicationVenue(pub.venue_type, pub.venue, pub.is_oral);
    const authorsFormatted = highlightAuthorName(pub.authors, targetName);
    const linksFormatted = formatPublicationLinks(pub.links);
    
    return `
            <div class="publication-item">
                <img src="${pub.image}" alt="${pub.title}" class="publication-image teaser" onerror="this.src='images/default-paper.png'">
                <div class="publication-content">
                    <p class="publication-title">${venueBadge} ${pub.title}</p>
                    <p class="publication-authors">${authorsFormatted}</p>
                    <p class="publication-links">${linksFormatted}</p>
                </div>
            </div>`;
  }).join('');
  
  // Generate experience items
  const expHtml = experience.map(exp => `
            <div class="experience-item">
                <img src="${exp.logo}" alt="${exp.company}" class="experience-logo">
                <div class="experience-content">
                    <p class="experience-position">${exp.position}</p>
                    <p class="experience-company">${exp.company}</p>
                    <p class="experience-period">${exp.period}</p>
                    <p class="experience-description">${exp.description}</p>
                </div>
            </div>`).join('');
  
  // Generate education items
  const eduHtml = education.map(edu => {
    const details = edu.details ? `<p class="education-details">${edu.details}</p>` : '';
    return `
            <div class="education-item">
                <span class="education-period">${edu.period}</span>
                <div class="education-content">
                    <p class="education-degree">${edu.degree}</p>
                    <p class="education-institution">${edu.institution}</p>
                    ${details}
                </div>
            </div>`;
  }).join('');
  
  return `<!DOCTYPE html>
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
    <title>${personal.name} - Academic Homepage</title>
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
    <link rel="shortcut icon" href="favicon.ico">
    
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
                ${generateNavigation(personal, 'Bio')}
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
                        <img src="${personal.profile_image}" alt="${personal.name}" class="profile-image">
                    </div>
                    
                    <!-- Right: Introduction -->
                    <div class="hero-info">
                        <h1 class="hero-title">${personal.name}</h1>
                        <p class="hero-subtitle">${personal.title}</p>
                        <p class="hero-affiliation">${personal.affiliation}</p>
                        
                        <div class="hero-description">
                            ${bioHtml}
                        </div>
                        
                        <div class="hero-links">
                            ${linksHtml}
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
                        ${newsHtml}
                    </div>
                </div>
            </div>
        </section>

        <!-- Selected Publications -->
        <section class="section section-alt">
            <div class="container">
                <h2 class="section-title">Selected Publications</h2>
                <div class="publications-list">
                    ${pubsHtml}
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
                    ${expHtml}
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
                            <strong>Conferences:</strong> ${service.reviewer.conferences}
                        </p>
                        <p class="service-description">
                            <strong>Journals:</strong> ${service.reviewer.journals}
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
                    ${eduHtml}
                </div>
            </div>
        </section>
    </main>

    ${generateFooter(personal, _template_info)}
    
    <script>
        // News filter functionality
        function initNewsFilter() {
            const filterBtns = document.querySelectorAll('.filter-btn');
            const newsItems = document.querySelectorAll('.news-item');
            const categoryIndicators = document.querySelectorAll('.category-indicator');
            
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const filter = this.getAttribute('data-filter');
                    
                    // Update active button
                    filterBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Update active category indicator
                    categoryIndicators.forEach(indicator => {
                        indicator.classList.remove('active');
                        if (indicator.getAttribute('data-category') === filter) {
                            indicator.classList.add('active');
                        }
                    });
                    
                    // Filter news items
                    newsItems.forEach(item => {
                        if (filter === 'all' || item.getAttribute('data-category') === filter) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });
        }
        
        // Initialize news filter on page load
        document.addEventListener('DOMContentLoaded', function() {
            initNewsFilter();
        });
    </script>
    
    ${generateCommonScripts()}
</body>
</html>`;
}

function generatePublicationsPage(config) {
  console.log('Generating publications.html...');
  
  const { personal, research, publications, _template_info, _scholar_sync } = config;
  const targetName = personal.name.split(' ')[0];
  
  // Separate auto-synced and manual publications
  const manualPubs = {};
  const autoSyncedPubs = [];
  
  // Process publications by year, separating auto-synced ones
  const sortedYears = Object.keys(publications).filter(year => year !== 'survey').sort().reverse();
  
  for (const year of sortedYears) {
    const yearPubs = publications[year];
    const manualYearPubs = [];
    
    yearPubs.forEach(pub => {
      if (pub.auto_sync === true) {
        autoSyncedPubs.push(pub);
      } else {
        manualYearPubs.push(pub);
      }
    });
    
    if (manualYearPubs.length > 0) {
      manualPubs[year] = manualYearPubs;
    }
  }
  
  // Generate manual publications by year
  const yearSections = [];
  const manualYears = Object.keys(manualPubs).sort().reverse();
  
  for (const year of manualYears) {
    const yearPubs = manualPubs[year];
    const pubItems = yearPubs.map(pub => {
      const venueBadge = formatPublicationVenue(pub.venue_type, pub.venue, pub.is_oral);
      const authorsFormatted = highlightAuthorName(pub.authors, targetName);
      const linksFormatted = formatPublicationLinks(pub.links);
      
      return `
                <div class="publication-item">
                    <img src="${pub.image}" alt="${pub.title}" class="publication-image teaser" onerror="this.src='images/default-paper.png'">
                    <div class="publication-content">
                        <p class="publication-title">${venueBadge} ${pub.title}</p>
                        <p class="publication-authors">${authorsFormatted}</p>
                        <p class="publication-links">${linksFormatted}</p>
                    </div>
                </div>`;
    }).join('');
    
    yearSections.push(`
            <div class="year-group">
                <h3 class="year-title">${year}</h3>
                <div class="publications-list">
                    ${pubItems}
                </div>
            </div>`);
  }
  
  // Generate survey papers section
  if (publications.survey) {
    const surveyItems = publications.survey.map(pub => {
      const venueBadge = formatPublicationVenue(pub.venue_type, pub.venue);
      const authorsFormatted = highlightAuthorName(pub.authors, targetName);
      const linksFormatted = formatPublicationLinks(pub.links);
      
      return `
                <div class="publication-item">
                    <img src="${pub.image}" alt="${pub.title}" class="publication-image teaser" onerror="this.src='images/default-paper.png'">
                    <div class="publication-content">
                        <p class="publication-title">${venueBadge} ${pub.title}</p>
                        <p class="publication-authors">${authorsFormatted}</p>
                        <p class="publication-links">${linksFormatted}</p>
                    </div>
                </div>`;
    }).join('');
    
    yearSections.push(`
            <div class="year-group">
                <h3 class="year-title">Survey Papers</h3>
                <div class="publications-list">
                    ${surveyItems}
                </div>
            </div>`);
  }
  
  // Generate auto-synced publications section
  if (autoSyncedPubs.length > 0) {
    const autoSyncItems = autoSyncedPubs.map(pub => {
      const venueBadge = formatPublicationVenue(pub.venue_type, pub.venue, pub.is_oral);
      const authorsFormatted = highlightAuthorName(pub.authors, targetName);
      const linksFormatted = formatPublicationLinks(pub.links);
      
      return `
                <div class="publication-item">
                    <img src="${pub.image}" alt="${pub.title}" class="publication-image teaser" onerror="this.src='images/default-paper.png'">
                    <div class="publication-content">
                        <p class="publication-title">${venueBadge} ${pub.title}</p>
                        <p class="publication-authors">${authorsFormatted}</p>
                        <p class="publication-links">${linksFormatted}</p>
                    </div>
                </div>`;
    }).join('');
    
    // Generate Scholar sync info
    let scholarSyncInfo = '';
    if (_scholar_sync && _scholar_sync.last_sync_date) {
      const syncDate = new Date(_scholar_sync.last_sync_date);
      const formattedDate = syncDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
      scholarSyncInfo = ` (Last synced: ${formattedDate})`;
    }
    
    yearSections.push(`
            <div class="year-group">
                <h3 class="year-title">Other Publications <span class="auto-sync-note">Auto-updated based on Google Scholar${scholarSyncInfo}</span></h3>
                <div class="publications-list">
                    ${autoSyncItems}
                </div>
            </div>`);
  }
  
  // Generate stats
  const statsHtml = research.stats.map(stat => `<span class="stat-item">${stat}</span>`).join(' <span class="stat-divider">•</span> ');
  
  return `<!DOCTYPE html>
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
    <title>Publications - ${personal.name}</title>
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
    <link rel="shortcut icon" href="favicon.ico">
    
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
                ${generateNavigation(personal, 'Publications')}
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
                        <p>${research.description}</p>
                    </div>
                    
                    <!-- Summary Stats Bar -->
                    <div class="publication-stats-bar">
                        ${statsHtml}
                    </div>
                </div>
            </div>
        </section>

        <!-- Publications -->
        <section class="section">
            <div class="container">
                ${yearSections.join('')}
            </div>
        </section>
    </main>

    ${generateFooter(personal, _template_info)}
    
    ${generateCommonScripts()}
</body>
</html>`;
}

function buildWebsite() {
  console.log('🚀 Building website from config.json...');
  
  try {
    // Load configuration
    const config = loadConfig();
    console.log('✓ Configuration loaded successfully');
    
    // Generate HTML files
    const indexHtml = generateIndexPage(config);
    fs.writeFileSync(INDEX_OUTPUT, indexHtml);
    console.log('✓ index.html generated successfully');
    
    const publicationsHtml = generatePublicationsPage(config);
    fs.writeFileSync(PUBLICATIONS_OUTPUT, publicationsHtml);
    console.log('✓ publications.html generated successfully');
    
    console.log('\n🎉 Website generation completed!');
    console.log('\n💡 Files updated:');
    console.log('   - index.html');
    console.log('   - publications.html');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the build
buildWebsite(); 