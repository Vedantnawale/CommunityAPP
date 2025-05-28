import React, { useState } from 'react';
import { FaHeart, FaComment, FaShareAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NotLogin from '../component/NotLogin';
import { logout } from '../redux/Slices/AuthSlice';


const HomePage = () => {

  const dispatch = useDispatch();

  const [postType, setPostType] = useState('update');
  const [isOpen, setIsOpen] = useState(false);
  
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  const handleLogout = async (event) => {
        event.preventDefault();
    
        // calling logout action
        const res = await dispatch(logout());
    
        // redirect to home page if true
        if (res?.payload?.success) navigate("/");
      };

  //console.log(isLoggedIn);

  return (
    <>
      {isLoggedIn && (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
          {/* Navbar */}
          <header className="flex items-center justify-between p-4 border-b bg-white">
            <div className="flex items-center gap-2 text-2xl font-semibold">
              <span className="text-blue-600 text-3xl">&lt;/&gt;</span> Community <span className=' text-blue-600'>APP</span>
            </div>
            <nav className="flex gap-6 font-medium text-lg">
              <button className="font-semibold bg-black text-white px-3 py-1 rounded">Feed</button>
              <button>Developers</button>
            </nav>
            <div className="flex items-center gap-4">
              <button className="text-xl">🔔</button>
              <div className="relative inline-block text-left">
                {/* Profile Button */}
                <button
                  className="w-8 h-8 rounded-full bg-gray-300"
                  title="Profile"
                  onClick={() => setIsOpen(!isOpen)}
                ></button>

                {/* Dropdown */}
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
                    <ul className="py-1">
                      <li>
                        <Link to="/user">
                          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700">
                            Profile
                          </button>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <button 
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                          onClick={handleLogout}
                          >
                            Logout
                          </button>
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {/* Create Post */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow p-4 space-y-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => setPostType('update')}
                    className={`px-4 py-1 rounded border ${postType === 'update' ? 'bg-black text-white' : ''}`}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setPostType('question')}
                    className={`px-4 py-1 rounded border ${postType === 'question' ? 'bg-black text-white' : ''}`}
                  >
                    Question
                  </button>
                </div>

                <textarea
                  placeholder="Share an update..."
                  className="w-full border rounded p-2 resize-none h-24"
                />
                <input
                  type="text"
                  placeholder="Tags (comma-separated)"
                  className="w-full border rounded p-2"
                />
                <button className="bg-gray-400 text-white px-6 py-1 rounded">Post</button>
              </div>

              {/* One Sample Post */}
              <div className="bg-white rounded-xl shadow p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-300" />
                    <div>
                      <div className="font-semibold">Virat Kohli <span className="bg-black text-white text-xs px-2 py-0.5 rounded ml-1">UPDATE</span></div>
                      <div className="text-sm text-gray-500">5/27/2025</div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-lg">Hello Sir</div>
                <div className="flex gap-6 pt-3 text-gray-600 text-sm">
                  <span className="flex items-center gap-1"><FaHeart /> 0</span>
                  <span className="flex items-center gap-1"><FaComment /> 0</span>
                  <span className="flex items-center gap-1"><FaShareAlt /> Share</span>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="bg-white rounded-xl shadow p-4">
                <h2 className="font-bold text-lg mb-2">📈 Trending Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'Node.js', 'Python', 'JavaScript'].map(tag => (
                    <span key={tag} className="bg-gray-200 text-sm px-3 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow p-4">
                <h2 className="font-bold text-lg mb-2">📊 Community Stats</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Developers</span><span className="font-bold">1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Posts Today</span><span className="font-bold">42</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Now</span><span className="font-bold">89</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      )}
      {!isLoggedIn && (
        <NotLogin />
      )}

    </>
  );
};

export default HomePage;
