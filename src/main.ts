import { Encoder, Router } from './core';
import { Drawer, Writer } from './views';

const encoder = new Encoder();
const router = new Router(window);
new Drawer(router, window, encoder);
new Writer(router, window, encoder);