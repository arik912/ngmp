const { execSync } = require('child_process');
const fs = require('fs');

const logFilePath = 'activityMonitor.log';

function getProcessesInfo() {
    let output;
    if (process.platform === 'win32') {
        output = execSync(`powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`).toString().trim();
    } else {
        output = execSync('ps -A -o %cpu,%mem,comm | sort -nr | head -n 1').toString().trim();
    }
    return output;
}

function appendToLogFile(info) {
    const timestamp = Math.floor(Date.now() / 1000);
    const logData = `${timestamp} : ${info}\n`;
    fs.appendFileSync(logFilePath, logData, { flag: 'a+' });
}

function displayTopProcess() {
    const processInfo = getProcessesInfo();
    process.stdout.write('\r' + processInfo); 
}

function main() {
    setInterval(displayTopProcess, 100); 

    setInterval(() => {
        const processInfo = getProcessesInfo();
        appendToLogFile(processInfo);
    }, 60000); 
}

main();
