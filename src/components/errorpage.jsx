import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
    return (
        <div>
            <h1>Error</h1>
            <p>The connected network is not Sepolia. Please switch your network.</p>
        </div>
    );
}

export default ErrorPage;
