import {React, useState} from 'react'
import Util from './lib/Util';


function App() {
    const [inputValue, setInputValue] = useState('');
    const [isEmpty, setIsEmpty] = useState(false);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setIsEmpty(Util.isNull(e.target.value)); // 입력 값이 비었는지 확인
    };

    const handleCheck = () => {
        if (Util.isNull(inputValue)) {
            alert('입력 필드가 비어 있습니다!');
        } else {
            alert('입력 필드에 값이 있습니다.');
        }
    };

    return (
        <div className="CheckNullExample">
            <h3>Null 체크 예제</h3>
            <input
                type="text"
                placeholder="값을 입력하세요"
                value={inputValue}
                onChange={handleInputChange}
            />
            <button onClick={handleCheck}>Check Null</button>
            {isEmpty && <p style={{color: 'red'}}>입력 필드가 비어 있습니다.</p>}
        </div>
    );
}

export default App;
