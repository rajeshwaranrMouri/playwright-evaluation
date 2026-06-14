import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { EmployeeListPage } from '../pages/EmployeeListPage';
import { AddEmployeePage } from '../pages/AddEmployeePage';

test('Employee Search', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const employeeListPage = new EmployeeListPage(page);
    const addEmployeePage = new AddEmployeePage(page);

    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');
    await dashboardPage.openPIM();
    const headingText = await dashboardPage.getHeadingText();
    await expect(headingText).toBe('PIM');  

    await employeeListPage.employeeSearchInput.first().pressSequentially('sww test' ,{delay : 100});
    const autoCompleteOptions = await employeeListPage.autoCompleteSuggestions.first().waitFor();
    const autoCompleteOptionsCount = await employeeListPage.autoCompleteSuggestions.count();

    for (let i = 0; i < autoCompleteOptionsCount; i++) {
        const text: string = await employeeListPage.autoCompleteSuggestions.nth(i).textContent() ?? '';
        if (text.trim() === 'sww test') {
            await employeeListPage.autoCompleteSuggestions.nth(i).click();
            break;
        }
    }

    await page.getByRole('button', { name: 'Search' }).click();
    await employeeListPage.LoadingSpinner.waitFor({ state: 'hidden' });
    const rows = employeeListPage.employeeSearchResultRows;
    await rows.first().waitFor();

    const rowCount: number = await rows.count();
    expect(rowCount).toBeGreaterThan(0);
    // Assert first result contains searched name
    await expect(
        employeeListPage.employeeSearchResultNameColumn.first()
    ).toContainText('sww');

    const allNames: string[] = [];
    for (let i = 0; i < rowCount; i++) {
    const row = rows.nth(i);
    // Scoped search - searches only inside this row
    const name: string =
    await row.locator('.oxd-table-cell').nth(2).textContent() ?? '';
    allNames.push(name.trim());
    }
    // Assert every row name is non-empty
    allNames.forEach((name: string) => {
    expect(name.length).toBeGreaterThan(0);
});



});