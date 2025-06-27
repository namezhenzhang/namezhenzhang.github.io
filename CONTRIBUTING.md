# Contributing to Config-Driven Academic Website Template

Thank you for your interest in contributing to this project! 🎉

This template was created by **Sixun Dong** to help the academic community build better websites with less effort. We welcome contributions from everyone.

## 🚀 How to Contribute

### 🐛 Bug Reports

Found a bug? Please help us fix it:

1. **Check existing issues** to avoid duplicates
2. **Create a new issue** with:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Your environment (OS, browser, etc.)
   - Screenshots if applicable

### ✨ Feature Requests

Have an idea for improvement?

1. **Check existing issues** for similar requests
2. **Open a new issue** with:
   - Clear description of the feature
   - Use cases and benefits
   - Mockups or examples if helpful

### 🔧 Code Contributions

Ready to code? Here's how:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Test thoroughly** with `python build_local.py`
5. **Commit with clear messages**: `git commit -m "Add amazing feature"`
6. **Push to your fork**: `git push origin feature/amazing-feature`
7. **Create a Pull Request**

### 📖 Documentation

Help improve our docs:

- Fix typos or unclear explanations
- Add examples and use cases
- Translate to other languages
- Create video tutorials

## 🛠️ Development Setup

### Prerequisites

- Python 3.6+ for local development
- Node.js 18+ for GitHub Actions (automatic)
- Git for version control

### Local Development

```bash
# Clone your fork
git clone https://github.com/yourusername/ironieser.github.io.git
cd ironieser.github.io

# Make changes to config.json or other files
vim config.json

# Test your changes locally
python build_local.py
python local_server.py

# Open http://localhost:8000 to preview
```

### Testing

Before submitting:

1. **Test locally**: Ensure `python build_local.py` works
2. **Validate JSON**: Check `config.json` syntax
3. **Cross-browser**: Test on different browsers
4. **Mobile-friendly**: Check responsive design

## 📋 Code Style

### JavaScript (.github/scripts/)
- Use ES6+ features
- Clear variable names
- Add comments for complex logic
- Handle errors gracefully

### Python (build_local.py)
- Follow PEP 8 style guide
- Use docstrings for functions
- Handle exceptions properly
- Clear error messages

### JSON (config.json)
- Proper indentation (2 spaces)
- Descriptive field names
- Include all required fields
- Validate syntax

### HTML/CSS
- Semantic HTML structure
- Accessible design
- Mobile-first responsive
- Clean, maintainable CSS

## 🎯 Priority Areas

We especially welcome contributions in:

### High Priority
- **Bug fixes**: Broken functionality
- **Accessibility**: WCAG compliance
- **Performance**: Faster loading times
- **Mobile**: Better responsive design

### Medium Priority
- **New sections**: CV, teaching, etc.
- **Themes**: Alternative color schemes
- **Integrations**: ORCID, Google Scholar API
- **Automation**: More GitHub Actions features

### Low Priority
- **Advanced features**: Analytics, SEO tools
- **Plugins**: Extensible architecture
- **Multi-language**: i18n support
- **Admin interface**: Web-based editor

## 🤝 Community Guidelines

### Be Respectful
- Use inclusive language
- Respect different skill levels
- Provide constructive feedback
- Help newcomers

### Be Collaborative
- Discuss major changes first
- Review others' contributions
- Share knowledge and tips
- Acknowledge others' work

### Be Patient
- Maintainers review PRs in their free time
- Complex changes take longer to review
- Ask questions if unclear
- Iterate based on feedback

## 📞 Getting Help

### Questions?
- **GitHub Discussions**: For general questions
- **Issues**: For specific problems
- **Email**: sdong46@asu.edu for direct contact

### Resources
- **Documentation**: [TEMPLATE_SYSTEM.md](TEMPLATE_SYSTEM.md)
- **GitHub Actions Guide**: [GITHUB_ACTIONS_GUIDE.md](GITHUB_ACTIONS_GUIDE.md)
- **Examples**: Check out existing implementations

## 🏆 Recognition

Contributors will be:
- Listed in the README
- Mentioned in release notes
- Given credit in documentation
- Invited to be collaborators (for regular contributors)

## 📄 License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

## 🙏 Special Thanks

This template exists because of amazing contributors like you! Every contribution, no matter how small, makes a difference for researchers worldwide.

**Ready to contribute?** Start by exploring the codebase and opening your first issue or PR! 🚀

---

*Made with ❤️ by [Sixun Dong](https://github.com/Ironieser) for the academic community* 