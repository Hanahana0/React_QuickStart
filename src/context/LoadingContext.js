// src/context/LoadingContext.js
import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [loadingCount, setLoadingCount] = useState(0);

    const showLoading = () => setLoadingCount(count => count + 1);
    const hideLoading = () => setLoadingCount(count => Math.max(count - 1, 0));

    const isLoading = loadingCount > 0;

    return (
        <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => useContext(LoadingContext);
