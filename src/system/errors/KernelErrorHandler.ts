import { ErrorHandler } from './ErrorHandler';

export class KernelErrorHandler implements ErrorHandler {
  handle(err: any) {
    console.error('KERNEL ERROR: ', err);
  }
}
