import {ESIRefEndpointSyncTracker} from '../../../platform-service-api';
import EndpointEnum = ESIRefEndpointSyncTracker.EndpointEnum;

export class RefEndpointStatus {
  public endpoint: EndpointEnum;
  public displayName: string;
  public attempts: number;
  public failures: number;
  public delay: number;
  public tracker: ESIRefEndpointSyncTracker;

  constructor(endpoint: ESIRefEndpointSyncTracker.EndpointEnum,
              displayName: string,
              attempts: number = 0,
              failures: number = 0,
              tracker: ESIRefEndpointSyncTracker = null) {
    this.endpoint = endpoint;
    this.displayName = displayName;
    this.attempts = attempts;
    this.failures = failures;
    this.delay = 0;
    this.tracker = tracker;
  }
}
