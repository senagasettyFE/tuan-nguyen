import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomePageComponent } from '../pages/home-page/home-page.component';
import { AuthCallbackPageComponent } from '../pages/auth-callback-page/auth-callback-page.component';
import { UnauthorizedPageComponent } from '../pages/unauthorized-page/unauthorized-page.component';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  // { path: '', pathMatch: 'full', component: HomePageComponent },
  { path: 'adfs-callback', component: AuthCallbackPageComponent },
  { path: 'unauthorized', component: UnauthorizedPageComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
