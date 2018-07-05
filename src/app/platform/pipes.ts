import {Pipe, PipeTransform} from '@angular/core';
import {EveKitUserAccount, EveKitUserAuthSource} from '../platform-service-api';

@Pipe({name: 'extractFirst'})
export class ExtractFirstPipe implements PipeTransform {
  transform(value: any[]): any {
    if (value === null) { return null; }
    const convert = String(value);
    return convert[0].toUpperCase();
  }
}

@Pipe({name: 'extractScreenName'})
export class ExtractScreenNamePipe implements PipeTransform {
  transform(value: any[]): any {
    if (value === null) { return null; }
    if ((<EveKitUserAuthSource>value).screenName) {
      return (<EveKitUserAuthSource>value).screenName;
    }
    return null;
  }
}

@Pipe({name: 'extractSourceName'})
export class ExtractSourceNamePipe implements PipeTransform {
  transform(value: any[]): any {
    if (value === null) { return null; }
    if ((<EveKitUserAuthSource>value).source) {
      return (<EveKitUserAuthSource>value).source;
    }
    return null;
  }
}

@Pipe({name: 'extractUserCreated'})
export class ExtractUserCreatedPipe implements PipeTransform {
  transform(value: any[]): any {
    if (value === null) { return null; }
    if ((<EveKitUserAccount>value).created) {
      return (<EveKitUserAccount>value).created;
    }
    return null;
  }
}
