import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Team = () => {
  const [players, setPlayers] = useState([]);
  const { id } = useParams();
  const [user, setUser] = useState('');
  const [team, setTeam] = useState('');
  const [data, setData] = useState([]);
  const [msg,setMessage] = useState('');

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:3001/user', { withCredentials: true }).then((res) => {
      if (res.data.valid) {
        navigate(`/team/${id}`);
      } else {
        navigate('/login');
      }
    }).catch(err => console.log(err));
  }, [id, navigate]);


  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/team/${id}`);
      setUser(res.data.user);
      setTeam(res.data.item);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchPlayer = async () => {
    try {
      let matchId = team.match_id;
      let userId = user._id;
      const data = await axios.get(`http://localhost:3001/team/players/${matchId}/${userId}`);
      setData(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPlayer();
  }, [team.match_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(players.length === 0){
        return setMessage({type:'error',text:'Please Fill The Team'})
    }
    setTimeout(()=>{
        fetchPlayer();
    },1500);
    setPlayers([]);
    let matchId = team.match_id;
    axios.post(`http://localhost:3001/team`, { players, matchId })
      .then(response => {
        setMessage({type:'success',text:response.data.message})
        setTimeout(()=>{
            setMessage();
        },1500);
      })
      .catch(error => {
        setMessage({type:'error',text:'Team Already Available'})
        setTimeout(()=>{
            setMessage();
        },1500);
      });
  };

  return (
    <div className="max-w-lg mx-auto mt-20 bg-white rounded-lg shadow-lg p-6">
      <h1 className="font-bold text-2xl underline my-4 text-center">Hello {user.username}, Create Your Team</h1>
      <h1 className="my-10 font-bold capitalize">Today is Match of {team.title}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
            {msg && <p className={`p-2 rounded text-center text-white ${msg.type === 'success' ? 'bg-green-500': 'bg-red-500'} `}>{msg.text}</p>}
          <label htmlFor="players" className="block text-sm font-bold mb-2">Players:</label>
          <input
            id="players"
            type="text"
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            value={players.join(', ')}
            onChange={e => setPlayers(e.target.value.split(', '))}
            placeholder="Enter player names separated by commas"
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit Team</button>
      </form>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Your Player</h2>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          {data.length > 0 ? (
            data.map((player, index) => (
              <div key={index} className="bg-white p-2 mb-2 rounded-md shadow-sm">
                {player}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No players added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Team;
