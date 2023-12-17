import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import './chainInfo.css'
import { Link, useNavigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function Chaininfo() {
    const [connectionStatus, setConnectionStatus] = useState('Disconnected');
    const [chainId, setChainId] = useState('');
    const [blockNumber, setBlockNumber] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('chainChanged', (chainId) => {
                const numericChainId = parseInt(chainId, 16);
                if (numericChainId !== 11155111) {
                    navigate('/error');
                } else {
                    setChainId(numericChainId);
                }
            });
        }
    }, [navigate]);

    async function connect() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                setConnectionStatus('Connected');

                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const network = await provider.getNetwork();

                if (network.chainId !== 11155111) {
                    navigate('/error');
                    return;
                }

                setChainId(network.chainId);

                const blockNumber = await provider.getBlockNumber();
                setBlockNumber(blockNumber);

                const accounts = await provider.listAccounts();
                if (accounts.length > 0) {
                    setUserAddress(accounts[0]);
                }
            } catch (error) {
                console.log(error);
                setConnectionStatus('Failed to connect');
            }
        } else {
            setConnectionStatus('Please install MetaMask');
        }
    }
    

    return (
        <>
            <div>
                <button onClick={connect}>{connectionStatus}</button>
            </div>
            {connectionStatus === 'Connected' && (
                <div>
                    <p>Chain ID: {chainId}</p>
                    <p>Last Block Number: {blockNumber}</p>
                    <p>User Address: {userAddress}</p>
                </div>
            )}
            <div>
                <Link to="/fakeBayc">fakeBayc</Link>
            </div>
        </>
    )
}

export default Chaininfo