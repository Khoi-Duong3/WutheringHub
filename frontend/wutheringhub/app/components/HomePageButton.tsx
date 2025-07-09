import Image from "next/image";
import Link from "next/link";

export default function(){
    return (
        <>
            <Link href="/resonators" className="w-full h-24 rounded-md font-semibold bg-gray-700 hover:bg-gray-800 flex items-center justify-center">
                <Image src="/resonatorIcon.png" alt="Resonator Icon" width={40} height={40} className="mr-1"/>
                <span className="text-lg"> Resonators</span>
            </Link>

            <Link href="/weapons" className="w-full h-24 rounded-md font-semibold bg-gray-700 hover:bg-gray-800 flex items-center justify-center">
                <Image src="/weaponIcon.png" alt="Resonator Icon" width={25} height={40} className="mr-2.5"/>
                <span className="text-lg"> Weapons</span>
            </Link>
            <Link href="/echoes" className="w-full h-24 rounded-md font-semibold bg-gray-700 hover:bg-gray-800 flex items-center justify-center">
                <Image src="/echoesIcon.png" alt="Echo Icon" width={45} height={40} className="mr-1"/>
                <span className="text-lg"> Echoes</span>
            </Link>
            <Link href="/calculator" className="w-full h-24 rounded-md font-semibold bg-gray-700 hover:bg-gray-800 flex items-center justify-center">
                <Image src="/calcIcon.png" alt="Echo Icon" width={35} height={40} className="mr-1 invert"/>
                <span className="text-lg"> Calculator</span>
            </Link>
            <Link href="/map" className="w-full h-24 rounded-md font-semibold bg-gray-700 hover:bg-gray-800 flex items-center justify-center">
                <Image src="/mapIcon.png" alt="Echo Icon" width={40} height={50} className="mr-2"/>
                <span className="text-lg"> Map</span>
            </Link>
        </>
    )
}