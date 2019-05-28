const {until, By} = require('selenium-webdriver');

let quotesList = [
    'Yes there is a lot of people doing a great job out there.',
    'If your life was a horse, you\'d have to shoot it.',
    'You have taken yourself too seriously.',
    'A classic is something that everyone wants to have read and nobody wants to read.',
    'You have the capacity to learn from mistakes. You\'ll learn a lot today.',
    'I love deadlines. I love the whooshing sound they make as they fly by.',
    'Beware of low-flying butterflies.',
    'Do something unusual today. Pay a bill.',
    'Excellent time to become a missing person.',
    'Nothing so needs reforming as other people\'s habits'
];

describe('test login section', () => {
    beforeEach(async() => {
        await driver.get('https://qa-engineer.herokuapp.com');
        //await driver.wait(until.urlIs('https://qa-engineer.herokuapp.com'), 10000);
    });

    afterEach(async() => {
        await driver.close();
    });

    test('first', async() => {
        await driver.findElement(By.css('button[type="submit"]')).click();
        await driver.wait(until.urlIs('https://qa-engineer.herokuapp.com/code'), 10000);

        let body = await driver.findElement(By.css('body')).getText();
        expect(body).toMatchSnapshot();

        let secret = await driver.findElement(By.css('input[name="secret"]')).getAttribute('value');
        await driver.findElement(By.css('input[name="code"]')).sendKeys(secret);
        let checkbox = await driver.findElement(By.css('input[type="checkbox"]')).isSelected();

        if (!checkbox) {
            await driver.findElement(By.css('input[type="checkbox"]')).click();
        }
        await driver.findElement(By.css('button[type="submit"]')).click();

        let sumScore = 0;
        let scoreList = await driver.findElements(By.css('span[class="score"]'));
        for (let score of scoreList) {
            sumScore += parseInt(await score.getText());
        }

        let totalScore = await driver.findElement(By.css('body'));
        let quotes = await totalScore.getText();

        expect(quotes).toContain('Famous Quotes');
        expect(quotes).toContain('Awesome Quotes');
        expect(quotes).toContain(sumScore);

        for (let quote of quotesList) {
            expect(quotes).toContain(quote);
        }
    });
});
