import { ReplaySubject } from "rxjs";
import { QueryParams } from './QueryParams';

export class Router {
    public readonly events = new ReplaySubject<QueryParams>(1);

    constructor(private readonly window: Window) {
        const urlSearchParamsEntries = new URLSearchParams(window.location.search).entries();
        let yieldResult = urlSearchParamsEntries.next();
        const result: [string, string][] = []
        while (!yieldResult.done) {
            result.push(yieldResult.value)
            yieldResult = urlSearchParamsEntries.next();
        }

        const queryParams = result.sort((a, b) => b[0].localeCompare(a[0])).map(c => ({ [c[0]]: c[1] })).reduce((acc, d) => ({ ...acc, ...d }), {})
        this.events.next(queryParams)
    }

    navigate(queryParams: QueryParams) {
        let url = '/';
        Object.keys(queryParams).forEach((key, index) => {
            url += (index === 0 ? `?` : '&') + `${key}=` + queryParams[key];
        });
        this.window.history.pushState(null, 'Free Mathematic Formula Drawer', url)
        this.events.next(queryParams);
    }
}