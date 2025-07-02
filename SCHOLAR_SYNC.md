# 📚 Google Scholar 自动同步功能

这个功能可以自动从你的Google Scholar个人页面同步出版物信息到网站的`config.json`中。

## 🚀 功能特点

- ✅ **自动获取**：从Google Scholar抓取最新出版物
- ✅ **智能合并**：避免重复，只添加新出版物
- ✅ **会议识别**：自动识别CVPR、ICCV、NeurIPS等顶级会议
- ✅ **引用统计**：高引用论文自动标记为featured
- ✅ **定时运行**：每周一自动检查更新
- ✅ **手动触发**：可以随时手动运行同步

## 📋 设置步骤

### 1. 配置Scholar用户ID

在GitHub仓库中设置Secret：

1. 进入仓库 → Settings → Secrets and variables → Actions
2. 点击 "New repository secret"
3. Name: `SCHOLAR_USER_ID`
4. Value: 你的Google Scholar用户ID（例如：`j71Y2-4AAAAJ`）

**如何获取Scholar用户ID？**
- 访问你的Google Scholar个人页面
- URL中的`user=`后面的字符串就是你的用户ID
- 例如：`https://scholar.google.com/citations?user=j71Y2-4AAAAJ` 中的 `j71Y2-4AAAAJ`

### 2. 启用工作流

工作流已经创建在 `.github/workflows/sync-scholar.yml`，会自动：
- 每周一早上8点运行
- 当你修改同步脚本时运行
- 可以手动触发

## 🔧 本地测试

在推送到GitHub之前，你可以本地测试：

### Python版本（推荐）
```bash
# 安装依赖
pip install requests beautifulsoup4

# 运行同步
python test_scholar_sync.py
```

### Node.js版本
```bash
# 安装依赖
npm install puppeteer cheerio

# 设置环境变量
export SCHOLAR_USER_ID="j71Y2-4AAAAJ"

# 运行同步
node .github/scripts/sync-scholar.js
```

## 📖 工作流程

1. **检测新出版物**：从Scholar获取最新出版物列表
2. **智能解析**：识别会议/期刊类型、年份、作者等
3. **避免重复**：与现有publications比较，只添加新的
4. **更新配置**：将新出版物添加到`config.json`
5. **触发构建**：自动触发网站重新生成

## 🎯 支持的会议/期刊

自动识别的顶级会议：
- **CV**: CVPR, ICCV, ECCV, WACV, 3DV
- **ML**: NeurIPS, ICML, ICLR
- **AI**: AAAI, IJCAI
- **Preprint**: arXiv

其他会议会标记为`conference`类型。

## 🔄 手动触发同步

### 通过GitHub界面
1. 进入仓库 → Actions
2. 选择 "Sync Google Scholar Publications"
3. 点击 "Run workflow"

### 通过推送触发
修改并推送 `.github/workflows/sync-scholar.yml` 或 `.github/scripts/sync-scholar.js`

## 📝 注意事项

### 1. Scholar访问限制
- Google Scholar可能有反爬虫机制
- 如果频繁访问可能被暂时限制
- 建议不要过于频繁运行

### 2. 数据质量
- Scholar上的信息可能不完整或有误
- 同步后建议检查并手动完善：
  - 添加论文链接
  - 上传teaser图片
  - 调整会议/期刊名称
  - 标记oral/spotlight等

### 3. 现有数据
- 同步不会覆盖现有出版物
- 只会添加Scholar上有但config.json中没有的论文
- 现有论文的手动修改不会被覆盖

## 🛠️ 自定义配置

### 修改同步频率
编辑 `.github/workflows/sync-scholar.yml` 中的cron表达式：
```yaml
schedule:
  - cron: '0 8 * * 1'  # 每周一8点
  # - cron: '0 8 1 * *'  # 每月1号8点
  # - cron: '0 8 * * *'  # 每天8点
```

### 添加新会议识别
编辑 `.github/scripts/sync-scholar.js` 中的 `venueMap`：
```javascript
const venueMap = {
  'CVPR': { type: 'conference', fullName: 'CVPR' },
  'YOUR_VENUE': { type: 'conference', fullName: 'Your Venue' },
  // ...
};
```

### 调整featured标准
修改引用数阈值：
```javascript
// 如果引用数较高，标记为featured
if (pub.citations > 20) {  // 改为20
  configPub.featured = true;
}
```

## 🐛 故障排除

### 同步失败
1. 检查GitHub Actions日志
2. 验证Scholar用户ID是否正确
3. 检查Scholar页面是否可正常访问

### 数据不完整
1. Scholar页面可能加载不完整
2. 可以手动触发重新同步
3. 必要时手动补充missing信息

### 重复添加
- 脚本会根据标题判断重复
- 如果标题略有不同可能被认为是不同论文
- 可以手动删除重复项

## 📈 未来改进

- [ ] 支持更多Scholar字段（abstract、keywords等）
- [ ] 自动获取论文PDF链接
- [ ] 支持其他学术数据库（DBLP、Semantic Scholar等）
- [ ] 更智能的重复检测
- [ ] 自动生成teaser图片

---

🎉 **享受自动化的学术网站管理！** 