/**
 * API 송신 전용 데이타 구조체
 */
export default class ApiRequest {
    constructor(url, data = {}) {
        this.url  = url;  // api url 경로!
        this.data = data; // 데이터 담을놈
    }

    // 데이터 유효성 검사 (예: 모든 필수 필드가 포함되어 있는지 확인)
    validate() {
        if (!this.url) throw new Error("url cannot be empty.");
        // 추가적인 유효성 검사 로직을 여기에 작성할 수 있습니다.
    }

    // 필요한 경우 요청 데이터를 변환하는 메서드 추가
    transform() {
        // 데이터 변환 로직 추가 (예: 날짜 포맷 변환 등)
    }
}