// src/components/CustomGrid.js
import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useTranslations } from '../context/TranslationContext';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const CustomGrid = ({ columnDefs, rowData, onGridReady, ...props }) => {
    const { translations } = useTranslations();

    // 다국어 설정을 고려하여 columnDefs를 업데이트
    const translatedColumnDefs = columnDefs.map(col => ({
        ...col,
        headerName: translations[col.headerName] || col.headerName, // 다국어 변환 적용
    }));

    return (
        <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
            <AgGridReact
                columnDefs={translatedColumnDefs}
                rowData={rowData}
                onGridReady={onGridReady}
                {...props}
            />
        </div>
    );
};

export default CustomGrid;
