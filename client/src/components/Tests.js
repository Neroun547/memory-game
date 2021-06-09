import React, { useState, useEffect } from 'react'
import "../style/tests.css";
export const Tests = (props) => {
    console.log(props);
    const [items, setItems] = useState([]);
    const [questionNum, setQuestionNum] = useState(1);
    const [question, setQuestion] = useState([]);
    const [end, setEnd] = useState(false);
    const [result, setResult] = useState(0);

    useEffect(() => {
        console.log('prop');
        setItems([...props.items]);
        let ran;
        let a = [];
        let flag = true;
        let check;

        while(flag || a.length !== props.items.length){
            ran = Math.floor(Math.random() * props.items.length);
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

        setQuestion([...a]);
    }, [props.items]);

    useEffect(() => {
        let ran;
        let a = [];
        let flag = true;
        let check;

        while(flag || a.length !== props.items.length){
            ran = Math.floor(Math.random() * props.items.length);
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

        setQuestion([...a]);
    }, [questionNum]);

    const answerUser = (word) => {
        if(word === items[questionNum - 1]){
            setResult(prev => prev + 1);
            setQuestionNum(prev => prev + 1);
            console.log(result);
        }
        if(word !== items[questionNum - 1]) {
            setQuestionNum(prev => prev + 1);
        } 
        if(questionNum === items.length){
            setEnd(true);
            let score = word === items[questionNum - 1] ? result + 1 : result;
            fetch('/add-record', {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    lvl:{
                        lvl:props.lvl,
                        record:`${score}/${items.length}`
                    },
                    token:localStorage.getItem('token')
                })
            })
        } 
    }
    if(!question.length){
        return <div>Loading...</div>
    }
    else if(!end && items.length === 3){
    return (    
        <>
            <div className="question">What word {questionNum} ?</div>
            <div className="wrapper-answer">
                <div className="answer">
                    <button onClick={() => answerUser(items[question[0]])}>
                        1. {items[question[0]]}
                    </button>
                    <button onClick={() => answerUser(items[question[1]])}>
                        2. {items[question[1]]}
                    </button>
                    <button onClick={() => answerUser(items[question[2]])}>
                        3. {items[question[2]]}
                    </button>
                </div>
            </div>        
        </>
    )
    } else if (!end && items.length === 5){
        return (    
            <>
                <div className="question">What word {questionNum} ?</div>
                <div className="wrapper-answer">
                    <div className="answer">
                        <button onClick={() => answerUser(items[question[0]])}>
                            1. {items[question[0]]}
                        </button>
                        <button onClick={() => answerUser(items[question[1]])}>
                            2. {items[question[1]]}
                        </button>
                        <button onClick={() => answerUser(items[question[2]])}>
                            3. {items[question[2]]}
                        </button>
                        <button onClick={() => answerUser(items[question[3]])}>
                            4. {items[question[3]]}
                        </button>
                        <button onClick={() => answerUser(items[question[4]])}>
                            5. {items[question[4]]}
                        </button>
                    </div>
                </div>        
            </>
        )
    } else {
        return (
            <div className="wrapper-result">
                <div className="end-game-logo">End game</div>
                <div className="result-test">Your result: {result} / {items.length}</div>
                <button className="back-selection" onClick={() => window.location.reload()}>Back to level selection</button>
            </div>
        )
    }
}
