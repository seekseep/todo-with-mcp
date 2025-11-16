import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lists from './routes/Lists';
import Tasks from './routes/Tasks';

const queryClient = new QueryClient();

/**
 * メインアプリケーションコンポーネント
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<Lists />} />
            <Route path="/lists/:listId" element={<Tasks />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
