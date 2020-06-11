import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanLoad } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'members',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./features/members/members.module').then((m) => m.MembersModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
