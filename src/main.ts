import { Drawer, History, Menu, Writer } from './controllers';
import { ERROR_HANDLER, Kernel } from './system';
import { CustomErrorHandler } from './utils';

new Kernel({
  controllers: [Drawer, History, Menu, Writer],
  providers: [
    {
      token: ERROR_HANDLER,
      useClass: CustomErrorHandler,
    },
  ],
}).run();
