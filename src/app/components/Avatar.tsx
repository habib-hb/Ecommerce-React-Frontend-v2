 


// import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

interface AvatarProps {
    src?: string | null | undefined;
}

const Avatar:React.FC<AvatarProps>= ({src}) => {
    if(src){
       return (<img 
        src={src}
        alt="Avatar"
        className="rounded-full h-[24px] w-[24px]"
        />)
    }
    return <FaUserCircle size={24}/>;
}
 
export default Avatar;