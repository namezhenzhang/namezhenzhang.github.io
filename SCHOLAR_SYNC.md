# Google Scholar Auto-Sync System

## 概述

这是一个自动同步Google Scholar出版物到学术网站的系统，支持智能重复检测、年份识别和手动编辑保护。

## 核心特性

### 🧠 智能重复检测
多策略重复检测系统，避免添加已存在的论文：

1. **精确标题匹配**：完全相同的标题
2. **相似标题匹配**：去除标点符号后的匹配
3. **核心词汇匹配**：85%以上重要词汇相同
4. **作者+关键词匹配**：共同作者+标题重叠检测
5. **Survey论文特殊处理**：更严格的70%重叠阈值，避免不同survey被误判为重复

### 📅 智能年份检测
多源年份信息，确保论文被正确分类到年份章节：

**优先级顺序：**
1. **arXiv URL年份**（最准确）：从 `arxiv.org/abs/YYMM.NNNNN` 提取
2. **Venue年份**：从会议/期刊名称中提取
3. **Scholar年份**：Google Scholar提供的年份
4. **当前年份**：作为最后的备选

**arXiv年份提取规则：**
- 新格式 (2007年4月后): `YYMM.NNNNN` → `20YY`年
- 旧格式 (2007年4月前): `subject-class/YYMM` → `19YY`或`20YY`年

### 🔒 手动编辑保护
保护用户的手动修改，只在必要时更新：

1. **`auto_sync: false`**：完全保护，不进行任何自动更新
2. **Featured状态**：基于引用数自动设置（>10引用）
3. **Venue信息**：只在明显是默认值时更新
4. **论文链接**：只在是占位符时更新
5. **Teaser图片**：手动维护的论文保持自定义图片，自动同步的使用`teaser/preprint.jpg`

### 🎯 智能Venue识别
自动识别顶级会议和期刊：

**顶级会议：** CVPR, ICCV, ECCV, NeurIPS, ICML, ICLR, AAAI, IJCAI, ACL, EMNLP, NAACL, ICASSP, INTERSPEECH, CHI, UIST, SIGGRAPH, SIGIR, KDD, WWW, WSDM, CIKM, SIGMOD, VLDB, ICDE, OSDI, SOSP, NSDI, ATC, EuroSys, PLDI, POPL, OOPSLA, ICSE, FSE, ASE, ISSTA, CCS, USENIX Security, NDSS, Oakland, CRYPTO, EUROCRYPT, ASIACRYPT

**顶级期刊：** Nature, Science, Cell, PAMI, IJCV, TIP, TMM, TNNLS, JMLR, MLJ, AIJ, CACM, TOCS, TODS, TKDE, VLDBJ, TISSEC, TIFS, TC, TPDS, TSE, TOSEM, TOPLAS

## 文件结构

```
.github/
├── workflows/
│   └── sync-scholar.yml          # GitHub Actions自动同步工作流
└── scripts/
    └── sync-scholar.js           # JavaScript同步脚本
test_scholar_sync.py              # Python测试脚本
SCHOLAR_SYNC.md                   # 本文档
```

## 使用方法

### 自动同步（推荐）
GitHub Actions每周日自动运行同步，无需手动操作。

### 手动测试
```bash
# 安装依赖
pip install beautifulsoup4 requests

# 运行测试同步
python test_scholar_sync.py
```

## 配置说明

### 自动同步的论文格式
```json
{
  "title": "Paper Title",
  "authors": ["Author 1", "Author 2"],
  "venue": "Conference/Journal Name",
  "venue_type": "conference/journal/preprint",
  "image": "teaser/preprint.jpg",
  "auto_sync": true,
  "links": [
    {
      "name": "Paper",
      "url": "#",
      "icon": "ai ai-arxiv"
    }
  ]
}
```

### 手动维护的论文
- 移除或设置 `"auto_sync": false`
- 使用自定义teaser图片路径
- 添加完整的链接信息

## 工作流程

1. **获取Scholar数据**：爬取Google Scholar个人页面
2. **智能年份检测**：多源年份信息确定正确年份
3. **解析Venue信息**：识别会议/期刊类型和名称
4. **跨年份重复检测**：防止重复添加已存在论文
5. **保护手动编辑**：只更新明确的默认值
6. **生成配置更新**：添加新论文到对应年份

## 重复检测日志示例

```
🔍 Found exact title match: "Paper Title"
📝 Survey papers with similar authors but different topics: "Survey A..." vs "Survey B..." (overlap ratio: 0.31)
🔍 Found author+title match: "Paper A" vs "Paper B" (common authors: 4, title overlap: 6)
```

## 年份检测日志示例

```
📅 Using arXiv year 2024 for 'Paper from arXiv...'
📅 Using venue year 2023 for 'Conference paper...'
📅 Using Scholar year 2022 for 'Journal paper...'
⚠️  No reliable year found for 'Old paper...', using current year 2025
```

## 注意事项

1. **Scholar访问限制**：频繁访问可能被限制，建议使用自动化工作流
2. **手动验证**：自动同步后建议检查新添加的论文信息
3. **链接更新**：自动同步只提供占位符链接，需要手动添加真实链接
4. **图片管理**：自动同步使用统一的preprint图片，重要论文建议使用自定义图片

## 故障排除

### 常见问题
1. **论文被错误识别为重复**：检查标题相似度和作者重叠
2. **年份分类错误**：检查arXiv链接格式和venue信息
3. **手动编辑被覆盖**：确保设置了`"auto_sync": false`

### 调试方法
运行测试脚本查看详细日志：
```bash
python test_scholar_sync.py
```

## 更新日志

### v3.0 (2025-01-27)
- ✨ 新增智能年份检测（arXiv URL优先）
- 🔧 改进Survey论文重复检测（70%重叠阈值）
- 📝 增强日志输出，显示检测过程

### v2.0 (2025-01-26)
- 🔒 添加手动编辑保护机制
- 🎯 智能Venue识别和分类
- 🖼️ 智能teaser图片管理

### v1.0 (2025-01-25)
- 🚀 基础Google Scholar同步功能
- 🔍 多策略重复检测系统
- ⚙️ GitHub Actions自动化工作流 