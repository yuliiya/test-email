import { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useNavigate } from 'react-router';
import { ConvertedMessage } from 'src/api/messages/schemas.ts';

export const useListNavigation = (data: ConvertedMessage[]) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(() => data?.findIndex((item) => item.id === location.pathname) || 0);

  const findItemIndex = (id: string) => {
    return data?.findIndex((item) => item.id === id);
  };

  const navigateToItem = (index: number) => {
    setActiveIndex(index);

    const id = data?.[index].id;
    navigate({ search: `messageId=${id}` });
  };

  useHotkeys('ArrowDown', () => {
    if (activeIndex < Number(data?.length) - 1) {
      navigateToItem(activeIndex + 1);
    }
  });

  useHotkeys('ArrowUp', () => {
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
