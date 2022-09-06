import { Menu } from './controllers';
import { ERROR_HANDLER, Kernel } from './system';
import { CustomErrorHandler } from './utils';

new Kernel({
  controllers: [Menu],
  providers: [
    {
      token: ERROR_HANDLER,
      useClass: CustomErrorHandler,
    },
  ],
}).run();
