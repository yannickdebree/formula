import { Drawer } from './Drawer';
import { Router } from './router';
import { View } from './View';

const router = new Router(window);
new Drawer(router, window);
new View(router, window);