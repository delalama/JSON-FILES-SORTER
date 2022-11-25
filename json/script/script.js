'use strict';
const Os = require('os');
const fs = require('fs');
var myJsonAbc = require("jsonabc");
const path = require("path"); // sort object


function readSortAndWriteJsonFile(pathToFile) {
    let rawdata = fs.readFileSync(pathToFile);
    console.log('OPEN OK ');
    let student = JSON.parse(rawdata);
    console.log('PARSING OK ');
    var sorted = myJsonAbc.sortObj(student);
    console.log('SORTING OK ');

    var stringified = JSON.stringify(sorted, null, 4)
    console.log('READABILITYFY OK');

    fs.writeFileSync(pathToFile, stringified);
    console.log('WRITE OK');
}


var IS_LINUX_OS = Os.platform() === 'linux';
var pathJoiner;
if (IS_LINUX_OS) {
    pathJoiner = '/';
} else {
    pathJoiner = '\\';
}

function logFiles(files) {
    console.log("********   FOUND " + files.length + " file/s:")
    files.forEach(f => console.log('- ' + f));
}

function readAllFilesFromPath(filesPath) {
    const directoryPath = path.join(__dirname, filesPath);
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        logFiles(files);
        files.forEach(function (file) {

            let fullPath = filesPath + pathJoiner + file;

            console.log('    ');
            console.log('-- File:' + file + ' --');

            readSortAndWriteJsonFile(fullPath);
        });
    });
}

readAllFilesFromPath('../jsonPath');
console.log('TASK DONE');

