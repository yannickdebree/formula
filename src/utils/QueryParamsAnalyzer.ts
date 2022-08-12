import { ContainerInstance, Service } from "typedi";
import { Encoder, QueryParams } from "../core";
import { mergeObjects } from "./objects";

@Service()
export class QueryParamsAnalyzer {
    private encoder: Encoder;

    constructor(
        container: ContainerInstance
    ) {
        this.encoder = container.get(Encoder)
    }

    getFiltredQueryParams(queryParams: QueryParams, filter: (key: string) => boolean): QueryParams {
        return mergeObjects(Object.keys(queryParams)
            .filter(filter)
            .map(key => ({ [key]: this.encoder.decode(queryParams[key]) })));
    }
}