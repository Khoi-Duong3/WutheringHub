import Image from "next/image";
import React from "react";

interface SearchBarProps {
    placeholder?: string,
    value: string,
    onChange: (newValue: string) => void,
    className?: string
}

export default function({placeholder="Search...", value, onChange, className=""}: SearchBarProps){
    
    return (
        <div className={`relative w-full ${className}`}>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Image src={"/magnifyingGlass.png"} height={20} width={20} alt={"search"} className="invert" />
            </div> 
            <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
        </div>
    )
}   