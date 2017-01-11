import { FIAEQuizAppPage } from './app.po';

describe('fiae-quiz-app App', function() {
  let page: FIAEQuizAppPage;

  beforeEach(() => {
    page = new FIAEQuizAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
