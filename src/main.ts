import { Drawer } from './Drawer';
import { Encoder } from './Encoder';
import { Router } from './router';
import { Writer } from './Writer';

const encoder = new Encoder();
const router = new Router(window);
new Drawer(router, window, encoder);
new Writer(router, window, encoder);