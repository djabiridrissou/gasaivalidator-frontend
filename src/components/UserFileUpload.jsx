import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { uploadGifmis } from '../redux/features/upload';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, } from "react-router-dom";

const UserFileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleFileDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setSelectedFile(file);
    };

    const handleFileDelete = () => {
        setSelectedFile(null);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <FontAwesomeIcon
                    icon={faCircleNotch}
                    className="animate-spin text-gray-500 text-4xl"
                />
            </div>
        );
    }

    const handleFileUpload = async () => {
        if (selectedFile) {
            const reader = new FileReader();

            reader.onload = function (event) {
                const base64String = event.target.result;

                try {
                    setIsLoading(true);
                    dispatch(uploadGifmis({ data: base64String })).unwrap().then((res) => {
                        console.log('response', res);
                        if (res.status == 200) {
                            let toastMessage = ''; // Message du toast
                            toastMessage = `File uploaded successfully (${res.total})`;
                            toast.success(toastMessage);
                            navigate('/dashboard');
                        } else {
                            toast.error('An error occurred');
                            console.error('Error during file upload:', res);
                        }
                    });
                } catch (error) {
                    toast.error('An error occurred');
                    console.error('Error during file upload:', error);
                } finally {
                    setIsLoading(false);
                }

            };

            reader.readAsDataURL(selectedFile);
        }
    };


    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="border border-dashed border-gray-400 p-6 rounded-lg text-center">
                {selectedFile ? (
                    <div>
                        <p className="mb-4">File selected: {selectedFile.name}</p>
                        <button
                            onClick={handleFileDelete}
                            className="bg-red-500 text-white px-3 py-1 rounded-md"
                        >
                            Drop selection
                        </button>
                    </div>
                ) : (
                    <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleFileDrop}
                    >
                        <p className="mb-4">Drag and drop a file here or click to select</p>
                        <input
                            type="file"
                            accept=".xlsx"
                            onChange={handleFileChange}
                            className="hidden"
                            id="fileInput"
                        />
                        <label
                            htmlFor="fileInput"
                            className="bg-blue-500 text-white px-3 py-1 rounded-md cursor-pointer"
                        >
                            Select a file
                        </label>
                    </div>
                )}
            </div>
            <button
                onClick={handleFileUpload}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
            >
                Upload the File
            </button>
        </div>
    );
};

export default UserFileUpload;
