import { HotkeyConfig } from 'src/utils/hotkeysConfig.ts';

export const convertHotkeys = (config: HotkeyConfig) => {
  return Object.entries(config).reduce(
    (acc, [, actions]) => {
      Object.entries(actions).forEach(([, action]) => {
        acc.push({
          key: action.key,
          description: action.description,
        });
      });
      return acc;
    },
    [] as { key: string; description: string }[],
  );
};
