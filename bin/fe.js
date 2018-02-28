#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const program = require('commander');
const common = require('./common');
const init = require('./init');
const { message } = common;
function paramsToObj (paramsArr) {
    const params = {};
    paramsArr.forEach(item => {
        const kv = item.split('=')
        const key = kv[0]
        const value = kv[1] || kv[0]
        params[key] = value
    })
    return params;
}
if (process.argv.slice(2).join('') === '-v') {
    const pkg = require('../package');
    message.info(pkg.version);
    process.exit()
}

program
    .command('init [name]')
    .alias('i')
    .description('init a new project')
    .action(function (name) {
        const projectName = name || 'myApp';
        init({ app: projectName })
    });
program
    .command('nodeSever [name]')
    .alias('ns')
    .description('create a node server')
    .action(function (name) {
        console.log("===================")
        console.log(name)
    });

program.parse(process.argv);
const cmd = process.argv[2];
if (!['nodeServer', 'ns', 'init', 'i'].includes(cmd)) {
    program.help();
}