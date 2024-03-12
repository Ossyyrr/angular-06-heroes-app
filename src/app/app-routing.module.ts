import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { SharedModule } from './shared/shared.module';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'heroes',
    loadChildren: () =>
      import('./heroes/heroes.module').then((m) => m.HeroesModule),
    canActivate: [AuthGuard],
  },
  {
    path: '404',
    component: Error404PageComponent,
  },
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full', // Ruta exacta
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, SharedModule],
})
export class AppRoutingModule {}
