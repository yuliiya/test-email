import { createBrowserRouter, LoaderFunctionArgs, Navigate, redirect } from 'react-router';
import App from 'src/App.tsx';
import { MessageViewer } from 'src/features/MessageViewer';
import { HotkeysList } from 'src/pages/HotKeysList';
import { Login } from 'src/pages/Login';
import { MessagesList } from 'src/pages/MessagesList';
import { ROUTES } from 'src/routes/constants.ts';
import { getLocalStorageItem, LOCAL_STORAGE_KEYS } from 'src/utils/localStorage.ts';

function loginLoader() {
  const localStorageToken = getLocalStorageItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

  if (localStorageToken) {
    return redirect(ROUTES.HOME);
  }

  return null;
}

function protectedLoader({ request }: LoaderFunctionArgs) {
  const localStorageToken = getLocalStorageItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

  if (!localStorageToken) {
    const params = new URLSearchParams();

    params.set('from', new URL(request.url).pathname);

    return redirect(`${ROUTES.LOGIN}?` + params.toString());
  }

  return null;
}

export const routes = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <App />,
    loader: protectedLoader,
    children: [
      { index: true, element: <Navigate to={ROUTES.INBOX} /> },
      {
        path: ROUTES.HOME,
        element: <MessagesList />,
        children: [
          {
            path: ':emailId',
            Component: MessageViewer,
          },
        ],
      },
      {
        path: ROUTES.INFO,
        element: <HotkeysList />,
      },
    ],
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
    loader: loginLoader,
  },
  {
    path: '*',
    element: <div>Page Not Found</div>,
  },
]);
