import { FC, useMemo } from 'react';
import { convertHotkeys } from 'src/utils/convertHotkeys.ts';
import { hotkeysConfig } from 'src/utils/hotkeysConfig.ts';

export const HotkeysList: FC = () => {
  const hotkeys = useMemo(() => convertHotkeys(hotkeysConfig), []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-6">Hotkeys List</h2>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <ul className="space-y-4">
          {hotkeys.map((item) => (
            <li key={item.key} className="flex justify-between items-center p-2 border-b last:border-0">
              <span className="text-lg font-medium">{item.key}</span>
              <span className="text-gray-600">{item.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
