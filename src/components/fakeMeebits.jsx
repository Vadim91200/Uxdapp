import React, { useState } from 'react';
import { ethers } from 'ethers';
import { abi, contractAddress } from "../contracts/FakeBAYC.js"

function FakeMeebits() {
    const [tokenID, setTokenID] = useState('');

    const mintToken = async () => {
        if (!window.ethereum) {
            console.error('Ethereum object not found, you need to install MetaMask!');
            return;
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []); // Request access
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        try {
            const transaction = await contract.mintAToken(tokenID);
            await transaction.wait();
            console.log(`Token minted: ${tokenID}`);
        } catch (error) {
            console.error('Error minting token:', error);
        }
    };

    return (
        <div>
            <h1>Fake Meebits Page</h1>
            <input 
                type="number" 
                value={tokenID} 
                onChange={(e) => setTokenID(e.target.value)} 
                placeholder="Enter Token ID" 
            />
            <button onClick={mintToken}>Mint Token</button>
        </div>
    );
}

export default FakeMeebits;