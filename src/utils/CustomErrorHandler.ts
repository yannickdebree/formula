import { ErrorHandler, Inject } from '../system';
import { Snackbar } from './Snackbar';

@Inject(Snackbar)
export class CustomErrorHandler implements ErrorHandler {
  constructor(private readonly snackbar: Snackbar) {}

  handle(err: any) {
    this.snackbar.open({ message: err });
  }
}
