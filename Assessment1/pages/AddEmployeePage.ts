import { Page, Locator } from '@playwright/test';

export class AddEmployeePage {
  private readonly locators: {
    firstNameInput: Locator;
    middleNameInput: Locator;
    lastNameInput: Locator;
    saveButton: Locator;
  };

  constructor(private readonly page: Page) {
    this.locators = {
      firstNameInput: page.locator('input[name="firstName"]'),
      middleNameInput: page.locator('input[name="middleName"]'),
      lastNameInput: page.locator('input[name="lastName"]'),
      saveButton: page.locator('button[type="submit"]'),
    };
  }

  async enterEmployeeDetails(
    firstName: string,
    middleName: string,
    lastName: string
  ): Promise<void> {
    await this.locators.firstNameInput.fill(firstName);
    await this.locators.middleNameInput.fill(middleName);
    await this.locators.lastNameInput.fill(lastName);
  }

  async saveEmployee(): Promise<void> {
    await this.locators.saveButton.click();
  }
}