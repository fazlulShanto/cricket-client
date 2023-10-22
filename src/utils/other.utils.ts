import {v4 as uuidV4} from 'uuid';


export const  getRandomValue = (limit = 2)=>{
    const value = Math.random()*limit;
    return Math.floor(value);
}

export const getSide = () => {
    const sides = ["Bat","Bowl"];
    const randomSide = sides[getRandomValue(sides.length)];
    return randomSide;
};


export const randomUUID = () =>{

    const id = uuidV4();
    return id;

}

export const randomRun = ()=>{
    const runArray = [1,2,3,4,6];
    const randomRun = runArray[getRandomValue(runArray.length)];
    return randomRun;
}