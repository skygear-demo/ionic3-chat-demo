import { NgModule, ErrorHandler,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AuthPage } from '../pages/auth/auth';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { ProductPage } from '../pages/product/product';
import { ChatroomPage } from '../pages/chatroom/chatroom';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SkygearService } from './skygear.service';

import { User, Conversations, Products, Emoji } from '../providers/providers';

@NgModule({
  declarations: [
    MyApp,
    AuthPage,
    ContactPage,
    HomePage,
    TabsPage,
    SettingsPage,
    ProductPage,
    ChatroomPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AuthPage,
    ContactPage,
    HomePage,
    TabsPage,
    SettingsPage,
    ProductPage,
    ChatroomPage
  ],
  providers: [
    User,
    Conversations,
    Products,
    Emoji,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SkygearService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
