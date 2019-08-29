import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LandingComponent } from './landing/landing.component';
import { ErrorComponent } from './error/error.component';
import { AuthComponent } from './auth/auth.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { TournoCreationComponent } from './tourno-creation/tourno-creation.component';
import { TournoSearchComponent } from './tournos-search/tournos-search.component';
import { PlayersSearchComponent } from './players-search/players-search.component';
import { PlayerProfileComponent } from './player-profile/player-profile.component';
import { TournoProfileComponent } from './tourno-profile/tourno-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    ErrorComponent,
    AuthComponent,
    ProfileSettingsComponent,
    TournoCreationComponent,
    TournoSearchComponent,
    PlayersSearchComponent,
    PlayerProfileComponent,
    TournoProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
