import { useState, useEffect, useRef } from 'react';
import { Tests } from './Tests';
import { obj } from '../allLevels';
import "../style/main.css";
export const Main = () => {
    const [ start, setStart ] = useState(false);
    const [ end, setEnd ] = useState(false);
    const [words, setWords] = useState([]);
    const [count, setCount] = useState(0);
    const [activeLevel, setActiveLevel] = useState();
    const [passedLvl, setPassedLvl] = useState([]);
    const [noPassedLvl, setNoPassedLvl] = useState([]);
    const [activeUser, setActiveUser] = useState(false);
    const timeRef = useRef(null);

    const startGame = (lvl) => {
        let ran;
        let a = [];
        let flag = true;
        let check;

        while(flag || a.length !== obj[lvl].length){
            ran = obj[lvl][Math.floor(Math.random() * obj[lvl].length)];
            for(let g = 0; g < a.length; g++){
                if(a[g] === ran){
                    flag = true;
                    check = true;
                }
            }

            if(!check){
                flag = false;
                a.push(ran);
            }
            check = false;
        }
        setWords([...a]);
        setStart(true);

        setActiveLevel(lvl);
    };

    useEffect(() => {
        fetch('/get-records', {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                token:localStorage.getItem('token')
            })
        })
        .then(data => {
            if(data.ok){
                setActiveUser(true);
                return data.json();
            } else {
                setActiveUser(false);
            }
        })
        .then(response => {
            console.log(response.data);
            const resData = response.data;
            const keys = Object.keys(obj);
            let flag = false;
            for(let i = 0; i <  keys.length; i++){
                for(let j = 0; j < resData.length; j++){
                    if(keys[i] === resData[j].lvl){
                        setPassedLvl(prev => [...prev, resData[j]]);
                        flag = true;
                    }
                }
                if(!flag){
                    console.log(keys[i]);
                    setNoPassedLvl(prev => [...prev, {lvl:keys[i]}])
                }
                flag = false;
            }
        })
        .catch(e => {
            console.log(e);
        });

    }, []);

    useEffect(() => {
        if(start){
        timeRef.current = setInterval(() => {
            console.log('time');
            setCount(prev => prev + 1);
        }, 500);
        }
    }, [start]);

    useEffect(() => {
        if(count === words.length && start){
            clearInterval(timeRef.current);
            setEnd(true);
        }
    }, [count]);

    if(start && !end){
        return (
            <div className="wrapper-word">
                {words[count]}
            </div>
        )
    }else if(end){
        return (
            <>
                <Tests items={words} lvl={activeLevel}/>
            </>
        )
    } else if(activeUser) {
        return (
            <>
            {passedLvl.map((el, i) => {
                return (
                    <div className="wrapper-button-start" key={i}>
                        <button onClick={() => startGame(el.lvl)} className="start-button">
                            <div className="wrapper-info-lvl">
                                <span>Start {el.lvl}</span>
                                <span>Records:{el.record}</span>
                                <span>Date: {el.date}</span>  
                            </div>  
                        </button>
                    </div>
                )
            })}
            {noPassedLvl.map((el, i) => {
                return (
                    <div className="wrapper-button-start" key={i}>
                        <button onClick={() => startGame(el.lvl)} className="start-button">
                            Start {el.lvl}
                        </button>
                    </div>
                )
            })}
            </>
        )
    } else {
        return (
            <>
                {Object.keys(obj).map((el, i) => {
                    return (
                        <div className="wrapper-button-start" key={i}>
                            <button onClick={() => startGame(el)} className="start-button">
                                Start lvl{i+1}    
                            </button>
                        </div>
                    )
                })}
            </>
        )
    }
}