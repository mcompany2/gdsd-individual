import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display our brand', () => {
    page.navigateTo();
    expect(page.getBrandText()).toEqual('YouBuy');
  });
});
