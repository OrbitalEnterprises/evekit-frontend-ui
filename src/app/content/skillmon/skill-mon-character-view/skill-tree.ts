import {SkillGroup} from './skill-group';
import {InvType} from '../../../sde-service-api';

export class SkillTree {
  public skillGroups: Map<number, SkillGroup> = new Map();
  public skillList: Map<number, InvType> = new Map();

  constructor() {
  }
}
