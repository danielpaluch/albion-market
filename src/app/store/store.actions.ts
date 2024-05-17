import { createAction, props } from '@ngrx/store';
import { IItems, IPrices } from './store.reducers';
import { HttpErrorResponse } from './app.state';
import { IMarketChart } from '../market-chart/market-chart.component';

export const getPrices = createAction(
  '[PRICES] Get Prices',
  props<{ items: string; quality: number }>()
);
export const getPricesSuccess = createAction(
  '[PRICES] Get Prices Success',
  props<{ data: IPrices[] }>()
);
export const getPricesFailure = createAction(
  '[PRICES] Get Prices Failure',
  props<{ error: HttpErrorResponse }>()
);
export const getPricesCharts = createAction(
  '[PRICES] Get Prices Chart',
  props<{ items: string; quality: number }>()
);
export const getPricesChartsSuccess = createAction(
  '[PRICES] Get Prices Chart Success',
  props<{ data: IMarketChart[] }>()
);
export const getPricesChartsFailure = createAction(
  '[PRICES] Get Prices Chart Failure',
  props<{ error: HttpErrorResponse }>()
);

export const getItems = createAction('[ITEMS] Get Items');
export const getItemsSuccess = createAction(
  '[ITEMS] Get Items Success',
  props<{ data: IItems[] }>()
);
export const getItemsFailure = createAction(
  '[ITEMS] Get Items Failure',
  props<{ error: HttpErrorResponse }>()
);
