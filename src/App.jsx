import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BusinessCard from './components/BusinessCard';
import UserList from './components/UserList';
import usersData from './data/users.json';
import { useParams } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        {/* Trang danh sách users */}
        <Route path="/" element={<UserList />} />

        {/* Route cho từng user */}
        <Route path="/users/:userId" element={<BusinessCardWrapper />} />
      </Routes>
    </Router>
  );
}

// Component wrapper để lấy userId từ URL
function BusinessCardWrapper() {
  const { userId } = useParams();

  // Kiểm tra xem userId có tồn tại trong data không
  if (!usersData.users[userId]) {
    return <div>User not found</div>;
  }

  return <BusinessCard userId={userId} />;
}

export default App;