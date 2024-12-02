export const hotkeysConfig = {
  ui: {
    openSidebar: {
      key: 'Esc',
      description: 'Open and Close Sidebar',
    },
  },
  message: {
    delete: {
      key: 'D',
      description: 'Delete Email',
    },
    toggle: {
      key: 'U',
      description: 'Toggle Email',
    },
  },
  list: {
    inbox: {
      key: 'O',
      description: 'Open Inbox',
    },
    down: {
      key: 'ArrowDown',
      description: 'Open next item',
    },
    up: {
      key: 'ArrowUp',
      description: 'Open previous item',
    },
  },
} as const;

export type HotkeyConfig = typeof hotkeysConfig;
