export class AccessKeyMask {
  constructor(public value: string, public description: string, public meaning: string) {
  }
}

export const EK_CommonMaskConstants: AccessKeyMask[] = [
  new AccessKeyMask('ACCESS_ACCOUNT_STATUS',
    'Account Status Access', 'Allows view of EVE account status.'),
  new AccessKeyMask('ACCESS_ACCOUNT_BALANCE',
    'Account Balance Access', 'Allows view of current account balances.'),
  new AccessKeyMask('ACCESS_ASSETS', 'Asset Access',
    'Allows view of assets.'),
  new AccessKeyMask('ACCESS_CHARACTER_SHEET',
    'Character Sheet Access', 'Allows view of character sheet.'),
  new AccessKeyMask('ACCESS_CORPORATION_SHEET',
    'Corporation Sheet Access', 'Allows view of corporation sheet.'),
  new AccessKeyMask('ACCESS_CONTACT_LIST',
    'Contact List Access', 'Allows view of contact lists.'),
  new AccessKeyMask('ACCESS_BLUEPRINTS', 'Blueprint Access',
    'Allows view of blueprints.'),
  new AccessKeyMask('ACCESS_BOOKMARKS', 'Bookmark Access',
    'Allows view of bookmarks.'),
  new AccessKeyMask('ACCESS_CONTRACTS', 'Contract Access',
    'Allows view of contracts.'),
  new AccessKeyMask('ACCESS_FAC_WAR_STATS',
    'Faction War Stats Access', 'Allows view of faction war statistics.'),
  new AccessKeyMask('ACCESS_INDUSTRY_JOBS',
    'Industry Jobs Access', 'Allows view of industry jobs.'),
  new AccessKeyMask('ACCESS_KILL_LOG', 'Kill Log Access',
    'Allows view of kill log.'),
  new AccessKeyMask('ACCESS_LOCATIONS', 'Locations Access',
    'Allows view of asset locations.'),
  new AccessKeyMask('ACCESS_MARKET_ORDERS',
    'Market Orders Access', 'Allows view of market orders.'),
  new AccessKeyMask('ACCESS_MINING_LEDGER', 'Mining Ledger Access',
    'Allows view of character and corporation mining ledger data.'),
  new AccessKeyMask('ACCESS_STANDINGS', 'Standings Access',
    'Allows view of standings.'),
  new AccessKeyMask('ACCESS_WALLET_JOURNAL',
    'Wallet Journal Access', 'Allows view of wallet journal.'),
  new AccessKeyMask('ACCESS_WALLET_TRANSACTIONS',
    'Wallet Transactions Access', 'Allows view of wallet transactions.'),
  new AccessKeyMask(
    'ALLOW_METADATA_CHANGES',
    'Meta-Data Modification',
    'Allows modification of meta-data for permissioned sections.')
];

export const EK_CharacterMaskConstants: AccessKeyMask[] = [
  ...EK_CommonMaskConstants,
  new AccessKeyMask(
    'ACCESS_CALENDAR_EVENT_ATTENDEES', 'Calendar Event Attendee Access',
    'Allows view of attendee lists for character\'s calendar events.'),
  new AccessKeyMask('ACCESS_CHAT_CHANNELS',
    'Chat Channels Access', 'Allows view of character chat channels.'),
  new AccessKeyMask('ACCESS_CHARACTER_FLEETS',
    'Character Fleets Access', 'Allows view of fleets character is a member of.'),
  new AccessKeyMask('ACCESS_CONTACT_NOTIFICATIONS',
    'Contact Notifications Access', 'Allows view of character\'s contact notifications.'),
  new AccessKeyMask('ACCESS_FITTINGS', 'Ship Fittings Access',
    'Allows view of character\'s ship fittings.'),
  new AccessKeyMask('ACCESS_MAIL', 'Mail Access',
    'Allows view of character\'s mail.'),
  new AccessKeyMask('ACCESS_MAILING_LISTS',
    'Mailing Lists Access', 'Allows view of character\'s mailing lists.'),
  new AccessKeyMask('ACCESS_MEDALS', 'Medals Access',
    'Allows view of character\'s medals.'),
  new AccessKeyMask('ACCESS_NOTIFICATIONS',
    'Notifications Access', 'Allows view of charater\'s notifications.'),
  new AccessKeyMask('ACCESS_RESEARCH', 'Research Access',
    'Allows view of character\'s research.'),
  new AccessKeyMask('ACCESS_SKILL_QUEUE', 'Skill Queue Access',
    'Allows view of character\'s skill queue.'),
  new AccessKeyMask(
    'ACCESS_UPCOMING_CALENDAR_EVENTS', 'Upcoming Calendar Event Access',
    'Allows view of character\'s upcoming calendar events.')
];

export const EK_CorporationMaskConstants: AccessKeyMask[] = [
  ...EK_CommonMaskConstants,
  new AccessKeyMask('ACCESS_CONTAINER_LOG',
    'Container Log Access', 'Allows view of container logs.'),
  new AccessKeyMask('ACCESS_CORPORATION_MEDALS',
    'Corporation Medals Access', 'Allows view of medals defined for corporation.'),
  new AccessKeyMask('ACCESS_MEMBER_MEDALS',
    'Member Medals Access', 'Allows view of medals awarded to corporation members.'),
  new AccessKeyMask('ACCESS_MEMBER_SECURITY',
    'Member Security Access', 'Allows view of defined corporation member security roles.'),
  new AccessKeyMask('ACCESS_MEMBER_SECURITY_LOG',
    'Member Security Log Access',
    'Allows view of changes to security roles assigned to corporation members.'),
  new AccessKeyMask('ACCESS_MEMBER_TRACKING',
    'Member Tracking Access', 'Allows view of corporation member list.'),
  new AccessKeyMask('ACCESS_SHAREHOLDERS',
    'Shareholder Access', 'Allows view of list of corporation shareholders.'),
  new AccessKeyMask('ACCESS_STARBASE_LIST',
    'Starbase List Access', 'Allows view of list of corporation starbases.'),
  new AccessKeyMask('ACCESS_STRUCTURES',
    'Structure List Access', 'Allows view of corporation structures.'),
  new AccessKeyMask('ACCESS_CORPORATION_TITLES',
    'Corporation Titles Access', 'Allows view of corporation titles.')
];

export const EK_AllMaskConstants: AccessKeyMask[] = [
  ...EK_CommonMaskConstants,
  ...EK_CharacterMaskConstants,
  ...EK_CorporationMaskConstants
];
