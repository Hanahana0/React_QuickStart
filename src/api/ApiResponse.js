/**
 * API 송신 전용 데이타 구조체
 */
export default class ApiResponse {
    constructor(response) {
        // 서버에서 응답받은 필드 이름과 일치하도록 수정합니다.
        this.RTN_DATA = response.RTN_DATA;       // 데이터
        this.RTN_MSG = response.RTN_MSG;           // 메시지
        this.RTN_CD = response.RTN_CD;           // 오류 코드 (성공 시 null)
    }

    // 필요에 따라 데이터를 쉽게 접근할 수 있도록 getter를 추가할 수도 있습니다.
    getData() {
        return this.RTN_DATA;
    }

    getMessage() {
        return this.RTN_MSG;
    }

    getErrorCode() {
        return this.RTN_CD;
    }
}