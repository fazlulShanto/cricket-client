import { useState } from "react";
import { ITeam } from "../Home/teams.interface";
import { useLocation, useNavigate } from "react-router-dom";
import {  getSide, randomUUID } from "../../utils/other.utils";
import SelectOption from "./SelectOption";
export type ChoiceType = "bat" | "bowl";

const side = getSide();
const matchId = randomUUID();

const TossPage = () => {
    const navigate = useNavigate();
    const {
        state: { teamList },
    } = useLocation();

    const [tossTeam, setTossTeam] = useState<ITeam> ();

    const handleTossTeam = (value : ITeam) => {
		console.log(`selected Team : `,value);
        setTossTeam(value);
    };

	const handleStartMatch = ()=>{
		//team1 always bat first , team2 bowl first
		let team1,team2 ;
		const otherTeam = teamList.filter( (v : ITeam) => v.id != tossTeam.id).pop();

		if(side=='bat'){
			team1 = tossTeam;
			team2 = otherTeam;
		}else{
			team1 = otherTeam;
			team2 = tossTeam;
		}

		navigate(`/play/${matchId}`,{state : {
			side : side,
			winner : tossTeam?.name,
			team1 : team1,
			team2 :	team2
		}});
	};



    return (
        <div className="flex flex-col items-center mt-4">
            {teamList && teamList?.length > 0 ? (
                <>
                    <h1 className=" text-3xl font-bold mb-2">
                        Select Who Will {side}
                    </h1>

                    <SelectOption
                        teamList={teamList}
                        selectHandler={handleTossTeam}
                    />

                    <button
						disabled = {!(tossTeam)}
                        className=" mt-10 bg-blue-500 cursor-pointer px-8 py-2 rounded-md"
                        onClick={handleStartMatch}
                    >
						Start
                    </button>
                </>
            ) : (
                <p>Teams not found!</p>
            )}
        </div>
    );
};

export default TossPage;
