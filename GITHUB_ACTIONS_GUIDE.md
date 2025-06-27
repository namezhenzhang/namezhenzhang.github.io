# GitHub Actions Template System Guide

Your academic website now uses **GitHub Actions** for automatic content generation! This means you can update your website by simply editing a JSON file and pushing to GitHub.

## 🎯 How It Works

1. **You edit** `config.json` with your content
2. **GitHub Actions detects** the change when you push
3. **Automated script** generates new HTML files
4. **Website updates** automatically on GitHub Pages

## 🚀 Quick Demo: Adding a New Publication

Let's add a new publication to demonstrate the system:

### Step 1: Edit config.json

Add this publication to your `config.json` under the `"2025"` section:

```json
{
  "title": "My Awesome New Research Paper",
  "authors": ["John Doe", "Sixun Dong", "Jane Smith"], 
  "venue": "CVPR 2025",
  "venue_type": "conference",
  "image": "teaser/new-paper.jpg",
  "is_oral": false,
  "links": [
    {
      "name": "Paper",
      "url": "https://arxiv.org/abs/2501.00000",
      "icon": "ai ai-arxiv"
    },
    {
      "name": "Code",
      "url": "https://github.com/yourusername/new-paper",
      "icon": "fab fa-github"
    }
  ]
}
```

### Step 2: Commit and Push

```bash
git add config.json
git commit -m "Add new CVPR 2025 paper"
git push
```

### Step 3: Watch the Magic! ✨

1. Go to your repository's **Actions** tab
2. You'll see a new workflow run called "Build Website from Config"
3. Watch it build your website automatically
4. In 1-2 minutes, your website will show the new publication!

## 📝 Available Venue Types

- `"conference"` - Regular conference/journal (blue badge)
- `"under-review"` - Under review (gray badge)  
- `"working"` - Work in progress (light blue badge)

## 🔗 Supported Link Types

```json
"links": [
  {"name": "Paper", "url": "...", "icon": "ai ai-arxiv"},
  {"name": "Code", "url": "...", "icon": "fab fa-github"},
  {"name": "Dataset", "url": "...", "icon": "fas fa-database"},
  {"name": "Video", "url": "...", "icon": "fab fa-youtube"},
  {"name": "Demo", "url": "...", "icon": "fas fa-play-circle"},
  {"name": "Project", "url": "...", "icon": "fas fa-link"}
]
```

## 🛠️ Troubleshooting

### Build Failed?

1. **Check Actions Tab**: Go to your repo → Actions → latest workflow run
2. **View Logs**: Click on the failed run to see error details
3. **Common Issues**:
   - JSON syntax errors (missing commas, quotes)
   - Invalid characters in JSON
   - Missing required fields

### JSON Validation

Use [JSONLint](https://jsonlint.com/) to validate your `config.json` before pushing.

### Testing Locally

Want to test before pushing? Use the Python script:

```bash
# Install dependencies (one time only)
conda activate vlm  # or your preferred environment
pip install -r requirements.txt

# Test the build
python local_server.py
```

## 🎯 Pro Tips

- **Small commits**: Make one change at a time for easier debugging
- **Descriptive messages**: Use clear commit messages like "Add CVPR 2025 paper"
- **Check Actions**: Always check the Actions tab after pushing
- **Image paths**: Make sure image paths in config match actual files

## 🚀 What's Next?

- Edit your bio in `config.json`
- Add more publications
- Update your experience section
- Customize social links

The system handles everything else automatically! 🎉 