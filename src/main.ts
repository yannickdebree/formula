import { Drawer } from './Drawer';
import { Router } from './router';
import { Writer } from './Writer';

const router = new Router(window);
new Drawer(router, window);
new Writer(router, window);