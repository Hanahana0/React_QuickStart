import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useTranslations } from '../context/TranslationContext';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './CustomGrid.css';

const CustomGrid = ({ columnDefs, rowData, onGridReady, rowClassRules, ...props }) => {
    const { getTranslation } = useTranslations();

    // 다국어 설정을 고려하여 columnDefs를 업데이트
    const translatedColumnDefs = columnDefs.map(col => ({
        ...col,
        headerName: getTranslation(col.headerName),
    }));

    // status 컬럼만 색상 규칙 적용
    const effectiveColumnDefs = rowClassRules
        ? [
              {
                  headerName: '', // 상태 컬러 표시 컬럼
                  field: 'statusColor',
                  width: 10,
                  cellClassRules: {
                      'new-cell': params => params.data.status === 'new',
                      'loaded-cell': params => params.data.status === 'loaded',
                      'updated-cell': params => params.data.status === 'updated',
                  },
                  editable: false,
                  resizable: false,
                  sortable: false,
              },
              ...translatedColumnDefs,
          ]
        : translatedColumnDefs;

    // rowHeight와 headerHeight의 디폴트 값을 설정
    const effectiveRowHeight = props.rowHeight ?? 35;
    const effectiveHeaderHeight = props.headerHeight ?? 40;

    return (
        <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
            <AgGridReact
                columnDefs={effectiveColumnDefs}
                rowData={rowData}
                onGridReady={onGridReady}
                rowHeight={effectiveRowHeight}
                headerHeight={effectiveHeaderHeight}
                {...props}
            />
        </div>
    );
};

export default CustomGrid;
