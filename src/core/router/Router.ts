import { ReplaySubject } from 'rxjs';
import { ContainerInstance, Service } from 'typedi';
import { APPLICATION_NAME, mergeObjects } from '../../utils';
import { QueryParams } from './QueryParams';

@Service()
export class Router {
  private readonly window: Window;
  private queryParams?: QueryParams;
  public readonly queryParams$ = new ReplaySubject<QueryParams>(1);

  constructor(container: ContainerInstance) {
    this.window = container.get(Window);

    this.setQueryParams(this.window.location.search);
  }

  navigate(queryParams: QueryParams) {
    const url = new URL(this.window.location.href);
    Object.keys(queryParams).forEach((key) => {
      url.searchParams.set(key, queryParams[key]);
    });

    this.window.history.pushState(
      null,
      APPLICATION_NAME,
      url.pathname + url.search
    );

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

    const queryParams = mergeObjects(
      result
        .sort((a, b) => b[0].localeCompare(a[0]))
        .map((c) => ({ [c[0]]: c[1] }))
    );

    this.queryParams = queryParams;
    this.queryParams$.next(queryParams);
  }
}
