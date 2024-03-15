import * as fs from 'fs';
import csvtojson from 'csvtojson';

const csvFilePath = './csv/data.csv';
const txtFilePath = './csv/data.txt';

const csvReadStream = fs.createReadStream(csvFilePath, { encoding: 'utf8' });

const txtWriteStream = fs.createWriteStream(txtFilePath, { encoding: 'utf8' });

// Convert CSV to JSON and write to TXT file line by line
csvReadStream
  .pipe(csvtojson())
  .on('data', (jsonObj) => {
    console.log(jsonObj.toString())
    const jsonStr = JSON.stringify(jsonObj) + '\n'; // Convert JSON object to string
    txtWriteStream.write(jsonStr); // Write JSON string to TXT file
  })
  .on('error', (err) => {
    console.error('Error reading CSV file:', err);
  })
  .on('end', () => {
    console.log('CSV to TXT conversion completed.');
    txtWriteStream.end(); // Close the writable stream
  });

// Log any errors that occur during writing to the TXT file
txtWriteStream.on('error', (err) => {
  console.error('Error writing to TXT file:', err);
});
