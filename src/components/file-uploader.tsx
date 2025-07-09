"use client";

import { ChangeEvent, useRef, useState } from "react"
import { Button } from "./ui/button";
import { FilePlus2 } from "lucide-react";

const FileUploder = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            console.log("File Added: ", file);
        }
    }

    return (
        <div className='ml-2 mb-1'>
            <input type="file" ref={inputRef} onChange={handleFileChange} hidden />
            <Button className="bg-[#6E642C] cursor-pointer hover:scale-110"
                onClick={() => {
                    inputRef.current?.click()
                }}
            >
                <FilePlus2 />
                Add File
            </Button>
        </div>
    )
}

export default FileUploder