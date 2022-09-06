import { Context2DNotAvailableError } from '../domain';
import { ErrorHandler, Inject } from '../system';
import { Snackbar } from './Snackbar';

@Inject(Snackbar)
export class CustomErrorHandler implements ErrorHandler {
  constructor(private readonly snackbar: Snackbar) {}

  handle(err: any) {
    const innerError = err.innerError;

    if (innerError instanceof Context2DNotAvailableError) {
      this.snackbar.open({
        message: '2D context is not available on your browser',
      });
      return;
    }

    console.error(err);
  }
}
