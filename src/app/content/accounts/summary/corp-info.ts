import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {SDECharacterService, SDEStationService} from '../../../sde-service-api';

export class CorporationInfo {
  alliance_id?: number;
  ceo_id: number;
  creator_id: number;
  date_founded?: string;
  description?: string;
  faction_id?: number;
  home_station_id?: number;
  member_count: number;
  name: string;
  shares?: number;
  tax_rate: number;
  ticker: string;
  url?: string;
}

export function fetchCorporationInfo(http: HttpClient, corpID: number): Observable<CorporationInfo> {
  const request = http.get('https://esi.evetech.net/latest/corporations/' + String(corpID) + '/?datasource=tranquility');
  return request.pipe(map(
    info => {
      const cinfo = new CorporationInfo();
      cinfo.alliance_id = info['alliance_id'] || 0;
      cinfo.ceo_id = info['ceo_id'];
      cinfo.creator_id = info['creator_id'];
      cinfo.date_founded = info['date_founded'] || null;
      cinfo.description = info['description'] || null;
      cinfo.faction_id = info['faction_id'] || 0;
      cinfo.home_station_id = info['home_station_id'] || 0;
      cinfo.member_count = info['member_count'];
      cinfo.name = info['name'];
      cinfo.shares = info['shares'] || 0;
      cinfo.tax_rate = info['tax_rate'];
      cinfo.ticker = info['ticker'];
      cinfo.url = info['url'] || null;
      return cinfo;
    }
  ));
}

export function mapStation(stationID: number, sde: SDEStationService): Observable<string> {
  return sde.getStations(undefined, undefined, '{values:[' + String(stationID) + ']}')
    .pipe(map(
      results => {
        for (const next of results) {
          if (next.stationID === stationID) {
            return next.stationName;
          }
        }
        return null;
      }
    ));
}
