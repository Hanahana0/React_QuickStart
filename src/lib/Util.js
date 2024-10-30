const Util = {
    /**
     * Null 체크 함수
     * 주어진 값이 null, undefined, 또는 빈 문자열인지 확인합니다.
     * @param {any} value - 체크할 값
     * @returns {boolean} - null이거나 빈 값일 경우 true, 그렇지 않으면 false
     */
    isNull(value) {
        return value === null || value === undefined || value.length === 0;
    },

    /**
     * Null 대체 함수
     * 주어진 값이 null이거나 빈 값일 경우, 기본값을 반환합니다.
     * @param {any} value - 체크할 값
     * @param {any} defaultValue - 기본값
     * @returns {any} - null이거나 빈 값일 경우 defaultValue, 그렇지 않으면 value
     */
    nvl(value, defaultValue) {
        return this.isNull(value) ? defaultValue : value;
    },

    /**
     * 좌측 공백 제거 함수
     * 문자열의 왼쪽에서 특정 문자열(trimValue)을 제거합니다.
     * @param {string} str - 원본 문자열
     * @param {string} trimValue - 제거할 문자열 (기본값: 공백)
     * @returns {string} - 좌측 공백이 제거된 문자열
     */
    lTrim(str, trimValue = ' ') {
        while (str.startsWith(trimValue)) {
            str = str.slice(trimValue.length);
        }
        return str;
    },

    /**
     * 우측 공백 제거 함수
     * 문자열의 오른쪽에서 특정 문자열(trimValue)을 제거합니다.
     * @param {string} str - 원본 문자열
     * @param {string} trimValue - 제거할 문자열 (기본값: 공백)
     * @returns {string} - 우측 공백이 제거된 문자열
     */
    rTrim(str, trimValue = ' ') {
        while (str.endsWith(trimValue)) {
            str = str.slice(0, -trimValue.length);
        }
        return str;
    },

    /**
     * 문자열 길이 계산 함수
     * 문자열의 길이를 계산합니다. (영문자 1, 한글자 2)
     * @param {string} str - 문자열
     * @returns {number} - 계산된 문자열 길이
     */
    lengthb(str) {
        return [...str].reduce((len, char) => len + (char.charCodeAt(0) > 127 ? 2 : 1), 0);
    },

    /**
     * 문자열 오른쪽에서 지정된 길이만큼 가져오는 함수
     * @param {string} str - 원본 문자열
     * @param {number} len - 가져올 길이
     * @returns {string} - 오른쪽에서 len 만큼의 문자열
     */
    right(str, len) {
        return str.slice(-len);
    },

    /**
     * 조건에 따라 반환값을 다르게 하는 대체 함수
     * 조건이 참일 경우 rtnTrue, 그렇지 않으면 rtnFalse를 반환합니다.
     * @param {boolean} cond - 조건
     * @param {any} rtnTrue - 조건이 참일 때 반환할 값
     * @param {any} rtnFalse - 조건이 거짓일 때 반환할 값
     * @returns {any} - 조건에 따른 반환 값
     */
    iif(cond, rtnTrue, rtnFalse) {
        return cond ? rtnTrue : rtnFalse;
    }
};

export default Util;
