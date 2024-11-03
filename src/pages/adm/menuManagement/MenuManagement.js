// src/pages/adm/menuManagement/MenuManagement.js
import React, { useEffect, useState } from 'react';

const MenuManagement = ({ savedState, onSaveState }) => {
    const [state, setState] = useState(savedState || {});

    // 상태가 변경될 때만 onSaveState를 호출하도록 설정
    useEffect(() => {
        if (savedState !== state) {
            onSaveState(state);
        }
    }, [state, onSaveState, savedState]);

    // 예제 렌더링 - 실제 컴포넌트 내용은 여기에 작성
    return (
        <div>
            <h1>Menu Management</h1>
            <input
                type="text"
                value={state.someField || ""}
                onChange={(e) => setState({ ...state, someField: e.target.value })}
            />
        </div>
    );
};

export default MenuManagement;
