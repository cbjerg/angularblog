import { MhrPage } from './app.po';

describe('mhr App', () => {
  let page: MhrPage;

  beforeEach(() => {
    page = new MhrPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
