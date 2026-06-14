
import { Page, Locator } from '@playwright/test';
export class EmployeeListPage {
  constructor(private readonly page: Page) {}

  get pageHeading() {
    return this.page.locator('h6');
  }

  get employeeSearchInput() {
    return this.page.getByPlaceholder('Type for hints...')
  }

  get searchResultsGrid() {
    return this.page.locator('div.oxd-table-card');
  }

  get recordsFoundText() {
    return this.page.locator('.orangehrm-horizontal-padding');
  }
  get autoCompleteSuggestions() {
    return this.page.locator('.oxd-autocomplete-option');
  }
  get LoadingSpinner() {
    return this.page.locator('.oxd-loading-spinner');
  }
  get employeeSearchResultRows(){
    return this.page.locator('.oxd-table-body .oxd-table-row');
  }
  get employeeSearchResultNameColumn(){
    return this.page.locator('.oxd-table-cell').nth(2);
  }

}