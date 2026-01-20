
import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { UserRole } from './types';

export const routes: Routes = [
  { path: 'login', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
  
  // A. ROOT COMMAND CENTER (God Mode)
  { 
    path: 'admin', 
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [UserRole.ADMIN] },
    loadComponent: () => import('./components/admin/root-dashboard/root-dashboard.component').then(m => m.RootDashboardComponent)
  },

  // B. ORGANIZATION DASHBOARD (B2B)
  { 
    path: 'org', 
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [UserRole.EDITOR_CHIEF] },
    loadComponent: () => import('./components/dashboard/org-dashboard/org-dashboard.component').then(m => m.OrgDashboardComponent)
  },

  // C. FREELANCER WORKSPACE (B2C)
  { 
    path: 'workspace', 
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [UserRole.JOURNALIST] },
    loadComponent: () => import('./components/journalist-workspace/workspace.component').then(m => m.WorkspaceComponent)
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
