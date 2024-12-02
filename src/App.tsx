import { Outlet } from 'react-router';
import { AppSidebar } from 'src/features/AppSidebar/AppSidebar.tsx';

import { Layout } from '../src/components/Layout/Layout.tsx';

function App() {
  return (
    <Layout sidebar={<AppSidebar />}>
      <Outlet />
    </Layout>
  );
}

export default App;
