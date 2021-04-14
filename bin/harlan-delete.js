#!/usr/bin/env node

const inquirer = require('inquirer')
const chalk = require('chalk')
const path = require('path')
const { writeFileInfo }  = require(path.join(__dirname, '../utils/file.js'))
const tempPath = path.join(__dirname, '../template.json')
const tempInfo = require(tempPath)

const question = [
    {
        name: 'name',
        message: '请输入要删除的模版名称',
        validate(val) {
            if(val === '') {
                return 'Name is required!'
            } else if (!tempInfo[val]) {
                return 'template does not exist!'
            } else {
                return true
            }
        }
    }
]

inquirer
    .prompt(question).then(async answers => {
        let  { name } = answers
        delete tempInfo[name]
        //更新template.json
        await writeFileInfo(tempPath, JSON.stringify(tempInfo))
        console.log('\n')
        console.log(chalk.green('Deleted successfully!\n'))
        console.log(chalk.grey('The latest template list is: \n'))
        console.log(tempInfo)
        console.log('\n')
    }) 