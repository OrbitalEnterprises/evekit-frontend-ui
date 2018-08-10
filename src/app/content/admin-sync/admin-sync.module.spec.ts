import { AdminSyncModule } from './admin-sync.module';

describe('AdminSyncModule', () => {
  let adminSyncModule: AdminSyncModule;

  beforeEach(() => {
    adminSyncModule = new AdminSyncModule();
  });

  it('should create an instance', () => {
    expect(adminSyncModule).toBeTruthy();
  });
});
