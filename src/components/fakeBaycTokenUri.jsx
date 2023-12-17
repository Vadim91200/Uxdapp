import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { abi, contractAddress } from "../contracts/FakeBAYC.js"
import { Link, useNavigate,useParams, BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function FakeBaycTokenUri() {
    const { tokenId } = useParams();
    const [metadata, setMetadata] = useState(null);
    const [error, setError] = useState(null);

    const convertIpfsUrl = (url) => {
        return url.replace(/^ipfs:\/\//, "https://ipfs.io/ipfs/");
    };

    useEffect(() => {
        const fetchMetadata = async () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(contractAddress, abi, provider);

            try {
                const tokenUri = await contract.tokenURI(tokenId);
                const response = await fetch(tokenUri);
                const metadata = await response.json();
                setMetadata(metadata);
            } catch (error) {
                setError("Error fetching token metadata");
                console.error("Error fetching token metadata:", error);
            }
        };

        fetchMetadata();
    }, [tokenId]);

    return (
        <div>
            {error ? (
                <p>Error: {error}</p> // Display error message
            ) : metadata ? (
                <>
                    <img src={convertIpfsUrl(metadata.image)} alt={`Token ${tokenId}`} />
                    <p>Attributes :</p>
                    <ul>
                        {metadata.attributes.map((attribute, index) => (
                            <li key={index}>{`${attribute.trait_type}: ${attribute.value}`}</li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default FakeBaycTokenUri