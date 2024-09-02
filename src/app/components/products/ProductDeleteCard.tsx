  
import { formatPrice } from "../../../utils/formatPrice";
import { truncateText } from "../../../utils/truncateText";
import { Rating } from "@mui/material";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductCardProps {
    data:any
}
const ProductDeleteCard:React.FC<ProductCardProps> = ({data}) => {

    const [hideComponent, setHideComponent] = useState(false);

    const productRating= data.reviews.reduce((acc:number, item:any)=>{
        return acc + item.rating
    } , 0) / data.reviews.length;

        // Placeholder value
        // const productRating= 775;

        // const router = useRouter();
    // const router = useRouter();

    let deleteFunction = async () => {
                // document.cookie = "user_id=10; path=/; SameSite=None";
                // const response = await fetch(`https://laravel.valueadderhabib.com/api/dashboard/product_delete/${data.id}`, {
                //     method: 'GET', // Ensure this matches your Laravel route
                //     credentials: 'include' // Ensures cookies are sent with the request
                // });
        const response = await fetch(`https://laravel.valueadderhabib.com/api/dashboard/product_delete/${data.id}?email=${ typeof window !== 'undefined' ? window?.localStorage.getItem('loggedInEmail') : ''}`);        

        if(response.ok){

            // alert('Product Deleted');
            let json_response = await response.json();
            alert(json_response.message);

            setHideComponent(true);

        }else{
            let json_response = await response.json();
            alert(json_response.message);

        }

    }


    return (
    <div 
    className={`
     col-span-1
     cursor-pointer
     border-[1.2px]
     border-slate-200
     bg-slate-50
     p-2
     rounded-sm
     transition
     hover:scale-105
     text-center
     text-sm
     ${hideComponent && 'hidden'}
    `}>
        <div className="
        flex
        flex-col
        w-full
        items-center
        gap-1
        ">
            <div className="aspect-square w-full relative overflow-hidden">
                <img
                src={data.images[0].image}
                alt={data.name}
                className="w-full h-full object-contain"
                    />
            </div>
            <div className="mt-4">
                {truncateText(data.name)}
            </div>
            <div>
                <Rating value={productRating} readOnly/>
            </div>
            <div>{data.reviews.length} reviews</div>
            <div className="font-semibold">{formatPrice(data.price)}</div>

            {/* <a href={'https://laravel.valueadderhabib.com/api/dashboard/product_delete/' + data.id}><button className="bg-red-600 text-white py-4 px-8 rounded-lg" onClick={deleteFunction}>Delete</button></a> */}

           <button className="bg-red-600 text-white py-4 px-8 rounded-lg" onClick={deleteFunction}>Delete</button>

        </div>
        
    </div> );
}
 
export default ProductDeleteCard;