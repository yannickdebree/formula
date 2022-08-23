import { ContainerInstance, Service } from 'typedi';
import { Encoder, QueryParams } from '../core';
import { FilterFunction } from './common';
import { mergeObjects } from './objects';

@Service()
export class QueryParamsAnalyzer {
  private encoder: Encoder;

  constructor(container: ContainerInstance) {
    this.encoder = container.get(Encoder);
  }

  getFiltredQueryParams(
    queryParams: QueryParams,
    filterFn: FilterFunction<string>
  ): QueryParams {
    return mergeObjects(
      Object.keys(queryParams)
        .filter(filterFn)
        .map((key) => ({ [key]: this.encoder.decode(queryParams[key]) }))
    );
  }
}
