# Waline 评论系统设置指南

本指南将帮助你为博客添加基于Waline的用户友好评论系统。

## 🎯 为什么选择Waline？

- ✅ **用户友好** - 支持匿名评论，无需注册
- ✅ **免费开源** - 完全免费，无广告
- ✅ **数据安全** - 评论数据完全由你控制
- ✅ **风格统一** - 完美集成到现有网站设计
- ✅ **功能丰富** - 支持Markdown、表情符号、图片上传
- ✅ **多种登录** - 支持匿名、邮箱、社交媒体登录

## 📋 前置要求

1. **Vercel账号** (免费) - 用于部署Waline服务器
2. **LeanCloud账号** (免费) - 用于数据存储 (可选，也可用其他数据库)
3. **GitHub仓库** - 用于自动化部署

## 🚀 设置步骤

### 步骤1：部署Waline服务器

#### 方法1：一键部署到Vercel (推荐)

1. 访问 [Waline官网](https://waline.js.org/guide/get-started.html)
2. 点击 **Deploy to Vercel** 按钮
3. 登录Vercel并授权GitHub
4. 选择仓库名称 (如: `my-waline-server`)
5. 配置环境变量：
   - `LEAN_ID`: LeanCloud AppID
   - `LEAN_KEY`: LeanCloud AppKey  
   - `LEAN_MASTER_KEY`: LeanCloud MasterKey

#### 方法2：使用其他数据库

Waline支持多种数据库：
- **MySQL** - 适合有自己服务器的用户
- **PostgreSQL** - 功能强大的开源数据库
- **SQLite** - 简单轻量，适合小型网站
- **MongoDB** - NoSQL数据库

### 步骤2：获取Waline服务器地址

部署完成后，你会得到一个Vercel地址，如：
```
https://your-waline-server.vercel.app
```

### 步骤3：配置LeanCloud (如果使用)

1. 注册 [LeanCloud](https://console.leancloud.app/)
2. 创建新应用
3. 进入应用设置 → 应用Keys
4. 复制 `AppID`、`AppKey`、`MasterKey`
5. 在Vercel项目设置中添加环境变量

### 步骤4：更新配置文件

编辑 `blog-comments.js` 文件，将服务器地址替换为你的Waline服务器：

```javascript
const WALINE_CONFIG = {
    serverURL: 'https://your-waline-server.vercel.app', // 替换为你的服务器地址
    path: location.pathname,
    lang: 'en', // 或 'zh-CN' 支持中文
    // 其他配置保持默认即可
};
```

### 步骤5：测试评论系统

1. 重新构建网站：`python build_local.py`
2. 启动本地服务器：`python local_server.py`
3. 打开博客文章页面
4. 确认评论区正常显示
5. 尝试匿名评论或用邮箱登录

## 🎨 样式特性

评论系统已完美集成到网站设计中：

- **统一配色** - 使用网站的CSS变量
- **响应式设计** - 在移动设备上完美显示
- **加载状态** - 优雅的加载动画
- **错误处理** - 友好的错误提示
- **暗色模式** - 自动适应系统主题

## 🔧 高级配置

### 自定义主题

如果需要自定义主题，可以修改 `GISCUS_CONFIG.theme` 选项：

- `light` - 浅色主题
- `dark` - 深色主题  
- `preferred_color_scheme` - 自动适应系统
- `transparent_dark` - 透明深色主题

### 多语言支持

修改 `GISCUS_CONFIG.lang` 支持其他语言：

- `en` - English
- `zh-CN` - 简体中文
- `zh-TW` - 繁体中文
- `ja` - 日本語

### 评论映射方式

可以修改 `GISCUS_CONFIG.mapping` 来改变评论与页面的关联方式：

- `title` - 使用页面标题
- `pathname` - 使用页面路径
- `url` - 使用完整URL
- `og:title` - 使用Open Graph标题

## 🚨 注意事项

1. **仓库必须公开** - Giscus只能在公开仓库中工作
2. **GitHub登录** - 用户需要GitHub账号才能评论
3. **首次加载** - 第一次访问可能需要几秒钟初始化
4. **数据所有权** - 所有评论数据存储在你的GitHub仓库中

## 🎉 完成！

设置完成后，你的博客将拥有：

- 💬 **功能完整的评论系统**
- 🔒 **安全的数据存储**
- 🎨 **统一的视觉设计**
- 📱 **移动端友好体验**
- ⚡ **快速加载性能**

访问你的博客文章页面，享受全新的互动体验吧！

---

如有问题，请查看 [Giscus官方文档](https://giscus.app) 或在GitHub Discussions中提问。 