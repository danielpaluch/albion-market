import { createReducer, on } from '@ngrx/store';
import * as actions from './store.actions';
import { HttpErrorResponse } from './app.state';
import { IMarketChart } from '../market-chart/market-chart.component';

export interface IMarketState {
  prices: {
    data: IPrices[];
    error: HttpErrorResponse | null;
  };
  chartPrices: {
    data: IMarketChart[];
    error: HttpErrorResponse | null;
  };
  items: {
    data: IItems[];
    error: HttpErrorResponse | null;
  };
}

export interface IItems {
  id: string;
  name: string;
}

export interface IPrices {
  item_id: string;
  city: string;
  quality: number;
  sell_price_min: number;
  sell_price_min_date: string;
  sell_price_max: number;
  sell_price_max_date: string;
  buy_price_min: number;
  buy_price_min_date: string;
  buy_price_max: number;
  buy_price_max_date: string;
}

export const initialState: IMarketState = {
  prices: {
    data: [],
    error: null,
  },
  chartPrices: {
    data: [],
    error: null,
  },
  items: {
    data: [],
    error: null,
  },
};

export const priceReducer = createReducer(
  initialState,
  on(actions.getPrices, (state) => ({
    ...state,
  })),
  on(actions.getPricesSuccess, (state, action) => ({
    ...state,
    prices: {
      data: action.data,
      error: null,
    },
  })),
  on(actions.getPricesFailure, (state, action) => ({
    ...state,
    prices: {
      ...state.prices,
      error: action.error,
    },
  })),

  on(actions.getPricesCharts, (state) => ({
    ...state,
  })),
  on(actions.getPricesChartsSuccess, (state, action) => ({
    ...state,
    chartPrices: {
      data: action.data,
      error: null,
    },
  })),
  on(actions.getPricesChartsFailure, (state, action) => ({
    ...state,
    chartPrices: {
      ...state.chartPrices,
      error: action.error,
    },
  })),

  on(actions.getItems, (state) => ({
    ...state,
  })),
  on(actions.getItemsSuccess, (state, action) => ({
    ...state,
    items: {
      data: action.data,
      error: null,
    },
  })),
  on(actions.getItemsFailure, (state, action) => ({
    ...state,
    items: {
      ...state.items,
      error: action.error,
    },
  }))
);
