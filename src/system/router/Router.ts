import { ReplaySubject } from 'rxjs';
import { mergeObjects } from '../../core';
import { Inject } from '../di';
import { QueryParams } from './QueryParams';

@Inject(Window)
export class Router {
  public readonly url$ = new ReplaySubject<URL>(1);
  public readonly queryParams$ = new ReplaySubject<QueryParams>(1);

  constructor(private readonly window: Window) {
    this.setQueryParams(this.window.location.search);
  }

  navigate(queryParams: QueryParams) {
    const url = new URL(this.window.location.href);

    Object.keys(queryParams).forEach((key) => {
      url.searchParams.set(key, queryParams[key]);
    });

    this.url$.next(url);

    this.setQueryParams(url.search);
  }

  private setQueryParams(urlSearch: string) {
    const urlSearchParamsEntries = new URLSearchParams(urlSearch).entries();

    let yieldResult = urlSearchParamsEntries.next();

    const result: [string, string][] = [];
    while (!yieldResult.done) {
      result.push(yieldResult.value);
      yieldResult = urlSearchParamsEntries.next();
    }

    this.queryParams$.next(mergeObjects(result.map((r) => ({ [r[0]]: r[1] }))));
  }
}
