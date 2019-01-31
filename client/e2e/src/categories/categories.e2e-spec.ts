import { CategoryPage } from './categories.po';

describe('workspace-project App', () => {
  let page: CategoryPage;

  beforeEach(() => {
    page = new CategoryPage();
  });

  it('should display all categories', () => {
    page.navigateTo();
    expect(page.getCategoriesText()).toEqual(['All', 'Electronic', 'Clothing', 'Books']);
  });
});
