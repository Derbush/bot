import { test, expect } from "@playwright/test";

test("2026 Доступные даты перезапись", async ({ page }) => {
  // npx playwright test --grep "2026 Доступные даты перезапись" --headed
  // use command in terminal  "npx playwright test C:\Users\user002107\Desktop\VS Code Project\afina-playwright-ts\tests\practice.spec.ts"
  console.log("test started");

  test.setTimeout(60000);

  const website = process.env.VISAWEBSITE;
  const login = process.env.VISALOGIN;
  const password = process.env.VISAPASSWORD;

  await page.goto(website as string, {
    waitUntil: "networkidle",
    timeout: 90000,
  });

  await page
    .locator("//input[@class='string email required']")
    .fill(login as string);

  await page
    .locator("//input[@class='password optional']")
    .fill(password as string);

  await page.locator("//input[@type='checkbox']/..").click();

  await page.locator("//input[@data-disable-with='Войти']").click();

  await page.locator("//a[.='Продолжить']").click();
  await page
    .locator("//span[@class='fas fa-calendar-minus fa-lg fa-fw']/../..")
    .click();

await page.getByRole("link", { name: "Перенести запись" }).click();

await page.locator("//div[contains(@class, 'icheckbox icheck-item')]").click();

  await page.locator("//input[@data-disable-with='Continue']").click();

  await page.locator("#appointments_consulate_appointment_facility_id").click();

  await page.waitForTimeout(300);

  await page
    .locator("#appointments_consulate_appointment_facility_id")
    .type("As");

  //await page.waitForTimeout(500);
  await page.keyboard.press("Enter");

  //await page.waitForTimeout(2000);

  await page.locator("//input[@placeholder='Date']").click();

  // Wait for calendar
  await page.waitForSelector("#ui-datepicker-div", { state: "visible" });

  let availableDateFound = false;
  let attempts = 0;
  const maxAttempts = 25;

  while (!availableDateFound && attempts < maxAttempts) {
    // Check for available dates
    if ((await page.locator("//a[@class='ui-state-default']").count()) > 0) {
      console.log("✓ Available dates found!");

      // Get and print all available dates
      const dateElements = await page
        .locator("//a[@class='ui-state-default']")
        .all();
      console.log(`Found ${dateElements.length} available dates:`);
      for (let i = 0; i < dateElements.length; i++) {
        const dateValue = await dateElements[i].textContent();
        console.log(`  [${i + 1}] ${dateValue}`);
      }

      availableDateFound = true;
      break;
    }

    // Get current month from right calendar
    const month = await page
      .locator(".ui-datepicker-group-last .ui-datepicker-month")
      .textContent();
    const year = await page
      .locator(".ui-datepicker-group-last .ui-datepicker-year")
      .textContent();

    console.log(`Navigating: ${month?.trim()} ${year?.trim()}`);

    // Stop at Dec 2026
    if (month?.trim() === "December" && year?.trim() === "2026") {
      break;
    }

    // Click next button
    await page.locator("a.ui-datepicker-next").click();
    await page.waitForTimeout(150);
    attempts++;
  }

  // Test assertion
  expect(availableDateFound).toBe(true);
});



test("2027 Доступные даты перезапись", async ({ page }) => {
  // npx playwright test --grep "2027 Доступные даты перезапись" --headed
  // use command in terminal  "npx playwright test C:\Users\user002107\Desktop\VS Code Project\afina-playwright-ts\tests\practice.spec.ts"
  console.log("test started");

  test.setTimeout(60000);

  const website = process.env.VISAWEBSITE;
  const login = process.env.VISALOGIN;
  const password = process.env.VISAPASSWORD;

  await page.goto(website as string, {
    waitUntil: "networkidle",
    timeout: 90000,
  });

  await page
    .locator("//input[@class='string email required']")
    .fill(login as string);

  await page
    .locator("//input[@class='password optional']")
    .fill(password as string);

  await page.locator("//input[@type='checkbox']/..").click();

  await page.locator("//input[@data-disable-with='Войти']").click();

await page.locator("//a[.='Продолжить']").click();
  await page
    .locator("//span[@class='fas fa-calendar-minus fa-lg fa-fw']/../..")
    .click();

  await page.getByRole("link", { name: "Перенести запись" }).click();

  await page
    .locator("//div[contains(@class, 'icheckbox icheck-item')]")
    .click();

  await page.locator("//input[@data-disable-with='Continue']").click();

  await page.locator("#appointments_consulate_appointment_facility_id").click();

  await page.waitForTimeout(300);

  await page
    .locator("#appointments_consulate_appointment_facility_id")
    .type("As");

  //await page.waitForTimeout(500);
  await page.keyboard.press("Enter");

  //await page.waitForTimeout(2000);

  await page.locator("//input[@placeholder='Date']").click();

  // Wait for calendar
  await page.waitForSelector("#ui-datepicker-div", { state: "visible" });

  let availableDateFound = false;
  let attempts = 0;
  const maxAttempts = 25;

while (!availableDateFound && attempts < maxAttempts) {
    // Check for available dates
    if ((await page.locator("//a[@class='ui-state-default']").count()) > 0) {
      // Get current month/year for the log
      const foundMonth = await page
        .locator(".ui-datepicker-group-last .ui-datepicker-month")
        .textContent();
      const foundYear = await page
        .locator(".ui-datepicker-group-last .ui-datepicker-year")
        .textContent();

      console.log(`✓ Available dates found in ${foundMonth?.trim()} ${foundYear?.trim()}!`);

      // Get and print all available dates
      const dateElements = await page
        .locator("//a[@class='ui-state-default']")
        .all();
      console.log(`Found ${dateElements.length} available dates:`);
      for (let i = 0; i < dateElements.length; i++) {
        const dateValue = await dateElements[i].textContent();
        console.log(`  [${i + 1}] ${dateValue}`);
      }

      availableDateFound = true;
      break;
    }

    // Get current month from right calendar
    const month = await page
      .locator(".ui-datepicker-group-last .ui-datepicker-month")
      .textContent();
    const year = await page
      .locator(".ui-datepicker-group-last .ui-datepicker-year")
      .textContent();

    console.log(`Navigating: ${month?.trim()} ${year?.trim()}`);

    // Stop at Dec 2027
    if (month?.trim() === "December" && year?.trim() === "2027") {
      break;
    }

    // Click next button
    await page.locator("a.ui-datepicker-next").click();
    await page.waitForTimeout(150);
    attempts++;
  }

  // Test assertion
  expect(availableDateFound).toBe(true);
});