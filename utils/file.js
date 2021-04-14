const fs = require('fs')
const path = require('path')
const util = require("util")

/**
 * 
 * @param {*} filePath 文件路径
 * @returns promise
 */
async function readFileInfo(filePath) {
    const readFile = util.promisify(fs.readFile);
    try {
        const fr = await readFile(filePath,"utf-8");
        return fr;
    } catch (err) {
        console.log('Error', err);
    }    
}

/**
 * 
 * @param {*} filePath 写入文件路径
 * @param {*} content 被写入的内容
 * @returns promise
 */
async function writeFileInfo(filePath, content) {
    const writeFile = util.promisify(fs.writeFile);
    try {
        const fr = await writeFile(filePath, content);
        return fr;
    } catch (err) {
        console.log('Error', err);
    }    
}

async function handleFile(readFileURL, writeFilePathList) {
    let content = null;
    await readFileInfo(readFileURL).then(res => {
        content = res;
    }, ()=>{})
    if(content) {
        for(let path of writeFilePathList) {
            writeFileInfo(path, content)
        }
    }  
}

function getFilePath(path, fileName) {
    const dirList = fs.readdirSync(path);
    for (var i = 0; i < dirList.length; i++) {
        var item = dirList[i];
        if (fs.statSync(path + '/' + item).isDirectory()) {
            if (item == fileName) {
                return path + '/' + item;
            } else {
                var j = getFilePath(path + '/' + item, fileName);
                if (j) {
                    return j;
                } else {
                    continue;
                }
            }
        } else if (fs.statSync(path + '/' + item).isFile()) {
            if (item == fileName) {
                return path + '/' + item;
            }
        }
    }
}

module.exports = {
    readFileInfo,
    writeFileInfo
}
