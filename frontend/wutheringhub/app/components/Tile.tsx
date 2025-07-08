import Image from "next/image";

type TileProps = {
    iconSrc: string;
    title: string;
    description: string;
    invert: boolean; 
}

export default function Tile ({iconSrc, description, title, invert}: TileProps){
    return (
        <div className="p-6 rounded-lg flex flex-col items-center text-center space-y-4 bg-gray-800">
            <Image src={iconSrc} alt="" width={48} height={48} className={invert ? 'filter invert' : ''} />
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-sm text-gray-300">{description}</p>
        </div>
    );
}