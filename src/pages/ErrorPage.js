import { useLocation } from 'react-router-dom';

const ErrorPage = () => {
    const location = useLocation();
    return (
        <>
            없는페이지!!
            <ul>
                <li>hash : {location.hash}</li>
                <li>pathname : {location.pathname}</li>
                <li>search : {location.search}</li>
                <li>state : {location.state}</li>
                <li>key : {location.key}</li>
            </ul>
        </>
    )
}

export default ErrorPage;