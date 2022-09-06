import { History } from './controllers';
import { ERROR_HANDLER, Kernel } from './system';
import { CustomErrorHandler } from './utils';

new Kernel({
  controllers: [History],
  providers: [
    {
      token: ERROR_HANDLER,
      useClass: CustomErrorHandler,
    },
  ],
}).run();
