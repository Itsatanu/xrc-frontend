import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './BetAmount.css'

export default function BetAmount({setBetData}) {
  const [balance, setBalance] = useState(1)
  const [quantity, setQuantity] = useState(1)
  const [multiplier, setMultiplier] = useState(1)
  const [agreed, setAgreed] = useState(true)

  useEffect(()=>{
    setBetData(balance * quantity * multiplier, agreed)
  },[balance, quantity, multiplier,agreed])
  const balanceOptions = [0.1, 0.5, 1, 5]
  const multiplierOptions = [1, 2, 5]

  const handleQuantityChange = (type) => {
    if (type === 'increment') {
      setQuantity(prev => prev + 1)
    } else {
      setQuantity(prev => prev > 1 ? prev - 1 : 1)
    }
  }

  return (
    <div className="bap-container">
    
      <div className="bap-content">
        <div className="bap-section">
          <h2 className="bap-section-title">Balance</h2>
          <div className="bap-balance-options">
            {balanceOptions.map((option) => (
              <button
                key={option}
                onClick={() => setBalance(option)}
                className={`bap-balance-button ${balance === option ? 'active' : ''}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="bap-section">
          <h2 className="bap-section-title">Quantity</h2>
          <div className="bap-quantity-control">
            <button
              className="bap-quantity-button"
              onClick={() => handleQuantityChange('decrement')}
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="bap-quantity-input"
            />
            <button
              className="bap-quantity-button"
              onClick={() => handleQuantityChange('increment')}
            >
              +
            </button>
          </div>
        </div>

        <div className="bap-section">
          <div className="bap-multiplier-grid">
            {multiplierOptions.map((option) => (
              <button
                key={option}
                onClick={() => setMultiplier(option)}
                className={`bap-multiplier-button ${multiplier === option ? 'active' : ''}`}
              >
                X{option}
              </button>
            ))}
          </div>
        </div>

        <div className="bap-agreement">
          <div
            className={`bap-checkbox ${agreed ? 'checked' : ''}`}
            onClick={() => setAgreed(!agreed)}
          />
          <span>
            I agree{" "}
            <NavLink to={'/account'} target="_blank" className="bap-pre-sale-rules">《Pre-sale rules》</NavLink>
          </span>
        </div>

        {/* <div className="bap-footer">
          <button className="bap-cancel-button">
            Cancel
          </button>
          <button className="bap-total-button">
            Bet amount ${(balance * quantity * multiplier).toFixed(2)}
          </button>
        </div> */}
      </div>
    </div>
  )

}