import {createBrowserRouter} from 'react-router-dom';
import App from 'App';
import {Login} from 'features/authentication';
import {
    TransportContract,
    TransportContractDTL,
    TransportTariffList, 
    TransportTariffUpdate, 
    TransportDraftBill, 
    TransportRevenueLeak, 
    TransportTransmittal,
    TransportOutlet 
} from 'features/transport';
import {Vendors,DataUpload} from 'features/data-management';
import {
    WarehouseDraftBill,
    WarehouseTransmittal
} from 'features/warehouse';
import {Scheduler} from 'features/administration';


const router = createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        children:[
            {
                path:'/scheduler',
                element:<Scheduler/>
            },
            {
                path:'/transport-draftbill',
                element:<TransportDraftBill/>
            },
            {
                path:'/transport-revenue-leak',
                element:<TransportRevenueLeak/>
            },
            {
                path:'/transport-transmittal',
                element:<TransportTransmittal/>
            },
            {
                path:'/transport-contract',
                element:<TransportOutlet/>,
                children:[
                    {
                        index:true,
                        element:<TransportContract/>
                    },
                    {
                        path:':contract_id',
                        element:<TransportContractDTL/>
                    }
                ]
            },
            {
                path:'/transport-tariff',
                element:<TransportOutlet/>,
                children:[
                    {
                        index:true,
                        element:<TransportTariffList/>
                    },
                    {
                        path:'edit',
                        element:<TransportTariffUpdate/>
                    }
                ]
            },
            {
                path:'/warehouse-draftbill',
                element: <WarehouseDraftBill/>
            },
            {
                path:'/warehouse-transmittal',
                element: <WarehouseTransmittal/>
            },
            {
                path:'/vendors',
                element:<Vendors/>
            },
            {
                path:'/data-upload',
                element:<DataUpload/>
            }
        ]
        // children:[
        //     {   
        //         path:'/',
        //         element:<Content/>,
        //         children:[
        //             {
        //                 path:'/transport-draftbill',
        //                 element:<Content/>
        //             },
        //             {
        //                 path:'/transport-revenue-leak',
        //                 element:<Content/>
        //             },
        //             {
        //                 path:'/transport-transmittal',
        //                 element:<Content/>
        //             },
        //             {
        //                 path:'/transport-contract',
        //                 element:<TransportContract/>
        //             },
        //             {
        //                 path:'/transport-tariff',
        //                 element:<TransportTariff/>
        //             }
        //         ]
        //     }
        // ]  
    },
    {
        path:'/login',
        element:<Login/>
    },
])

export default router