import { useEffect, useState } from "react";
import { ITeam } from "./teams.interface";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../lib/AxiosInstance";

const HomePage = () => {
    const navigate = useNavigate();
    const [teams, setTeams] = useState<ITeam[]>([]);
    const [selectedTeams, setSelectedTeams] = useState<ITeam[]>([]);

    useEffect(() => {
        const fetchTeamsData = () => {
            AxiosInstance.get(`/countries`)
                .then((res) => {
                    setTeams(res.data);
                })
                .catch((er) => console.log(er.message));
        };
        fetchTeamsData();
    }, []);

    const handleTeamSelection = (team: ITeam) => {
        if (selectedTeams?.includes(team)) {
            setSelectedTeams((prev) =>
                prev?.filter((item) => team?.id !== item?.id)
            );
        } else {
            if (selectedTeams?.length < 2)
                setSelectedTeams((prev) => [...prev, team]);
        }
    };

    const handleButtonClick = () => {
        
        navigate("/toss", {
            state: {
                selectedTeams: JSON.stringify(selectedTeams),
            },
        });
    };

    if (selectedTeams.length === 2) {
        navigate("/toss", {
            state: {
                teamList: selectedTeams,
            },
        });
    }

    return (
        <div className="mt-2 flex justify-center items-center flex-col">
            <div>
                <h1 className="font-bold text-3xl "> Let's play cricket </h1>
            </div>
            <p className=" mt-5 font-medium"> Select Two Team</p>

            <div className=" mt-2 p-2 grid grid-cols-2 gap-5 ">
                {teams && teams.length > 0 ? (
                    teams?.map((team) => (
                        <div
                            key={team?.name}
                            onClick={() => handleTeamSelection(team)}
                            className={`cursor-pointer  rounded-md p-2 hover:shadow-lg w-[200px] ${
                                selectedTeams.some(
                                    (item) => item.id === team.id
                                )
                                    ? "bg-blue-200"
                                    : ""
                            }`}
                        >
                            <img
                                src={team?.image}
                                className="w-[150px] m-auto h-[100px]"
                            />
                        </div>
                    ))
                ) : (
                    <p>No data available!</p>
                )}
            </div>
            {selectedTeams?.length === 2 && (
                <button
                    className=" mt-5 bg-slate-200 cursor-pointer"
                    onClick={handleButtonClick}
                >
                    Let's Toss
                </button>
            )}
        </div>
    );
};

export default HomePage;
