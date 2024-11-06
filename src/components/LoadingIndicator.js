// src/components/LoadingIndicator.js
import React from 'react';
import { useLoading } from '../context/LoadingContext';
import './LoadingIndicator.css';

const LoadingIndicator = () => {
    const { isLoading } = useLoading();

    return (
        isLoading && (
            <div className="loading-overlay"> {/* 전체 화면을 덮는 오버레이 */}
                <div className="loading-spinner">
                    <img src="/loading_001.gif" alt="Loading..." />
                </div>
            </div>
        )
    );
};

export default LoadingIndicator;
