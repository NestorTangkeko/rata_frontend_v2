import React from 'react';
import * as xlsx from 'xlsx';

const useXLSX = () => {
    const [converted,setConverted] = React.useState([]);

    const processCSV = (str, delim=',') => {
        const lines = str.split(/\r\n|\n|\r/);
        const headers = lines[0].split(delim)
        lines.splice(0,2)
        const rows = lines[0].split(delim).length !== headers.length ? [] : lines

        return rows.map(row => {
            const values = row.split(delim)
            const eachObject = headers.reduce((obj, header, i) => {
                obj[header] = values[i] === '' ? null : values[i];
                return obj;
            }, {})

            return eachObject
        })
    }

    const processJSON = (data) =>{
        const headers = data[0];
        data.splice(0,2);
        const rows = data;

        return rows.map(row => {
            const eachObject = headers.reduce((obj, header, i) => {
                obj[header] = typeof row[i] === 'undefined' ? null : row[i];
                return obj;
            }, {})

            return eachObject
        })
    }
    
    const convertToXLSX = (file) => {
        if(!file) {
            return setConverted(null)
        }

        const reader = new FileReader();
        const fileExt = file.name.split('.').pop()
            
        if(fileExt === 'csv'){
            reader.onload = (event) => {
                const text = event.target.result;
                const array = processCSV(text)
                
                setConverted(array)
            }            
            reader.readAsText(file)
            
        }
        else if(fileExt === 'xlsx'){
            reader.onload = (event) => {
                const text = event.target.result;
                const wb = xlsx.read(text, {type:'binary',raw:true});
                const wsNames = wb.SheetNames;
                let data = {}
                for(const names of wsNames){
                    const ws = wb.Sheets[names]
                    const json = xlsx.utils.sheet_to_json(ws,{header:1,blankrows:false})
                    data[names]=processJSON(json)
                }
                setConverted(data)
            } 
            reader.readAsBinaryString(file)
        }

    }


    return [converted,convertToXLSX]
}


export default useXLSX;