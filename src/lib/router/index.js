import {createBrowserRouter} from 'react-router-dom';
import App from 'App';
import {Login} from 'features/authentication';
import {TransportContract,TransportTariffList,TransportTariff, TransportTariffUpdate, TransportDraftBill} from 'features/transport';
import {Scheduler} from 'features/administration';
import {Content} from 'layouts';


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
                element:<Content/>
            },
            {
                path:'/transport-transmittal',
                element:<Content/>
            },
            {
                path:'/transport-contract',
                element:<TransportContract/>
            },
            {
                path:'/transport-tariff',
                element:<TransportTariff/>,
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