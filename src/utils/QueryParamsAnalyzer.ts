import { ContainerInstance, Service } from "typedi";
import { Encoder, QueryParams } from "../core";

@Service()
export class QueryParamsAnalyzer {
    private encoder: Encoder;

    constructor(
        container: ContainerInstance
    ) {
        this.encoder = container.get(Encoder)
    }

    getFiltredQueryParams(queryParams: QueryParams, filter: (key: string) => boolean): QueryParams {
        return Object.keys(queryParams)
            .filter(filter)
            .reduce((acc, key) => ({ ...acc, ...{ [key]: this.encoder.decode(queryParams[key]) } }), {})
    }
}