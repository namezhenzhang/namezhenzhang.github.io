# GitHub Actions Blog System

This repository now includes an automated blog system powered by GitHub Actions that processes Markdown files and generates static blog content.

## 🚀 Features

- **Automatic Processing**: GitHub Actions automatically processes Markdown files
- **Frontmatter Support**: YAML frontmatter for metadata (title, date, tags, etc.)
- **Static Generation**: Converts Markdown to HTML and generates JavaScript data
- **Full Page Display**: Blog posts open in full-page view with navigation
- **Responsive Design**: Mobile-friendly blog layout
- **SEO Friendly**: Direct URLs for individual blog posts

## 📁 File Structure

```
├── blog/                          # Markdown blog posts
│   ├── README.md                 # Instructions
│   └── example-post.md           # Sample blog post
├── .github/
│   ├── workflows/
│   │   └── build-blog.yml        # GitHub Actions workflow
│   └── scripts/
│       └── build-blog.js         # Blog build script
├── blog-data.js                  # Generated blog data (auto-updated)
├── blog.html                     # Blog page
└── blog.css                      # Blog styles
```

## 📝 How to Add a Blog Post

### 1. Create a Markdown File

Create a new `.md` file in the `blog/` directory:

```markdown
---
title: "My Amazing Research Journey"
date: "2024-03-15"
description: "A detailed look into my research experience and findings"
tags: ["Research", "AI", "Computer Vision"]
image: "images/blog/research-journey.jpg"
---

# My Amazing Research Journey

Welcome to my blog post! Here I'll share...

## Key Findings

- Finding 1
- Finding 2
- Finding 3

## Conclusion

This research has shown that...
```

### 2. Frontmatter Fields

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `title` | ✅ Yes | Blog post title | `"My Research Journey"` |
| `date` | ✅ Yes | Publication date (YYYY-MM-DD) | `"2024-03-15"` |
| `description` | ✅ Yes | Brief description for blog list | `"A detailed look into..."` |
| `tags` | ❌ No | Array of tags | `["Research", "AI"]` |
| `image` | ❌ No | Header image path | `"images/blog/post.jpg"` |

### 3. Commit and Push

```bash
git add blog/my-new-post.md
git commit -m "Add new blog post: My Amazing Research Journey"
git push
```

### 4. Automatic Processing

GitHub Actions will automatically:
1. Detect the new/modified blog post
2. Process the Markdown and frontmatter
3. Generate updated `blog-data.js`
4. Commit the changes back to the repository

## 🔧 GitHub Actions Workflow

The workflow (`.github/workflows/build-blog.yml`) triggers on:
- Push to `main`/`master` branch
- Changes to files in `blog/` directory
- Changes to the workflow file itself

### Workflow Steps:
1. **Checkout**: Get the repository code
2. **Setup Node.js**: Install Node.js 18
3. **Install Dependencies**: Install `marked` and `js-yaml`
4. **Build Blog**: Run the build script
5. **Commit Changes**: Auto-commit the generated `blog-data.js`

## 🛠️ Build Script

The build script (`.github/scripts/build-blog.js`) performs:

1. **Scan Directory**: Finds all `.md` files in `blog/` (except README.md)
2. **Parse Frontmatter**: Extracts YAML metadata
3. **Convert Markdown**: Converts Markdown content to HTML
4. **Generate Data**: Creates JavaScript data structure
5. **Write File**: Outputs `blog-data.js` with all blog data

## 🌐 Blog Display

### Blog List Page (`blog.html`)
- Shows all blog posts in a list format
- Displays title, description, date, and tags
- External posts (like Zhihu) link directly to external sites
- Internal posts open in full-page view

### Full Page View
- Clean, readable layout optimized for long-form content
- "Back to Blog" navigation
- Support for browser back/forward buttons
- Direct URLs for sharing: `blog.html?post=post-id`

## 🎨 Styling

The blog uses the same design system as the rest of the site:
- Consistent typography and spacing
- Responsive design for mobile devices
- Code syntax highlighting
- Image optimization with rounded corners and shadows

## 🔗 External vs Internal Posts

### External Posts
```html
<!-- Links directly to external site -->
<a href="https://zhuanlan.zhihu.com/p/684454735" target="_blank">
    Article Title
</a>
```

### Internal Posts
```html
<!-- Opens in full-page view -->
<a href="#" class="internal-link" data-post-id="my-post">
    Article Title
</a>
```

## 📱 Mobile Support

The blog system is fully responsive:
- Stacked layout on mobile devices
- Touch-friendly navigation
- Optimized font sizes and spacing
- Horizontal scrolling for code blocks

## 🚨 Troubleshooting

### Blog Post Not Appearing
1. Check that the Markdown file is in the `blog/` directory
2. Verify frontmatter syntax (proper YAML format)
3. Check GitHub Actions tab for build errors
4. Ensure the commit was pushed to the main branch

### GitHub Actions Failing
1. Check the Actions tab in your GitHub repository
2. Look for error messages in the build logs
3. Verify that the workflow has write permissions
4. Check that the Markdown syntax is valid

### Images Not Loading
1. Ensure images are uploaded to the correct path
2. Use relative paths from the repository root
3. Add fallback with `onerror="this.src='images/default-paper.png'"`

## 🔒 Permissions

The GitHub Actions workflow requires:
- `contents: write` permission to commit generated files
- Access to the repository's default branch

These are typically available by default in GitHub repositories.

## 🎯 Best Practices

1. **File Naming**: Use descriptive, URL-friendly names
   - ✅ Good: `my-research-journey.md`
   - ❌ Bad: `Blog Post #1.md`

2. **Image Optimization**: 
   - Use web-friendly formats (JPG, PNG, WebP)
   - Optimize file sizes for web
   - Store in `images/blog/` directory

3. **Content Structure**:
   - Use clear headings hierarchy
   - Include descriptive alt text for images
   - Write concise descriptions for the blog list

4. **Tags**: Use consistent, relevant tags for better organization

## 📈 Future Enhancements

Possible future improvements:
- RSS feed generation
- Search functionality
- Category pages
- Comment system integration
- Analytics integration

---

This blog system provides a seamless way to publish academic and technical content while maintaining the professional appearance of your homepage. 