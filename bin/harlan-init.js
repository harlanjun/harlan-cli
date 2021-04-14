const program = require('commander')
const chalk = require('chalk')
const ora = require('ora')
const download = require('download-git-repo')
const path = require('path')
const tempPath = path.join(__dirname, '../template.json')
const tempInfo = require(tempPath)

