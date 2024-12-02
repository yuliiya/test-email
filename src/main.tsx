import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { DIContainer } from 'jet-blaze/di-react';

import { QueryClient, QueryClientProvider } from 'react-query';

import { routes } from 'src/routes/routes.tsx';
import { createContainer } from 'src/composition-root/composition-root.ts';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <StrictMode>
      <DIContainer container={createContainer}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={routes} />
        </QueryClientProvider>
      </DIContainer>
    </StrictMode>
  </GoogleOAuthProvider>,
);
