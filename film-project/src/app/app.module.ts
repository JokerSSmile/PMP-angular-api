import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule }    from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import _ from 'lodash';

registerLocaleData(localeRu, 'ru');

import { AppComponent } from './app.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { FilmComponent } from './components/film/film.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';

import { FilmService } from './services/film-service/film.service';
import { ProfileService } from './services/profile-service/profile.service';
import { UserService } from './services/user-service/user.service';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    CatalogueComponent,
    FilmComponent,
    ProfileComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [ FilmService, ProfileService, UserService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
