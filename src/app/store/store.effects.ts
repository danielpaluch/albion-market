import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as actions from '../store/store.actions';
import { HttpClient } from '@angular/common/http';
import { IItems, IPrices } from './store.reducers';
import { of } from 'rxjs';
import { IMarketChart } from '../market-chart/market-chart.component';

enum API {
  PRICES = 'https://europe.albion-online-data.com/api/v2/stats/prices',
  CHART_PRICES = 'https://europe.albion-online-data.com/api/v2/stats/history',
  LOCATIONS = 'Caerleon,Bridgewatch,Martlock,Thetford,FortSterling,Lymhurst,Brecilien',
  ITEMS = 'albion-app/src/app/assets/items.txt',
}

@Injectable()
export class PriceEffects {
  getChartPrices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getPricesCharts),
      switchMap((action) =>
        this.http
          .get<IMarketChart[]>(
            API.CHART_PRICES +
              `/${action.items}.json?locations=${API.LOCATIONS}&qualities=${
                action.quality
              }&date=${this.getYesterdayAtCurrentTime()}`
          )
          .pipe(
            map((data) => actions.getPricesChartsSuccess({ data: data })),
            catchError((error) =>
              of(actions.getPricesChartsFailure({ error: error }))
            )
          )
      )
    )
  );

  getPrices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getPrices),
      switchMap((action) =>
        this.http
          .get<IPrices[]>(
            API.PRICES +
              `/${action.items}.json?locations=${API.LOCATIONS}&qualities=${action.quality}`
          )
          .pipe(
            map((data) => actions.getPricesSuccess({ data: data })),
            catchError((error) =>
              of(actions.getPricesFailure({ error: error }))
            )
          )
      )
    )
  );

  getItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getItems),
      switchMap((action) =>
        this.http.get(API.ITEMS, { responseType: 'text' }).pipe(
          map((data) => {
            const items = this.parseItems(data);
            return actions.getItemsSuccess({ data: items });
          })
        )
      )
    )
  );

  private getYesterdayAtCurrentTime(): string {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, '0');
    const day = String(yesterday.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  private parseItems(data: string): IItems[] {
    const lines = data.split('\n');
    const items: IItems[] = [];
    lines.forEach((line) => {
      const parts = line.split(':');
      if (parts.length === 2) {
        const id = parts[0].trim();
        const name = parts[1].trim();
        items.push({ id, name });
      }
    });
    return items;
  }

  constructor(private actions$: Actions, private http: HttpClient) {}
}
