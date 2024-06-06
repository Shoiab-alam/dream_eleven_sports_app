import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

const Login = () => {
    const [data,setData] = useState({
        email:'',
        password:''
    });

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    useEffect(() => {
      axios.get('http://localhost:3001/user', {withCredentials: true}).then((res)=>{
      if(res.data.valid){
        navigate('/');
      }else{
        navigate('/login');
      }
      }).catch(err => console.log(err));
    }, []);

    const [msg,setMessage] = useState('');
    const dataSubmit = async(e) => {
      e.preventDefault();
      try {
          let email =data.email;
          let password =data.password;
          const response = await axios.post('http://localhost:3001/user/login',{email,password});
      
          if(response.status === 200){
            setMessage({type:'success',text:response.data.message})
            setTimeout(()=>{
              navigate('/');
            },2000);
          }else{
            setMessage({type:'error',text:'Something went wrong'})
          }
          setTimeout(()=>{
            setMessage('');
          },1500);
      } catch (error) {
        setMessage({type:'error',text:'User Not Found!'})
        setTimeout(()=>{
          setMessage('');
        },2000);
      }
    }
    const onChange = (e) => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={dataSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        {msg && <p className={`p-2 w-full text-center text-white ${msg.type === 'success' ? 'bg-green-500': 'bg-red-500'}`}>{msg.text}</p>}
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            placeholder="Enter Email" 
            name="email" 
            required
            onChange={onChange}
            value={data.email}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input 
            type="password" 
            placeholder="Enter Password" 
            name="password" 
            required
            onChange={onChange}
            value={data.password}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-400"
          />
        </div>
        <div className="mb-4">
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
          <p>
          <Link className="w-full text-blue-500 my-4 text-center" to="/signup" >Signup</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
