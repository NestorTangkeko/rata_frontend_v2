import React from 'react';
import {Container, SubHeader} from 'layouts';

import SchedulerTable from 'features/administration/components/tables/SchedulerTable';

const Scheduler = () => {

    return (<>
        <SubHeader title={'Scheduler'}>
        </SubHeader>
        <Container>
            <SchedulerTable/>
        </Container>
    </>)
}

export default Scheduler