const util = {
    // ----------------------------------------
    // 1. 데이터 유효성 검사 및 변환
    // ----------------------------------------

    /**
     * Null 체크 함수
     * @param {any} value - 검사할 값
     * @returns {boolean} - Null 또는 undefined일 경우 true
     */
    isNull(value) {
        return value === null || value === undefined || value.length === 0;
    },

    /**
     * Null 대체 함수
     * @param {any} value - 검사할 값
     * @param {any} defaultValue - 기본값
     * @returns {any} - Null일 경우 defaultValue, 아니면 value
     */
    nvl(value, defaultValue) {
        return this.isNull(value) ? defaultValue : value;
    },

    /**
     * 문자열 좌우 공백 제거 함수
     * @param {string} str - 공백을 제거할 문자열
     * @returns {string} - 양쪽 공백이 제거된 문자열
     */
    trim(str) {
        return str ? str.trim() : "";
    },

    /**
     * 문자열의 첫 글자를 대문자로 변환
     * @param {string} str - 문자열
     * @returns {string} - 첫 글자만 대문자로 변환된 문자열
     */
    capitalize(str) {
        return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
    },

    // ----------------------------------------
    // 2. 숫자 및 날짜 관련 함수
    // ----------------------------------------

    /**
     * 숫자를 포맷팅하여 소수점 자리수를 지정
     * @param {number} num - 포맷할 숫자
     * @param {number} decimals - 소수점 자리수
     * @returns {string} - 포맷된 숫자
     */
    formatNumber(num, decimals) {
        return num.toFixed(decimals);
    },

    /**
     * 현재 날짜를 yyyy-MM-dd 형식으로 반환
     * @returns {string} - 현재 날짜
     */
    getCurrentDate() {
        const date = new Date();
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    },

    /**
     * 두 날짜 간의 차이 계산
     * @param {string} startDate - 시작 날짜 (yyyy-MM-dd)
     * @param {string} endDate - 종료 날짜 (yyyy-MM-dd)
     * @returns {number} - 날짜 차이 (일 수)
     */
    dateDiff(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    },

    // ----------------------------------------
    // 3. 로컬 스토리지 및 세션 스토리지 관리
    // ----------------------------------------

    /**
     * 로컬 스토리지에 데이터 저장
     * @param {string} key - 키
     * @param {any} value - 값
     */
    setLocalStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    /**
     * 로컬 스토리지에서 데이터 가져오기
     * @param {string} key - 키
     * @returns {any} - 가져온 데이터 (없으면 null)
     */
    getLocalStorage(key) {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    },

    /**
     * 로컬 스토리지에서 데이터 삭제
     * @param {string} key - 키
     */
    removeLocalStorage(key) {
        localStorage.removeItem(key);
    },

    // ----------------------------------------
    // 4. 문자열 조작 및 변환
    // ----------------------------------------

    /**
     * 문자열에서 모든 일치하는 부분을 다른 문자열로 치환
     * @param {string} str - 원본 문자열
     * @param {string} search - 찾을 문자열
     * @param {string} replace - 바꿀 문자열
     * @returns {string} - 변환된 문자열
     */
    replaceAll(str, search, replace) {
        return str.split(search).join(replace);
    },

    /**
     * 지정한 길이로 문자열 자르기
     * @param {string} str - 원본 문자열
     * @param {number} length - 자를 길이
     * @returns {string} - 잘린 문자열
     */
    truncate(str, length) {
        return str.length > length ? str.slice(0, length) + "..." : str;
    },

    // ----------------------------------------
    // 5. 유효성 검사
    // ----------------------------------------

    /**
     * 이메일 형식 검사
     * @param {string} email - 이메일 주소
     * @returns {boolean} - 이메일 형식이 맞으면 true, 아니면 false
     */
    isEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    /**
     * URL 형식 검사
     * @param {string} url - URL 문자열
     * @returns {boolean} - URL 형식이 맞으면 true, 아니면 false
     */
    isURL(url) {
        const re = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;
        return re.test(url);
    },

    // ----------------------------------------
    // 6. 기타 유틸리티 함수
    // ----------------------------------------

    /**
     * 객체를 깊은 복사
     * @param {object} obj - 복사할 객체
     * @returns {object} - 깊은 복사된 객체
     */
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    /**
     * 지정한 시간 동안 대기
     * @param {number} ms - 대기할 시간 (밀리초)
     * @returns {Promise} - 주어진 시간 후 resolve
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * 랜덤한 정수 생성
     * @param {number} min - 최소값
     * @param {number} max - 최대값
     * @returns {number} - min과 max 사이의 랜덤 정수
     */
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};

export default util;
