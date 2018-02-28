const fs = require('fs-extra');
const chalk = require('chalk');
const {basename, join} = require('path');
const readline = require('readline');
const download = require('download-git-repo');
const ora = require('ora');
const vfs = require('vinyl-fs');
const map = require('map-stream');

const common = require('./common');
const {message, write} = common;

const template = 'ithack/vue-verify';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


function copyLog(file, cb) {
    message.success(file.path);
    cb(null, file);
}

function initComplete(app) {
    message.success(`Success! Created ${app} project complete!`);
    message.light(`begin by typing:
    cd ${app}
    npm start
    
    `)
    process.exit();
}

function createProject(dest,boilerplatePath) {
    const spinner = ora('downloading template')
    spinner.start()
    console.log('--------------')
    console.log(boilerplatePath)
    console.log(fs.existsSync(boilerplatePath))
    if (fs.existsSync(boilerplatePath)) fs.emptyDirSync(boilerplatePath)
    console.log(boilerplatePath)
    download(template, boilerplatePath, function (err) {
        spinner.stop()
        if (err) {
            console.log(err)
            process.exit()
        }
        /*fs
            .ensureDir(dest)
            .then(() => {
                vfs
                    .src(['**!/!*', '!node_modules/!**!/!*'], {
                        cwd: boilerplatePath,
                        cwdbase: true,
                        dot: true,
                    })
                    .pipe(map(copyLog))
                    .pipe(vfs.dest(dest))
                    .on('end', function() {
                        const app = basename(dest);
                        const configPath = `${dest}/config.json`;
                        const configFile = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
                        configFile.dist = `../build/${app}`;
                        configFile.title = app;
                        configFile.description = `${app}-project`;
                        write(configPath, JSON.stringify(configFile, null, 2));
                        message.info('run install packages');
                        require('./install')({
                            success: initComplete.bind(null, app),
                            cwd: dest,
                        });
                    })
                    .resume();
            })
            .catch(err => {
                console.log(err);
                process.exit();
            });*/
        process.exit();
    })
}

function init({app}) {
    const dest = process.cwd();
    const appDir = join(dest, `./${app}`);
    console.log('================')
    console.log(appDir)
    console.log(`${app}`)
    const boilerplatePath = join(dest, `./${app}`);
    console.log("1:"+boilerplatePath)
    if (fs.existsSync(appDir)) {
        console.log("*************************")
        rl.question(
            chalk.blue(`${app} dir exist! Do you want clear this dir? (Y/N)`),
            str => {
                const answer = str && str.trim().toUpperCase();
                if (answer === 'Y') {
                    const spinner = ora(`remove ${app} dir`).start();
                    fs
                        .emptyDir(appDir)
                        .then(() => {
                            spinner.stop();
                            createProject(appDir);
                        })
                        .catch(err => {
                            console.error(err);
                        });
                } else if (answer === 'N') {
                    process.exit();
                }
            }
        );
    } else {
        createProject(appDir,boilerplatePath);
    }
}

module.exports = init;