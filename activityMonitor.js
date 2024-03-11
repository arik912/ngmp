const { execSync } = require('child_process');
const fs = require('fs');

const logFilePath = 'activityMonitor.log';
const refreshRate = Number(process.argv[2])||100;
const refreshRateForFile = Number(process.argv[3])||60000


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
  const truncatedOutput = processInfo.slice(0, process.stdout.columns);
  process.stdout.write('\r' + truncatedOutput.padEnd(process.stdout.columns - 1));
}

function main() {
    setInterval(displayTopProcess, refreshRate); 

    setInterval(() => {
        const processInfo = getProcessesInfo();
        appendToLogFile(processInfo);
    }, refreshRateForFile); 
}

main();
