const mongoose = require('mongoose');
const { Builder, By, until } = require('selenium-webdriver'); // Selenium WebDriver'ı ekleyin
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');

let server;

// MongoDB'ye bağlan
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');

  // Sunucuyu başlat
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);

    // Selenium'a bağlan
    connectToSelenium();
  });
});

// Selenium'a bağlanma fonksiyonu
async function connectToSelenium() {
  try {
    // Selenium WebDriver'ı başlat
    const driver = await new Builder()
      .forBrowser('chrome') // Tarayıcı türü (örneğin, 'chrome', 'firefox')
      .usingServer(config.selenium.hubUrl) // Selenium Hub URL'si
      .build();

    logger.info('Connected to Selenium');

    // Örnek: Bir websitesi aç
    await driver.get('https://web.whatsapp.com/');
    const xpath = '/html/body/div[1]/div/div/div[3]/div/div[3]/div/div[3]/div[2]/div/div/div[1]';
    // const element = await driver.wait(
    //   until.elementLocated(By.xpath(xpath)), // Elementin bulunmasını bekleyin
    //   10000 // Maksimum 10 saniye bekleyin
    // );
    //await element.click();
    //logger.info('Element clicked successfully');
    logger.info('Opened OTP service');
    // Tarayıcıyı kapat
    // await driver.quit();
    // logger.info('Selenium WebDriver closed');
  } catch (error) {
    logger.error('Failed to connect to Selenium:', error);
  }
}

// Hata yakalama ve sunucuyu kapatma işlemleri
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});