import * as fs from 'fs';
import csvtojson from 'csvtojson';

const csvFilePath = './csv/data.csv';
const txtFilePath = './csv/data.txt';

const csvReadStream = fs.createReadStream(csvFilePath, { encoding: 'utf8' });

const txtWriteStream = fs.createWriteStream(txtFilePath, { encoding: 'utf8' });

csvReadStream
  .pipe(csvtojson())
  .on('data', (jsonObj) => {
    const jsonStr = JSON.stringify(jsonObj.toString()) + '\n'; // ask on QA session about buffer to string ???
    txtWriteStream.write(jsonStr); 
  })
  .on('error', (err) => {
    console.error('Error reading CSV file:', err);
  })
  .on('end', () => {
    console.log('CSV to TXT conversion completed.');
    txtWriteStream.end(); 
  });

txtWriteStream.on('error', (err) => {
  console.error('Error writing to TXT file:', err);
});
