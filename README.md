# Academic Website Template

A clean, modern academic website template with a powerful **config-driven system** for easy content management.

## 🎯 Features

- **Config-Driven Content**: Update your entire website by editing one JSON file
- **Automatic Generation**: Generate HTML files with a single command
- **Minimal & Clean Design**: Focus on content with modern typography
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Academic-Focused**: Optimized for researchers and academics
- **Blog Support**: Integrated blog with cover images, tags, and categories
- **Easy Updates**: Add publications, experience, news without writing HTML

## 🏗️ Structure

```
📦 ironieser.github.io/
├── 🔧 Core Files
│   ├── config.json                 # 🎯 Main configuration (edit this!)
│   ├── build_local.py             # 🐍 Local build script (Python)
│   ├── build_local.js             # 🟨 Local build script (JavaScript)
│   ├── local_server.py            # 🌐 Local development server
│   └── .gitignore                 # 📋 Git ignore configuration
│
├── 🏗️ Auto-Generated (not tracked in git)
│   ├── index.html                 # 🏠 Homepage (auto-built)
│   ├── publications.html          # 📚 Publications page (auto-built)
│   └── blog.html                  # ✍️ Blog page (auto-built)
│
├── 🎨 Styles & Scripts
│   ├── styles.css                 # 💅 Main stylesheet
│   ├── blog.css                   # 📝 Blog-specific styles
│   ├── script.js                  # ⚡ JavaScript functionality
│   └── blog-data.js               # 📊 Blog data
│
├── 🖼️ Media Assets
│   ├── images/                    # 📸 Images directory
│   │   ├── logo.jpg              # 🎭 Site logo/avatar
│   │   ├── profile.jpg           # 👤 Profile photo
│   │   └── blog/                 # 📖 Blog cover images
│   ├── teaser/                   # 🔬 Paper teaser images
│   └── files/                    # 📄 Download files (CV, papers)
│
├── ✍️ Content
│   └── blog/                     # 📚 Blog posts (Markdown format)
│
├── ⚙️ Automation
│   └── .github/
│       ├── workflows/            # 🔄 GitHub Actions workflows
│       └── scripts/              # 📜 Build scripts
│
└── 📚 Documentation
    ├── README.md                 # 📖 This file
    ├── TEMPLATE_SYSTEM.md        # 🏗️ Template system guide
    ├── BLOG_SYSTEM.md           # ✍️ Blog system guide
    └── GITHUB_ACTIONS_GUIDE.md   # 🚀 GitHub Actions guide
```

## 🚀 Quick Start

### Method 1: Config-Driven (Recommended) 🚀

**Step 1: Configure Your Content**
```bash
# Edit the configuration file with your information
# All your content is managed in this single file!
vim config.json  # or use any text editor
```

**Step 2: Commit & Push**
```bash
# Commit your changes
git add config.json
git commit -m "Update personal information"
git push
```

**Step 3: Automatic Deployment**
GitHub Actions will automatically:
- Detect your config.json changes
- Generate new HTML files
- Deploy to GitHub Pages

That's it! Your website will be updated within 1-2 minutes. To add new publications or update your bio, just edit `config.json` and push the changes.

## 📝 Config-Driven Content Management

The template includes a powerful configuration system that lets you manage all content through a single `config.json` file:

### Adding Publications
```json
"publications": {
  "2025": [
    {
      "title": "Your Amazing Research Paper",
      "authors": ["Author 1", "Your Name", "Author 3"],
      "venue": "CVPR 2025",
      "venue_type": "conference",
      "image": "teaser/your-paper.jpg",
      "is_oral": true,
      "links": [
        {"name": "Paper", "url": "https://arxiv.org/...", "icon": "ai ai-arxiv"},
        {"name": "Code", "url": "https://github.com/...", "icon": "fab fa-github"}
      ]
    }
  ]
}
```

### Updating Personal Information
```json
"personal": {
  "name": "Your Name",
  "title": "PhD Student in Computer Science", 
  "affiliation": "Your University",
  "bio": [
    "First paragraph of your bio...",
    "Second paragraph with research interests..."
  ]
}
```

### Adding News
```json
"news": [
  {
    "date": "Dec 2024",
    "content": "Paper accepted to <strong>CVPR 2025</strong>!",
    "category": "papers"
  }
]
```

📖 **Documentation:**
- [TEMPLATE_SYSTEM.md](TEMPLATE_SYSTEM.md) - Complete configuration guide
- [GITHUB_ACTIONS_GUIDE.md](GITHUB_ACTIONS_GUIDE.md) - GitHub Actions workflow guide
- [BLOG_SYSTEM.md](BLOG_SYSTEM.md) - Blog system documentation

## 🛠️ Local Development

### Option 1: Python Build Script (Recommended)
```bash
# Build website from config.json
python build_local.py

# Start local development server
python local_server.py
# Visit http://localhost:8000
```

### Option 2: JavaScript Build Script
```bash
# Install dependencies (first time only)
npm init -y
npm install

# Build website from config.json
node build_local.js
```

### Building Components
- **Website**: `python build_local.py` generates `index.html` and `publications.html`
- **Blog**: Blog system is integrated into the main build process
- **Local Preview**: Use `python local_server.py` to preview changes locally

### Method 2: Direct HTML Editing (Traditional)

#### Profile Information
Edit `config.json` (recommended) or `index.html`:
- Replace profile photo: `images/logo.jpg` or `images/profile.jpg`
- Update personal information in config.json
- Modify the bio and research interests
- Update contact links

#### Publications
Edit `config.json` (recommended) or `publications.html`:
- Add your papers in the publications section of config.json
- Update publication venues and links
- Modify the statistics section

#### Blog
- Add blog posts in the `blog.html` grid (auto-generated from config)
- Create individual post files in `blog/` directory (Markdown format)
- Add cover images to `images/blog/`

### 3. Deploy to GitHub Pages

1. **Upload to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main
```

2. **Enable GitHub Pages:**
   - Go to repository Settings
   - Navigate to Pages section  
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Your site will be available at `https://yourusername.github.io`

## 📝 Content Guidelines

### Adding Publications

Each publication should include:
- Venue badge with appropriate styling
- Full title and author list (bold your name)
- Brief summary/abstract
- Links to paper, code, video, etc.

### Writing Blog Posts

For each blog post:
1. Create a Markdown file in `blog/` directory
2. Configure the blog data in `blog-data.js` or use config system
3. Add a cover image to `images/blog/`
4. Include appropriate tags and metadata in frontmatter

Example blog post structure:
```html
<article class="blog-card">
    <div class="blog-image">
        <img src="images/blog/post-cover.jpg" alt="Post Title">
        <div class="blog-category">Category</div>
    </div>
    <div class="blog-content">
        <time class="blog-date">Date</time>
        <h2 class="blog-title">
            <a href="posts/post-name.html">Post Title</a>
        </h2>
        <p class="blog-excerpt">Brief description...</p>
        <div class="blog-tags">
            <span class="tag">Tag1</span>
            <span class="tag">Tag2</span>
        </div>
        <div class="blog-meta">
            <span class="read-time">X min read</span>
            <a href="posts/post-name.html" class="read-more">Read More →</a>
        </div>
    </div>
</article>
```

## 🎨 Customization

### Colors
The color scheme is defined in CSS variables in `styles.css`:
```css
:root {
    --color-primary: #1a1a1a;      /* Main text */
    --color-secondary: #666666;     /* Secondary text */
    --color-accent: #2563eb;        /* Links and highlights */
    --color-background: #ffffff;    /* Page background */
    --color-surface: #f8fafc;       /* Card backgrounds */
    --color-border: #e2e8f0;        /* Borders */
}
```

### Typography
The template uses Inter font. You can change it by updating the Google Fonts link and the CSS variable:
```css
--font-family: 'Your Font', sans-serif;
```

### Layout
The main layout uses CSS Grid for the hero section:
- Left column: Profile photo (300px fixed width)
- Right column: Bio and information (flexible)

On mobile, it switches to a single column layout.

## 📱 Mobile Responsiveness

The template includes responsive breakpoints:
- **Desktop**: > 1024px (full layout)
- **Tablet**: 768px - 1024px (adjusted spacing)
- **Mobile**: < 768px (stacked layout)
- **Small Mobile**: < 480px (compact design)

## 🔧 Advanced Features

### SEO Optimization
- Semantic HTML structure
- Proper meta tags
- Descriptive alt texts
- Structured data ready

### Performance
- Minimal CSS and JavaScript
- Optimized images (you should compress them)
- No external dependencies except Google Fonts

### Accessibility
- Proper heading hierarchy
- Focus styles for keyboard navigation
- Color contrast compliance
- Screen reader friendly

## 📋 Required Images

Make sure to add these images:
- `images/logo.jpg` - Your main profile photo/logo (240x240px recommended)
- `images/profile.jpg` - Alternative profile photo (if needed)
- `images/blog/*.jpg` - Blog cover images (400x200px recommended)
- `teaser/*.jpg` - Paper teaser images for publications
- `files/CV_*.pdf` - Your CV and other downloadable files

## 🤝 Contributing

Feel free to fork this template and make it your own! If you make improvements, consider sharing them back.

## 👨‍💻 Author

This template was created by **Sixun Dong** ([@ironieser](https://github.com/Ironieser)), a PhD student at Arizona State University.

- **Portfolio**: [ironieser.github.io](https://ironieser.github.io)
- **Email**: sdong46@asu.edu
- **Research**: Multimodal AI, Computer Vision, LLM Agents

## 📄 License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.

**Free to use, modify, and distribute!** ✨ Attribution appreciated but not required.

## 🙏 Acknowledgments

Built with love for the academic community. Special thanks to:
- GitHub Actions for automation infrastructure
- The open-source community for inspiration
- All researchers who provided feedback

---

**Ready to build your amazing academic website?** 🚀

For questions, suggestions, or issues, feel free to [open an issue](https://github.com/Ironieser/ironieser.github.io/issues) on GitHub.
