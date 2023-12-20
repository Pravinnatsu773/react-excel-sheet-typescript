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
    <div>
      <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        <p>Drag and drop an Excel file here, or click to select one</p>
      </div>
      {file && (
        <div>
          <p>Selected File: {file.name}</p>
          <button onClick={handleUpload}>Upload</button>
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


