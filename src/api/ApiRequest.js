/**
 * API 수신 전용 데이타 구조체
 */
export default class ApiResponse {
    constructor(success, data, message, errorCode) {
        this.success = success; // 성공 여부
        this.data = data || null; // 데이터
        this.message = message || ''; // 메시지
        this.errorCode = errorCode || null; // 오류 코드
    }
}