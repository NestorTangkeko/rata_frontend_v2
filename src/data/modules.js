const modules = [
    {
        sequence_no_no:1,
        id:'transport_operations',
        label:'Transport Operations',
        children:[
            {
                sequence_no:1,
                id:'draft_bill',
                label:'Draft Bill',
                path:'/transport-draftbill'
            },
            {
                sequence_no: 2,
                id: 'invoice',
                label:'Invoices',
                path:'/transport-invoice'
            },
            {
                sequence_no:3,
                id:'revenue_leak',
                label:'Revenue Leak',
                path:'/transport-revenue-leak'
            },
            {
                sequence_no:4,
                id:'transmittal',
                label:'Transmittal',
                path:'/transport-transmittal'
            },
            {
                sequence_no:5,
                id:'contract',
                label:'Contract',
                path:'/transport-contract'
            },
            {
                sequence_no:6,
                id:'tariff',
                label:'Tariff',
                path:'/transport-tariff'
            },
            {
                sequence_no: 7,
                id:'billing',
                label: 'Billing',
                path:'/transport-billing'
            }
        ]
    },
    {
        sequence_no:2,
        id:'warehouse_operations',
        label:'Warehouse Operations',
        children:[
            {
                sequence_no:1,
                id:'draft_bill',
                label:'Draft Bill',
                path:'/warehouse-draftbill'
            },
            {
                sequence_no:2,
                id:'revenue_leak',
                label:'Revenue Leak',
                path:'/warehouse-revenue-leak'
            },
            {
                sequence_no:3,
                id:'transmittal',
                label:'Transmittal',
                path:'/warehouse-transmittal'
            },
            {
                sequence_no:4,
                id:'contract',
                label:'Contract',
                path:'/warehouse-contract'
            },
            {
                sequence_no:5,
                id:'tariff',
                label:'Tariff',
                path:'/warehouse-tariff'
            }
        ]
    },
    {
        sequence_no_no:3,
        id:'data_management',
        label:'Data Management',
        children:[
            {
                sequence_no:1,
                id:'geography',
                label:'Geography',
                path:'/geography'
            },
            {
                sequence_no:2,
                id:'vendors',
                label:'Vendors',
                path:'/vendors'
            },
            {
                sequence_no:3,
                id:'principal',
                label:'Principal',
                path:'/principal'
            },
            {
                sequence_no:4,
                id:'ship_point',
                label:'Ship Point',
                path:'/ship-point'
            },
            {
                sequence_no:5,
                id:'location',
                label:'Location',
                path:'/location'
            },
            {
                sequence_no:6,
                id:'quick_code',
                label:'Quick Code',
                path:'/quick-code'
            },
            {
                sequence_no:7,
                id:'algorithm',
                label:'Algorithm',
                path:'/algorithm'
            },
            {
                sequence_no:8,
                id:'data_upload',
                label:'Data Upload',
                path:'/data-upload'
            }
        ]
    },
    {
        sequence_no:4,
        id:'administration',
        label:'Administration',
        children:[
            {
                sequence_no:1,
                id:'users',
                label:'Users',
                path:'/users',
            },
            {
                sequence_no:2,
                id:'roles',
                label:'Roles',
                path:'/roles'
            },
            {
                sequence_no:3,
                id:'scheduler',
                label:'Scheduler',
                path:'/scheduler'
            }
        ]
    }
]

export default modules