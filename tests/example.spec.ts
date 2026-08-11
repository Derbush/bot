import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" }),
  ).toBeVisible();
});

test("Поиск мест 2026", async ({ page }) => {
  // use command in terminal  "npx playwright test C:\Users\user002107\Desktop\VS Code Project\afina-playwright-ts\tests\practice.spec.ts"
  console.log("test started");

   test.setTimeout(60000);

  const website = process.env.VISAWEBSITE;
  const login = process.env.VISALOGIN;
  const password = process.env.VISAPASSWORD;

    await page.goto(website as string, { 
    waitUntil: "networkidle", 
    timeout: 90000 });;

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
    .locator("//h5[contains(normalize-space(.), 'Зарегистрировать запись')]")
    .click();

  await page.locator("//a[.='Зарегистрировать запись']").click();
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

    // Stop at June 2028
    if (month?.trim() === "June" && year?.trim() === "2028") {
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

test("Запись", async ({ page }) => {
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
    .locator("//h5[contains(normalize-space(.), 'Зарегистрировать запись')]")
    .click();

  await page.locator("//a[.='Зарегистрировать запись']").click();
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
      console.log("✓ Available date found!");
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

    // Stop at June 2028
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
  await page.locator("(//a[@class='ui-state-default'])[1]").click();

  await page.locator("#appointments_consulate_appointment_time").click();

  await page.waitForTimeout(300);

  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.waitForTimeout(300);

  await page.keyboard.press("Enter");

  await page.locator("//input[@type='submit']").click();

  await page.waitForTimeout(10000);
});