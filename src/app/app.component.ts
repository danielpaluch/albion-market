import { Component, ElementRef } from '@angular/core';
import { AppState } from './store/app.state';
import { Store, select } from '@ngrx/store';
import * as actions from './store/store.actions';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, zip } from 'rxjs';
import { IItems, IPrices } from './store/store.reducers';
import {
  getPricesChartDataSelector,
  getPricesChartErrorSelector,
  getPricesDataSelector,
  getPricesErrorSelector,
} from './store/store.selectors';
import { ItemsService } from './services/items.service';
import {
  IMarketChart,
  IMarketChartData,
} from './market-chart/market-chart.component';

export interface ICityMarket extends IPrices {
  chartData: IMarketChartData[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  marketForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    quality: new FormControl(''),
  });

  pricesData$: Observable<IPrices[]>;
  pricesError$: Observable<any>;
  chartPricesData$: Observable<IMarketChart[]>;
  chartPricesError$: Observable<any>;
  itemsData: IItems[] = [];

  cities: ICityMarket[] = [];

  constructor(
    private store: Store<AppState>,
    private itemsService: ItemsService,
    private elementRef: ElementRef
  ) {
    this.pricesData$ = this.store.pipe(select(getPricesDataSelector));
    this.chartPricesData$ = this.store.pipe(select(getPricesChartDataSelector));

    this.pricesError$ = this.store.pipe(select(getPricesErrorSelector));
    this.chartPricesError$ = this.store.pipe(
      select(getPricesChartErrorSelector)
    );

    this.itemsService.getItems().subscribe((response) => {
      this.itemsData = response;
    });

    zip(this.chartPricesData$, this.pricesData$).subscribe(
      ([chartResponse, priceResponse]) => {
        if (chartResponse !== undefined && priceResponse !== undefined) {
          const cityMarkets: ICityMarket[] = [];
          priceResponse.forEach((priceMarket) => {
            const foundSameMarket = chartResponse.find(
              (chart) => chart.location === priceMarket.city
            )?.data;
            if (foundSameMarket) {
              const cityMarket: ICityMarket = {
                ...priceMarket,
                chartData: foundSameMarket,
              };
              cityMarkets.push(cityMarket);
            } else {
              const cityMarket: ICityMarket = {
                ...priceMarket,
                chartData: [],
              };
              cityMarkets.push(cityMarket);
            }
          });
          this.cities = cityMarkets;
        }
      }
    );
    zip(this.chartPricesError$, this.pricesError$).subscribe(
      ([chartResponse, priceResponse]) => {
        console.log('err', chartResponse);
        console.log('err', priceResponse);
      }
    );
  }

  formatDate(inputDate: string) {
    const date = new Date(inputDate);

    return date.toLocaleString('pl-PL', {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
  }
  search() {
    this.cities = [];
    const form = this.marketForm.getRawValue();
    let items: string = '';
    let itemNames = form.name.trim().split(',');
    itemNames.forEach((itemName: string) => {
      const item = this.itemsData.find((item) => item.name === itemName);
      if (item) items = items + (items !== '' ? ',' : '') + item.id;
    });
    this.store.dispatch(
      actions.getPrices({ items: items, quality: parseInt(form.quality) + 1 })
    );
    this.store.dispatch(
      actions.getPricesCharts({
        items: items,
        quality: parseInt(form.quality) + 1,
      })
    );
  }
}
