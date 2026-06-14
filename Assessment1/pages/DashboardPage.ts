import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  private readonly locators: {
    pimMenuItem: Locator;
    pageHeading: Locator;
  };

  constructor(private readonly page: Page) {
    this.locators = {
      pimMenuItem: page.getByRole('link', { name: 'PIM' }),
      pageHeading: page.locator('h6'),
    };
  }

  async openPIM(): Promise<void> {
    await this.locators.pimMenuItem.click();
  }

  async getHeadingText(): Promise<string> {
    const headingText = await this.locators.pageHeading.first().textContent();
    return headingText ?? '';
  }
}