# Academic Website Template System

A powerful, **GitHub Actions-powered** config-driven system for easily managing academic websites. Update your content by editing a simple JSON file instead of writing HTML!

## 🎯 Features

- **Config-Driven**: All content managed through a single `config.json` file
- **GitHub Actions Automation**: Automatic website generation on every config change
- **Easy Updates**: Add publications, experience, news with simple JSON entries
- **Version Control**: Full Git history of your content changes
- **Zero Setup**: Works out of the box with GitHub Pages

## 🚀 Quick Start

### 1. Fork & Clone

Fork this repository to your GitHub account and clone it:

```bash
git clone https://github.com/yourusername/yourusername.github.io.git
cd yourusername.github.io
```

### 2. Customize Your Content

Edit `config.json` to update your information:

```json
{
  "personal": {
    "name": "Your Name",
    "title": "Your Title", 
    "affiliation": "Your Institution",
    "email": "your.email@example.com",
    ...
  }
}
```

### 3. Commit & Push

```bash
git add config.json
git commit -m "Update personal information"
git push
```

**That's it!** GitHub Actions will automatically:
- Detect the config.json change
- Generate new HTML files
- Commit them back to your repository
- Deploy to GitHub Pages

Your website will be updated within 1-2 minutes!

## 📝 Configuration Guide

### Personal Information

```json
"personal": {
  "name": "Your Full Name",
  "title": "Your Academic Title",
  "affiliation": "Your Institution",
  "email": "your.email@example.com",
  "profile_image": "path/to/your/photo.jpg",
  "cv_link": "path/to/your/cv.pdf",
  "bio": [
    "First paragraph of your bio...",
    "Second paragraph with <a href='#'>links</a> and <em>formatting</em>..."
  ],
  "links": [
    {
      "name": "Email",
      "url": "mailto:your.email@example.com",
      "icon": "fas fa-envelope",
      "color": "#dc3545"
    }
  ]
}
```

### Publications

Add publications by year:

```json
"publications": {
  "2025": [
    {
      "title": "Your Paper Title",
      "authors": ["Author 1", "Your Name", "Author 3"],
      "venue": "Conference/Journal Name",
      "venue_type": "conference", // or "under-review", "working"
      "image": "teaser/your-paper.jpg",
      "is_oral": true, // optional, for oral presentations
      "links": [
        {
          "name": "Paper",
          "url": "https://arxiv.org/abs/...",
          "icon": "ai ai-arxiv"
        },
        {
          "name": "Code",
          "url": "https://github.com/...",
          "icon": "fab fa-github"
        }
      ]
    }
  ]
}
```

### News Updates

```json
"news": [
  {
    "date": "Jan 2025",
    "content": "Your news update with <strong>formatting</strong>",
    "category": "papers" // or "career", "projects"
  }
]
```

### Experience

```json
"experience": [
  {
    "position": "Your Position",
    "company": "Company Name, Department",
    "period": "Start - End",
    "description": "Brief description of your role...",
    "logo": "images/company-logo.jpg"
  }
]
```

### Education

```json
"education": [
  {
    "degree": "PhD in Computer Science",
    "institution": "University Name, Country",
    "period": "2020 - 2024",
    "details": "Advisor: Prof. Name, Focus: Research Area"
  }
]
```

## 🔧 Advanced Usage

### Adding New Publications

1. Add paper details to `config.json` under the appropriate year
2. Add teaser image to `teaser/` directory
3. Run `python generate.py`

### Updating Biography

1. Edit the `bio` array in `config.json`
2. Use HTML formatting for links and emphasis
3. Run `python generate.py`

### Adding Social Links

```json
"links": [
  {
    "name": "Platform Name",
    "url": "https://...",
    "icon": "fab fa-platform", // FontAwesome icon class
    "color": "#hex-color"
  }
]
```

### Venue Types

- `"conference"`: Regular conference/journal (blue badge)
- `"under-review"`: Under review (gray badge)
- `"working"`: Work in progress (light blue badge)

### Link Types

Common icon classes:
- Papers: `"ai ai-arxiv"` (arXiv), `"fas fa-file-pdf"` (PDF)
- Code: `"fab fa-github"`
- Videos: `"fab fa-youtube"`, `"fas fa-tv"` (Bilibili)
- Datasets: `"fas fa-database"`

## 🎨 Customization

### Templates

The template system uses `template_generator.py` for HTML generation. You can modify this file to:
- Change the layout structure
- Add new sections
- Customize styling

### Styling

All CSS remains in `styles.css` - no changes needed to the styling system.

## 📋 File Structure

```
your-website/
├── config.json                      # 🎯 Main configuration file
├── .github/
│   ├── workflows/
│   │   ├── build-website.yml        # Website generation workflow
│   │   └── build-blog.yml          # Blog generation workflow
│   └── scripts/
│       ├── build-website.js         # Website generation script
│       └── build-blog.js           # Blog generation script
├── index.html                      # Generated homepage
├── publications.html               # Generated publications page
├── blog.html                       # Blog page
├── styles.css                      # Styling (unchanged)
├── images/                         # Your images
├── teaser/                         # Publication teaser images
└── blog/                           # Blog posts (markdown)
```

### Key Files

- **`config.json`**: The heart of the system - all your content lives here
- **`.github/workflows/build-website.yml`**: GitHub Actions workflow that watches for config changes
- **`.github/scripts/build-website.js`**: The script that transforms your config into HTML

## 🔄 Workflow

1. **Edit Content**: Update `config.json` with new information
2. **Commit & Push**: `git add config.json && git commit -m "Update content" && git push`
3. **Automatic Build**: GitHub Actions detects changes and rebuilds website
4. **Auto Deploy**: Updated website is automatically deployed to GitHub Pages

### Adding a New Publication

```bash
# 1. Edit config.json to add your new paper
vim config.json

# 2. Add teaser image (optional)
cp your-paper-teaser.jpg teaser/

# 3. Commit and push
git add config.json teaser/your-paper-teaser.jpg
git commit -m "Add new publication: Your Paper Title"
git push

# 4. Wait 1-2 minutes - your website is automatically updated!
```

## 🛠️ Troubleshooting

### Common Issues

**JSON Syntax Error**:
```
Error: Invalid JSON in config.json: Expecting ',' delimiter: line 45 column 6
```
- Check for missing commas, quotes, or brackets
- Use a JSON validator online

**Missing Images**:
- Ensure image paths in config match actual file locations
- Add `onerror="this.src='images/default-paper.png'"` for fallbacks

**Author Highlighting Not Working**:
- The system highlights based on first name matching
- Ensure your name appears exactly as in the `personal.name` field

### Getting Help

1. Check the GitHub Actions log for build errors
2. Validate your JSON syntax using online tools
3. Review the workflow runs in your repository's Actions tab

## 🎯 Benefits

- **No More HTML**: Update content without touching HTML
- **Consistent Formatting**: Automatic formatting ensures consistency
- **Easy Maintenance**: Add publications with simple JSON entries
- **Version Control Friendly**: JSON changes are easy to track
- **Extensible**: Easy to add new sections or modify templates

---

This template system makes managing your academic website as easy as editing a text file! 🚀 