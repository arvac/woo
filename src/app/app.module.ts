import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
//import { PayPal } from '@ionic-native/paypal';
import {SignupPage} from '../pages/signup/signup';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {MenuPage} from '../pages/menu/menu';
import{ListPage} from '../pages/list/list';
import{CartPage} from '../pages/cart/cart';
import {LoginPage} from '../pages/login/login';
import {ProductsByCategoryPage} from '../pages/products-by-category/products-by-category';
import {ProductDetailsPage} from '../pages/product-details/product-details';
import  {CheckoutPage} from '../pages/checkout/checkout';
import  {SearchPage} from '../pages/search/search';
import { WoocommerceProvider } from '../providers/woocommerce/woocommerce';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MenuPage,ProductsByCategoryPage,ProductDetailsPage,CartPage,SignupPage,LoginPage,CheckoutPage,SearchPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MenuPage,ProductsByCategoryPage,ProductDetailsPage,CartPage,SignupPage,LoginPage,CheckoutPage,SearchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    //PayPal,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WoocommerceProvider
  ]
})
export class AppModule {}
