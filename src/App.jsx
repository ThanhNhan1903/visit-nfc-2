import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BusinessCard from './components/BusinessCard';
import usersData from './data/users.json';
import { useParams } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600">Page not found</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Route cho từng user */}
        <Route path="/users/:userId" element={<BusinessCardWrapper />} />

        {/* Tất cả các route khác sẽ hiển thị 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

// Component wrapper để lấy userId từ URL
function BusinessCardWrapper() {
  const { userId } = useParams();

  // Kiểm tra xem userId có tồn tại trong data không
  if (!usersData.users[userId]) {
    return <NotFound />;
  }

  return <BusinessCard userId={userId} />;
}

export default App;