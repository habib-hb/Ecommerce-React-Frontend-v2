 

import Avatar from "../../../app/components/Avatar";
import Heading from "../../../app/components/Heading";
import { Rating } from "@mui/material";
// import moment from "moment";
import { useContext, useEffect } from "react";
import { ReviewsContext } from './ReviewsContext';

interface ListRatingProps {
    product:any;
}
const ListRating:React.FC<ListRatingProps> = ({product}) => {

        // Testing Use Context
        const { currentReviews } = useContext(ReviewsContext);

        // Conversion of the string data
        let currentReviewsJavascript = JSON.parse('['  + String(currentReviews).replace('}{' , '},{') + ']');


        useEffect(() => {
            console.log('Review Section >>>'  , product)
        }, [product]);


    return ( 
        <div>
           {(product.reviews.length > 0 || currentReviewsJavascript.length > 0) && <Heading title="Product Reviews"/> }
            <div id='review_list' className="text-sm mt-2">

                {currentReviewsJavascript && currentReviewsJavascript.map((review:any)=>{

                    return <div key={Math.random()} className="max-w-[300px]">

                        <div className="flex items-center gap-2">

                           <Avatar src={review.image_url_javascript}/> 

                            <div className="font-semibold">{review.user_name}</div>

                            <div className="font-light">{new Date().toLocaleString()}</div>

                        </div>
                        <div className="mt-2">
                                {/* <Rating value={Math.floor(Math.random() * 6)} size="small" precision={0.5} readOnly /> */}
                        <Rating value={review.rating} size="small" precision={0.5} readOnly />

                        <div className="ml-2">{
                            review.review_text
                        }</div>

                        <hr className="mt-4 mb-4" />

                        </div>

                    </div>
                })}
                {product.reviews && product.reviews.map((review:any)=>{
                    return <div key={Math.random()} className="max-w-[300px]">

                        <div className="flex items-center gap-2">

                           <Avatar src={review.reviewerAvatar}/> 

                            <div className="font-semibold">{review.reviewerName}</div>

                            <div className="font-light">{new Date().toLocaleString()}</div>

                        </div>

                        <div className="mt-2">
                                {/* <Rating value={Math.floor(Math.random() * 6)} size="small" precision={0.5} readOnly /> */}
                        <Rating value={review.rating} size="small" precision={0.5} readOnly />

                        <div className="ml-2">{
                            review.review
                        }</div>

                        <hr className="mt-4 mb-4" />

                        </div>

                    </div>
                })}

               
            </div>

        </div>
     );
}
 
export default ListRating;