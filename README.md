# 项目模板命令行工具

一个用于从模板创建新项目的命令行界面（CLI）工具。该工具允许您通过从GitHub下载模板并使用您的项目详细信息进行自定义，快速搭建一个新项目。

## 功能特点

- 项目配置的交互式提示
- 从GitHub下载模板
- 使用您的项目详细信息自定义模板
- 支持npm、pnpm和yarn包管理器
- 使用TypeScript编写，提高可维护性

## 项目地址
[pt-nestjs-cli](https://github.com/bearangel/pt-nestjs-cli)

## 安装

### 全局安装

```bash
npm install -g pt-nestjs-cli
```

或者使用yarn：

```bash
yarn global add pt-nestjs-cli
```

或者使用pnpm：

```bash
pnpm add -g pt-nestjs-cli
```

### 本地安装

```bash
npm install pt-nestjs-cli
```

## 使用方法

安装后，您可以使用以下命令运行CLI：

```bash
pt-nestjs-cli
```

CLI将提示您输入以下信息：

1. **项目名称**：您的项目名称（默认：my-project）
2. **版本**：您项目的初始版本（默认：0.1.0）
3. **描述**：项目的简短描述
4. **作者**：项目的作者
5. **包管理器**：您首选的包管理器（npm、pnpm或yarn）

提供这些信息后，CLI将：

1. 创建一个以您的项目名称命名的新目录
2. 从GitHub下载模板
3. 使用您的项目详细信息自定义package.json文件
4. 提供有关如何开始使用新项目的说明

## 开发

### 先决条件

- Node.js（v14或更高版本）
- npm、pnpm或yarn

### 设置

1. 克隆仓库：

```bash
git clone https://github.com/yourusername/pt-nestjs-cli.git
cd pt-nestjs-cli
```

2. 安装依赖：

```bash
npm install
```

3. 构建项目：

```bash
npm run build
```

4. 本地链接包进行测试：

```bash
npm link
```

### 脚本

- `npm run build`：将TypeScript编译为JavaScript
- `npm run dev`：监视更改并重新编译
- `npm start`：运行已编译的CLI
- `npm test`：运行测试

## 许可证

MIT
