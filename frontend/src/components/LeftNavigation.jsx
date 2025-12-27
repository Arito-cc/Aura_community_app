import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Bell, User, Settings, PlusSquare, ShieldCheck } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const LeftNavigation = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  
  const menuItems = [
    { name: 'Home', icon: <Home size={26} />, path: '/' },
    { name: 'Explore', icon: <Compass size={26} />, path: '/search' },
    { name: 'Profile', icon: <User size={26} />, path: '/profile' },
    { name: 'Settings', icon: <Settings size={26} />, path: '/settings' },
  ];

  // Logic: Show Admin Dashboard link ONLY if user is an approved admin
  if (user && user.role === 'admin') {
    menuItems.push({ name: 'Admin', icon: <ShieldCheck size={26} className="text-violet-500" />, path: '/admin' });
  }
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <div className="flex flex-col gap-1">
      {menuItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group ${
            isActive(item.path) ? 'bg-[#121212] font-bold' : 'hover:bg-[#121212]'
          }`}
        >
          <span className={`${isActive(item.path) ? 'text-white' : 'text-[#A8A8A8] group-hover:text-white'}`}>
            {item.icon}
          </span>
          <span className="text-xl hidden lg:block">{item.name}</span>
        </Link>
      ))}

      {user && (
        <Link
          to="/create-topic"
          className="mt-6 flex items-center gap-4 p-3 rounded-xl hover:bg-[#121212] transition-all group"
        >
          <PlusSquare size={26} className="text-[#A8A8A8] group-hover:text-white" />
          <span className="text-lg hidden lg:block text-[#A8A8A8] group-hover:text-white">Create Pulse</span>
        </Link>
      )}
    </div>
  );
};

export default LeftNavigation;