import React from 'react'
import {useLocation, useNavigate } from 'react-router-dom';
import {selectAcess} from 'lib/redux';
import { useSelector } from 'react-redux';

const useCheckAccesSub = ({
    header_id,
    id
}) => {
    const location = useLocation();
    const data = useSelector(selectAcess);
    // const navigate = useNavigate();

    const access = data.find(item => item.id === header_id).children.find(item => item.path === `/${location.pathname.split('/')[1]}`)
    return access
}

export default useCheckAccesSub