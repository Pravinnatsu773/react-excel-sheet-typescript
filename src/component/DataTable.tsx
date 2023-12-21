import * as React from "react";
import {
  ReactGrid,
  Column,
  Row,
  CellChange,
} from "@silevis/reactgrid";

import '../style.scss'
// import "@silevis/reactgrid/styles.css";


import * as XLSX from "xlsx";

interface TableProps {
  tabelData: any; 
}

export const DataTable: React.FC<TableProps> = ({ tabelData }) => {

  const [excelData, setExcelData] = React.useState<any[]>([...tabelData]);
    


  const getColumns = (): Column[] => {
    const colsKey = Object.keys(tabelData[0]);

    return colsKey.map((c) => {
      return { columnId: c, width: 150, };
    });
  };

  const getRowHeaders = () => {
    const colsKey = Object.keys(tabelData[0]);
    return {
      rowId: "header",
      cells: [
        
        ...colsKey.map((c) => {
          return { type: "header", text: c };
        }),
      ],
    } as Row;
  };

  

  const getRows = (col: Column[], excelData: any) => {

    return [
      ...excelData.map((excelD: any, idx: any) => ({
        rowId: idx,
        cells: col.map((c: any) => {
          return { type: "text", text: excelD[c.columnId].toString() };
        }),
      })),
    ];
  };

  const columns = getColumns();

  const rowHeader = [getRowHeaders()];


  const rows = getRows(columns, excelData);

  const exportToExcel = () => {
    const data = [
      rowHeader[0].cells.map((cell: any) => cell.text),
      ...rows.map((row) => row.cells.map((cell: any) => cell.text)),
    ];

    // console.log(data);

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "table.xlsx");
  };

  const applyChangesToexcelData = (
    changes: CellChange[],
    prevexcelData: any[]
  ): any[] => {
    changes.forEach((change:any) => {
      console.log(change.rowId,change.columnId,change.newCell.text)
      const excelDIndex = change.rowId;
      const fieldName = change.columnId;
      console.log(prevexcelData[excelDIndex][fieldName])
      prevexcelData[excelDIndex][fieldName] = change.newCell.text;
    });
    
    return [...prevexcelData];
  };


  const handleChanges = (changes: CellChange[]) => {
    setExcelData((prevexcelData) => applyChangesToexcelData(changes, prevexcelData));

  
  };


  return (
    <div  className="p-4" >
     <div className="w-full mb-10 flex justify-end"> <button className='text-sm bg-[#38419D] py-2 px-16  text-white rounded  font-bold hover:bg-[#3887BE]'  onClick={exportToExcel}>Export to Excel</button></div>
     <div className="w-full">
     <ReactGrid
      rows={[...rowHeader, ...rows]} columns={columns}  onCellsChanged={handleChanges} />
     </div>
    </div>
  );
};
