import { Menu } from './controllers';
import { Kernel } from './system';

new Kernel({ controllers: [Menu] }).run();
