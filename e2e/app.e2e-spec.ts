import { SmartreferralwebPage } from './app.po';

describe('smartreferralweb App', function() {
  let page: SmartreferralwebPage;

  beforeEach(() => {
    page = new SmartreferralwebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
