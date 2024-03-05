/* eslint-disable array-callback-return */
import React from 'react';
import defaultModules from 'data/modules';
import {useAccessQuery} from 'lib/redux/api/auth.api.slice';
import { setAccess } from 'lib/redux';
import { useDispatch } from 'react-redux';

const useSetAccess = () => {
    const dispatch = useDispatch();
    const {data = {},isSuccess,isLoading} = useAccessQuery()
    const [modules,setModules]=React.useState(defaultModules);

    React.useEffect(() => {
        console.log(defaultModules)
        let temp = [];
        if(isSuccess) {
            defaultModules.map(def => {
                let {children,...defaultHeaders} = def
                const header = data.find(item => item.id ===  defaultHeaders.id);

                if(header) {
                    children=children.map(item => {
                   
                        const access = header.children.find(item2 => item.id === item2.id)
                        
                        return {
                            ...item,
                            ...access    
                        }
                    })

                    temp.push({
                        ...defaultHeaders,
                        view: header.view,
                        children
                    })
                }
            })
    
            setModules(temp)
            dispatch(setAccess(temp))
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isSuccess])

   
    return {
        modules,
        isLoading
    }
}

export default useSetAccess