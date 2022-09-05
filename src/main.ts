import 'reflect-metadata';
import { Drawer, Menu, Writer } from './controllers';
import { Kernel } from './core';

new Kernel([Writer, Drawer, Menu]).run();
