// Auto-generated blog data
// This file is automatically updated by build scripts
// Do not edit manually

window.BLOG_DATA = [
  {
    "id": "introducing-config-driven-academic-website-template",
    "filename": "introducing-config-driven-academic-website-template.md",
    "title": "My Config-Driven Academic Website Template",
    "date": "2025-06-27",
    "formattedDate": "June 27, 2025",
    "description": "How I built a simple system to manage my academic website using JSON configuration and GitHub Actions.",
    "tags": [
      "Academic Website",
      "GitHub Actions",
      "Template",
      "Web Development"
    ],
    "image": "teaser/preprint.jpg",
    "content": "<h1>My Config-Driven Academic Website Template</h1>\n\n<p>I got tired of manually editing HTML files every time I wanted to update my academic website, so I built a simple system that lets me manage everything through a JSON configuration file.</p>\n\n<h2>The Problem I Had</h2>\n\n<p>Like many academics, I struggled with:</p>\n<ul>\n<li>Editing HTML files for every publication update</li>\n<li>Keeping formatting consistent across pages</li>\n<li>Worrying about breaking the layout</li>\n<li>Spending time on code instead of content</li>\n</ul>\n\n<h2>My Solution</h2>\n\n<p>I created a system where all my content lives in a single <code>config.json</code> file, and GitHub Actions automatically generates the HTML pages.</p>\n\n<h3>Before and After</h3>\n\n<p><strong>Before</strong>: Editing HTML directly</p>\n<pre><code class=\"language-html\"><div class=\"publication-item\">\n  <img src=\"teaser/my-paper.jpg\" alt=\"My Paper\">\n  <div class=\"publication-content\">\n    <p class=\"publication-title\">My Research Paper</p>\n    <!-- lots more HTML... -->\n  </div>\n</div></code></pre>\n\n<p><strong>After</strong>: Simple JSON structure</p>\n<p><pre><code class=\"language-json\">{</p>\n<p>  \"title\": \"My Research Paper\",</p>\n<p>  \"authors\": [\"Sixun Dong\", \"Collaborators\"],</p>\n<p>  \"venue\": \"CVPR 2025\",</p>\n<p>  \"image\": \"teaser/my-paper.jpg\",</p>\n<p>  \"links\": [{\"name\": \"Paper\", \"url\": \"https://...\"}]</p>\n<p>}</code></pre></p>\n\n<h2>How It Works</h2>\n\n<ol>\n<li><strong>Edit config.json</strong> with your content</li>\n<li><strong>Push to GitHub</strong> </li>\n<li><strong>GitHub Actions</strong> runs and generates HTML</li>\n<li><strong>Website updates</strong> automatically</li>\n</ol>\n\n<p>The build process uses Node.js scripts that read the JSON and generate HTML using templates.</p>\n\n<h2>Key Features</h2>\n\n<h3>Single Configuration File</h3>\n<p>Everything lives in <code>config.json</code>:</p>\n<ul>\n<li>Personal info and bio</li>\n<li>Publications by year</li>\n<li>News updates</li>\n<li>Experience and education</li>\n</ul>\n\n<h3>Automatic HTML Generation</h3>\n<p>GitHub Actions detects changes to the config and rebuilds the site automatically.</p>\n\n<h3>Blog System</h3>\n<p>Blog posts are written in Markdown with frontmatter:</p>\n<p><pre><code class=\"language-markdown\">---</p>\n<p>title: \"Post Title\"</p>\n<p>date: \"2025-01-01\"</p>\n<p>description: \"Brief description\"</p>\n<p>tags: [\"Tag1\", \"Tag2\"]</p>\n---\n\n<h1>Your content here...</h1></code></pre>\n\n<h3>Publication Management</h3>\n<p>Publications are organized by year with support for:</p>\n<ul>\n<li>Different venue types (conference, journal, under review)</li>\n<li>Featured publications that appear on homepage</li>\n<li>Multiple links (paper, code, dataset, etc.)</li>\n<li>Automatic author name highlighting</li>\n</ul>\n\n<h2>Technical Implementation</h2>\n\n<p>The system consists of:</p>\n<ul>\n<li><strong>Build scripts</strong> (Node.js) that process the JSON config</li>\n<li><strong>HTML templates</strong> for different page types</li>\n<li><strong>GitHub Actions workflow</strong> for automation</li>\n<li><strong>Simple CSS/JS</strong> for styling and interactions</li>\n</ul>\n\n<h3>Local Development</h3>\n<p>You can build and preview locally:</p>\n<p><pre><code class=\"language-bash\">python build_local.py  # Generate HTML</p>\n<p>python local_server.py # Start local server</code></pre></p>\n\n<h2>What I Learned</h2>\n\n<p>Building this taught me:</p>\n<ul>\n<li>GitHub Actions is quite powerful for automation</li>\n<li>JSON is a good format for structured academic content</li>\n<li>Simple solutions often work better than complex ones</li>\n<li>Documentation matters (I should write more)</li>\n</ul>\n\n<h2>Current Status</h2>\n\n<p>The template works well for my needs, but it's still evolving. I add features as I need them:</p>\n<ul>\n<li>✅ Basic publication management</li>\n<li>✅ Blog system with Markdown</li>\n<li>✅ Automated deployment</li>\n<li>✅ Comment system (Waline)</li>\n<li>✅ Favicon support</li>\n<li>🔄 Better mobile experience</li>\n<li>🔄 More customization options</li>\n</ul>\n\n<h2>Using This Template</h2>\n\n<p>If you want to use this for your own site:</p>\n\n<ol>\n<li><strong>Fork</strong> the repository</li>\n<li><strong>Edit</strong> <code>config.json</code> with your information</li>\n<li><strong>Enable</strong> GitHub Pages in repository settings</li>\n<li><strong>Push</strong> changes to trigger the build</li>\n</ol>\n\n<p>The source code is available on GitHub. It's not the most polished system, but it works for my needs and might be useful for others.</p>\n\n<h2>Limitations</h2>\n\n<p>This approach has some downsides:</p>\n<ul>\n<li>Requires basic Git/GitHub knowledge</li>\n<li>Limited customization without editing code</li>\n<li>Build process can be slow for large sites</li>\n<li>No real-time preview (need to push to see changes)</li>\n</ul>\n\n<h2>Future Ideas</h2>\n\n<p>Things I might add:</p>\n<ul>\n<li>Better theme customization</li>\n<li>More publication types</li>\n<li>Integration with citation managers</li>\n<li>Mobile app for quick updates</li>\n<li>Better documentation</li>\n</ul>\n\n<h2>Conclusion</h2>\n\n<p>This system solved my specific problem of maintaining an academic website without dealing with HTML. It's not perfect, but it's much easier than manually editing files.</p>\n\n<p>If you're interested in trying it out or have suggestions for improvements, feel free to check out the code or reach out.</p>\n\n---\n\n<em>This is just my personal solution to a common problem. Your mileage may vary.</em> ",
    "metadata": {
      "title": "My Config-Driven Academic Website Template",
      "date": "2025-06-27",
      "description": "How I built a simple system to manage my academic website using JSON configuration and GitHub Actions.",
      "tags": [
        "Academic Website",
        "GitHub Actions",
        "Template",
        "Web Development"
      ],
      "image": "teaser/preprint.jpg"
    }
  },
  {
    "id": "homepage-introduction",
    "filename": "homepage-introduction.md",
    "title": "Welcome to My Academic Homepage",
    "date": "2025-06-26",
    "formattedDate": "June 26, 2025",
    "description": "A brief introduction to my academic homepage and how it's organized to showcase my research work.",
    "tags": [
      "Homepage",
      "Academic",
      "Research"
    ],
    "image": "teaser/preprint.jpg",
    "content": "<h1>Welcome to My Academic Homepage</h1>\n\n<p>Welcome to my academic homepage! This site showcases my research work, publications, and thoughts on computer vision and AI.</p>\n\n<h2>What You'll Find Here</h2>\n\n<h3>🏠 <strong>About Me</strong></h3>\n<p>The main page has my current position, research interests, and recent news. I'm a PhD student at Arizona State University working on multimodal AI systems.</p>\n\n<h3>📚 <strong>Publications</strong></h3>\n<p>A collection of my research papers organized by year, including:</p>\n<ul>\n<li>Conference and journal papers</li>\n<li>Links to papers, code, and datasets</li>\n<li>Brief descriptions and visual previews</li>\n</ul>\n\n<h3>📝 <strong>Blog</strong></h3>\n<p>Occasional posts about:</p>\n<ul>\n<li>Research insights and experiences</li>\n<li>Technical notes and tutorials</li>\n<li>Thoughts on AI and computer vision</li>\n</ul>\n\n<h2>How This Site Works</h2>\n\n<p>This website is built using a config-driven approach that I developed:</p>\n\n<h3>⚙️ <strong>Configuration-Based</strong></h3>\n<ul>\n<li>All content is managed through a single <code>config.json</code> file</li>\n<li>Publications, news, and personal info are all in structured data</li>\n<li>Makes it easy to update without editing HTML</li>\n</ul>\n\n<h3>🤖 <strong>Automated Building</strong></h3>\n<ul>\n<li>GitHub Actions automatically generates HTML from the config</li>\n<li>Blog posts are written in Markdown and processed automatically</li>\n<li>Changes are deployed automatically when I push updates</li>\n</ul>\n\n<h3>🎨 <strong>Simple Design</strong></h3>\n<ul>\n<li>Clean, academic layout focused on content</li>\n<li>Responsive design that works on mobile</li>\n<li>Uses standard web technologies (HTML, CSS, JavaScript)</li>\n</ul>\n\n<h2>Technical Details</h2>\n\n<p>For those interested in the implementation:</p>\n\n<ul>\n<li><strong>Frontend</strong>: Pure HTML/CSS/JavaScript, no frameworks</li>\n<li><strong>Build Process</strong>: Node.js scripts that process JSON config</li>\n<li><strong>Hosting</strong>: GitHub Pages with custom domain</li>\n<li><strong>Blog System</strong>: Markdown files processed into HTML</li>\n<li><strong>Comments</strong>: Waline comment system for blog posts</li>\n</ul>\n\n<p>The source code is available on GitHub if you want to see how it works or use it for your own site.</p>\n\n<h2>Recent Updates</h2>\n\n<p>I regularly update the site with:</p>\n<ul>\n<li>New publications as they get accepted</li>\n<li>Research news and career updates</li>\n<li>Occasional blog posts about my work</li>\n</ul>\n\n<h2>Contact</h2>\n\n<p>Feel free to reach out if you have questions about my research or want to discuss potential collaborations. You can find my contact information on the main page.</p>\n\n---\n\n<em>This site is a work in progress and gets updated as my research evolves.</em> ",
    "metadata": {
      "title": "Welcome to My Academic Homepage",
      "date": "2025-06-26",
      "description": "A brief introduction to my academic homepage and how it's organized to showcase my research work.",
      "tags": [
        "Homepage",
        "Academic",
        "Research"
      ],
      "image": "teaser/preprint.jpg"
    }
  },
  {
    "id": "how-to-use-this-template",
    "filename": "how-to-use-this-template.md",
    "title": "How to Use This Academic Website Template",
    "date": "2025-06-25",
    "formattedDate": "June 25, 2025",
    "description": "A practical guide to using the config-driven academic website template, covering all features and customization options.",
    "tags": [
      "Tutorial",
      "Website",
      "Academic",
      "Guide"
    ],
    "image": "teaser/preprint.jpg",
    "content": "<h1>How to Use This Academic Website Template</h1>\n\n<p>This is a practical guide for using my config-driven academic website template. I'll walk through all the features and how to customize them for your needs.</p>\n\n<h2>Getting Started</h2>\n\n<h3>1. Fork the Repository</h3>\n<p>Fork <a href=\"https://github.com/Ironieser/ironieser.github.io\">this repository</a> to your GitHub account.</p>\n\n<h3>2. Enable GitHub Pages</h3>\n<ul>\n<li>Go to your repository settings</li>\n<li>Scroll down to \"Pages\" section</li>\n<li>Set source to \"Deploy from a branch\"</li>\n<li>Choose \"master\" branch</li>\n</ul>\n\n<h3>3. Edit the Configuration</h3>\n<p>The main configuration is in <code>config.json</code>. This file controls everything on your website.</p>\n\n<h2>Configuration Structure</h2>\n\n<p>The config file has several main sections:</p>\n\n<p><pre><code class=\"language-json\">{</p>\n<p>  \"personal\": { /<em> Your basic info </em>/ },</p>\n<p>  \"research\": { /<em> Research description and stats </em>/ },</p>\n<p>  \"news\": [ /<em> Recent news items </em>/ ],</p>\n<p>  \"publications\": { /<em> Papers by year </em>/ },</p>\n<p>  \"experience\": [ /<em> Work experience </em>/ ],</p>\n<p>  \"education\": [ /<em> Academic background </em>/ ],</p>\n<p>  \"service\": { /<em> Academic service </em>/ }</p>\n<p>}</code></pre></p>\n\n<h2>Personal Information</h2>\n\n<p>Update the <code>personal</code> section with your details:</p>\n\n<p><pre><code class=\"language-json\">\"personal\": {</p>\n<p>  \"name\": \"Your Name\",</p>\n<p>  \"title\": \"PhD Student in Computer Science\",</p>\n<p>  \"affiliation\": \"Your University\",</p>\n<p>  \"email\": \"your.email@university.edu\",</p>\n<p>  \"profile_image\": \"images/your-photo.jpg\",</p>\n<p>  \"cv_link\": \"files/your-cv.pdf\",</p>\n<p>  \"bio\": [</p>\n<p>    \"First paragraph about yourself...\",</p>\n<p>    \"Second paragraph with research focus...\"</p>\n<p>  ],</p>\n<p>  \"links\": [</p>\n<p>    {</p>\n<p>      \"name\": \"Email\",</p>\n<p>      \"url\": \"mailto:your.email@university.edu\",</p>\n<p>      \"icon\": \"fas fa-envelope\"</p>\n<p>    }</p>\n<p>  ]</p>\n<p>}</code></pre></p>\n\n<h3>Adding Social Links</h3>\n<p>The template supports various social platforms:</p>\n\n<p><pre><code class=\"language-json\">\"links\": [</p>\n<p>  {\"name\": \"Email\", \"url\": \"mailto:...\", \"icon\": \"fas fa-envelope\"},</p>\n<p>  {\"name\": \"Scholar\", \"url\": \"https://scholar.google.com/...\", \"icon\": \"fas fa-graduation-cap\"},</p>\n<p>  {\"name\": \"GitHub\", \"url\": \"https://github.com/...\", \"icon\": \"fab fa-github\"},</p>\n<p>  {\"name\": \"Twitter\", \"url\": \"https://twitter.com/...\", \"icon\": \"fab fa-twitter\"},</p>\n<p>  {\"name\": \"LinkedIn\", \"url\": \"https://linkedin.com/in/...\", \"icon\": \"fab fa-linkedin\"}</p>\n<p>]</code></pre></p>\n\n<h2>Publications Management</h2>\n\n<p>Publications are organized by year in the <code>publications</code> section:</p>\n\n<p><pre><code class=\"language-json\">\"publications\": {</p>\n<p>  \"2025\": [</p>\n<p>    {</p>\n<p>      \"title\": \"Your Paper Title\",</p>\n<p>      \"authors\": [\"Your Name\", \"Collaborator 1\", \"Collaborator 2\"],</p>\n<p>      \"venue\": \"CVPR 2025\",</p>\n<p>      \"venue_type\": \"conference\",</p>\n<p>      \"image\": \"teaser/your-paper.jpg\",</p>\n<p>      \"featured\": true,</p>\n<p>      \"is_oral\": false,</p>\n<p>      \"links\": [</p>\n<p>        {\"name\": \"Paper\", \"url\": \"https://arxiv.org/...\", \"icon\": \"ai ai-arxiv\"},</p>\n<p>        {\"name\": \"Code\", \"url\": \"https://github.com/...\", \"icon\": \"fab fa-github\"}</p>\n<p>      ]</p>\n<p>    }</p>\n<p>  ]</p>\n<p>}</code></pre></p>\n\n<h3>Publication Fields</h3>\n\n<ul>\n<li><code>title</code>: Paper title</li>\n<li><code>authors</code>: List of authors (your name will be highlighted automatically)</li>\n<li><code>venue</code>: Conference/journal name</li>\n<li><code>venue_type</code>: <code>\"conference\"</code>, <code>\"under-review\"</code>, <code>\"preprint\"</code>, or <code>\"working\"</code></li>\n<li><code>image</code>: Path to teaser image</li>\n<li><code>featured</code>: <code>true</code> to show on homepage (optional)</li>\n<li><code>is_oral</code>: <code>true</code> for oral presentations (optional)</li>\n<li><code>links</code>: Array of links (paper, code, dataset, etc.)</li>\n</ul>\n\n<h3>Venue Types</h3>\n\n<p>Different venue types get different styling:</p>\n<ul>\n<li><code>\"conference\"</code>: Blue badge for published papers</li>\n<li><code>\"under-review\"</code>: Gray badge for papers under review</li>\n<li><code>\"preprint\"</code>: Orange badge for preprints</li>\n<li><code>\"working\"</code>: Light blue badge for work in progress</li>\n</ul>\n\n<h3>Link Icons</h3>\n\n<p>Common link icons:</p>\n<ul>\n<li>Paper: <code>\"ai ai-arxiv\"</code> or <code>\"fas fa-file-pdf\"</code></li>\n<li>Code: <code>\"fab fa-github\"</code></li>\n<li>Dataset: <code>\"fas fa-database\"</code></li>\n<li>Video: <code>\"fab fa-youtube\"</code></li>\n<li>Website: <code>\"fas fa-globe\"</code></li>\n</ul>\n\n<h2>News Updates</h2>\n\n<p>Add recent news to the <code>news</code> array:</p>\n\n<p><pre><code class=\"language-json\">\"news\": [</p>\n<p>  {</p>\n<p>    \"date\": \"Dec 2024\",</p>\n<p>    \"content\": \"Paper accepted to <strong>CVPR 2025</strong>!\",</p>\n<p>    \"category\": \"papers\"</p>\n<p>  },</p>\n<p>  {</p>\n<p>    \"date\": \"Aug 2024\",</p>\n<p>    \"content\": \"Started PhD at Your University\",</p>\n<p>    \"category\": \"career\"</p>\n<p>  }</p>\n<p>]</code></pre></p>\n\n<p>Categories include: <code>\"papers\"</code>, <code>\"career\"</code>, <code>\"projects\"</code>, or custom categories.</p>\n\n<h2>Experience and Education</h2>\n\n<h3>Experience Section</h3>\n<p><pre><code class=\"language-json\">\"experience\": [</p>\n<p>  {</p>\n<p>    \"position\": \"Research Intern\",</p>\n<p>    \"company\": \"Company Name\",</p>\n<p>    \"period\": \"Summer 2024\",</p>\n<p>    \"description\": \"Brief description of your work...\",</p>\n<p>    \"logo\": \"images/company-logo.jpg\"</p>\n<p>  }</p>\n<p>]</code></pre></p>\n\n<h3>Education Section</h3>\n<p><pre><code class=\"language-json\">\"education\": [</p>\n<p>  {</p>\n<p>    \"degree\": \"PhD in Computer Science\",</p>\n<p>    \"institution\": \"Your University\",</p>\n<p>    \"period\": \"2024 - Present\",</p>\n<p>    \"details\": \"Focus: Computer Vision and AI\"</p>\n<p>  }</p>\n<p>]</code></pre></p>\n\n<h2>Research Description</h2>\n\n<p>Update the research section with your focus areas:</p>\n\n<p><pre><code class=\"language-json\">\"research\": {</p>\n<p>  \"description\": \"Your research description...\",</p>\n<p>  \"stats\": [</p>\n<p>    \"X+ publications\",</p>\n<p>    \"Y top-tier venues\",</p>\n<p>    \"Z oral presentations\"</p>\n<p>  ]</p>\n<p>}</code></pre></p>\n\n<h2>Images and Files</h2>\n\n<h3>Profile Image</h3>\n<ul>\n<li>Add your photo to <code>images/</code> directory</li>\n<li>Update <code>profile_image</code> path in config</li>\n<li>Recommended: Square image, at least 400x400px</li>\n</ul>\n\n<h3>Publication Teasers</h3>\n<ul>\n<li>Store teaser images in <code>teaser/</code> directory</li>\n<li>Use descriptive names: <code>teaser/your-paper-name.jpg</code></li>\n<li>Recommended: 16:9 aspect ratio, around 800x450px</li>\n</ul>\n\n<h3>CV and Documents</h3>\n<ul>\n<li>Store PDFs in <code>files/</code> directory</li>\n<li>Update <code>cv_link</code> path in config</li>\n</ul>\n\n<h2>Blog Posts</h2>\n\n<p>Create blog posts in the <code>blog/</code> directory:</p>\n\n<ol>\n<li>Create a new <code>.md</code> file</li>\n<li>Add frontmatter metadata</li>\n<li>Write content in Markdown</li>\n</ol>\n\n<p>Example:</p>\n<p><pre><code class=\"language-markdown\">---</p>\n<p>title: \"My Research Experience\"</p>\n<p>date: \"2025-01-01\"</p>\n<p>description: \"Reflections on my PhD journey\"</p>\n<p>tags: [\"Research\", \"PhD\"]</p>\n<p>image: \"teaser/preprint.jpg\"</p>\n---\n\n<h1>My Research Experience</h1>\n\n<p>Your blog content here...</code></pre></p>\n\n<h2>Customization</h2>\n\n<h3>Colors and Styling</h3>\n<ul>\n<li>Main styles are in <code>styles.css</code></li>\n<li>Blog styles in <code>blog.css</code></li>\n<li>Modify CSS variables for color themes</li>\n</ul>\n\n<h3>Adding New Sections</h3>\n<ul>\n<li>Edit the build scripts in <code>.github/scripts/</code></li>\n<li>Add new sections to <code>config.json</code></li>\n<li>Update HTML templates as needed</li>\n</ul>\n\n<h2>Local Development</h2>\n\n<h3>Build Locally</h3>\n<pre><code class=\"language-bash\">python build_local.py</code></pre>\n\n<h3>Preview Locally</h3>\n<pre><code class=\"language-bash\">python local_server.py</code></pre>\n<p>Then visit <code>http://localhost:8000</code></p>\n\n<h2>Deployment</h2>\n\n<p>The site deploys automatically when you push changes to GitHub. The process:</p>\n\n<ol>\n<li>GitHub Actions detects changes to <code>config.json</code> or blog files</li>\n<li>Runs build scripts to generate HTML</li>\n<li>Commits generated files back to repository</li>\n<li>GitHub Pages serves the updated site</li>\n</ol>\n\n<h2>Tips and Best Practices</h2>\n\n<h3>Publication Management</h3>\n<ul>\n<li>Keep publication images consistent in size and style</li>\n<li>Use descriptive filenames for easy organization</li>\n<li>Update featured publications to highlight your best work</li>\n</ul>\n\n<h3>Content Updates</h3>\n<ul>\n<li>Update news regularly to keep the site fresh</li>\n<li>Write blog posts about your research journey</li>\n<li>Keep your CV and contact information current</li>\n</ul>\n\n<h3>Performance</h3>\n<ul>\n<li>Optimize images before uploading</li>\n<li>Keep the config file organized and well-formatted</li>\n<li>Use meaningful commit messages for changes</li>\n</ul>\n\n<h2>Troubleshooting</h2>\n\n<h3>Common Issues</h3>\n\n<strong>Site not updating after changes:</strong>\n<ul>\n<li>Check GitHub Actions tab for build errors</li>\n<li>Ensure <code>config.json</code> has valid JSON syntax</li>\n<li>Wait a few minutes for deployment</li>\n</ul>\n\n<strong>Images not showing:</strong>\n<ul>\n<li>Check file paths in config</li>\n<li>Ensure images are committed to repository</li>\n<li>Use relative paths from website root</li>\n</ul>\n\n<strong>Build errors:</strong>\n<ul>\n<li>Check GitHub Actions logs</li>\n<li>Validate JSON syntax</li>\n<li>Ensure all required fields are present</li>\n</ul>\n\n<h2>Getting Help</h2>\n\n<p>If you run into issues:</p>\n<ul>\n<li>Check the repository's Issues tab</li>\n<li>Look at the build logs in GitHub Actions</li>\n<li>Make sure your config follows the examples</li>\n</ul>\n\n<p>This template is designed to be simple and practical. Start with the basics and gradually add more features as you need them.</p>\n\n---\n\n<em>This guide covers the main features. Feel free to explore the code and customize it further for your specific needs.</em> ",
    "metadata": {
      "title": "How to Use This Academic Website Template",
      "date": "2025-06-25",
      "description": "A practical guide to using the config-driven academic website template, covering all features and customization options.",
      "tags": [
        "Tutorial",
        "Website",
        "Academic",
        "Guide"
      ],
      "image": "teaser/preprint.jpg"
    }
  },
  {
    "id": "mamba-evolution-transformers-ssm",
    "filename": "mamba-evolution-transformers-ssm.md",
    "title": "The Evolution from Mamba to Efficient Recurrent Transformers and SSM (S4)",
    "date": "2024-03-01",
    "formattedDate": "March 01, 2024",
    "description": "This article documents my research work on improving the modeling capabilities of long sequence tasks, primarily covering methods to reduce Transformer complexity to linear complexity, SSM-related work, and explorations in multimodal systems.",
    "tags": [
      "Deep Learning",
      "Transformers",
      "State Space Models"
    ],
    "image": "images/blog/mamba.webp",
    "content": "<h1>The Evolution from Mamba to Efficient Recurrent Transformers and SSM (S4)</h1>\n\n<p>This article documents my survey on improving the modeling capabilities of long sequence tasks, primarily covering methods to reduce Transformer complexity to linear complexity, SSM-related work, and explorations in multimodal systems.</p>\n\n<h2>Article Overview</h2>\n\n<p>In this comprehensive article, I explore:</p>\n\n<ul>\n<li><strong>Linear Complexity Transformers</strong>: Methods to reduce the quadratic complexity of traditional Transformers to linear complexity</li>\n<li><strong>State Space Models (SSM)</strong>: Deep dive into S4 and related architectures</li>\n<li><strong>Mamba Architecture</strong>: Analysis of the latest developments in efficient sequence modeling</li>\n<li><strong>Multimodal Applications</strong>: How these techniques apply to multimodal AI systems</li>\n</ul>\n\n<h2>Key Topics Covered</h2>\n\n<ol>\n<li><strong>Efficient Attention Mechanisms</strong></li>\n<ul>\n</ol>\n<li>Linear attention variants</li>\n<li>Sparse attention patterns</li>\n<li>Low-rank approximations</li>\n</ul>\n\n<ol>\n<li><strong>State Space Models</strong></li>\n<ul>\n</ol>\n<li>Structured State Space (S4) models</li>\n<li>Diagonal State Space (DSS) models</li>\n<li>Connections to RNNs and CNNs</li>\n</ul>\n\n<ol>\n<li><strong>Mamba and Recent Advances</strong></li>\n<ul>\n</ol>\n<li>Selective state spaces</li>\n<li>Hardware-efficient implementations</li>\n<li>Performance comparisons</li>\n</ul>\n\n<ol>\n<li><strong>Practical Applications</strong></li>\n<ul>\n</ol>\n<li>Long sequence modeling</li>\n<li>Multimodal fusion</li>\n<li>Real-world deployment considerations</li>\n</ul>\n\n---\n\n<strong>📖 Read the full article on Zhihu:</strong> <a href=\"https://zhuanlan.zhihu.com/p/684454735\">The Evolution from Mamba to Efficient Recurrent Transformers and SSM (S4)</a>\n\n<p>This article is written in Chinese and provides detailed technical analysis with code examples and experimental results. </p>",
    "isExternal": true,
    "externalUrl": "https://zhuanlan.zhihu.com/p/684454735",
    "platform": "Zhihu",
    "metadata": {
      "title": "The Evolution from Mamba to Efficient Recurrent Transformers and SSM (S4)",
      "date": "2024-03-01",
      "description": "This article documents my research work on improving the modeling capabilities of long sequence tasks, primarily covering methods to reduce Transformer complexity to linear complexity, SSM-related work, and explorations in multimodal systems.",
      "tags": [
        "Deep Learning",
        "Transformers",
        "State Space Models"
      ],
      "image": "images/blog/mamba.webp",
      "external": true,
      "externalUrl": "https://zhuanlan.zhihu.com/p/684454735",
      "platform": "Zhihu"
    }
  }
];

// Helper function to get blog post by ID
window.getBlogPost = function(id) {
  return window.BLOG_DATA.find(post => post.id === id);
};

// Helper function to get all blog posts
window.getAllBlogPosts = function() {
  return window.BLOG_DATA;
};

console.log('Blog data loaded: ' + window.BLOG_DATA.length + ' posts');
