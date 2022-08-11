import { Drawer, Writer } from './controllers';
import { Kernel } from './core';

new Kernel([Writer, Drawer]).run();