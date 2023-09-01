import { ErrorHandler } from './types';

export default class KernelErrorHandler implements ErrorHandler {
  handle(error: any): void {
    console.error('KERNEL ERROR: ', error);
  }
}
