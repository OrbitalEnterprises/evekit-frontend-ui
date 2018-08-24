import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {CharacterService} from '../../../sde-service-api';

export class CharacterInfo {
  alliance_id?: number;
  ancestry_id?: number;
  birthday: string;
  bloodline_id: number;
  corporation_id: number;
  description?: string;
  faction_id?: number;
  gender: string;
  name: string;
  race_id: number;
  security_status?: number;
}

export function fetchCharacterInfo(http: HttpClient, charID: number): Observable<CharacterInfo> {
  const request = http.get('https://esi.evetech.net/latest/characters/' + String(charID) + '/?datasource=tranquility');
  return request.pipe(map(
    info => {
      const cinfo = new CharacterInfo();
      cinfo.alliance_id = info['alliance_id'] || 0;
      cinfo.ancestry_id = info['ancestry_id'] || 0;
      cinfo.birthday = info['birthday'];
      cinfo.bloodline_id = info['bloodline_id'];
      cinfo.corporation_id = info['corporation_id'];
      cinfo.description = info['description'] || null;
      cinfo.faction_id = info['faction_id'] || 0;
      cinfo.gender = info['gender'];
      cinfo.name = info['name'];
      cinfo.race_id = info['race_id'];
      cinfo.security_status = info['security_status'] || 0;
      return cinfo;
    }));
}

export function mapRace(raceID: number, sde: CharacterService): Observable<string> {
  return sde.getRaces(undefined, undefined, '{values:[' + String(raceID) + ']}')
    .pipe(map(
      results => {
        for (const next of results) {
          if (next.raceID === raceID) {
            return next.raceName;
          }
        }
        return null;
      }
    ));
}

export function mapBloodline(bloodlineID: number, sde: CharacterService): Observable<string> {
  return sde.getBloodlines(undefined, undefined, '{values:[' + String(bloodlineID) + ']}')
    .pipe(map(
      results => {
        for (const next of results) {
          if (next.bloodlineID === bloodlineID) {
            return next.bloodlineName;
          }
        }
        return null;
      }
    ));
}

export function mapAncestry(ancestryID: number, sde: CharacterService): Observable<string> {
  return sde.getAncestries(undefined, undefined, '{values:[' + String(ancestryID) + ']}')
    .pipe(map(
      results => {
        for (const next of results) {
          if (next.ancestryID === ancestryID) {
            return next.ancestryName;
          }
        }
        return null;
      }
    ));
}

export function mapFaction(factionID: number, sde: CharacterService): Observable<string> {
  return sde.getFactions(undefined, undefined, '{values:[' + String(factionID) + ']}')
    .pipe(map(
      results => {
        for (const next of results) {
          if (next.factionID === factionID) {
            return next.factionName;
          }
        }
        return null;
      }
    ));
}

export function mapAlliance(http: HttpClient, allianceID: number): Observable<string> {
  const request = http.get('https://esi.evetech.net/latest/alliances/' + String(allianceID) + '/?datasource=tranquility');
  return request.pipe(map(
    info => {
      return info['name'] || null;
    }));
}
