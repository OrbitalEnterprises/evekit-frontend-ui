import { EditAccessKeyModule } from './edit-access-key.module';

describe('EditAccessKeyModule', () => {
  let editAccessKeyModule: EditAccessKeyModule;

  beforeEach(() => {
    editAccessKeyModule = new EditAccessKeyModule();
  });

  it('should create an instance', () => {
    expect(editAccessKeyModule).toBeTruthy();
  });
});
