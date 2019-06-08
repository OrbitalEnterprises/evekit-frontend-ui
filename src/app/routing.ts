import {RouterModule, Routes} from '@angular/router';
import {AdminActivator, LoggedInActivator, RedirectToInfoGuard} from './platform/activators';

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
    // Quickstart page
    path: 'qs',
    loadChildren: './content/quickstart/quickstart.module#QuickstartModule'
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
    canActivate: [LoggedInActivator],
    runGuardsAndResolvers: 'always'
  },
  {
    // Applications - SkillMon display
    path: 'apps/skillmon',
    loadChildren: './content/skillmon/skillmon.module#SkillmonModule',
    canActivate: [LoggedInActivator],
    runGuardsAndResolvers: 'always'
  },
  {
    // Admin properties display
    path: 'admin/props',
    loadChildren: './content/admin-props/admin-props.module#AdminPropsModule',
    canActivate: [LoggedInActivator, AdminActivator],
    runGuardsAndResolvers: 'always'
  },
  {
    // Admin user list display
    path: 'admin/users',
    loadChildren: './content/admin-users/admin-users.module#AdminUsersModule',
    canActivate: [LoggedInActivator, AdminActivator],
    runGuardsAndResolvers: 'always'
  },
  {
    // Admin sync display
    path: 'admin/sync',
    loadChildren: './content/admin-sync/admin-sync.module#AdminSyncModule',
    canActivate: [LoggedInActivator, AdminActivator],
    runGuardsAndResolvers: 'always'
  },
  {
    // Admin notes display
    path: 'admin/notes',
    loadChildren: './content/notes/notes.module#NotesModule',
    canActivate: [LoggedInActivator, AdminActivator],
    runGuardsAndResolvers: 'always'
  },
  {
    // When all else fails...
    path: '**',
    canActivate: [RedirectToInfoGuard],
    runGuardsAndResolvers: 'always',
    loadChildren: './content/info/info-content.module#InfoContentModule'
  }
];

export const standardRouteConfig = RouterModule.forRoot(standardRoutes,
  {
    // onSameUrlNavigation: 'reload',
    urlUpdateStrategy: 'eager'
  });
