 

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";
import { useContext, useEffect, useState } from "react";
// import { Input } from "../../../components/ui/input";
// import { WidthIcon } from "@radix-ui/react-icons";
// import { getCurrentUser } from "@/actions/getCurrentUser";
// import { useSession } from 'next-auth/react';
import { ReviewsContext } from './ReviewsContext';
import axios from "axios";

interface ReviewFormProps {
    product:any;
}


  

const ReviewForm:React.FC<ReviewFormProps>  = ({product }) => {

    //Using React Context to update 'ListRating' component as well
    const { currentReviews, setCurrentReviews } = useContext(ReviewsContext);

    // Reload after the user data retrieved
    let [dataRetrived, setDataRetrived] = useState({user_id: '', user_name: ''});

    // Form Load Condition
    let [formShouldLoad, setFormShouldLoad] = useState(true);
  


    // Form Submit functionality
    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    let formData = new FormData(e.currentTarget);
    let nameData = formData.get('user_name');
    let userIdData = formData.get('user_id');
    let productIdData = formData.get('product_id');
    let reviewTextData = formData.get('review_text');
    let selectedStarsData = formData.get('selected_stars')?.slice(0, 1);
    let reviewImageFile = formData.get('review_image');
  
    //This variable below is just for console log checking purpose
    let formDataObject = {
      name: nameData,
      user_id: userIdData,
      product_id: productIdData,
      review_text: reviewTextData,
      selected_stars: selectedStarsData?.slice(0, 1),
      review_image: reviewImageFile

    };
  
    console.log('formData: ', formDataObject);



   // Creating a new FormData object to send with the fetch request
   if(formDataObject.name && formDataObject.user_id && formDataObject.product_id && formDataObject.review_text && formDataObject.selected_stars) {
    let formDataToSend = new FormData();
    formDataToSend.append('name', nameData ?? '');
    formDataToSend.append('user_id', userIdData  ?? '');
    formDataToSend.append('product_id', productIdData ?? '');
    formDataToSend.append('review_text', reviewTextData ?? '');
    formDataToSend.append('selected_stars', selectedStarsData ?? '');
    formDataToSend.append('review_image', reviewImageFile ?? '');

    // Sending Ajax Post request
    fetch('https://laravel.valueadderhabib.com/api/dashboard/review-upload', {
        method: 'POST',
        body: formDataToSend,
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data)

        alert(`Form submitted successfully :)`);

        // Filling the context data for the ListRating component
        setCurrentReviews( JSON.stringify(data) + currentReviews );    
        
        })
    .catch((error) =>{
        console.error('Error:', error)
        alert('Oh Noo!! Form submission error :(');
    });

    

        }

  };


    // *** Retriving The current user from the laravel database
            // const ParsedcurrentUser = JSON.parse(currentUser.value);
    let currentUserEmail =   typeof window !== 'undefined' ?  window?.localStorage.getItem('loggedInEmail') : '';        
    let ParsedcurrentUser : any;

            
            async function loadUser(){
                if(currentUserEmail){

                const theRequest = await axios.post('https://laravel.valueadderhabib.com/api/user_data_retrive' , {
                    email: currentUserEmail
                })


            ParsedcurrentUser = theRequest.data.data;

            console.log('ParsedUser >>>' , ParsedcurrentUser);
            }

                    // let userNameElement =  document.getElementById('user_name')
                    // let userIdElement =  document.getElementById('user_id')

                    // userNameElement ? userNameElement.innerText = ParsedcurrentUser.name : '';
                    // userIdElement ? userIdElement.innerText = ParsedcurrentUser.id : '';

            if(ParsedcurrentUser){    

            !dataRetrived.user_id ? setDataRetrived({
                user_id: ParsedcurrentUser?.id,
                user_name: ParsedcurrentUser?.name
            }) : '';   
            
            setFormShouldLoad(true);
        }else{
            formShouldLoad ? setFormShouldLoad(false) : '';
        }

            }

        //Executing the function
        loadUser();

    // *** End Retriving The current user from the laravel database    


    useEffect(() => {
        console.log( 'Product:  '  , product);
        console.log( 'CurrentUser: '  , ParsedcurrentUser);
        console.log( 'CurrentUser_name: '  , ParsedcurrentUser?.name);
        console.log( 'CurrentUser_id: '  , ParsedcurrentUser?.id);
    }, [product]);

    

    return ( 
        <div className="flex flex-col gap-4">

                 <Card className="w-full max-w-md">

                        <CardHeader>

                            <CardTitle>Leave a Review</CardTitle>

                            <CardDescription>Share your thoughts and experience with this product.</CardDescription>

                        </CardHeader>

                        <CardContent>


                                    {/* <p id='user_id'>{dataRetrived?.user_id ? dataRetrived?.user_id : ''}</p>
                                    <p id='user_name'>{dataRetrived?.user_name ? dataRetrived?.user_name : ''}</p> */}

                            
                            { formShouldLoad ? <form onSubmit={formSubmit} className="grid gap-6">

                                {/* Hidden Input fields */}
                                <input type="hidden" name="product_id" value={product.id} />

                                <input type="hidden" name="user_id" value={dataRetrived?.user_id} />

                                <input type="hidden" name="user_name" value={dataRetrived?.user_name} />


                                    <div className="grid gap-2">
                                        <Label htmlFor="review">Your Review</Label>
                                        <Textarea id="review" name='review_text' placeholder="Write your review here..." className="min-h-[120px]" />
                                    </div>

                                    <div>
                                        <Label htmlFor="rating">Rating</Label>

                                        <Select name='selected_stars' defaultValue="3">

                                        <SelectTrigger>

                                            <SelectValue placeholder="Select a rating" />
                                        </SelectTrigger>

                                        <SelectContent className="bg-white">

                                            <SelectItem value="1">1 star</SelectItem><hr />
                                            <SelectItem value="2">2 stars</SelectItem><hr />
                                            <SelectItem value="3">3 stars</SelectItem><hr />
                                            <SelectItem value="4">4 stars</SelectItem><hr />
                                            <SelectItem value="5">5 stars</SelectItem><hr />

                                        </SelectContent>

                                        </Select>

                                                {/* <div className="space-y-2">
                                                <Label htmlFor="review_image">Image</Label>
                                                <Input name="review_image" id="review_image" type="file" className="w-full"/>
                                                </div> */}
                                    </div>

                                    <CardFooter className="flex justify-end">

                                    <Button type="submit" className="mx-auto w-[200px] px-8 py-2 border border-black bg-black text-white">Submit Review</Button>

                                    </CardFooter>

                            </form> : <h2><a href='/register' className='text-blue-600 underline'>Sign Up</a> to leave a review</h2> }
                        </CardContent>

                        </Card>

                         
        </div>
     );
}
 
export default ReviewForm;