import './index.css';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { DIContainer } from 'jet-blaze/di-react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider } from 'react-router';
import { createContainer } from 'src/composition-root/composition-root.ts';
import { routes } from 'src/routes/routes.tsx';

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
