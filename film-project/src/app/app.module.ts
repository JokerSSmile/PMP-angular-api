import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule }    from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import localeRu from '@angular/common/locales/ru';

import { AppComponent } from './app.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { FilmComponent } from './components/film/film.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { FilmService } from './services/film-service/film.service';
import { ProfileService } from './services/profile-service/profile.service';
import { UserService } from './services/user-service/user.service';
import { AuthService } from './services/auth-service/auth.service';

import { TokenInterceptor } from './interceptors/tokenInterceptor'
import { HttpClient } from 'selenium-webdriver/http';
import { InvitesComponent } from './components/profile/invites/invites.component';
import { WantComponent } from './components/profile/want/want.component';
import { HistoryComponent } from './components/profile/history/history.component';
import { SettingsComponent } from './components/profile/settings/settings.component';
import { ReviewComponent } from './components/profile/review/review.component';

registerLocaleData(localeRu, 'ru');

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
    RegisterComponent,
    InvitesComponent,
    WantComponent,
    HistoryComponent,
    SettingsComponent,
    ReviewComponent
  ],
  providers: [
    FilmService,
    ProfileService,
    UserService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    } ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
