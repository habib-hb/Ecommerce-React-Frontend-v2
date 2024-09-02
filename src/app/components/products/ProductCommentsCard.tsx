  

import { formatPrice } from "../../../utils/formatPrice";
import { truncateText } from "../../../utils/truncateText";
import { Rating } from "@mui/material";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
import { useState } from "react";

// interface ProductCardProps {
//     data:any
// }
const ProductCommentsCard:React.FC<any> = ({data}) => {

    const [deletedComments, setDeletedComments] = useState<any>([]);

    const productRating= data.reviews.reduce((acc:number, item:any)=>{
        return acc + item.rating
    } , 0) / data.reviews.length;

                // Placeholder value
                // const productRating= 775;

                // const router = useRouter();


                // Comment Deletion Functionality
    const commentDeleteFunction = async (comment_id : any) => {
        const response = await fetch(`https://laravel.valueadderhabib.com/api/dashboard/comment_delete/${comment_id}?email=${ typeof window !== 'undefined' ? window?.localStorage.getItem('loggedInEmail') : ''}`);

            if(response.ok){

                let json_response = await response.json();
                alert(json_response.message);

                setDeletedComments([...deletedComments, comment_id]);

                window.location.reload();

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
     text-center
     text-sm
     w-[90vw]
     md:w-[600px]
     flex
     flex-col
     items-center
     justify-center
     align-middle
     mx-auto
    `}>
        <div className="
        flex
        flex-col
        w-full
        items-center
        gap-1
        ">
            <div className=" w-full relative overflow-hidden flex flex-col items-center justify-center">
                            {/* <Image
                            fill
                            src={data.images[0].image}
                            alt={data.name}
                            className="w-full h-full object-contain"
                                /> */}
                    {/* Product Image */}
                    <img src={data.images[0].image} width={200} />
            </div>
            <div className="mt-4">
                {truncateText(data.name)}
            </div>
            <div>
                <Rating value={productRating} readOnly/>
            </div>
            <div>{data.reviews.length} reviews</div>
            <div className="font-semibold">{formatPrice(data.price)}</div>
            <h2 className="text-3xl">Product Reviews</h2>
            {data.reviews.map((review:any)=>(
                <div className={`flex flex-col gap-4 border border-black rounded-lg p-8 w-full justify-center items-center ${deletedComments.includes(review.review_id) ? 'hidden' : ''}`} key={review.review_id}>
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-4 justify-center items-center">
                            {/* <Image
                            fill
                            src={review.reviewerAvatar}
                            alt={review.reviewerName}
                            className="w-10 h-10 rounded-full"
                            sizes="(50px, 50px)"
                            /> */}
                            <img src={review.reviewerAvatar} width={50} height={50} />
                            <h3>{review.reviewerName}</h3>
                        </div>
                        <div>
                            
                            <div className="flex gap-4 justify-center items-center">Rating: <Rating value={review.rating} readOnly/></div>
                        </div>
                    </div>
                    <div className="flex gap-4 justify-center items-center"><p>Comment: </p><p>{review.review}</p></div>
                    <button className="bg-red-600 text-white rounded-lg px-4 py-2 w-[50%] md:w-[150px] hover:scale-110" onClick={()=>commentDeleteFunction(review.review_id)}>Delete</button>
                </div>
            ))}
        </div>
        
    </div> );
}
 
export default ProductCommentsCard;