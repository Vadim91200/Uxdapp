import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import { abi, contractAddress } from "../contracts/FakeBAYC.js"

function FakeNefturiansUser() {
    const { userAddress } = useParams();
    const [tokens, setTokens] = useState([]);

    useEffect(() => {
        const fetchTokens = async () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(contractAddress, abi, provider);
            try {
                const tokenIds = await contract.getUserTokens(userAddress);
                const tokenDataPromises = tokenIds.map(async (tokenId) => {
                    const tokenUri = await contract.tokenURI(tokenId);
                    const response = await fetch(tokenUri);
                    const metadata = await response.json();
                    return { id: tokenId, name: metadata.name, description: metadata.description };
                });
                const tokenData = await Promise.all(tokenDataPromises);
                setTokens(tokenData);
            } catch (error) {
                console.error('Error fetching tokens:', error);
            }
        };

        fetchTokens();
    }, [userAddress]);



    return (
        <div>
            <h1>Tokens Owned by {userAddress}</h1>
            {tokens.map(token => (
                <div key={token.id}>
                    <h2>{token.name}</h2>
                    <p>{token.description}</p>
                </div>
            ))}
        </div>
    );
}

export default FakeNefturiansUser;