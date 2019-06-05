import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import {HttpClient, HttpClientModule} from '@angular/common/http';


import { ModelAccessKeyService } from './api/model-access-key.service';
import { ModelCharacterService } from './api/model-character.service';
import { ModelCommonService } from './api/model-common.service';
import { ModelCorporationService } from './api/model-corporation.service';
import { ModelMetaService } from './api/model-meta.service';
import {CommonModule} from '@angular/common';

@NgModule({
  imports:      [CommonModule, HttpClientModule],
  declarations: [],
  exports:      [],
  providers: [
    ModelAccessKeyService,
    ModelCharacterService,
    ModelCommonService,
    ModelCorporationService,
    ModelMetaService ]
})
export class ModelServiceApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ModelServiceApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ModelServiceApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ModelServiceApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
