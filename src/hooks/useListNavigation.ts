import { useCallback, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useNavigate } from 'react-router';
import { ConvertedMessage } from 'src/api/messages/schemas.ts';
import { hotkeysConfig } from 'src/utils/hotkeysConfig.ts';

export const useListNavigation = (data: ConvertedMessage[]) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(() => data?.findIndex((item) => item.id === location.pathname) || 0);

  const findItemIndex = useCallback(
    (id: string) => {
      return data?.findIndex((item) => item.id === id);
    },
    [data],
  );

  const navigateToItem = (index: number) => {
    setActiveIndex(index);

    const id = data?.[index].id;
    navigate({ search: `messageId=${id}` });
  };

  useHotkeys(hotkeysConfig.list.down.key, () => {
    if (activeIndex < Number(data?.length) - 1) {
      navigateToItem(activeIndex + 1);
    }
  });

  useHotkeys(hotkeysConfig.list.up.key, () => {
    if (activeIndex > 0) {
      navigateToItem(activeIndex - 1);
    }
  });

  useEffect(() => {
    const currentIndex = findItemIndex(location.pathname);
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [data, findItemIndex]);

  return {
    findItemIndex,
    navigateToItem,
  };
};
