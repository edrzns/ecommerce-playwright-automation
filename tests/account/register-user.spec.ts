import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe("User registration", () => {
  test("test", async ({ page }) => {
    const randomFirstName = faker.person.firstName();
    const randomLastName = faker.person.lastName();
    const randomFullName = `${randomFirstName} ${randomLastName}`;
    const randomEmail = `${faker.internet.username()}_${Date.now()}@example.com`;

    await page.goto("https://automationexercise.com/");
    await page.getByRole("button", { name: "Consent" }).click();
    await page.getByRole("link", { name: "Signup / Login" }).click();
    await page.getByRole("textbox", { name: "Name" }).fill(randomFullName);
    await page
      .locator("form")
      .filter({ hasText: "Signup" })
      .getByPlaceholder("Email Address")
      .fill(randomEmail);
    await page.getByRole("button", { name: "Signup" }).click();
    await page.getByRole("radio", { name: "Mr." }).check(); // TODO: Choose depending on gender from faker-js
    await page.getByRole("textbox", { name: "Password *" }).fill("Welcome12#");
    await page.locator("#days").selectOption("9"); // TODO: Generate birth date with faker-js
    await page.locator("#months").selectOption("5"); //
    await page.locator("#years").selectOption("1992"); //
    await page.getByRole("textbox", { name: "First name *" }).fill(randomFirstName);
    await page.getByRole("textbox", { name: "Last name *" }).fill(randomLastName);
    await page
      .getByRole("textbox", { name: "Company", exact: true })
      .fill("The Company"); // TODO: Fill company name from faker-js
    await page
      .getByRole("textbox", { name: "Address * (Street address, P." })
      .fill("The Address"); // TODO: Fill address from faker-js
    await page.getByLabel("Country *").selectOption("Canada"); // Fill country from faker-js or select from dropdown
    await page.getByRole("textbox", { name: "State *" }).fill("The State"); // Fill state from faker-js
    await page
      .getByRole("textbox", { name: "City * Zipcode *" })
      .fill("The City"); // TODO: Fill City from faker-js
    await page.locator("#zipcode").fill("The Zipcode"); // TODO: Fill zipcode from faker-js
    await page
      .getByRole("textbox", { name: "Mobile Number *" })
      .fill("The Mobile Number"); // TODO: Fill random mobile number from faker-js
    await page.getByRole("button", { name: "Create Account" }).click();
    await page.getByText("Account Created!").click(); // Create assertion to expect text "Account Created!"
    await page.getByRole("link", { name: "Continue" }).click();
  });
});
