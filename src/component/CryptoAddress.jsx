import { useState } from 'react'
import './CryptoAddress.css'

export default function CryptoAddress({address}) {
    const [copied, setCopied] = useState(false)
    // const address = 'UQCVqNF0vZq1bNHKvUrXBnj8ibXq25xiw3-k1YSyEed25A4v'

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(address)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
        }
    }

    return (
        <div className="ton-container">
            <div className="ton-content">
                <h4 className="ton-heading">USDT (TRC20)</h4>
                <p className="ton-address">{address}</p>
            </div>
            <button
                className="copy-button"
                onClick={handleCopy}
                aria-label="Copy address"
            >
                {copied ? 'Copied!' : 'Copy'}
            </button>
        </div>
    )
}
