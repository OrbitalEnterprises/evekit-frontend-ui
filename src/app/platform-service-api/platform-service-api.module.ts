import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Configuration } from './configuration';

import { AccountService } from './api/account.service';
import { AccountV2Service } from './api/accountV2.service';
import { AdminService } from './api/admin.service';
import { AuthenticationService } from './api/authentication.service';
import { CredentialService } from './api/credential.service';
import { ReleaseService } from './api/release.service';

@NgModule({
  imports:      [ CommonModule, HttpClientModule ],
  declarations: [],
  exports:      [],
  providers: [
    AccountService,
    AccountV2Service,
    AdminService,
    AuthenticationService,
    CredentialService,
    ReleaseService ]
})
export class PlatformServiceApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: PlatformServiceApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        }
    }

    constructor( @Optional() @SkipSelf() parentModule: PlatformServiceApiModule) {
        if (parentModule) {
            throw new Error('PlatformServiceApiModule is already loaded. Import your base AppModule only.');
        }
    }
}
