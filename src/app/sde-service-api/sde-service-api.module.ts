import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Configuration } from './configuration';

import { AgentService } from './api/agent.service';
import { CertificatesService } from './api/certificates.service';
import { CharacterService } from './api/character.service';
import { CorporationService } from './api/corporation.service';
import { DogmaService } from './api/dogma.service';
import { EVEService } from './api/eVE.service';
import { IndustryService } from './api/industry.service';
import { InventoryService } from './api/inventory.service';
import { MapService } from './api/map.service';
import { PlanetService } from './api/planet.service';
import { RAMService } from './api/rAM.service';
import { SkinService } from './api/skin.service';
import { StationService } from './api/station.service';
import { TranslationService } from './api/translation.service';
import { WarService } from './api/war.service';

@NgModule({
  imports:      [ CommonModule, HttpClientModule ],
  declarations: [],
  exports:      [],
  providers: [
    AgentService,
    CertificatesService,
    CharacterService,
    CorporationService,
    DogmaService,
    EVEService,
    IndustryService,
    InventoryService,
    MapService,
    PlanetService,
    RAMService,
    SkinService,
    StationService,
    TranslationService,
    WarService ]
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
