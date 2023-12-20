// App.tsx
import * as React from "react";
import { render } from "react-dom";
import { ReactGrid, Column, Row, CellChange, TextCell } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import * as XLSX from 'xlsx';


interface Dummy {

  segment: string;
  country: string;
  product: string;
  discountBand: string;
  unitsSold: string
  }

  const getPeople = (): Dummy[] => [
   {segment:"Government",country:"Canada",product:"Carretera", discountBand:"None",unitsSold:"1618.5"},
   {segment:"Government",country:"Canada",product:"Carretera", discountBand:"None",unitsSold:"1618.5"},
   {segment:"Government",country:"Canada",product:"Carretera", discountBand:"None",unitsSold:"1618.5"},
   {segment:"Government",country:"Canada",product:"Carretera", discountBand:"None",unitsSold:"1618.5"},
   {segment:"Government",country:"Canada",product:"Carretera", discountBand:"None",unitsSold:"1618.5"},{segment:"Government",country:"Canada",product:"Carretera", discountBand:"None",unitsSold:"1618.5"},
   {segment:"Government",country:"Canada",product:"Carretera", discountBand:"None",unitsSold:"1618.5"},
   {segment:"Government",country:"Canada",product:"Carretera", discountBand:"None",unitsSold:"1618.5"},
   {segment:"Government",country:"Canada",product:"Carretera", discountBand:"None",unitsSold:"1618.5"},
   {segment:"Government",country:"Canada",product:"Carretera", discountBand:"None",unitsSold:"1618.5"}
  ];

  const getColumns = (): Column[] => [
  
    { columnId: "segment", width: 150 },
    { columnId: "country", width: 150 },
    { columnId: "product", width: 150 },
    { columnId: "discountBand", width: 150 },
    { columnId: "unitsSold", width: 150 },
  ];

  const headerRow: Row = {
    rowId: "header",
    cells: [
      { type: "header", text: "Segment" }, 
      { type: "header", text: "Country" },
      { type: "header", text: "Product" },
      { type: "header", text: "Discount Band" }
      ,{ type: "header", text: "Units Sold" }
    ]
  };

 

  const getRows = (people: Dummy[])  => [
  
    ...people.map((person, idx) => ({
      
      rowId: idx,
      cells: [
        

        { type: "text", text: person.segment },
        { type: "text", text: person.country },

        { type: "text", text: person.product },
        { type: "text", text: person.discountBand },

        { type: "text", text: person.unitsSold },
      ]
    }))
  ];

  // const headerRow: Row = {
  //   rowId: "header",
  //   cells: [
  //     { type: "header", text: "Name" },
  //     { type: "header", text: "Surname" }
  //   ]
  // };
  
  // const getRows = (people: Person[]) => [
 
  //   ...people.map((person, idx) => ({
  //     rowId: idx,
  //     cells: [
  //       { type: "text", text: person?.name ? person?.name : "" },
  //       { type: "text", text: person?.surname ? person?.surname : "" }
  //     ] 
  //   }))
  // ];
  
  
  
export const Table = ()=> {
    const [people, setPeople] = React.useState<Dummy[]>(getPeople());
  
    const rows = getRows(people);
    const columns = getColumns();

    const applyChangesToPeople = (
      changes: CellChange[],
      prevPeople: any
    ): Dummy[] => {
      changes.forEach((change:any) => {
        const personIndex = change.rowId;
        const fieldName = change.columnId;
        prevPeople[personIndex][fieldName] = change.newCell.text;
      });
      return [...prevPeople];
    };
  
    const handleChanges = (changes: CellChange[]) => {
      setPeople((prevPeople) => applyChangesToPeople(changes, prevPeople));
    };
    const exportToExcel = () => {

     
      

      const data = [
        headerRow.cells.map((cell:any)=>cell.text),
        ...rows.map(row => row.cells.map((cell:any) => cell.text))
      ];

      console.log(data);

  
      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'table.xlsx');
    };


    return (
    <div> 
       <button onClick={exportToExcel}>Export to Excel</button>
    <ReactGrid rows={[headerRow,...rows]} columns={columns} onCellsChanged={handleChanges} />
</div>  );
  }
  
  





























