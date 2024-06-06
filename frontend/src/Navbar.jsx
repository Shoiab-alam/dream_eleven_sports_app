import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [valid, setValid] = useState(true);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/user', { withCredentials: true });
      if(response.data.valid){
        setValid(true);
      }else{
        setValid(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [navigate]); // Only run once on mount

  const logout = async (e) => {
    e.preventDefault();
    try {
      await axios.get('http://localhost:3001/user/logout', { withCredentials: true });
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-center space-x-6">
        {valid ? (
          <>
            <li>
              <Link to="/" className="text-white hover:text-gray-400 transition duration-300">Match</Link>
            </li>
            <li>
              <button onClick={logout} className="text-white hover:text-gray-400 transition duration-300">Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="text-white hover:text-gray-400 transition duration-300">Login</Link>
            </li>
            <li>
              <Link to="/signup" className="text-white hover:text-gray-400 transition duration-300">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
