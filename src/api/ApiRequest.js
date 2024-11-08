/**
 * API 수신 전용 데이타 구조체
 */
export default class ApiRequest {
    constructor(action, params = {}) {
        this.P_ACT = action;     // Controller에서 분기 처리할 스트링 값
        this.P_PARAM = params;   // 데이터가 담길 키-오브젝트 구조
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