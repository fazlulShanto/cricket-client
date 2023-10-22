import React, { useState } from 'react';
import { ITeam } from '../Home/teams.interface';

const SelectOption = ({selectHandler,teamList} : {selectHandler : (value : ITeam)=>void ,teamList : ITeam[]}) => {

  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    // selectHandler(event.target.value);
    // console.log(event.target.value,teamList)
    const sTeam = teamList?.find((team : ITeam) => team.id == event.target.value) ;
    console.log(sTeam);
    if(sTeam){
      selectHandler(sTeam);
    }
  };

  return (
    <div >
      <form className="flex flex-col md:flex-row  gap-8">
        {teamList?.map((radioImage : ITeam) => (
          <label className='flex flex-col md:flex-row' key={radioImage.id}>
            <input
              className='mr-4'
              name='tossTeam'
              type="radio"
              value={radioImage.id}
              onChange={handleRadioChange}
            />
            <img className="w-[150px] m-auto h-[100px]" src={radioImage.image} alt="" />
          </label>
        ))}
      </form>
    </div>
  );
};

export default SelectOption;
