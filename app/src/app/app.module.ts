import { ComponentsModule } from './shared/components/components.module';
import { AuthGuard } from './shared/guards/auth.guard';
import { ErrorHandlingInterceptor } from './shared/interceptors/error-handling.interceptor';
import { HeadersInterceptor } from './shared/interceptors/headers.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

const INTERCEPTOR_PROVIDERS = [
  { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlingInterceptor, multi: true }];

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthGuard,
    INTERCEPTOR_PROVIDERS,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
