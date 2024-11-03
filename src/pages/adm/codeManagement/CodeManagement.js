import React, {useEffect, useState} from 'react';

const CodeManagement = ({ savedState, onSaveState }) => {
    const [state, setState] = useState(savedState || {});

    // 상태가 변경될 때만 onSaveState를 호출하도록 설정
    useEffect(() => {
        if (savedState !== state) {
            onSaveState(state);
        }
    }, [state, onSaveState, savedState]);

    return (
        <>
            CodeManagement!!
            <input type={'text'}></input>
        </>
    )
}

export default CodeManagement;