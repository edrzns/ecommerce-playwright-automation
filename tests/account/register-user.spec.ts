import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

const randomSex = faker.person.sex();
const randomFirstName = faker.person.firstName();
const randomLastName = faker.person.lastName();
const randomBirthDate = faker.date.birthdate({
  mode: "age",
  min: 18,
  max: 65,
});
const day = randomBirthDate.getDate().toString();
const month = (randomBirthDate.getMonth() + 1).toString();
const year = randomBirthDate.getFullYear().toString();

const randomFullName = `${randomFirstName} ${randomLastName}`;
const randomEmail = `${randomFirstName}.${randomLastName}_${Date.now()}@example.com`;
const randomPassword = faker.internet.password();
const randomCompany = faker.company.name();
const randomCity = faker.location.city();
const randomAddress = faker.location.streetAddress();
const randomCountryState = faker.location.state();
const randomZipCode = faker.location.zipCode();
const randomPhoneNumber = faker.phone.number({ style: "international" });

test.describe("User registration", () => {
  test("should register a new user successfully and show confirmation message", async ({
    page,
  }) => {
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

    if (randomSex === "male") {
      await page.getByRole("radio", { name: "Mr." }).check();
    } else {
      await page.getByRole("radio", { name: "Mrs." }).check();
    }

    await page
      .getByRole("textbox", { name: "Password *" })
      .fill(randomPassword);
    await page.locator("#days").selectOption(day);
    await page.locator("#months").selectOption(month);
    await page.locator("#years").selectOption(year);
    await page
      .getByRole("textbox", { name: "First name *" })
      .fill(randomFirstName);
    await page
      .getByRole("textbox", { name: "Last name *" })
      .fill(randomLastName);
    await page
      .getByRole("textbox", { name: "Company", exact: true })
      .fill(randomCompany);
    await page
      .getByRole("textbox", { name: "Address * (Street address, P." })
      .fill(randomAddress);
    await page.getByLabel("Country *").selectOption("Canada");
    await page
      .getByRole("textbox", { name: "State *" })
      .fill(randomCountryState);
    await page
      .getByRole("textbox", { name: "City * Zipcode *" })
      .fill(randomCity);
    await page.locator("#zipcode").fill(randomZipCode);
    await page
      .getByRole("textbox", { name: "Mobile Number *" })
      .fill(randomPhoneNumber);
    await page.getByRole("button", { name: "Create Account" }).click();

    await expect(page.getByText("Account Created!")).toBeVisible();
    await page.getByRole("link", { name: "Continue" }).click();
    await expect(
      page.getByText(`Logged in as ${randomFullName}`)
    ).toBeVisible();

    await page.getByRole("link", { name: "Logout" }).click();
  });
});
