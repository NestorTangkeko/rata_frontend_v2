import {useSearchParams} from 'react-router-dom';

const useQueryParams = () => {
    const [searchParams] = useSearchParams();
    return new URLSearchParams(searchParams);
}

export default useQueryParams