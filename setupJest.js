const {path} = require('chromedriver');
const {Builder} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const TIMEOUT = 20000;

let service = new chrome.ServiceBuilder(path).build();
let nextPort = 9222;
chrome.setDefaultService(service);

beforeEach(() => {
    let options = new chrome.Options();
    options.addArguments('--window-size=1024,768');
    options.addArguments('--load-images=no');
    options.addArguments('--disk-cache=false');
  //  options.addArguments('--headless');
    if (process.env.HEADLESS_CHROME) {
        options.addArguments('--headless');
        options.addArguments('--disable-gpu');
        options.addArguments('--no-sandbox');
        options.addArguments('--disable-dev-shm-usage');
        options.addArguments(`--remote-debugging-port=${ nextPort}`);
        nextPort++;
    }
    global.driver = new Builder().withCapabilities(options).forBrowser('chrome').build();
    global.driver.manage().setTimeouts( { implicit: TIMEOUT, pageLoad: TIMEOUT, script: TIMEOUT } );

    jest.setTimeout(60000);
});

afterEach(async() => {
    await global.driver.quit();
});
