import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe("User registration", () => {
  test("should register a new user successfully and show confirmation message", async ({ page }) => {
    const randomFirstName = faker.person.firstName();
    const randomLastName = faker.person.lastName();
    const randomFullName = `${randomFirstName} ${randomLastName}`;
    const randomEmail = `${randomFirstName}.${randomLastName}_${Date.now()}@example.com`;
    const randomPassword = faker.internet.password();
    const randomCompany = faker.company.name();
    const randomAddress = faker.location.streetAddress();
    const randomCountryState = faker.location.state();
    const randomZipCode = faker.location.zipCode();
    const randomPhoneNumber = faker.phone.number({ style: 'international' });

    await page.goto("/");
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
    await page.getByRole("textbox", { name: "Password *" }).fill(randomPassword);
    await page.locator("#days").selectOption("9"); // TODO: Generate birth date with faker-js
    await page.locator("#months").selectOption("5"); //
    await page.locator("#years").selectOption("1992"); //
    await page.getByRole("textbox", { name: "First name *" }).fill(randomFirstName);
    await page.getByRole("textbox", { name: "Last name *" }).fill(randomLastName);
    await page
      .getByRole("textbox", { name: "Company", exact: true })
      .fill(randomCompany);
    await page
      .getByRole("textbox", { name: "Address * (Street address, P." })
      .fill(randomAddress);
    await page.getByLabel("Country *").selectOption("Canada");
    await page.getByRole("textbox", { name: "State *" }).fill(randomCountryState);
    await page
      .getByRole("textbox", { name: "City * Zipcode *" })
      .fill("The City"); // TODO: Fill City from faker-js
    await page.locator("#zipcode").fill(randomZipCode);
    await page
      .getByRole("textbox", { name: "Mobile Number *" })
      .fill(randomPhoneNumber);
    await page.getByRole("button", { name: "Create Account" }).click();

    await expect(page.getByText("Account Created!")).toBeVisible();
    await page.getByRole("link", { name: "Continue" }).click();
    await expect(page.getByText(`Logged in as ${randomFullName}`)).toBeVisible();
  });
});
