#!/usr/bin/env node
//交互式命令行
const inquirer = require('inquirer')
//修改控制台字符串的样式
const chalk = require('chalk')
// node内置文件模块
const path = require('path')

const { writeFileInfo }  = require(path.join(__dirname, '../utils/file.js'))
// 读取根目录下的template.json
const tempPath = path.join(__dirname, '../template.json')
const tempInfo = require(tempPath)

//自定义交互式命令行的问题和简单的校验
const question = [
    {
        name: 'name',
        type: 'input',
        message: '请输入模版名称',
        validate(val) {
            if(val === '') {
                return 'Name is required'
            } else if(tempInfo[val]) {
                return 'template has already existed!'
            } else {
                return true
            }
        }
    },
    {
        name: 'url',
        type: 'input',
        message: '请输入模版地址',
        validate(val) {
            if(val==='') return 'The url is required!'
            return true
        }
    }
]

inquirer
    .prompt(question).then(async answers => {
        let { name, url } = answers;
        //过滤unicode字符
        tempInfo[name] = url.replace(/[\u0000-\u0019]/g, '')
        console.log(name, url);
        //模版写入文件
        await writeFileInfo(tempPath, JSON.stringify(tempInfo))
        console.log('\n')
        console.log(chalk.green('Added successfully!\n'))
        console.log(chalk.grey('The latest template list is: \n'))
        console.log(tempInfo)
        console.log('\n')
    })
