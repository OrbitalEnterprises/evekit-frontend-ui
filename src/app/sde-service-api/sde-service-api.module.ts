import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Configuration } from './configuration';

import { SDEAgentService } from './api/s-d-e-agent.service';
import { SDECertificatesService } from './api/s-d-e-certificates.service';
import { SDECharacterService } from './api/s-d-e-character.service';
import { SDECorporationService } from './api/s-d-e-corporation.service';
import { SDEDogmaService } from './api/s-d-e-dogma.service';
import { SDEEVEService } from './api/s-d-e-e-v-e.service';
import { SDEIndustryService } from './api/s-d-e-industry.service';
import { SDEInventoryService } from './api/s-d-e-inventory.service';
import { SDEMapService } from './api/s-d-e-map.service';
import { SDEPlanetService } from './api/s-d-e-planet.service';
import { SDERAMService } from './api/s-d-e-r-a-m.service';
import { SDESkinService } from './api/s-d-e-skin.service';
import { SDEStationService } from './api/s-d-e-station.service';
import { SDETranslationService } from './api/s-d-e-translation.service';
import { SDEWarService } from './api/s-d-e-war.service';

@NgModule({
  imports:      [ CommonModule, HttpClientModule ],
  declarations: [],
  exports:      [],
  providers: [
    SDEAgentService,
    SDECertificatesService,
    SDECharacterService,
    SDECorporationService,
    SDEDogmaService,
    SDEEVEService,
    SDEIndustryService,
    SDEInventoryService,
    SDEMapService,
    SDEPlanetService,
    SDERAMService,
    SDESkinService,
    SDEStationService,
    SDETranslationService,
    SDEWarService ]
})
export class SdeServiceApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: SdeServiceApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        }
    }

    constructor( @Optional() @SkipSelf() parentModule: SdeServiceApiModule) {
        if (parentModule) {
            throw new Error('SdeServiceApiModule is already loaded. Import your base AppModule only.');
        }
    }
}
