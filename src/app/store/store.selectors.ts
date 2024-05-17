import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from './app.state';

export const selectFeature = (state: AppState) => state.prices;

export const getPricesDataSelector = createSelector(
  selectFeature,
  (state) => state.prices.data
);
export const getPricesErrorSelector = createSelector(
  selectFeature,
  (state) => state.prices.error
);
export const getPricesChartDataSelector = createSelector(
  selectFeature,
  (state) => state.chartPrices.data
);
export const getPricesChartErrorSelector = createSelector(
  selectFeature,
  (state) => state.chartPrices.error
);
export const getItemsDataSelector = createSelector(
  selectFeature,
  (state) => state.items.data
);
export const getItemsErrorSelector = createSelector(
  selectFeature,
  (state) => state.items.error
);
