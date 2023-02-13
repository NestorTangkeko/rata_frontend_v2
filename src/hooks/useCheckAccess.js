import React from 'react';
import {useLocation, useNavigate } from 'react-router-dom';
import {selectAcess} from 'lib/redux';
import { useSelector } from 'react-redux';


const useCheckAccess = ({
    header_id
}) => {
    const location = useLocation();
    const data = useSelector(selectAcess);
    const navigate = useNavigate();

    const access = data.find(item => item.id === header_id).children.find(item => item.path === location.pathname)
    
    React.useEffect(() => {
        if(!access.view){
            return navigate('/404',{
                replace:true
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return access
}

export default useCheckAccess