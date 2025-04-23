const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
const testData = require('../user.js')

test("test", async ({ page }) => {
  // Go to https://netology.ru/free/management#/
  await page.goto("https://netology.ru/free/management#/");

  // Click a
  await page.click("a");
  await expect(page).toHaveURL("https://netology.ru/");

  // Click text=Учиться бесплатно
  await page.click("text=Учиться бесплатно");
  await expect(page).toHaveURL("https://netology.ru/free");

  await page.click("text=Бизнес и управление");
  await expect(page).toHaveURL("https://netology.ru/free/management#/nachat_uchitsya");

  // Click text=Как перенести своё дело в онлайн
  await page.click("text=Как стать продакт- или проджект-менеджером");
  await expect(page).toHaveURL("https://netology.ru/programs/product-project-marathon");
});

test("Failed authorization", async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500,
  });
  const page = await browser.newPage("https://netology.ru/?modal=sign_in");
  await page.goto("https://netology.ru/?modal=sign_in", {waitUntil: "domcontentloaded"});
  await page.locator('[placeholder="Email"]').click();
  await page.fill('[placeholder="Email"]', testData.testData.incorrectEmail);
  await page.locator('[placeholder="Пароль"]').click();
  await page.fill('[placeholder="Пароль"]', testData.testData.incorrectPassword);
  await page.locator('[data-testid="login-submit-btn"]').click();
  const error = await page.locator('[data-testid="login-error-hint"]');
  await expect(error).toHaveText("Вы ввели неправильно логин или пароль.");
  browser.close();
}, 60000);

test("Successful authorization", async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500,
  });
  const page = await browser.newPage("https://netology.ru/");
  await page.goto("https://netology.ru/?modal=sign_in", {waitUntil: "domcontentloaded"});
  await page.locator('[placeholder="Email"]').click();
  await page.fill('[placeholder="Email"]', testData.testData.email);
  await page.locator('[placeholder="Пароль"]').click();
  await page.fill('[placeholder="Пароль"]', testData.testData.password);
  await page.locator('[data-testid="login-submit-btn"]').click();
  await expect(page).toHaveURL("https://netology.ru/profile/9103119");
  await page.waitForSelector("h2", {state: "attached"})
  await expect(page.locator("h2")).toContainText("Моё обучение");
  browser.close();
}, 60000);
