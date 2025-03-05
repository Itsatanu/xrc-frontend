import React, { useEffect, useState } from 'react';
import CalculateMultiplier from '../function/CalculateMultiplier'
import ProgressLine from './ProgressLine';
import './Game.css'




const Game = ({onChange, value, event}) => {
    let [winChance, setWinChance] = useState(49);
    let [multiplier, setMultiplier] = useState(CalculateMultiplier(winChance))

    useEffect(() => {
        setMultiplier(multiplier = CalculateMultiplier(winChance))
    }, [winChance])


    return (
        <div className="game-container">
            <div className='input-range-container'>
            <ProgressLine event={event} value={value}/>
                <input
                    type="range"
                    id="rollUnder"
                    min="1"
                    max="99"
                    value={winChance}
                    onInput={(e) => { setWinChance(e.target.value);  }}
                    onChange={onChange}
                    style={{ '--value': `${winChance}%` }}
                />
            </div>
            <div className='game-input-container'>
                <div>
                    <input className='range-show'
                        id='winingChance'
                        type="number"
                        value={winChance}
                        min={1}
                        max={99}
                        onChange={(e) => {
                            let val
                            if (e.target.value > 99) { val = 99 }
                            else if (e.target.value < 1) { val = 1 }
                            else { val = e.target.value }
                            setWinChance(winChance = val)
                        }}
                    />
                    <label htmlFor="winingChance" style={{color:"rgb(0, 215, 29)"}}>Wining Chance</label>
                </div>
                <div>
                    <input className='range-show'
                        id='multiplier'
                        type="text"
                        value={`${multiplier.toFixed(4)} X`}
                        readOnly
                    />
                    <label htmlFor="multiplier" style={{ color: 'rgb(255, 0, 0)'}}>Multiplier</label>
                </div>
            </div>
            
        </div>
    );
};

export default Game;
