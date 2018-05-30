try {
  evekit;
} catch(e) {
  if (e instanceof ReferenceError)
    evekit = {};
}

/**
 * @constructor
 */
evekit.MaskConstant = function(literal, desc, meaning) {
  this.value_ = literal;
  this.description_ = desc;
  this.meaning_ = meaning;
};

evekit.MaskConstant.prototype.getValue = function() {
  return this.value_;
};

evekit.MaskConstant.prototype.getDesc = function() {
  return this.description_;
};

evekit.MaskConstant.prototype.getMeaning = function() {
  return this.meaning_;
};

evekit.CommonMaskConstants = {
  'ACCESS_ACCOUNT_STATUS' : new evekit.MaskConstant('ACCESS_ACCOUNT_STATUS',
      "Account Status Access", "Allows view of EVE account status."),
  'ACCESS_ACCOUNT_BALANCE' : new evekit.MaskConstant('ACCESS_ACCOUNT_BALANCE',
      "Account Balance Access", "Allows view of current account balances."),
  'ACCESS_ASSETS' : new evekit.MaskConstant('ACCESS_ASSETS', "Asset Access",
      "Allows view of assets."),
  'ACCESS_CHARACTER_SHEET' : new evekit.MaskConstant('ACCESS_CHARACTER_SHEET',
      "Character Sheet Access", "Allows view of character sheet."),
  'ACCESS_CORPORATION_SHEET' : new evekit.MaskConstant('ACCESS_CORPORATION_SHEET',
      "Corporation Sheet Access", "Allows view of corporation sheet."),
  'ACCESS_CONTACT_LIST' : new evekit.MaskConstant('ACCESS_CONTACT_LIST',
      "Contact List Access", "Allows view of contact lists."),
  'ACCESS_BLUEPRINTS' : new evekit.MaskConstant('ACCESS_BLUEPRINTS', "Blueprint Access",
      "Allows view of blueprints."),
  'ACCESS_BOOKMARKS' : new evekit.MaskConstant('ACCESS_BOOKMARKS', "Bookmark Access",
      "Allows view of bookmarks."),
  'ACCESS_CONTRACTS' : new evekit.MaskConstant('ACCESS_CONTRACTS', "Contract Access",
      "Allows view of contracts."),
  'ACCESS_FAC_WAR_STATS' : new evekit.MaskConstant('ACCESS_FAC_WAR_STATS',
      "Faction War Stats Access", "Allows view of faction war statistics."),
  'ACCESS_INDUSTRY_JOBS' : new evekit.MaskConstant('ACCESS_INDUSTRY_JOBS',
      "Industry Jobs Access", "Allows view of industry jobs."),
  'ACCESS_KILL_LOG' : new evekit.MaskConstant('ACCESS_KILL_LOG', "Kill Log Access",
      "Allows view of kill log."),
  'ACCESS_LOCATIONS' : new evekit.MaskConstant('ACCESS_LOCATIONS', "Locations Access",
      "Allows view of asset locations."),
  'ACCESS_MARKET_ORDERS' : new evekit.MaskConstant('ACCESS_MARKET_ORDERS',
      "Market Orders Access", "Allows view of market orders."),
  'ACCESS_MINING_LEDGER' : new evekit.MaskConstant('ACCESS_MINING_LEDGER', "Mining Ledger Access",
        "Allows view of character and corporation mining ledger data."),
  'ACCESS_STANDINGS' : new evekit.MaskConstant('ACCESS_STANDINGS', "Standings Access",
      "Allows view of standings."),
  'ACCESS_WALLET_JOURNAL' : new evekit.MaskConstant('ACCESS_WALLET_JOURNAL',
      "Wallet Journal Access", "Allows view of wallet journal."),
  'ACCESS_WALLET_TRANSACTIONS' : new evekit.MaskConstant('ACCESS_WALLET_TRANSACTIONS',
      "Wallet Transactions Access", "Allows view of wallet transactions."),
  'ALLOW_METADATA_CHANGES' : new evekit.MaskConstant(
      'ALLOW_METADATA_CHANGES',
      "Meta-Data Modification",
      "Allows modification of meta-data for permissioned sections allowed by this key (meta-data is always viewable for permissioned sections).")
};

evekit.CharacterMaskConstants = {
  'ACCESS_CALENDAR_EVENT_ATTENDEES' : new evekit.MaskConstant(
      'ACCESS_CALENDAR_EVENT_ATTENDEES', "Calendar Event Attendee Access",
      "Allows view of attendee lists for character's calendar events."),
  'ACCESS_CHAT_CHANNELS' : new evekit.MaskConstant('ACCESS_CHAT_CHANNELS',
      "Chat Channels Access", "Allows view of character chat channels."),
  'ACCESS_CHARACTER_FLEETS' : new evekit.MaskConstant('ACCESS_CHARACTER_FLEETS',
      "Character Fleets Access", "Allows view of fleets character is a member of."),
  'ACCESS_CONTACT_NOTIFICATIONS' : new evekit.MaskConstant('ACCESS_CONTACT_NOTIFICATIONS',
      "Contact Notifications Access", "Allows view of character's contact notifications."),
  'ACCESS_FITTINGS' : new evekit.MaskConstant('ACCESS_FITTINGS', "Ship Fittings Access",
      "Allows view of character's ship fittings."),
  'ACCESS_MAIL' : new evekit.MaskConstant('ACCESS_MAIL', "Mail Access",
      "Allows view of character's mail."),
  'ACCESS_MAILING_LISTS' : new evekit.MaskConstant('ACCESS_MAILING_LISTS',
      "Mailing Lists Access", "Allows view of character's mailing lists."),
  'ACCESS_MEDALS' : new evekit.MaskConstant('ACCESS_MEDALS', "Medals Access",
      "Allows view of character's medals."),
  'ACCESS_NOTIFICATIONS' : new evekit.MaskConstant('ACCESS_NOTIFICATIONS',
      "Notifications Access", "Allows view of charater's notifications."),
  'ACCESS_RESEARCH' : new evekit.MaskConstant('ACCESS_RESEARCH', "Research Access",
      "Allows view of character's research."),
  'ACCESS_SKILL_IN_TRAINING' : new evekit.MaskConstant('ACCESS_SKILL_IN_TRAINING',
      "Skill In Training Access", "Allows view of character's current skill in training."),
  'ACCESS_SKILL_QUEUE' : new evekit.MaskConstant('ACCESS_SKILL_QUEUE', "Skill Queue Access",
      "Allows view of character's skill queue."),
  'ACCESS_UPCOMING_CALENDAR_EVENTS' : new evekit.MaskConstant(
      'ACCESS_UPCOMING_CALENDAR_EVENTS', "Upcoming Calendar Event Access",
      "Allows view of character's upcoming calendar events.")
};

evekit.CorporationMaskConstants = {
  'ACCESS_CONTAINER_LOG' : new evekit.MaskConstant('ACCESS_CONTAINER_LOG',
      "Container Log Access", "Allows view of container logs."),
  'ACCESS_CORPORATION_MEDALS' : new evekit.MaskConstant('ACCESS_CORPORATION_MEDALS',
      "Corporation Medals Access", "Allows view of medals defined for corporation."),
  'ACCESS_MEMBER_MEDALS' : new evekit.MaskConstant('ACCESS_MEMBER_MEDALS',
      "Member Medals Access", "Allows view of medals awarded to corporation members."),
  'ACCESS_MEMBER_SECURITY' : new evekit.MaskConstant('ACCESS_MEMBER_SECURITY',
      "Member Security Access", "Allows view of defined corporation member security roles."),
  'ACCESS_MEMBER_SECURITY_LOG' : new evekit.MaskConstant('ACCESS_MEMBER_SECURITY_LOG',
      "Member Security Log Access",
      "Allows view of changes to security roles assigned to corporation members."),
  'ACCESS_MEMBER_TRACKING' : new evekit.MaskConstant('ACCESS_MEMBER_TRACKING',
      "Member Tracking Access", "Allows view of corporation member list."),
  'ACCESS_SHAREHOLDERS' : new evekit.MaskConstant('ACCESS_SHAREHOLDERS',
      "Shareholder Access", "Allows view of list of corporation shareholders."),
  'ACCESS_STARBASE_LIST' : new evekit.MaskConstant('ACCESS_STARBASE_LIST',
      "Starbase List Access", "Allows view of list of corporation starbases."),
  'ACCESS_STRUCTURES' : new evekit.MaskConstant('ACCESS_STRUCTURES',
      "Structure List Access", "Allows view of corporation structures."),
  'ACCESS_CORPORATION_TITLES' : new evekit.MaskConstant('ACCESS_CORPORATION_TITLES',
      "Corporation Titles Access", "Allows view of corporation titles.")
};

evekit.AllMaskConstants = {};

(function() {
  var mask_prop;
  for ( mask_prop in evekit.CommonMaskConstants) {
    evekit.CharacterMaskConstants[mask_prop] = evekit.CommonMaskConstants[mask_prop];
    evekit.CorporationMaskConstants[mask_prop] = evekit.CommonMaskConstants[mask_prop];
  }
  for ( mask_prop in evekit.CharacterMaskConstants) {
    evekit.AllMaskConstants[mask_prop] = evekit.CharacterMaskConstants[mask_prop];
  }
  for ( mask_prop in evekit.CorporationMaskConstants) {
    evekit.AllMaskConstants[mask_prop] = evekit.CorporationMaskConstants[mask_prop];
  }
})();
