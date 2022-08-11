import { Drawer, Writer } from './controllers';
import { Encoder, Router } from './core';

const encoder = new Encoder();
const router = new Router(window);
new Drawer(router, window, encoder);
new Writer(router, window, encoder);