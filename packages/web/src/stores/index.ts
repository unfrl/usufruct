export * from './auth.store';
export * from './inventory.store';
export * from './library.store';
export * from './toast.store';

import { RootStore } from './root.store';

export const stores = new RootStore();
