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
    TransportOutlet, 
    Invoices
} from 'features/transport';
import {Vendors,DataUpload, Geography, Location, QuickCode, Principal, Algorithm, CreateAlgo} from 'features/data-management';
import {
    WarehouseDraftBill,
    WarehouseTransmittal
} from 'features/warehouse';
import {Role, RoleAccess, Scheduler, User} from 'features/administration';
import ShipPoint from 'features/data-management/pages/ShipPoint';

const router = createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        children:[
            {
                path:'/transport-draftbill',
                element:<TransportDraftBill/>
            },
            {
                path:'/transport-invoice',
                element: <Invoices/>
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
                path:'/geography',
                element:<Geography/>
            },
            {
                path:'/ship-point',
                element:<ShipPoint/>
            }, 
            {
                path:'/location',
                element:<Location/>
            },
            {
              path:'/quick-code',
              element:<QuickCode/>  
            },
            {
                path:'/Principal',
                element:<Principal/>
            },
            {
                path:'/vendors',
                element:<Vendors/>
            },
            {
                path:'/algorithm',
                children: [
                    {
                        index: true,
                        element:<Algorithm/>
                    },
                    {
                        path:'create',
                        element:<CreateAlgo/>
                    },
                    {
                        path:':id',
                        element:<CreateAlgo/>   
                    }
                ]
                
            },
            {
                path:'/data-upload',
                element:<DataUpload/>
            },
            {
                path:'/scheduler',
                element:<Scheduler/>
            },
            {
                path:'/users',
                element:<User/>
            },
            {
                path:'/roles',
                children: [
                    {
                        index:true,
                        element: <Role/>
                    },
                    {
                        path:':id',
                        element: <RoleAccess/>
                    }
                ]
            }

        ] 
    },
    {
        path:'/login',
        element:<Login/>
    },
])

export default router