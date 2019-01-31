import { browser, by, element } from 'protractor';

export class CategoryPage {
  navigateTo() {
    return browser.get('/');
  }

  getCategoriesText() {
    return element(by.css('mat-list-item-content')).getText();
  }
}