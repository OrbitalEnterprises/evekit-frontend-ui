import { QuickstartModule } from './quickstart.module';

describe('QuickstartModule', () => {
  let quickstartModule: QuickstartModule;

  beforeEach(() => {
    quickstartModule = new QuickstartModule();
  });

  it('should create an instance', () => {
    expect(quickstartModule).toBeTruthy();
  });
});
