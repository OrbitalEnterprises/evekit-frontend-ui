import { SyncmodelModule } from './syncmodel.module';

describe('SyncmodelModule', () => {
  let syncmodelModule: SyncmodelModule;

  beforeEach(() => {
    syncmodelModule = new SyncmodelModule();
  });

  it('should create an instance', () => {
    expect(syncmodelModule).toBeTruthy();
  });
});
