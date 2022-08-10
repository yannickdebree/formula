import { ReplaySubject } from "rxjs";
import { QueryParams } from './QueryParams';

export class Router {
    public readonly queryParams$ = new ReplaySubject<QueryParams>(1);

    constructor(private readonly window: Window) {
        const urlSearchParamsEntries = new URLSearchParams(window.location.search).entries();
        let yieldResult = urlSearchParamsEntries.next();
        const result: [string, string][] = []
        while (!yieldResult.done) {
            result.push(yieldResult.value)
            yieldResult = urlSearchParamsEntries.next();
        }

        this.queryParams$.next(result.sort((a, b) => b[0].localeCompare(a[0])).map(c => ({ [c[0]]: c[1] })).reduce((acc, d) => ({ ...acc, ...d }), {}));
    }

    navigate(queryParams: QueryParams) {
        const url = new URL(this.window.location.href);
        Object.keys(queryParams).forEach((key) => {
            url.searchParams.set(key, queryParams[key]);
        })
        this.window.history.pushState(null, 'Free Mathematic Formula Drawer', url.search)
        this.queryParams$.next(queryParams);
    }
}