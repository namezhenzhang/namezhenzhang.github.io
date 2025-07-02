# Blog Posts

This directory contains Markdown blog posts that are automatically processed and displayed on the website.

## Adding a Blog Post

1. Create a new `.md` file in this directory
2. Add frontmatter at the top
3. Write your content in Markdown
4. Push to GitHub (automatic build and deploy)

## File Format

Each post needs frontmatter metadata:

```yaml
---
title: "Your Post Title"
date: "2025-01-01"
description: "Brief description"
tags: ["Research", "AI"]
image: "teaser/preprint.jpg"
---

# Your Content

Write your post content here in Markdown...
```

## Required Fields

- `title`: Post title
- `date`: Date in YYYY-MM-DD format
- `description`: Brief description for the blog list

## Optional Fields

- `tags`: Array of tags
- `image`: Header image path (defaults to placeholder)

## File Naming

Use descriptive names with hyphens:
- ✅ `my-research-experience.md`
- ❌ `My Research Experience.md`

## Images

Store images in `images/blog/` or use existing teaser images:
- `teaser/preprint.jpg` (default)
- `images/blog/your-image.jpg`

## External Posts

For external blog posts (like Zhihu), the build system will automatically detect and handle them based on the blog data configuration.

## How It Works

GitHub Actions automatically:
1. Processes Markdown files when you push changes
2. Generates `blog-data.js` with all post data
3. Updates the blog page to show new posts

## Local Testing

To build locally:
```bash
python build_local.py  # Generates blog page
python local_server.py # Preview at localhost:8000
``` 