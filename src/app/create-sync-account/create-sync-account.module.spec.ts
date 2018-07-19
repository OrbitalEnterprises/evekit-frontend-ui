import { CreateSyncAccountModule } from './create-sync-account.module';

describe('CreateSyncAccountModule', () => {
  let createSyncAccountModule: CreateSyncAccountModule;

  beforeEach(() => {
    createSyncAccountModule = new CreateSyncAccountModule();
  });

  it('should create an instance', () => {
    expect(createSyncAccountModule).toBeTruthy();
  });
});
