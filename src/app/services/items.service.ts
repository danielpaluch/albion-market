import { Injectable } from '@angular/core';
import { IItems } from '../store/store.reducers';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';

enum API {
  ITEMS = 'assets/items.txt',
}

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  getItems(): Observable<IItems[]> {
    return this.httpClient.get(API.ITEMS, { responseType: 'text' }).pipe(
      switchMap((data) => {
        const lines = data.split('\n');
        let items: IItems[] = lines
          .map((line) => this.transformLine(line))
          .filter((item) => item !== null)
          .map((item) => item as IItems);
        return of(items);
      })
    );
  }

  transformLine(line: string): IItems | null {
    const parts = line.split(':');
    if (parts.length !== 3) {
      return null;
    }
    const id = parts[1].trim();
    const name = parts[2].trim();
    return { id, name };
  }

  constructor(private httpClient: HttpClient) {}
}
