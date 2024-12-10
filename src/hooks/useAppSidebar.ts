import { googleLogout } from '@react-oauth/google';
import { useCallback, useMemo, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useNavigate } from 'react-router';
import { useLabels } from 'src/api/labels/queries.ts';
import { ROUTES } from 'src/routes/constants.ts';
import { filterAndTransformLabels } from 'src/utils/filterAndTransformLabels.tsx';
import { hotkeysConfig } from 'src/utils/hotkeysConfig.ts';
import { clearLocalStorage } from 'src/utils/localStorage.ts';

export const useAppSidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const handleExpand = useCallback(() => setExpanded((prev) => !prev), []);
  const isExpanded = useMemo(() => expanded, [expanded]);
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    googleLogout();
    clearLocalStorage();
    navigate(ROUTES.LOGIN);
  }, [navigate]);

  const { data: labels } = useLabels();

  const navBarItems = useMemo(() => labels && filterAndTransformLabels(labels), [labels]);

  useHotkeys([hotkeysConfig.ui.openSidebar.key, hotkeysConfig.list.inbox.key], (_, { hotkey }) => {
    switch (hotkey) {
      case hotkeysConfig.ui.openSidebar.key:
        handleExpand();
        break;
      case hotkeysConfig.list.inbox.key:
        navigate(ROUTES.INBOX);
        break;
    }
  });

  return {
    isExpanded,
    navBarItems,
    handleExpand,
    handleLogout,
  };
};
