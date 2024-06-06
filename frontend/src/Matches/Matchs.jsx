import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Matchs = () => {
  const [matches, setMatches] = useState([]);
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

    //fetch Matches data
    axios.get('http://localhost:3001/matches')
      .then(response => {
        setMatches(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the matches!', error);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Upcoming Matches</h1>
      <ul className="space-y-4">
        {matches.map(match => {
          return <li key={match._id} className="p-6 border rounded-lg cursor-pointer shadow-lg bg-white hover:bg-gray-100 transition duration-300">
            <Link to={`/matches/${match._id}`}>
                <div className="text-2xl font-semibold mb-2 flex justify-around">
                  <div className='flex'>
                    <img className="h-10 mx-10" src={match.teama.logo_url} alt="" />
                    {match.teama.name}
                  </div> 
                  <div>
                    vs
                  </div>
                  <div className='flex'>
                      <img className="h-10 mx-10" src={match.teamb.logo_url} alt="" />
                       {match.teamb.name}
                      </div>
                    </div>
                <div className="text-center text-lg text-gray-700">Date: {new Date(match.date_start).toLocaleDateString()}</div>
            </Link>
          </li>
        })}
      </ul>
    </div>
  );
};

export default Matchs;
