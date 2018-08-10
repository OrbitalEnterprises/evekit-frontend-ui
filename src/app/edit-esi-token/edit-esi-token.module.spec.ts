import { EditEsiTokenModule } from './edit-esi-token.module';

describe('EditEsiTokenModule', () => {
  let editEsiTokenModule: EditEsiTokenModule;

  beforeEach(() => {
    editEsiTokenModule = new EditEsiTokenModule();
  });

  it('should create an instance', () => {
    expect(editEsiTokenModule).toBeTruthy();
  });
});
