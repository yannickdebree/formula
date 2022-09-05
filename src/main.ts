import { Drawer, Menu, Title, Writer } from './controllers';
import { Kernel } from './system';

new Kernel([Writer, Drawer, Menu, Title]).run();
