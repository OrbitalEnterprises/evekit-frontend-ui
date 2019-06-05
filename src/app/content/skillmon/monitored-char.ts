/**
 * Instances of this class represent a character being monitored with SkillMon.
 */
export class MonitoredChar {
  aid: number;   // sync account ID
  kid: number;   // access key ID

  constructor(record: object) {
    this.aid = record['aid'] || -1;
    this.kid = record['kid'] || -1;
  }
}
