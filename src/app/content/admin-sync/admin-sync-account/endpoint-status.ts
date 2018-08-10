import {ESIEndpointSyncTracker} from '../../../platform-service-api';
import EndpointEnum = ESIEndpointSyncTracker.EndpointEnum;

export class EndpointStatus {
  public endpoint: EndpointEnum;
  public displayName: string;
  public active: number;
  public delay: number;
  public attempts: number;
  public failures: number;


  constructor(endpoint: ESIEndpointSyncTracker.EndpointEnum,
              displayName: string = '',
              active: number = 0,
              delay: number = 0,
              attempts: number = 0,
              failures: number = 0) {
    this.endpoint = endpoint;
    this.displayName = displayName;
    this.active = active;
    this.delay = delay;
    this.attempts = attempts;
    this.failures = failures;
  }
}
