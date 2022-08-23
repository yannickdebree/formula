import { Drawer, MobileMenu, Writer } from './controllers';
import { Kernel } from './core';

new Kernel([Writer, Drawer, MobileMenu]).run();
