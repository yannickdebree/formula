import { Drawer, Writer } from './controllers';
import { Kernel } from './core';

console.log("test");


new Kernel([Writer, Drawer]).run();