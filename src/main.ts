import { Drawer, History, Menu, Writer } from './controllers';
import { ERROR_HANDLER_PROVIDER_TOKEN, Kernel } from './system';
import { CustomErrorHandler } from './utils';

function main(): void {
  const kernel = new Kernel({
    controllers: [Drawer, History, Menu, Writer],
    providers: [
      {
        token: ERROR_HANDLER_PROVIDER_TOKEN,
        useClass: CustomErrorHandler,
      },
    ],
  });

  kernel.run();
}

main();