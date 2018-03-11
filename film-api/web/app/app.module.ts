import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { registerLocaleData, CommonModule  } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import localeRu from '@angular/common/locales/ru';
import { XHRBackend, RequestOptions } from '@angular/http';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

import { TooltipModule } from 'ngx-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { TimeAgoPipe } from 'time-ago-pipe';
import { StarRatingModule } from 'angular-star-rating';

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
import { InviteService } from './services/invite-service/invite.service';
import { ReviewService } from './services/review-service/review.service';

import { TokenInterceptor } from './interceptors/tokenInterceptor'
import { HttpClient } from 'selenium-webdriver/http';
import { InvitesComponent } from './components/profile/invites/invites.component';
import { HistoryComponent } from './components/profile/history/history.component';
import { SettingsComponent } from './components/profile/settings/settings.component';
import { ReviewComponent } from './components/profile/review/review.component';
import { FooterComponent } from './components/footer/footer.component';

import { MaterialModule } from './material.module';
import { HistoryService } from './services/history-service/history.service';
import { NotfoundComponent } from './components/notfound/notfound/notfound.component';
import { ServererrorComponent } from './components/servererror/servererror/servererror.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { AdminService } from './services/admin-service/admin.service';

registerLocaleData(localeRu, 'ru');

@NgModule({
  imports: [
    MaterialModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    LoadingBarHttpClientModule,
    ToastrModule.forRoot(),
    TooltipModule.forRoot(),
    StarRatingModule.forRoot()
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
    HistoryComponent,
    SettingsComponent,
    ReviewComponent,
    FooterComponent,
    TimeAgoPipe,
    NotfoundComponent,
    ServererrorComponent,
    AdminComponent
  ],
  providers: [
    FilmService,
    ProfileService,
    UserService,
    AuthService,
    InviteService,
    ReviewService,
    HistoryService,
    AdminService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    } ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
