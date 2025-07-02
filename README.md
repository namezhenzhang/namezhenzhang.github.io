# Academic Website Template

A simple, config-driven academic website template that generates HTML from JSON configuration.

## 🎯 Features

- **Single config file** controls all content (no HTML editing needed)
- **Automatic generation** via GitHub Actions
- **Clean academic design** with responsive layout
- **Blog system** with Markdown support
- **Publication management** with automatic formatting
- **Easy maintenance** - just edit JSON and push

## 🚀 How to Use This Template

### Step 1: Fork the Repository

1. Go to [this repository](https://github.com/Ironieser/ironieser.github.io)
2. Click the **"Fork"** button in the top right
3. Choose your GitHub account as the destination

### Step 2: Rename Your Repository

1. In your forked repository, go to **Settings**
2. Scroll down to **"Repository name"**
3. Change it to `yourusername.github.io` (replace with your actual GitHub username)
4. Click **"Rename"**

### Step 3: Enable GitHub Pages

1. Still in **Settings**, scroll down to **"Pages"**
2. Under **"Source"**, select **"Deploy from a branch"**
3. Choose **"master"** branch and **"/ (root)"** folder
4. Click **"Save"**

Your website will be available at `https://yourusername.github.io`

### Step 4: Clone to Your Computer

```bash
git clone https://github.com/yourusername/yourusername.github.io.git
cd yourusername.github.io
```

### Step 5: Edit Your Information

Open `config.json` and update with your information:

```json
{
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
      {"name": "Email", "url": "mailto:your.email@university.edu", "icon": "fas fa-envelope"},
      {"name": "Scholar", "url": "https://scholar.google.com/citations?user=YOUR_ID", "icon": "fas fa-graduation-cap"},
      {"name": "GitHub", "url": "https://github.com/yourusername", "icon": "fab fa-github"}
    ]
  }
}
```

### Step 6: Add Your Content

#### Publications
Add your papers in the `publications` section:

```json
"publications": {
  "2024": [
    {
      "title": "Your Paper Title",
      "authors": ["Your Name", "Collaborator 1", "Collaborator 2"],
      "venue": "CVPR 2024",
      "venue_type": "conference",
      "image": "teaser/your-paper.jpg",
      "featured": true,
      "links": [
        {"name": "Paper", "url": "https://arxiv.org/abs/...", "icon": "ai ai-arxiv"},
        {"name": "Code", "url": "https://github.com/...", "icon": "fab fa-github"}
      ]
    }
  ]
}
```

#### News Updates
Add recent news:

```json
"news": [
  {
    "date": "Dec 2024",
    "content": "Paper accepted to <strong>CVPR 2024</strong>!",
    "category": "papers"
  }
]
```

#### Experience and Education
Update your background:

```json
"experience": [
  {
    "position": "Research Intern",
    "company": "Company Name",
    "period": "Summer 2024",
    "description": "Brief description...",
    "logo": "images/company-logo.jpg"
  }
],
"education": [
  {
    "degree": "PhD in Computer Science",
    "institution": "Your University",
    "period": "2024 - Present",
    "details": "Focus: Computer Vision and AI"
  }
]
```

### Step 7: Add Your Images

1. **Profile photo**: Add your photo as `images/your-photo.jpg`
2. **Paper teasers**: Add teaser images to `teaser/` directory
3. **Company logos**: Add logos to `images/` directory
4. **CV**: Add your CV to `files/` directory

### Step 8: Push Your Changes

```bash
git add config.json
git add images/  # if you added new images
git commit -m "Update personal information"
git push
```

**That's it!** GitHub Actions will automatically:
- Generate HTML files from your config
- Deploy your website
- Your site will be live in 1-2 minutes

## 📝 Adding Blog Posts

1. Create a new `.md` file in the `blog/` directory:

```markdown
---
title: "Your Blog Post Title"
date: "2024-01-01"
description: "Brief description"
tags: ["Research", "AI"]
image: "teaser/preprint.jpg"
---

# Your Blog Post

Write your content here in Markdown...
```

2. Push the file to GitHub - the blog will update automatically

## 🔧 Local Development (Optional)

To preview changes locally before pushing:

```bash
# Build website
python build_local.py

# Start local server
python local_server.py

# Visit http://localhost:8000
```

## 📋 Configuration Reference

### Publication Types
- `"conference"`: Blue badge for published papers
- `"under-review"`: Gray badge for papers under review
- `"preprint"`: Orange badge for preprints

### Link Icons
- Paper: `"ai ai-arxiv"`
- Code: `"fab fa-github"`
- Dataset: `"fas fa-database"`
- Video: `"fab fa-youtube"`
- Website: `"fas fa-globe"`

### News Categories
- `"papers"`: For publication news
- `"career"`: For job/position updates
- `"projects"`: For project announcements

## ❓ Troubleshooting

### Website showing README instead of homepage
- Make sure you pushed changes to `config.json`
- Check GitHub Actions tab for build errors
- Wait 1-2 minutes for deployment

### Images not showing
- Ensure image files are committed and pushed
- Check file paths in `config.json`
- Use relative paths from website root

### Build errors
- Validate JSON syntax in `config.json`
- Check GitHub Actions logs for specific errors
- Ensure all required fields are present

## 🎨 Customization

- **Colors**: Edit CSS variables in `styles.css`
- **Fonts**: Change Google Fonts link and CSS
- **Layout**: Modify the build scripts in `.github/scripts/`

## 📞 Getting Help

- Check the [Issues page](https://github.com/Ironieser/ironieser.github.io/issues)
- Look at the example `config.json` for reference
- Review GitHub Actions logs if builds fail

## 📄 License

MIT License - free to use and modify!

---

**Created by [Sixun Dong](https://github.com/Ironieser)** - PhD student at Arizona State University

*This template is designed to be simple and practical. Start with the basics and customize as needed.*
