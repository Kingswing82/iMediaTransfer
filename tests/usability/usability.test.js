const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('file://' + __dirname + '/../src/index.html');

  // Test: Check if the main window elements are present
  const fileList = await page.$('#fileList');
  const transferButton = await page.$('#transferButton');
  const progressBar = await page.$('#progressBar');

  if (fileList && transferButton && progressBar) {
    console.log('Usability Test: Main window elements are present.');
  } else {
    console.log('Usability Test: Main window elements are missing.');
  }

  // Test: Connect iPhone and check if the deviceConnected message is displayed
  await page.evaluate(() => {
    connectDevice();
  });

  await page.waitForSelector('#deviceConnected', { timeout: 10000 });
  console.log('Usability Test: iPhone connected successfully.');

  // Test: Browse files and check if the fileList is updated
  await page.evaluate(() => {
    browseFiles();
  });

  await page.waitForSelector('#fileListUpdated', { timeout: 10000 });
  console.log('Usability Test: File list updated successfully.');

  // Test: Select files and initiate transfer
  await page.evaluate(() => {
    selectFiles();
    transferFiles();
  });

  await page.waitForSelector('#transferStarted', { timeout: 10000 });
  console.log('Usability Test: Transfer started successfully.');

  // Test: Check if the transfer progress is updated
  await page.waitForSelector('#transferProgress', { timeout: 10000 });
  console.log('Usability Test: Transfer progress updated successfully.');

  // Test: Check if the transfer is completed
  await page.waitForSelector('#transferCompleted', { timeout: 10000 });
  console.log('Usability Test: Transfer completed successfully.');

  await browser.close();
})();