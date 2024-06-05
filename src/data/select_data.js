export const  data_upload = [
    {
        label: 'Principal',
        value: 'principal'
    },
    {
        label: 'Ship Point',
        value: 'ship-point'
    },
    {
        label:'Vendor Upload',
        value:'vendor'
    },
    {
        label:'Transport Tariff',
        value:'tariff'
    },
    {
        label:'Transport Contract',
        value:'contract'
    },
    {
        label: 'Warehouse Tariff',
        value:'wms-tariff'
    },
    {
        label:'Warehouse Contract',
        value:'wms-contract'
    }
]

export const contract_type = [
    {
        label:'BUY',
        value:'BUY'
    },
    {
        label:'SELL',
        value:'SELL'
    },
]

export const tariff_status = [
    'APPROVED',
    'DRAFT'
]

export const contract_status = [
    'APPROVED',
    'DRAFT'
]

export const rate_status = [
    {
        label:'ACTIVE',
        value:'ACTIVE'
    },
    {
        label:'INACTIVE',
        value:'INACTIVE'
    }
]

export const trip_status= [
    {
        label:'DISPATCH_CONFIRMED',
        value:'DISPATCH_CONFIRMED'
    },
    {
        label:'TRUCKER_CLEARED',
        value:'TRUCKER_CLEARED'
    }
]

export const revenue_leak = [
    {
        label:'No Ship Point Information',
        value:'No Ship Point Information'.toUpperCase()
    },
    {
        label:'Not Billable',
        value:'Not Billable'.toUpperCase()
    },
    {
        label:'No Contract',
        value:'No Contract'.toUpperCase()
    },
    {
        label:'No Tariff',
        value:'No Tariff'.toUpperCase()
    },
    {
        label:'Duplicate Tariff',
        value:'Duplicate Tariff'.toUpperCase()
    },
    {
        label:'No Formula or Condition Matched',
        value:'No Formula or Condition Matched'.toUpperCase()
    },
    {
        label:'Invalid Total Charges result',
        value:'Invalid Total Charges result'.toUpperCase()
    }

]

export const draft_bill_status = [
    {
        label:'DRAFT_BILL',
        value:'DRAFT_BILL'
    },
    {
        label:'DRAFT_BILL_POSTED',
        value:'DRAFT_BILL_POSTED'
    }
]

export const aggregate_by = [
    {
        label:'actual_cbm',
        value:'actual_cbm'
    },
    {
        label:'actual_weight',
        value:'actual_weight'
    },
    {
        label:'actual_qty',
        value:'actual_qty'
    }
]

export const group_by = [
    {
        label:'service_type',
        value:'service_type'
    },
    {
        label:'stc_to',
        value:'stc_to'
    },
    {
        label:'stc_from',
        value:'stc_from'
    },
    {
        label:'principal_code',
        value:'principal_code'
    }, {
        label:'location',
        value:'location'
    },
    {
        label:'class_of_store',
        value:'class_of_store'
    },
    {
        label:'vehicle_type',
        value:'vehicle_type'
    },
    {
        label:'trip_no',
        value:'trip_no'
    },
    {
        label:'transaction_date',
        value:'transaction_date'
    }
]

export const parameters = [
    {
        label:'min_billable_unit',
        value:`tariff['min_billable_unit']`
    },
    {
        label:'max_value',
        value:`tariff['max_value']`
    },
    {
        label:'min_value',
        value:`tariff['min_value']`
    },
    {
        label:'vehicle_type',
        value:`tariff['vehicle_type']`
    },
    {
        label:'rate',
        value:`tariff['tariff_rate']`
    },
    {
        label:'min_rate',
        value:`tariff['min_rate']`
    },
    {
        label:'total_qty',
        value:`invoice['total_qty']`
    },
    {
        label:'total_weight',
        value:`invoice['total_weight']`
    },
    {
        label:'total_cbm',
        value:`invoice['total_cbm']`
    },
    {
        label:'trip_plan',
        value:`invoice['trip_no']`
    },
    {
        label:'invoice_vehicle_type',
        value:`invoice['veh_type']`
    },
    {
        label:'invoice_class_of_store',
        value:`invoice['class_of_store']`
    },
    {
        label:'null',
        value:'null'
    }
]

export const formulaBuilder = [
    {
        label:'Parameters',
        value:'parameters'
    },
    {
        label:'Operators',
        value:'operators'
    },
    {
        label:'Groupings',
        value:'groupings'
    },
    {
        label:'Text',
        value:'text'
    }
]

export const conditionBuilder = [
    {
        label:'Parameters',
        value:'parameters'
    },
    {
        label:'Groupings',
        value:'groupings'
    },
    {
        label:'Relational Operators',
        value:'relational_operators'
    },
    {
        label:'Logical Operators',
        value:'binary_logical_operators'
    },
    {
        label:'Text',
        value:'text'
    }
]

export const groupings = [
    {
        label:'(',
        value:'('
    },
    {
        
        label:')',
        value:')'
    },
    {
        
        label:'[',
        value:'['
    },
    {
        
        label:']',
        value:']'
    },
    {
        label:'{',
        value:'{'
    },
    {
        label:'}',
        valie:'}'
    }
]

export const binary_logical_operators = [
    {
        value:'&&',
        label:'AND'
    },
    {
        value:'||',
        label:'OR'
    }
]

export const relational_operators = [
    {
        value:'in',
        label:'in'
    },
    {
        value:'<',
        label:'<'
    },
    {
        value:'>',
        label:'>'
    },
    {
        value:'<=',
        label:'<='
    },
    {
        value:'>=',
        label:'>='
    },
    {
        value:'!=',
        label:'!='
    },
    {
        value:'==',
        label:'=='
    },
    {
        value:'!==',
        label:'!=='
    },
    {
        value:'===',
        label:'==='
    },
]

export const operators = [
    {
        label:'*',
        value:'*'
    },
    {
        label:'+',
        value:'+'
    },
    {
        label:'/',
        value:'/'
    },
    {
        label:'-',
        valie:'-'
    },
    {
        label:'Round',
        value:'Math.round('
    }
]

export const draft_bill_export = [
    {
        label:'Draft Bill Date',
        value:'draft_bill_date'
    },
    {
        label:'Trip Date',
        value:'trip_date'
    }
]

export const contract_validity = [
    {
        label:'Valid',
        value:'VALID'
    },
    {
        label:'Invalid',
        value:'INVALID'
    }
]

export const cr_status = [
    {
        label:'CR CREATED',
        value:'CR_CREATED'
    },
    {
        label:'CR FAILED',
        value:'CR_FAILED'
    }
]