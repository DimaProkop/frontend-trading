import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './components/app/app.component';
import {UserComponent} from './components/user/user.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {routing} from './app.routing';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CandleService} from './services/candle/candle.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {CandlestickComponent} from './components/candlestick/candlestick.component';
import {AmChartsModule} from '@amcharts/amcharts3-angular';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    DashboardComponent,
    CandlestickComponent
  ],
  imports: [
    routing,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    AmChartsModule
  ],
  providers: [CandleService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
