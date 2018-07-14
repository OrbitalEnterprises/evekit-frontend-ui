import { RefmodelModule } from './refmodel.module';

describe('RefmodelModule', () => {
  let refmodelModule: RefmodelModule;

  beforeEach(() => {
    refmodelModule = new RefmodelModule();
  });

  it('should create an instance', () => {
    expect(refmodelModule).toBeTruthy();
  });
});
