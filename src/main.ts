import 'reflect-metadata';
import { Drawer, Menu, Title, Writer } from './controllers';
import { Kernel } from './core';

new Kernel([Writer, Drawer, Menu, Title]).run();
