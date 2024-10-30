// UtilTest.js
import React, {useState} from 'react';
import util from './lib/Util'; // util.js 경로에 맞게 설정하세요

function UtilTest() {
    // 각 기능에 필요한 독립적인 상태 변수 정의
    const [isNullInput, setIsNullInput] = useState('');
    const [nvlInput, setNvlInput] = useState({value: '', defaultValue: ''});
    const [trimInput, setTrimInput] = useState('');
    const [capitalizeInput, setCapitalizeInput] = useState('');
    const [formatNumberInput, setFormatNumberInput] = useState({numValue: 0, decimals: 2});
    const [dateDiffInput, setDateDiffInput] = useState({startDate: '', endDate: ''});
    const [replaceAllInput, setReplaceAllInput] = useState({str: '', search: '', replace: ''});
    const [truncateInput, setTruncateInput] = useState({str: '', length: 10});
    const [emailInput, setEmailInput] = useState('');
    const [urlInput, setUrlInput] = useState('');
    const [randomIntInput, setRandomIntInput] = useState({min: 1, max: 100});
    const [localStorageInput, setLocalStorageInput] = useState({key: '', value: ''});
    const [localStorageKeyInput, setLocalStorageKeyInput] = useState('');
    const [sleepInput, setSleepInput] = useState(1000); // milliseconds
    const [results, setResults] = useState({});

    // 엔터키 누르면 해당 기능 실행
    const handleKeyPress = (e, funcName) => {
        if (e.key === 'Enter') {
            handleTest(funcName);
        }
    };

    // 각 기능별 테스트 실행 함수
    const handleTest = async (funcName) => {
        let result;

        switch (funcName) {
            case 'isNull':
                result = util.isNull(isNullInput);
                break;
            case 'nvl':
                result = util.nvl(nvlInput.value, nvlInput.defaultValue);
                break;
            case 'trim':
                result = util.trim(trimInput);
                break;
            case 'capitalize':
                result = util.capitalize(capitalizeInput);
                break;
            case 'formatNumber':
                result = util.formatNumber(Number(formatNumberInput.numValue), Number(formatNumberInput.decimals));
                break;
            case 'getCurrentDate':
                result = util.getCurrentDate();
                break;
            case 'dateDiff':
                result = util.dateDiff(dateDiffInput.startDate, dateDiffInput.endDate);
                break;
            case 'replaceAll':
                result = util.replaceAll(replaceAllInput.str, replaceAllInput.search, replaceAllInput.replace);
                break;
            case 'truncate':
                result = util.truncate(truncateInput.str, Number(truncateInput.length));
                break;
            case 'isEmail':
                result = util.isEmail(emailInput);
                break;
            case 'isURL':
                result = util.isURL(urlInput);
                break;
            case 'randomInt':
                result = util.randomInt(Number(randomIntInput.min), Number(randomIntInput.max));
                break;
            case 'setLocalStorage':
                util.setLocalStorage(localStorageInput.key, localStorageInput.value);
                result = `로컬 스토리지에 저장됨: ${localStorageInput.key} - ${localStorageInput.value}`;
                break;
            case 'getLocalStorage':
                result = util.getLocalStorage(localStorageKeyInput);
                break;
            case 'removeLocalStorage':
                util.removeLocalStorage(localStorageKeyInput);
                result = `로컬 스토리지에서 삭제됨: ${localStorageKeyInput}`;
                break;
            case 'sleep':
                setResults({
                    ...results,
                    sleep: '대기 중...',
                });
                await util.sleep(sleepInput);
                result = `Sleep 완료: ${sleepInput}ms 대기 후`;
                alert(result);
                break;
            default:
                result = 'Invalid function name';
        }


        setResults({
            ...results,
            [funcName]: result,
        });
    };

    return (
        <div style={{padding: '20px'}}>
            <h2>유틸리티 함수 테스트</h2>

            <div style={{marginBottom: '20px'}}>
                <h3>isNull - 값이 null 또는 undefined인지 확인</h3>
                <input
                    type="text"
                    placeholder="isNullInput"
                    value={isNullInput}
                    onChange={(e) => setIsNullInput(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, 'isNull')}
                />
                <button onClick={() => handleTest('isNull')}>테스트 실행</button>
                <span> 결과: {results.isNull !== undefined ? String(results.isNull) : ''}</span>
            </div>

            <div style={{marginBottom: '20px'}}>
                <h3>nvl - 값이 null일 때 기본값 반환</h3>
                <input
                    type="text"
                    placeholder="nvl inputValue"
                    value={nvlInput.inputValue}
                    onChange={(e) => setNvlInput({...nvlInput, inputValue: e.target.value})}
                    onKeyPress={(e) => handleKeyPress(e, 'nvl')}
                />
                <input
                    type="text"
                    placeholder="nvl defaultValue"
                    value={nvlInput.defaultValue}
                    onChange={(e) => setNvlInput({...nvlInput, defaultValue: e.target.value})}
                    onKeyPress={(e) => handleKeyPress(e, 'nvl')}
                />
                <button onClick={() => handleTest('nvl')}>테스트 실행</button>
                <span> 결과: {results.nvl !== undefined ? String(results.nvl) : ''}</span>
            </div>

            <div style={{marginBottom: '20px'}}>
                <h3>trim - 문자열 양쪽 공백 제거</h3>
                <input
                    type="text"
                    placeholder="trimInput"
                    value={trimInput}
                    onChange={(e) => setTrimInput(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, 'trim')}
                />
                <button onClick={() => handleTest('trim')}>테스트 실행</button>
                <span> 결과: {results.trim !== undefined ? String(results.trim) : ''}</span>
            </div>

            <div style={{marginBottom: '20px'}}>
                <h3>capitalize - 첫 글자만 대문자로 변환</h3>
                <input
                    type="text"
                    placeholder="capitalizeInput"
                    value={capitalizeInput}
                    onChange={(e) => setCapitalizeInput(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, 'capitalize')}
                />
                <button onClick={() => handleTest('capitalize')}>테스트 실행</button>
                <span> 결과: {results.capitalize !== undefined ? String(results.capitalize) : ''}</span>
            </div>

            <div style={{marginBottom: '20px'}}>
                <h3>formatNumber - 소수점 자리수 지정</h3>
                <input
                    type="number"
                    placeholder="numValue"
                    value={formatNumberInput.numValue}
                    onChange={(e) => setFormatNumberInput({...formatNumberInput, numValue: e.target.value})}
                    onKeyPress={(e) => handleKeyPress(e, 'formatNumber')}
                />
                <input
                    type="number"
                    placeholder="decimals"
                    value={formatNumberInput.decimals}
                    onChange={(e) => setFormatNumberInput({...formatNumberInput, decimals: e.target.value})}
                    onKeyPress={(e) => handleKeyPress(e, 'formatNumber')}
                />
                <button onClick={() => handleTest('formatNumber')}>테스트 실행</button>
                <span> 결과: {results.formatNumber !== undefined ? String(results.formatNumber) : ''}</span>
            </div>

            <div style={{marginBottom: '20px'}}>
                <h3>getCurrentDate - 현재 날짜 가져오기</h3>
                <button onClick={() => handleTest('getCurrentDate')}>테스트 실행</button>
                <span> 결과: {String(results.getCurrentDate)}</span>
            </div>

            <div style={{marginBottom: '20px'}}>
                <h3>setLocalStorage - 로컬 스토리지에 저장</h3>
                <input
                    type="text"
                    placeholder="Key"
                    value={localStorageInput.key}
                    onChange={(e) => setLocalStorageInput({...localStorageInput, key: e.target.value})}
                />
                <input
                    type="text"
                    placeholder="Value"
                    value={localStorageInput.value}
                    onChange={(e) => setLocalStorageInput({...localStorageInput, value: e.target.value})}
                    onKeyPress={(e) => e.key === 'Enter' && handleTest('setLocalStorage')}
                />
                <button onClick={() => handleTest('setLocalStorage')}>테스트 실행</button>
                <span> 결과: {results.setLocalStorage}</span>
            </div>

            <div style={{marginBottom: '20px'}}>
                <h3>getLocalStorage - 로컬 스토리지에서 가져오기</h3>
                <input
                    type="text"
                    placeholder="Key"
                    value={localStorageKeyInput}
                    onChange={(e) => setLocalStorageKeyInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleTest('getLocalStorage')}
                />
                <button onClick={() => handleTest('getLocalStorage')}>테스트 실행</button>
                <span> 결과: {String(results.getLocalStorage)}</span>
            </div>

            <div style={{marginBottom: '20px'}}>
                <h3>removeLocalStorage - 로컬 스토리지에서 삭제</h3>
                <input
                    type="text"
                    placeholder="Key"
                    value={localStorageKeyInput}
                    onChange={(e) => setLocalStorageKeyInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleTest('removeLocalStorage')}
                />
                <button onClick={() => handleTest('removeLocalStorage')}>테스트 실행</button>
                <span> 결과: {results.removeLocalStorage}</span>
            </div>

            <div style={{marginBottom: '20px'}}>
                <h3>randomInt - 1에서 100 사이의 랜덤 정수 생성</h3>
                <button onClick={() => handleTest('randomInt')}>랜덤 숫자 생성</button>
                <span> 결과: {results.randomInt !== undefined ? String(results.randomInt) : ''}</span>
            </div>

            <div style={{marginBottom: '20px'}}>
                <h3>sleep - 지정한 시간 동안 대기</h3>
                <input
                    type="number"
                    placeholder="대기 시간 (ms)"
                    value={sleepInput}
                    onChange={(e) => setSleepInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleTest('sleep')}
                />
                <button onClick={() => handleTest('sleep')}>테스트 실행</button>
                <span> 결과: {String(results.sleep)}</span>
            </div>
        </div>
    );
}

export default UtilTest;
