#!/usr/bin/env python3
"""
测试GitHub Actions Scholar同步功能
"""

import json
import subprocess
import os
import sys

def test_config_syntax():
    """测试config.json语法是否正确"""
    print("🔍 Testing config.json syntax...")
    try:
        with open('config.json', 'r', encoding='utf-8') as f:
            config = json.load(f)
        print("✅ config.json syntax is valid")
        return True
    except json.JSONDecodeError as e:
        print(f"❌ config.json syntax error: {e}")
        return False
    except FileNotFoundError:
        print("❌ config.json not found")
        return False

def test_scholar_script_exists():
    """测试Scholar同步脚本是否存在"""
    print("🔍 Testing Scholar sync script...")
    script_path = '.github/scripts/sync-scholar.js'
    if os.path.exists(script_path):
        print("✅ Scholar sync script exists")
        return True
    else:
        print(f"❌ Scholar sync script not found: {script_path}")
        return False

def test_workflow_files():
    """测试GitHub Actions工作流文件"""
    print("🔍 Testing GitHub Actions workflows...")
    
    workflows = [
        '.github/workflows/sync-scholar.yml',
        '.github/workflows/build-website.yml'
    ]
    
    all_exist = True
    for workflow in workflows:
        if os.path.exists(workflow):
            print(f"✅ {workflow} exists")
        else:
            print(f"❌ {workflow} not found")
            all_exist = False
    
    return all_exist

def test_duplicate_publications():
    """检查是否还有重复的论文"""
    print("🔍 Testing for duplicate publications...")
    
    try:
        with open('config.json', 'r', encoding='utf-8') as f:
            config = json.load(f)
        
        all_pubs = []
        for year, pubs in config.get('publications', {}).items():
            if isinstance(pubs, list):
                for pub in pubs:
                    all_pubs.append(pub.get('title', '').lower().strip())
        
        # 检查重复标题
        seen = set()
        duplicates = []
        for title in all_pubs:
            if title in seen:
                duplicates.append(title)
            else:
                seen.add(title)
        
        if duplicates:
            print(f"❌ Found {len(duplicates)} duplicate publications:")
            for dup in duplicates[:5]:  # 只显示前5个
                print(f"   - {dup[:60]}...")
            return False
        else:
            print("✅ No duplicate publications found")
            return True
            
    except Exception as e:
        print(f"❌ Error checking duplicates: {e}")
        return False

def test_scholar_user_id():
    """测试Scholar用户ID配置"""
    print("🔍 Testing Scholar User ID configuration...")
    
    # 检查环境变量
    scholar_id = os.environ.get('SCHOLAR_USER_ID')
    if scholar_id:
        print(f"✅ SCHOLAR_USER_ID found in environment: {scholar_id}")
        return True
    else:
        print("⚠️  SCHOLAR_USER_ID not set in environment (will use default)")
        print("   To set it: export SCHOLAR_USER_ID=your_scholar_id")
        return True  # 不是错误，有默认值

def test_node_dependencies():
    """测试Node.js依赖"""
    print("🔍 Testing Node.js dependencies...")
    
    try:
        # 检查是否有node
        result = subprocess.run(['node', '--version'], 
                              capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ Node.js version: {result.stdout.strip()}")
        else:
            print("❌ Node.js not found")
            return False
        
        # 检查npm
        result = subprocess.run(['npm', '--version'], 
                              capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ npm version: {result.stdout.strip()}")
        else:
            print("❌ npm not found")
            return False
            
        return True
        
    except FileNotFoundError:
        print("❌ Node.js/npm not found in PATH")
        return False

def test_permissions():
    """测试文件权限"""
    print("🔍 Testing file permissions...")
    
    files_to_check = [
        'config.json',
        '.github/scripts/sync-scholar.js',
        '.github/workflows/sync-scholar.yml'
    ]
    
    all_readable = True
    for file_path in files_to_check:
        if os.path.exists(file_path) and os.access(file_path, os.R_OK):
            print(f"✅ {file_path} is readable")
        else:
            print(f"❌ {file_path} is not readable or doesn't exist")
            all_readable = False
    
    return all_readable

def main():
    """运行所有测试"""
    print("🚀 Testing GitHub Actions Scholar Sync Setup")
    print("=" * 50)
    
    tests = [
        ("Config JSON Syntax", test_config_syntax),
        ("Scholar Script Exists", test_scholar_script_exists),
        ("Workflow Files", test_workflow_files),
        ("Duplicate Publications", test_duplicate_publications),
        ("Scholar User ID", test_scholar_user_id),
        ("Node.js Dependencies", test_node_dependencies),
        ("File Permissions", test_permissions),
    ]
    
    passed = 0
    total = len(tests)
    
    for test_name, test_func in tests:
        print(f"\n📋 {test_name}")
        print("-" * 30)
        if test_func():
            passed += 1
        else:
            print(f"💥 {test_name} failed!")
    
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! GitHub Actions Scholar sync should work correctly.")
        print("\n📝 Next steps:")
        print("1. Make sure SCHOLAR_USER_ID is set in GitHub Secrets")
        print("2. Push changes to trigger the workflow")
        print("3. Check GitHub Actions tab for execution logs")
        return 0
    else:
        print("❌ Some tests failed. Please fix the issues before deploying.")
        return 1

if __name__ == "__main__":
    sys.exit(main()) 