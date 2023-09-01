export default class UnknowDOMElementError extends Error {
  constructor(selectors: string) {
    super('Unknow DOM element : ' + selectors);
  }
}
