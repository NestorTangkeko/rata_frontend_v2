import React from 'react';
import {SubHeader,Container} from 'layouts';
import {Button} from '@chakra-ui/react';
import {useNavigate, useParams } from 'react-router-dom';
import RoleModules from 'features/administration/components/RoleModules';
import RoleInfo from 'features/administration/components/RoleInfo';
import Skeleton from 'components/Skeleton';
import {useGetAdminDataQuery,useCreateAdminDataMutation} from 'lib/redux/api/administration.api.slice';
import { toast } from 'react-toastify';
import { useCheckAccesSub } from 'hooks';

const RoleAccess = () => {
    const params = useParams();
    const navigate = useNavigate();
    const hasAccess = useCheckAccesSub({header_id:'administration'});

    const {data = {}, isLoading} = useGetAdminDataQuery({
        route:`role/${params.id}`
    })
    const [createAccess, createAccessProps] = useCreateAdminDataMutation()

    const onConfirm = async (data) => {
        await createAccess({
            route: `role/${params.id}`,
            body: {
                data
            }
        })
        .unwrap()
        .then(result => {
            toast.success('Role Updated!')
        })
    }

    return (
        <>
            <SubHeader title={'Role Access'}>
                <Button colorScheme={'orange'} onClick={()=>navigate(-1)}>Back</Button>
            </SubHeader> 
            <Container>
                {isLoading ? <Skeleton/> : <RoleInfo data={data}/>}
            </Container>
            <Container>
                {isLoading ? <Skeleton/> : 
                <RoleModules access={data.access} onConfirm={onConfirm} isConfirmLoading = {createAccessProps.isLoading} isLoading={isLoading} hasEdit={hasAccess.edit}/> }
            </Container>
        </>
    )
}

export default RoleAccess