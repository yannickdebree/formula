import { ReplaySubject } from "rxjs";
import { ContainerInstance, Service } from "typedi";
import { QueryParams } from './QueryParams';

@Service()
export class Router {
    private readonly window: Window;
    public readonly queryParams$ = new ReplaySubject<QueryParams>(1);

    constructor(
        container: ContainerInstance
    ) {
        this.window = container.get(Window);
        const urlSearchParamsEntries = new URLSearchParams(this.window.location?.search || '').entries();
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