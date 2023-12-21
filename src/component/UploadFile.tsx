import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';


interface ChildProps {
  setParentVariable: (data: any) => void;
}

export const UploadExcel: React.FC<ChildProps> = ({setParentVariable}) => {

  
  const [file, setFile] = useState<File | null>(null);




  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple:false
  });

  const handleUpload = async () => {
    if (!file) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('excelFile', file);

    try {
      // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
      const response = await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle the API response as needed
      console.log('Upload successful:', response.data);

      // setFile(response.data);
        // Pass the data back to the parent component
        setParentVariable(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className=' h-min-screen w-full pt-[10vh]'>
      <div className=' w-[50%] my-auto mx-auto h-[250px] flex flex-col justify-center ' {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        <p>Drag and drop an Excel file here, or click to select one</p>
      </div>
      {file && (
        <div className='py-16'>
          <p className='text-xl mb-10'><span className='font-bold'>Selected File</span>: {file.name}</p>
          <button className='bg-[#38419D] py-4 w-[30%] text-white rounded  font-bold hover:bg-[#3887BE]' onClick={handleUpload}>Upload</button>
        </div>
      )}
    </div>
  );
};

const dropzoneStyles: React.CSSProperties = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};


