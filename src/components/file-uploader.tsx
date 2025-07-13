"use client";

import { ChangeEvent, useRef } from "react"
import { Button } from "./ui/button";
import { FilePlus2 } from "lucide-react";
import { X } from "lucide-react";

interface FileUploaderProps {
    file: File | null
    setFile: (_file: File | null) => void
}

const FileUploder: React.FC<FileUploaderProps> = ({ file, setFile }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            console.log("File Added: ", e.target.files[0]);
        }
    }

    return (
        <div className='ml-2 mb-1 flex flex-col gap-3 items-start'>
            <input type="file" ref={inputRef} onChange={handleFileChange} accept="image/*, video/*, audio/*, .pdf, .docx, .txt" hidden />
            <Button className="bg-[#6E642C] cursor-pointer hover:scale-110"
                onClick={() => {
                    inputRef.current?.click()
                }}
            >
                <FilePlus2 />
                Add File
            </Button>
            {file && (
                <div className='relative border p-2 rounded-lg text-xs'>
                    {file.name}
                    <span className="absolute -top-2 -right-3 rounded-full p-1 bg-[#6E642C] cursor-pointer"
                        onClick={() => setFile(null)}
                    >
                        <X size={15} strokeWidth={4} />
                    </span>
                </div>)}
        </div>
    )
}

export default FileUploder