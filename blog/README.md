# Blog Directory

This directory contains Markdown blog posts that are automatically processed by GitHub Actions and displayed on your blog page.

## How to Add a New Blog Post

1. Create a new `.md` file in this directory
2. Add frontmatter metadata at the top
3. Write your content in Markdown format
4. Commit and push to GitHub
5. GitHub Actions will automatically build and deploy your blog!

## Frontmatter Format

Each Markdown file should start with YAML frontmatter:

```yaml
---
title: "Your Blog Post Title"
date: "2024-03-15"
description: "A brief description of your post"
tags: ["Tag1", "Tag2", "Tag3"]
image: "images/blog/your-image.jpg"
---
```

## Required Fields

- **title**: The title of your blog post
- **date**: Publication date in YYYY-MM-DD format
- **description**: Brief description shown in the blog list

## Optional Fields

- **tags**: Array of tags for categorization
- **image**: Path to header image (defaults to placeholder if not provided)

## Markdown Content

After the frontmatter, write your content using standard Markdown syntax:

- Headers: `# ## ###`
- Bold: `**text**`
- Italic: `*text*`
- Links: `[text](url)`
- Images: `![alt](src)`
- Code: `` `code` `` or ``` code blocks ```
- Lists: `- item` or `1. item`

## GitHub Actions Workflow

The blog system uses GitHub Actions to automatically:

1. **Detect Changes**: Triggers when files in `blog/` directory are modified
2. **Process Markdown**: Parses frontmatter and converts Markdown to HTML
3. **Generate Data**: Creates `blog-data.js` with all blog post data
4. **Auto-Deploy**: Commits the generated file back to the repository

## Workflow File

The GitHub Actions workflow is defined in `.github/workflows/build-blog.yml`

## Local Development

To test locally (requires Node.js):

```bash
npm install marked js-yaml
node .github/scripts/build-blog.js
```

## File Naming

- Use descriptive filenames (they become the post ID)
- Use lowercase with hyphens: `my-research-journey.md`
- Avoid spaces and special characters

## Images

- Store blog images in `images/blog/` directory
- Use web-friendly formats (JPG, PNG, WebP)
- Optimize for web (reasonable file sizes)
- Reference in frontmatter: `image: "images/blog/my-image.jpg"` 