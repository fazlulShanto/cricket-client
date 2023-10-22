import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IMatch } from '../play/match.interface';
import Scoreboard from '../../components/scorecard/scorecard';
import AxiosInstance from '../../lib/AxiosInstance';

const MatchDetailsPage = () => {
	const {matchId} = useParams();
	const navigate = useNavigate();
	const [match, setMatch] = useState<IMatch>();
	

	useEffect(() => {
		const fetchMatchDetails = () => {
			AxiosInstance.get(`/matches?uuid=${matchId}`).then(res =>{

				if(res.data && res?.data?.length){

					setMatch(res.data[0]);
					console.log(`data`,res.data[0]);
				}
			}).catch(er =>{
				console.log((er as Error).message);
			})
		};
		fetchMatchDetails();
	}, [matchId]);

	return (
		<div className="flex flex-col justify-center items-center mt-4">
			<h1 className='text-3xl text-bold'>Match details</h1>
			{match ? (
				<>
					<div className=" my-2 flex justify-center items-center gap-2">
						<p className=" text-xl font-bold">{match?.team1?.name}</p>
						<p className=" text-lg">vs</p>
						<p className=" text-xl font-bold">{match?.team2?.name}</p>
					</div>
					<p>
						{match?.team1?.name} has won the toss and elected to {match?.side} first
					</p>
					<p className="text-xl">Total Run : {parseInt(match.team1.run) + parseInt(match.team2.run)}</p>
					<Scoreboard scoreboard={match?.match_info} />
				</>
			) : (
				<p> No details available!</p>
			)}

		</div>
	);
};

export default MatchDetailsPage;
