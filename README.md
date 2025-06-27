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
.
├── index.html          # Main homepage (Bio)
├── publications.html   # Publications page  
├── blog.html          # Blog listing page
├── styles.css         # Main stylesheet
├── blog.css           # Blog-specific styles
├── images/            # Profile and blog images
│   ├── profile.jpg    # Your profile photo
│   └── blog/          # Blog cover images
├── files/             # CV and other files
├── posts/             # Individual blog posts
└── README.md          # This file
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

### Method 2: Direct HTML Editing (Traditional)

#### Profile Information
Edit `index.html`:
- Replace profile photo: `images/profile.jpg`
- Update name, title, affiliation
- Modify the bio and research interests
- Update contact links

#### Publications
Edit `publications.html`:
- Add your papers in the appropriate sections
- Update publication venues and links
- Modify the statistics section

#### Blog
- Add blog posts in the `blog.html` grid
- Create individual post files in `posts/` directory
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
1. Add an entry in `blog.html`
2. Create the actual post file in `posts/`
3. Add a cover image to `images/blog/`
4. Include appropriate tags and metadata

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
- `images/profile.jpg` - Your profile photo (240x240px recommended)
- `images/blog/*.jpg` - Blog cover images (400x200px recommended)

## 🤝 Contributing

Feel free to fork this template and make it your own! If you make improvements, consider sharing them back.

## 📄 License

This template is free to use for academic purposes. Attribution appreciated but not required.

---

**Happy coding!** 🚀

For questions or issues, feel free to open an issue on GitHub.
