import React from 'react';
import {Container, SubHeader} from 'layouts';

import SchedulerTable from 'features/administration/components/tables/SchedulerTable';
import {useCheckAccess} from 'hooks';

const Scheduler = () => {
    const hasAccess = useCheckAccess({header_id: 'administration'});

    return (<>
        <SubHeader title={'Scheduler'}>
        </SubHeader>
        <Container>
            <SchedulerTable hasEdit={hasAccess.edit} hasCreate={hasAccess.create}/>
        </Container>
    </>)
}

export default Scheduler