import {  useState } from "react";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import Scorecard from "../../components/scorecard/scorecard";
import Header from "../../components/Header/Header";
import { randomRun } from "../../utils/other.utils";
import AxiosInstance from "../../lib/AxiosInstance";


export interface IRequestTeam {
    id: string;
    name: string;
    run: number;
};


const PlayPage = () => {
    const {
        state: { side,winner, team1, team2 },
    } = useLocation();

    const {matchId} = useParams();

    

    const [btnText, setBtnText] = useState("Bowl");

	const [firstTeamRun ,setFirstTeamRun] = useState(0);
	const [secondTeamRun,setSecondTeamRun] = useState(0);

    const [currentBowl, setCurrentBowl] = useState(1);
    const [bowlHistory, setBowlHistory] = useState([]);

    const hanldeBowl = () => {

        const currentOver =
            Math.floor(currentBowl / 6) + (currentBowl % 6) / 10;
        const run = randomRun();
        const bowlObj = {
            team: currentBowl <= 6 ? team1.id : team2.id,
            over: currentOver,
            ball: currentBowl,
            run: run,
        };

		if(currentBowl<=6){
			setFirstTeamRun((p : number) => p+run);
		}else{
			setSecondTeamRun((p : number) => p+run);
		}

        setCurrentBowl((b) => b + 1);

        setBowlHistory((prv : any) => [...prv, bowlObj]);
		
		if ( currentBowl >= 12 ) {

			setBtnText("Full Score");

			const requestObj = {
				uuid : matchId,
				side : side,
				team1 :{
					id : team1.id,
					name : team1.name,
					run : firstTeamRun
				},
				team2 : {
					id : team2.id,
					name : team2.name,
					run : secondTeamRun
				},
				match_info : [...bowlHistory,bowlObj]
			};

			AxiosInstance.post('/matches',requestObj)
		}
    };


    return (
        <div className="flex flex-col w-screen items-center mt-4">
            <Header />
            <div className="flex gap-2 text-md font-bold justify-center mt-2">
                <p>{team1.name}</p>
                <p>vs</p>
                <p>{team2.name}</p>
            </div>
            <div className=" text-lg mt-2">
                <p>
                    {winner} has won the toss and elected to {side} first
                </p>
            </div>

            <div>
                <p className="text-xl">Total Run : {firstTeamRun + secondTeamRun}</p>
            </div>
            <div>
                {currentBowl > 12 && (
					<>
                    	<p className="py-1 text-xl">Match Finished.Welldone!</p>
						<Link to={'/matches'} >view match list</Link>
					</>
                )}
            </div>
            <button
                className={`px-4 py-1 rounded-md bg-blue-500 text-white cursor-pointer ${currentBowl>=12 ? 'bg-grey-200' : ''}`}
                onClick={hanldeBowl}

                disabled={!(currentBowl <= 12)}
            >
                {btnText}
            </button>

            {bowlHistory?.length > 0 ? (
                <Scorecard scoreboard={bowlHistory} />

            ) : (
                <p className=" mt-10">Start The Match!</p>
            )}
        </div>
    );
};

export default PlayPage;
