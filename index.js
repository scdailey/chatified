#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ignore = require('ignore');

const rootDir = process.cwd();
const outputFile = 'chatified.txt';

const getFilesRecursive = (dir, filelist) => {
  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory() && file !== '.git') {
      filelist = getFilesRecursive(filePath, filelist);
    } else if (file !== '.DS_Store' && !file.startsWith('.')) {
      filelist.push(filePath);
    }
  });
  return filelist;
};

const fileContents = getFilesRecursive(rootDir)
  .filter((filePath) => {
    const gitIgnorePath = path.join(rootDir, '.gitignore');
    const ignoreList = ignore().add(fs.existsSync(gitIgnorePath) ? fs.readFileSync(gitIgnorePath, 'utf8') : '').add('node_modules');
    return !ignoreList.ignores(path.relative(rootDir, filePath)) &&
      !filePath.includes('.DS_Store') &&
      !filePath.endsWith('.swap') &&
      !filePath.endsWith('.exe') &&
      !filePath.endsWith('.dll') &&
      !filePath.endsWith('.so') &&
      !filePath.endsWith('.dylib') &&
      !filePath.endsWith('.test') &&
      !filePath.endsWith('.out') &&
      !filePath.includes('/output/');
  })
  .reduce((acc, filePath) => {
    acc += `File: ${filePath}\n\n`;
    acc += `${fs.readFileSync(filePath, 'utf8')}\n\n`;
    return acc;
  }, '');

fs.writeFileSync(outputFile, `Directory tree:\n\n${printDirectoryTree(rootDir)}\n\n${fileContents}`);

function printDirectoryTree(dir, prefix = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let tree = '';
  entries.forEach((entry, index) => {
    const isLast = index === entries.length - 1;
    const indent = prefix + (isLast ? '└── ' : '├── ');
    const nextIndent = prefix + (isLast ? '    ' : '│   ');
    if (!entry.name.startsWith('.') && entry.name !== '.git') {
      tree += `${indent}${entry.name}\n`;
      if (entry.isDirectory()) {
        tree += printDirectoryTree(path.join(dir, entry.name), nextIndent);
      }
    }
  });
  return tree;
}
