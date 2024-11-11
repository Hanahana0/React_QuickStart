import Util from '../lib/Util';

/**
 * API 수신 전용 데이타 구조체
 */
export default class ApiRequest {
    constructor(action, params = {}, extraFields = {}) {
        this.P_ACT = action;     // Controller에서 분기 처리할 스트링 값
        this.P_PARAM = params;   // 데이터가 담길 키-오브젝트 구조
        const userInfo = this.getCurrentUserInfo();
        debugger;
        this.LANG_CD = userInfo.LANG_CD;
        this.DOMAINKEY = userInfo.DOMAINKEY;
        this.USERID = userInfo.USERID;
        // extraFields 객체의 모든 키-값 쌍을 현재 인스턴스에 추가
        Object.assign(this, extraFields);

        // GV_USERINFO 기본값 설정
        // this.GV_USERINFO = this.getCurrentUserInfo();
        // // 글로벌 데이타
        // this.GV_VAL      = {
        //     APP_CODE : ""
        //     , COMPANY : ""
        //
        // }; // 추후 api 송신시 데이터 세팅해야하는것들 여기다가 담아줘야하는 로직 넣으면 될듯 ?
    }

    // 현재 유저 정보를 가져오는 메서드
    getCurrentUserInfo() {
        // 유저정보 세팅
        const userInfo = localStorage.getItem('auth');
        console.log("userInfo >>> " , userInfo);
        if (!Util.isNull(userInfo)) {
            try {
                const parsedInfo = JSON.parse(userInfo); // JSON 파싱
                return {
                    DOMAINKEY: parsedInfo.DOMAINKEY || null,
                    USERID: parsedInfo.USERID || null,
                    LANG_CD: parsedInfo.LANG_CD || 'en'
                };
            } catch (error) {
                console.error("Failed to parse user info from localStorage:", error);
                return {};
            }
        }

        // 유저 정보가 없는 경우 기본값 반환
        return {};
    }

    // 데이터 유효성 검사 (예: P_ACT 필드 확인)
    validate() {
        if (!this.P_ACT) throw new Error("P_ACT cannot be empty.");
        // 추가적인 유효성 검사 로직을 여기에 작성할 수 있습니다.
    }

    // 필요한 경우 요청 데이터를 변환하는 메서드 추가 (예: 날짜 포맷 변환)
    transform() {
        // 데이터 변환 로직 추가
    }
}