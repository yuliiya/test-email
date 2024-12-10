import { Outlet } from 'react-router';
import { Layout } from 'src/components/Layout';
import { AppSidebar } from 'src/features/AppSidebar';

function App() {
  return (
    <Layout sidebar={<AppSidebar />}>
      <Outlet />
    </Layout>
  );
}

export default App;
