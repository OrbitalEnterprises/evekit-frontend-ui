import { AdminPropsModule } from './admin-props.module';

describe('AdminPropsModule', () => {
  let adminPropsModule: AdminPropsModule;

  beforeEach(() => {
    adminPropsModule = new AdminPropsModule();
  });

  it('should create an instance', () => {
    expect(adminPropsModule).toBeTruthy();
  });
});
