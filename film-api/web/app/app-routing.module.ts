import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { FilmComponent } from './components/film/film.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound/notfound.component';
import { ServererrorComponent } from './components/servererror/servererror/servererror.component';
import { AdminComponent } from './components/admin/admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: '/catalogue', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'catalogue', component: CatalogueComponent },
  { path: 'film/:id', component: FilmComponent  },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'admin', component: AdminComponent },
  { path: '404', component: NotfoundComponent },
  { path: '500', component: ServererrorComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
