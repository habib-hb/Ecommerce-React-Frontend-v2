interface containerProps {
    children: React.ReactNode
}

const Container:React.FC<containerProps> = ({children}) => {
    return (
         <div className="max-w-[1920px] mx-auto xl:px-20 md:px-2 ">
            {children}
         </div> 
    );
}
 
export default Container;