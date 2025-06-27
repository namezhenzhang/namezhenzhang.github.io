// Auto-generated blog data
// This file is automatically updated by GitHub Actions
// Do not edit manually

window.BLOG_DATA = [
  {
    "id": "homepage-introduction",
    "filename": "homepage-introduction.md",
    "title": "Welcome to My Academic Homepage",
    "date": "2025-06-26",
    "formattedDate": "June 26, 2025",
    "description": "An introduction to my academic homepage - a showcase of my research journey, publications, and thoughts in computer vision and multimodal learning.",
    "tags": [
      "Homepage",
      "Academic",
      "Research",
      "Computer Vision"
    ],
    "image": "images/blog/homepage-intro.jpg",
    "content": "<h1>Welcome to My Academic Homepage</h1>\n<p>Welcome to my personal academic homepage! This site serves as a comprehensive showcase of my research journey, publications, and thoughts in the field of computer vision and multimodal learning.</p>\n<h2>What You&#39;ll Find Here</h2>\n<h3>🏠 <strong>Bio Section</strong></h3>\n<p>The homepage provides an overview of my academic background, current research interests, and career highlights. You&#39;ll find information about my education, research experience, and key achievements in computer vision and AI.</p>\n<h3>📚 <strong>Publications</strong></h3>\n<p>A curated collection of my research papers, conference presentations, and academic contributions. Each publication includes:</p>\n<ul>\n<li><strong>Abstract and key findings</strong></li>\n<li><strong>Links to papers and code repositories</strong>  </li>\n<li><strong>Conference/journal information</strong></li>\n<li><strong>Visual previews and teaser images</strong></li>\n</ul>\n<h3>📝 <strong>Blog</strong></h3>\n<p>This blog section where you can find my thoughts on:</p>\n<ul>\n<li><strong>Research insights and methodologies</strong></li>\n<li><strong>Technical tutorials and guides</strong></li>\n<li><strong>Industry trends in AI and computer vision</strong></li>\n<li><strong>Academic journey reflections</strong></li>\n</ul>\n<h2>Research Focus Areas</h2>\n<p>My research primarily focuses on:</p>\n<ul>\n<li><strong>Computer Vision</strong>: Object detection, image segmentation, and visual understanding</li>\n<li><strong>Multimodal Learning</strong>: Combining vision, language, and other modalities</li>\n<li><strong>Deep Learning</strong>: Novel architectures and training methodologies</li>\n<li><strong>Applied AI</strong>: Real-world applications of machine learning</li>\n</ul>\n<h2>How This Site Works</h2>\n<p>This homepage is built with modern web technologies and includes several key features:</p>\n<h3>🚀 <strong>Automated Blog System</strong></h3>\n<ul>\n<li>Write blog posts in <strong>Markdown format</strong></li>\n<li>Automatic processing via <strong>GitHub Actions</strong></li>\n<li><strong>Frontmatter metadata</strong> for rich post information</li>\n<li><strong>Responsive design</strong> for all devices</li>\n</ul>\n<h3>📊 <strong>Publication Management</strong></h3>\n<ul>\n<li>Structured publication database</li>\n<li><strong>Visual previews</strong> with teaser images</li>\n<li><strong>Coming soon</strong> indicators for upcoming papers</li>\n<li><strong>External links</strong> to papers and code</li>\n</ul>\n<h3>🎨 <strong>Professional Design</strong></h3>\n<ul>\n<li><strong>Clean, academic aesthetic</strong></li>\n<li><strong>Mobile-responsive layout</strong></li>\n<li><strong>Smooth animations and interactions</strong></li>\n<li><strong>Consistent typography and spacing</strong></li>\n</ul>\n<h2>Adding New Content</h2>\n<h3>For Blog Posts</h3>\n<p>Simply create a new <code>.md</code> file in the <code>blog/</code> directory with frontmatter:</p>\n<pre><code class=\"language-markdown\">---\ntitle: &quot;Your Post Title&quot;\ndate: &quot;YYYY-MM-DD&quot;\ndescription: &quot;Brief description&quot;\ntags: [&quot;Tag1&quot;, &quot;Tag2&quot;]\nimage: &quot;images/blog/your-image.jpg&quot;\n---\n\n# Your Content Here\nWrite your blog post in Markdown...\n</code></pre>\n<h3>For Publications</h3>\n<p>Update the publications database with new papers, including abstracts, links, and visual materials.</p>\n<h2>Connect With Me</h2>\n<p>Feel free to explore my work and reach out if you&#39;re interested in collaboration or have questions about my research. You can find my contact information and social media links throughout the site.</p>\n<p>Thank you for visiting, and I hope you find the content valuable for your own research journey!</p>\n<hr>\n<p><em>This homepage is continuously updated with new research, publications, and insights. Check back regularly for the latest updates!</em> </p>\n",
    "metadata": {
      "title": "Welcome to My Academic Homepage",
      "date": "2025-06-26",
      "description": "An introduction to my academic homepage - a showcase of my research journey, publications, and thoughts in computer vision and multimodal learning.",
      "tags": [
        "Homepage",
        "Academic",
        "Research",
        "Computer Vision"
      ],
      "image": "images/blog/homepage-intro.jpg"
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
