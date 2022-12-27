/* eslint-disable array-callback-return */
import {saveAs} from 'file-saver';
import * as xlsx from 'xlsx';

const useCreateXLSX = () => {
    const createResult = (result) => {
        const wb = xlsx.utils.book_new();

        Object.keys(result).map(item => {
            const ws = xlsx.utils.json_to_sheet(result[item]);
            xlsx.utils.book_append_sheet(wb,ws,item);
        })

        const data = xlsx.write(wb,{bookType:'xlsx',bookSST:false,type:'array'})

        saveAs(
            new Blob([data],{
                type:"application/octet-stream"
            }),
            "upload_result.xlsx"
        )
    }   

    return [createResult]
    
}

export default useCreateXLSX