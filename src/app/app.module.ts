import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';

import { NgxEchartsModule } from 'ngx-echarts';
import { ButtonModule } from 'primeng/button';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
// import { LD_CLIENT_TOKEN } from './launchdarkly.token';
// import * as LDClient from 'launchdarkly-js-client-sdk';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    ThemeSwitcherComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
