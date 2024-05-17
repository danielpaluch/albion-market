import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { reducers } from './store/app.state';
import { EffectsModule } from '@ngrx/effects';
import { PriceEffects } from './store/store.effects';
import { HttpClientModule } from '@angular/common/http';
import { MarketChartComponent } from './market-chart/market-chart.component';

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([PriceEffects]),
    RouterOutlet,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MarketChartComponent,
  ],

  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
