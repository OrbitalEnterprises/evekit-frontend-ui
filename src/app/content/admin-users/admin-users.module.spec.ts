import { AdminUsersModule } from './admin-users.module';

describe('AdminUsersModule', () => {
  let adminUsersModule: AdminUsersModule;

  beforeEach(() => {
    adminUsersModule = new AdminUsersModule();
  });

  it('should create an instance', () => {
    expect(adminUsersModule).toBeTruthy();
  });
});
