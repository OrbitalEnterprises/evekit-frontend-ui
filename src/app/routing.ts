import {RouterModule, Routes} from '@angular/router';
import {LoggedInActivator} from './platform/activators';

// const MENU_STRUCTURE: MenuNode[] = [
//   new SingleMenuNode('Info', '/info', 'info', null),
//   new ExpandableMenuNode('Accounts', 'people', null)
//     .addGuard(MenuGuard.LOGGED_IN),
//   new ExpandableMenuNode('APIs', 'code', null)
//     .addChild(new SingleMenuNode('Model', '/sapi/model', 'memory', null))
//     .addChild(new SingleMenuNode('SDE', '/sapi/sde', 'language', null))
//     .addChild(new SingleMenuNode('Market', '/sapi/market', 'bar_chart', null)),
//   new ExpandableMenuNode('Admin', 'build', null)
//     .addGuard(MenuGuard.ADMIN)
//     .addChild(new SingleMenuNode('Sys Props', '/admin/sysprops', 'settings', null))
//     .addChild(new SingleMenuNode('User Props', '/admin/userprops', 'account_circle', null))
//     .addChild(new SingleMenuNode('Sync Status', '/admin/syncstatus', 'sync', null))
//     .addChild(new SingleMenuNode('User List', '/admin/userlist', 'list', null))
//     .addChild(new SingleMenuNode('Ref History', '/admin/refhistory', 'history', null))
//     .addChild(new SingleMenuNode('Notifications', '/admin/notifications', 'priority_high', null)),
//   new SingleMenuNode('stEVE', '/steve', 'chat', null)
//     .addGuard(MenuGuard.COMING_SOON),
//   new SingleMenuNode('Extension Manager', '/extadmin', 'settings_ethernet', null)
//     .addGuard(MenuGuard.COMING_SOON)
//     .addGuard(MenuGuard.LOGGED_IN),
//   new ExpandableMenuNode('Extensions', 'extension', null)
//     .addGuard(MenuGuard.COMING_SOON)
//     .addGuard(MenuGuard.LOGGED_IN)
// ];

/*
 * Standard routes.  This array should be updated each time a new built-in tab is added.
 */
const standardRoutes: Routes = [
  {
    // Default front page
    path: 'info',
    loadChildren: './content/info/info-content.module#InfoContentModule'
  },
  {
    // Sync Model Viewer
    path: 'sapi/model/:aid/:kid',
    loadChildren: './content/syncmodel/syncmodel.module#SyncmodelModule'
  },
  {
    // SDE Viewer
    path: 'sapi/sde',
    loadChildren: './content/sde/sde.module#SdeModule'
  },
  {
    // Reference Data Viewer
    path: 'sapi/ref',
    loadChildren: './content/refmodel/refmodel.module#RefmodelModule'
  },
  {
    // Market Data Viewer
    path: 'sapi/market',
    loadChildren: './content/market/market.module#MarketModule'
  },
  {
    // Accounts display
    path: 'syncaccount/:aid',
    loadChildren: './content/accounts/accounts.module#AccountsModule',
    canActivate: [LoggedInActivator]
  },
  // {
  //   // Public plugin, requires no authentication
  //   path: 'plugin/p/:id',
  //   loadChildren: 'app/modules/plugin-tab/plugin-tab.module#PluginTabModule',
  //   canActivate: [EveKitLoginGuard]
  // },
  // {
  //   // Plugin which requires a logged in user
  //   path: 'plugin/l/:id',
  //   loadChildren: 'app/modules/plugin-tab/plugin-tab.module#PluginTabModule',
  //   canActivate: [EveKitLoginGuard]
  // },
  // {
  //   // Plugin which requires an admin user
  //   path: 'plugin/a/:id',
  //   loadChildren: 'app/modules/plugin-tab/plugin-tab.module#PluginTabModule',
  //   canActivate: [EveKitLoginGuard, EveKitAdminGuard]
  // },
  {
    path: '**',
    redirectTo: '/info',
    pathMatch: 'full'
  }
];

export const standardRouteConfig = RouterModule.forRoot(standardRoutes);
