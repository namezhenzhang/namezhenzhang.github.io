#!/usr/bin/env node

// 这是GitHub Actions构建脚本的本地版本
// 用法: node build_local.js

const fs = require('fs');
const path = require('path');

// 复制GitHub Actions的构建逻辑
const buildScript = fs.readFileSync('.github/scripts/build-website.js', 'utf-8');

// 替换路径以适应本地环境
const localScript = buildScript
  .replace("path.join(__dirname, '../../config.json')", "'config.json'")
  .replace("path.join(__dirname, '../../index.html')", "'index.html'")
  .replace("path.join(__dirname, '../../publications.html')", "'publications.html'");

// 创建临时文件并执行
const tempFile = 'temp_build.js';
fs.writeFileSync(tempFile, localScript);

console.log('🚀 Building website locally from config.json...');
try {
  require('./' + tempFile);
  console.log('\n✨ Local build completed!');
  console.log('💡 You can now run "python local_server.py" to preview changes');
} catch (error) {
  console.error('❌ Build failed:', error.message);
} finally {
  // 清理临时文件
  if (fs.existsSync(tempFile)) {
    fs.unlinkSync(tempFile);
  }
} 