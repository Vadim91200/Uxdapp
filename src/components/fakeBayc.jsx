import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { abi, contractAddress } from "../contracts/FakeBAYC.js"
import { Link, useNavigate } from 'react-router-dom';

function FakeBayc() {
    const [connectionStatus, setConnectionStatus] = useState('Disconnected');
    const [contract, setContract] = useState(null);
    const [totalTokens, setTotalTokens] = useState(0);
    const [contractName, setContractName] = useState('');
    const [tokenId, setTokenId] = useState('');
    const navigate = useNavigate();
    
    async function connect() {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: "eth_requestAccounts" });
                setConnectionStatus('Connected');
                const accounts = await window.ethereum.request({ method: "eth_accounts" });
                console.log(accounts);
            } catch (error) {
                console.log(error);
            }
        } else {
            setConnectionStatus('Please install MetaMask');
        }
    }
    

    useEffect(() => {
        if (window.ethereum && connectionStatus === 'Connected') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const tempContract = new ethers.Contract(contractAddress, abi, provider);
            setContract(tempContract);

            // Get total tokens and contract name
            const loadContractData = async () => {
                const name = await tempContract.name();
                setContractName(name);
                const total = await tempContract.tokenCounter();
                setTotalTokens(total.toNumber());
            };

            loadContractData();
        }
    }, [connectionStatus]);

    async function claimToken() {
        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, abi, signer);
  
            try {
                await contract.claimAToken();
                console.log(`Token claimed successfully!`);
            } catch (error) {
                console.error(error);
            }
        }
    }

    const goToTokenPage = () => {
        if (tokenId) {
            navigate(`/fakeBayc/${tokenId}`);
        }
    }

    return (
        <>
            <div>
                <button onClick={connect}>{connectionStatus}</button>
            </div>
            {connectionStatus === 'Connected' && (
                <div>
                    <p>Contract Name: {contractName}</p>
                    <p>Total Tokens: {totalTokens}</p>
                </div>
            )}
            <button onClick={claimToken}>Claim New Token</button>

            <div>
                <input 
                    type="text" 
                    placeholder="Enter Token ID" 
                    value={tokenId} 
                    onChange={(e) => setTokenId(e.target.value)}
                />
                <button onClick={goToTokenPage}>Go to Token Details</button>
            </div>

            <div>
                <Link to="/fakeNefturians">fakeNefturians</Link>
            </div>
        </>
    )
}

export default FakeBayc