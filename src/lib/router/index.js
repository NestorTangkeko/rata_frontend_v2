import App from 'App';
import {createBrowserRouter} from 'react-router-dom';
import {ForgotPassword, Login, NewUser} from 'features/authentication';
import {
    TransportContract,
    TransportContractDTL,
    TransportTariffList, 
    TransportTariffUpdate, 
    TransportDraftBill, 
    TransportRevenueLeak, 
    TransportTransmittal,
    TransportOutlet, 
    Invoices,
    TransmittalDetails,
} from 'features/transport';
import {Vendors,DataUpload, Geography, Location, QuickCode, Principal, Algorithm, CreateAlgo, ShipPointEdit, VehicleTypes} from 'features/data-management';
import {
    WarehouseDraftBill,
    WarehouseTransmittal
} from 'features/warehouse';
import {Role, RoleAccess, Scheduler, User} from 'features/administration';
import ShipPoint from 'features/data-management/pages/ShipPoint';
import { BillingCreate, BillingTransport, SODetails } from 'features/billing';
import CostAllocation from 'features/data-management/pages/CostAllocation/CostAllocation';
import { AccrualReports, ReportDetails, Reports } from 'features/reports';
import {CRUpload, CRDetails, SOUpload} from 'features/billing';

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
                children:[
                    {
                        index:true,
                        element:<TransportTransmittal/>
                    },
                    {
                        path:':draft_bill',
                        element:<TransmittalDetails/>
                    }
                ]
                
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
                path:'/transport-billing',
                children:[
                    {
                        index:true,
                        element: <BillingTransport/>
                    },
                    {
                        path:'create',
                        element:<BillingCreate/>
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
                children:[
                    {
                        index:true,
                        element:<ShipPoint/>, 
                    },
                    {
                        path:':id',
                        element:<ShipPointEdit/>
                    }
                ]
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
                path:'/cost-allocation',
                element:<CostAllocation/>
            },
            {
                path:'/vehicle-type',
                element:<VehicleTypes/>
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
            },
            {
                path:'/reports',
                children:[
                    {
                        path:'pre-billing',
                        children:[
                            {
                                index:true,
                                element:<Reports/>
                            }
                        ]
                    },
                    {
                        path:'accrual',
                        element:<AccrualReports/>
                    },
                    {
                        path:':report_name',
                        element:<ReportDetails/>
                    }
                ]
            },
            {
                path:'/cr-upload',
                children:[
                    {
                        index:true,
                        element:<CRUpload/>
                    },
                    {
                        path:':id',
                        element:<CRDetails/>
                    }
                ]
            },
            {
                path:'/so-upload',
                children:[
                    {
                        index:true,
                        element: <SOUpload/>
                    },
                    {
                        path:':id',
                        element: <SODetails/>
                    }
                ]
            }
        ] 
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/new-user',
        element: <NewUser/>
    },
    {
        path:'/forgot-password',
        element: <ForgotPassword/>
    }
])

export default router