import { ContainerBuilder, type Resolve } from 'jet-blaze/di';

import { contextMenuModule } from './context-menu-module';

export const createContainer = (): Resolve => {
  const builder = new ContainerBuilder();

  builder.registerModule(contextMenuModule);

  return builder.build();
};
