import { useEffect, useState } from 'react';
import { IMatch } from '../play/match.interface';
import AxiosInstance from '../../lib/AxiosInstance';
import { Link } from 'react-router-dom';

const MatchesPage = () => {
	const [matches, setMatches] = useState<IMatch[]>([]);

	useEffect(() => {
		const fetchMatchesData = () => {
			AxiosInstance.get(`/matches`).then(res =>{
				setMatches(res.data);
				console.log(res.data)
			}).catch(er =>{
				console.log((er as Error).message);
			});
		};
		fetchMatchesData();
	}, []);

	return (
		<div className="mt-4">
			{matches && matches.length > 0 ? (
				<div className="max-w-lg mx-auto p-4">
					<h1 className="text-2xl font-bold mb-4">All Match List</h1>
					<ol className=" pl-4">
						{matches?.map((match) => (
							<div
								key={match?.id}
								className="flex justify-between items-center gap-10 mb-2">
								<li className="text-lg ">
									{match?.team1?.name} vs {match?.team2?.name}
								</li>
								
								<Link to={`/matches/${match.uuid}`}>

								<button className='bg-green-400 py-2 px-3 rounded-md' >Details</button>
								</Link>
								{/* <button className='bg-red-400 py-2 px-3 rounded-md' >X</button> */}
							</div>
						))}
					</ol>
				</div>
			) : (
				<p className="text-xl">No data available!</p>
			)}
		</div>
	);
};

export default MatchesPage;
