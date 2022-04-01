import './../App.css';
import { ethers } from 'ethers';
import CashGrab from './../artifacts/CashGrabNFT.json';
import Addresses from './../addresses.js';
import React from 'react';

function App() {
    async function mint() {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                Addresses.CashGrabAddress,
                CashGrab.abi,
                signer
            );
            const transaction = await contract.mint();
            await transaction.wait();
        }
    }

    return (
        <div className="Home">
            <button onClick={mint}>Mint NFT</button>
        </div>
    );
}

export default App;
