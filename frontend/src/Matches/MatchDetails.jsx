import { useState, useEffect } from "react";
import { Link, useParams,useNavigate } from 'react-router-dom';
import axios from "axios";

const MatchDetails = () => {
  const [matchDetail, setMatchDetail] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/matches/${id}`)
      .then(response => {
        setMatchDetail(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the match details!', error);
      });
  }, [id]);


  if (!matchDetail) return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Match: {matchDetail.title}</h2>
      <div className="flex flex-wrap justify-between mb-4">
        <div className="w-full md:w-1/2">
          <h3 className="text-lg font-semibold mb-2">Team A: {matchDetail.teama.name}</h3>
          <p className="mb-2">Overs: {matchDetail.teama.overs}</p>
          <p className="mb-4">Scores: {matchDetail.teama.scores_full}</p>
          <img src={matchDetail.teama.logo_url} alt="Team A Logo" className="w-16 h-16 mb-2" />
        </div>
        <div className="w-full md:w-1/2">
          <h3 className="text-lg font-semibold mb-2">Team B: {matchDetail.teamb.name}</h3>
          <p className="mb-2">Overs: {matchDetail.teamb.overs}</p>
          <p className="mb-4">Scores: {matchDetail.teamb.scores_full}</p>
          <img src={matchDetail.teamb.logo_url} alt="Team B Logo" className="w-16 h-16 mb-2" />
        </div>
      </div>
      <p className="mb-2">Win Margin: {matchDetail.win_margin}</p>
      <p className="mb-2">Status: {matchDetail.status_note}</p>
      <p className="mb-2">Start Date: {new Date(matchDetail.date_start).toLocaleDateString()}</p>
      <p className="mb-2">End Date: {new Date(matchDetail.date_end).toLocaleDateString()}</p>


      <h1 className="my-10">
        <Link to={`/team/${matchDetail._id}`} className="bg-purple-500 p-2 text-white rounded">Creat Your Team</Link>
      </h1>
    </div>
  );
};

export default MatchDetails;
