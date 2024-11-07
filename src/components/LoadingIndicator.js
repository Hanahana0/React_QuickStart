// LoadingIndicator.js
import React from 'react';
import { useSelector } from 'react-redux';
import './LoadingIndicator.css';

const LoadingIndicator = () => {
    const loadingCount = useSelector((state) => state.loading.loadingCount);

    return (
        loadingCount > 0 && (
            <div className="loading-overlay">
                <div className="loading-spinner">
                    <img src="/loading_001.gif" alt="Loading..." />
                </div>
            </div>
        )
    );
};

export default LoadingIndicator;
