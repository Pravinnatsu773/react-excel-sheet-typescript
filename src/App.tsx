import React from 'react';
import logo from './logo.svg';
import './App.css';
import {UploadExcel} from './component/UploadFile'
import { DataTable } from './component/DataTable';
import { Table } from './component/Table';




function App() {

  const [excelData, setExcelData] = React.useState(null)

  return (
    <div className="App">
      {/* <Table /> */}
     {excelData != null?<DataTable tabelData={excelData}/>:<div></div>}

     
     {excelData == null?<UploadExcel setParentVariable={setExcelData}/>:<div></div>}
     
    </div>
  );
}

export default App;
