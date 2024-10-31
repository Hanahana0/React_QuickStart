import React from 'react'

class ErrorHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 다음 렌더링에서 대체 UI를 표시하도록 상태를 업데이트한다.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 오류를 오류 보고 서비스에 기록할 수도 있다.
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 커스텀 대체 UI를 렌더링할 수 있다.
      return <h1>문제가 발생했습니다.</h1>;
    }

    return this.props.children;
  }
}
export default ErrorHandler;
