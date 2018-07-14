import { SdeModule } from './sde.module';

describe('SdeModule', () => {
  let sdeModule: SdeModule;

  beforeEach(() => {
    sdeModule = new SdeModule();
  });

  it('should create an instance', () => {
    expect(sdeModule).toBeTruthy();
  });
});
