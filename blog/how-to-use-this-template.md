---
title: "How to Use This Academic Website Template"
date: "2025-06-25"
description: "A practical guide to using the config-driven academic website template, covering all features and customization options."
tags: ["Tutorial", "Website", "Academic", "Guide"]
image: "teaser/preprint.jpg"
---

# How to Use This Academic Website Template

This is a practical guide for using my config-driven academic website template. I'll walk through all the features and how to customize them for your needs.

## Getting Started

### 1. Fork the Repository
Fork [this repository](https://github.com/Ironieser/ironieser.github.io) to your GitHub account.

### 2. Enable GitHub Pages
- Go to your repository settings
- Scroll down to "Pages" section
- Set source to "Deploy from a branch"
- Choose "master" branch

### 3. Edit the Configuration
The main configuration is in `config.json`. This file controls everything on your website.

## Configuration Structure

The config file has several main sections:

```json
{
  "personal": { /* Your basic info */ },
  "research": { /* Research description and stats */ },
  "news": [ /* Recent news items */ ],
  "publications": { /* Papers by year */ },
  "experience": [ /* Work experience */ ],
  "education": [ /* Academic background */ ],
  "service": { /* Academic service */ }
}
```

## Personal Information

Update the `personal` section with your details:

```json
"personal": {
  "name": "Your Name",
  "title": "PhD Student in Computer Science",
  "affiliation": "Your University",
  "email": "your.email@university.edu",
  "profile_image": "images/your-photo.jpg",
  "cv_link": "files/your-cv.pdf",
  "bio": [
    "First paragraph about yourself...",
    "Second paragraph with research focus..."
  ],
  "links": [
    {
      "name": "Email",
      "url": "mailto:your.email@university.edu",
      "icon": "fas fa-envelope"
    }
  ]
}
```

### Adding Social Links
The template supports various social platforms:

```json
"links": [
  {"name": "Email", "url": "mailto:...", "icon": "fas fa-envelope"},
  {"name": "Scholar", "url": "https://scholar.google.com/...", "icon": "fas fa-graduation-cap"},
  {"name": "GitHub", "url": "https://github.com/...", "icon": "fab fa-github"},
  {"name": "Twitter", "url": "https://twitter.com/...", "icon": "fab fa-twitter"},
  {"name": "LinkedIn", "url": "https://linkedin.com/in/...", "icon": "fab fa-linkedin"}
]
```

## Publications Management

Publications are organized by year in the `publications` section:

```json
"publications": {
  "2025": [
    {
      "title": "Your Paper Title",
      "authors": ["Your Name", "Collaborator 1", "Collaborator 2"],
      "venue": "CVPR 2025",
      "venue_type": "conference",
      "image": "teaser/your-paper.jpg",
      "featured": true,
      "is_oral": false,
      "links": [
        {"name": "Paper", "url": "https://arxiv.org/...", "icon": "ai ai-arxiv"},
        {"name": "Code", "url": "https://github.com/...", "icon": "fab fa-github"}
      ]
    }
  ]
}
```

### Publication Fields

- `title`: Paper title
- `authors`: List of authors (your name will be highlighted automatically)
- `venue`: Conference/journal name
- `venue_type`: `"conference"`, `"under-review"`, `"preprint"`, or `"working"`
- `image`: Path to teaser image
- `featured`: `true` to show on homepage (optional)
- `is_oral`: `true` for oral presentations (optional)
- `links`: Array of links (paper, code, dataset, etc.)

### Venue Types

Different venue types get different styling:
- `"conference"`: Blue badge for published papers
- `"under-review"`: Gray badge for papers under review
- `"preprint"`: Orange badge for preprints
- `"working"`: Light blue badge for work in progress

### Link Icons

Common link icons:
- Paper: `"ai ai-arxiv"` or `"fas fa-file-pdf"`
- Code: `"fab fa-github"`
- Dataset: `"fas fa-database"`
- Video: `"fab fa-youtube"`
- Website: `"fas fa-globe"`

## News Updates

Add recent news to the `news` array:

```json
"news": [
  {
    "date": "Dec 2024",
    "content": "Paper accepted to <strong>CVPR 2025</strong>!",
    "category": "papers"
  },
  {
    "date": "Aug 2024",
    "content": "Started PhD at Your University",
    "category": "career"
  }
]
```

Categories include: `"papers"`, `"career"`, `"projects"`, or custom categories.

## Experience and Education

### Experience Section
```json
"experience": [
  {
    "position": "Research Intern",
    "company": "Company Name",
    "period": "Summer 2024",
    "description": "Brief description of your work...",
    "logo": "images/company-logo.jpg"
  }
]
```

### Education Section
```json
"education": [
  {
    "degree": "PhD in Computer Science",
    "institution": "Your University",
    "period": "2024 - Present",
    "details": "Focus: Computer Vision and AI"
  }
]
```

## Research Description

Update the research section with your focus areas:

```json
"research": {
  "description": "Your research description...",
  "stats": [
    "X+ publications",
    "Y top-tier venues",
    "Z oral presentations"
  ]
}
```

## Images and Files

### Profile Image
- Add your photo to `images/` directory
- Update `profile_image` path in config
- Recommended: Square image, at least 400x400px

### Publication Teasers
- Store teaser images in `teaser/` directory
- Use descriptive names: `teaser/your-paper-name.jpg`
- Recommended: 16:9 aspect ratio, around 800x450px

### CV and Documents
- Store PDFs in `files/` directory
- Update `cv_link` path in config

## Blog Posts

Create blog posts in the `blog/` directory:

1. Create a new `.md` file
2. Add frontmatter metadata
3. Write content in Markdown

Example:
```markdown
---
title: "My Research Experience"
date: "2025-01-01"
description: "Reflections on my PhD journey"
tags: ["Research", "PhD"]
image: "teaser/preprint.jpg"
---

# My Research Experience

Your blog content here...
```

## Customization

### Colors and Styling
- Main styles are in `styles.css`
- Blog styles in `blog.css`
- Modify CSS variables for color themes

### Adding New Sections
- Edit the build scripts in `.github/scripts/`
- Add new sections to `config.json`
- Update HTML templates as needed

## Local Development

### Build Locally
```bash
python build_local.py
```

### Preview Locally
```bash
python local_server.py
```
Then visit `http://localhost:8000`

## Deployment

The site deploys automatically when you push changes to GitHub. The process:

1. GitHub Actions detects changes to `config.json` or blog files
2. Runs build scripts to generate HTML
3. Commits generated files back to repository
4. GitHub Pages serves the updated site

## Tips and Best Practices

### Publication Management
- Keep publication images consistent in size and style
- Use descriptive filenames for easy organization
- Update featured publications to highlight your best work

### Content Updates
- Update news regularly to keep the site fresh
- Write blog posts about your research journey
- Keep your CV and contact information current

### Performance
- Optimize images before uploading
- Keep the config file organized and well-formatted
- Use meaningful commit messages for changes

## Troubleshooting

### Common Issues

**Site not updating after changes:**
- Check GitHub Actions tab for build errors
- Ensure `config.json` has valid JSON syntax
- Wait a few minutes for deployment

**Images not showing:**
- Check file paths in config
- Ensure images are committed to repository
- Use relative paths from website root

**Build errors:**
- Check GitHub Actions logs
- Validate JSON syntax
- Ensure all required fields are present

## Getting Help

If you run into issues:
- Check the repository's Issues tab
- Look at the build logs in GitHub Actions
- Make sure your config follows the examples

This template is designed to be simple and practical. Start with the basics and gradually add more features as you need them.

---

*This guide covers the main features. Feel free to explore the code and customize it further for your specific needs.* 