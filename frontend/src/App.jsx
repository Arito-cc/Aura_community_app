import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import LeftNavigation from './components/LeftNavigation';
import Sidebar from './components/Sidebar';
import HomeFeed from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TopicDetail from './pages/TopicDetail';
import Profile from './pages/Profile';
import CreateTopic from './pages/CreateTopic';
import Settings from './pages/Settings';
import SearchPage from './pages/SearchPage';
import UpvotedPosts from './pages/UpvotedPosts';
import AdminDashboard from './pages/AdminDashboard'; // Ensure this is imported
import { Home as HomeIcon, Search, PlusSquare, Heart, User, ShieldCheck } from 'lucide-react';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 pt-14 sm:pt-16 pb-20 sm:pb-0">
          {/* DESKTOP SIDEBAR */}
          <aside className="hidden md:block md:col-span-3 lg:col-span-2 sticky top-14 h-[calc(100vh-56px)] p-4 border-r border-white/5">
            <LeftNavigation />
          </aside>

          {/* MAIN CONTENT */}
          <main className="col-span-1 md:col-span-9 lg:col-span-7 bg-black min-h-screen">
            <Routes>
              <Route path="/" element={<HomeFeed />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/create-topic" element={<CreateTopic />} />
              <Route path="/upvoted" element={<UpvotedPosts />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/topic/:id" element={<TopicDetail />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>

          {/* RIGHT SIDEBAR (Desktop Only) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-14 h-fit p-4">
            <Sidebar />
          </aside>
        </div>

        {/* FIXED MOBILE BOTTOM NAVIGATION */}
        <nav className="fixed bottom-0 w-full bg-black/90 backdrop-blur-xl border-t border-white/5 h-16 flex items-center justify-around sm:hidden z-50 px-2">
          <Link to="/" className="p-2 text-gray-400 hover:text-white transition-colors">
            <HomeIcon size={24} />
          </Link>
          <Link to="/search" className="p-2 text-gray-400 hover:text-white transition-colors">
            <Search size={24} />
          </Link>
          <Link to="/create-topic" className="p-2 bg-violet-600 rounded-2xl text-white shadow-lg shadow-violet-500/20">
            <PlusSquare size={24} />
          </Link>
          
          {/* MOBILE ADMIN LINK - Only shows for Admins */}
          {user && user.role === 'admin' ? (
            <Link to="/admin" className="p-2 text-violet-500 hover:text-violet-400 transition-colors">
              <ShieldCheck size={24} />
            </Link>
          ) : (
            <Link to="/upvoted" className="p-2 text-gray-400 hover:text-white transition-colors">
              <Heart size={24} />
            </Link>
          )}

          <Link to="/profile" className="p-2 text-gray-400 hover:text-white transition-colors">
            <User size={24} />
          </Link>
        </nav>

        <Toaster position="bottom-center" />
      </div>
    </Router>
  );
}

export default App;