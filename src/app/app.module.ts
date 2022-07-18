import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { MenubarModule } from 'primeng/menubar';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ImageModule } from 'primeng/image';
import { DockModule } from 'primeng/dock';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { LandingComponent } from './landing/landing.component';
import { AppsComponent } from './apps/apps.component';
import { LogoutNavComponent } from './shared/logout-nav/logout-nav.component';



@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    AppsComponent,
    LogoutNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    MenuModule,
    RippleModule,
    BrowserAnimationsModule,
    MenubarModule,
    ToolbarModule,
    SplitButtonModule,
    ImageModule,
    DockModule,
    FlexLayoutModule,
    InputTextModule,
    TooltipModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
