---
title: "My Config-Driven Academic Website Template"
date: "2025-06-27"
description: "How I built a simple system to manage my academic website using JSON configuration and GitHub Actions."
tags: ["Academic Website", "GitHub Actions", "Template", "Web Development"]
image: "teaser/preprint.jpg"
---

# My Config-Driven Academic Website Template

I got tired of manually editing HTML files every time I wanted to update my academic website, so I built a simple system that lets me manage everything through a JSON configuration file.

## The Problem I Had

Like many academics, I struggled with:
- Editing HTML files for every publication update
- Keeping formatting consistent across pages
- Worrying about breaking the layout
- Spending time on code instead of content

## My Solution

I created a system where all my content lives in a single `config.json` file, and GitHub Actions automatically generates the HTML pages.

### Before and After

**Before**: Editing HTML directly
```html
<div class="publication-item">
  <img src="teaser/my-paper.jpg" alt="My Paper">
  <div class="publication-content">
    <p class="publication-title">My Research Paper</p>
    <!-- lots more HTML... -->
  </div>
</div>
```

**After**: Simple JSON structure
```json
{
  "title": "My Research Paper",
  "authors": ["Sixun Dong", "Collaborators"],
  "venue": "CVPR 2025",
  "image": "teaser/my-paper.jpg",
  "links": [{"name": "Paper", "url": "https://..."}]
}
```

## How It Works

1. **Edit config.json** with your content
2. **Push to GitHub** 
3. **GitHub Actions** runs and generates HTML
4. **Website updates** automatically

The build process uses Node.js scripts that read the JSON and generate HTML using templates.

## Key Features

### Single Configuration File
Everything lives in `config.json`:
- Personal info and bio
- Publications by year
- News updates
- Experience and education

### Automatic HTML Generation
GitHub Actions detects changes to the config and rebuilds the site automatically.

### Blog System
Blog posts are written in Markdown with frontmatter:
```markdown
---
title: "Post Title"
date: "2025-01-01"
description: "Brief description"
tags: ["Tag1", "Tag2"]
---

# Your content here...
```

### Publication Management
Publications are organized by year with support for:
- Different venue types (conference, journal, under review)
- Featured publications that appear on homepage
- Multiple links (paper, code, dataset, etc.)
- Automatic author name highlighting

## Technical Implementation

The system consists of:
- **Build scripts** (Node.js) that process the JSON config
- **HTML templates** for different page types
- **GitHub Actions workflow** for automation
- **Simple CSS/JS** for styling and interactions

### Local Development
You can build and preview locally:
```bash
python build_local.py  # Generate HTML
python local_server.py # Start local server
```

## What I Learned

Building this taught me:
- GitHub Actions is quite powerful for automation
- JSON is a good format for structured academic content
- Simple solutions often work better than complex ones
- Documentation matters (I should write more)

## Current Status

The template works well for my needs, but it's still evolving. I add features as I need them:
- ✅ Basic publication management
- ✅ Blog system with Markdown
- ✅ Automated deployment
- ✅ Comment system (Waline)
- ✅ Favicon support
- 🔄 Better mobile experience
- 🔄 More customization options

## Using This Template

If you want to use this for your own site:

1. **Fork** the repository
2. **Edit** `config.json` with your information
3. **Enable** GitHub Pages in repository settings
4. **Push** changes to trigger the build

The source code is available on GitHub. It's not the most polished system, but it works for my needs and might be useful for others.

## Limitations

This approach has some downsides:
- Requires basic Git/GitHub knowledge
- Limited customization without editing code
- Build process can be slow for large sites
- No real-time preview (need to push to see changes)

## Future Ideas

Things I might add:
- Better theme customization
- More publication types
- Integration with citation managers
- Mobile app for quick updates
- Better documentation

## Conclusion

This system solved my specific problem of maintaining an academic website without dealing with HTML. It's not perfect, but it's much easier than manually editing files.

If you're interested in trying it out or have suggestions for improvements, feel free to check out the code or reach out.

---

*This is just my personal solution to a common problem. Your mileage may vary.* 