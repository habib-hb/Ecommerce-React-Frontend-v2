 


import Container from "../../components/Container";
// import ProductDetails from "./ProductDetails";
// import ListRating from "./ListRating";
// import ReviewForm from "./ReviewForm";
// import { getCurrentUser } from "@/actions/getCurrentUser";
// import { products } from "@/utils/products";
// import { useSession } from 'next-auth/react';
import { useEffect, useState } from "react";
// import { ReviewsProvider } from "./ReviewsContext";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
// import { useState } from "react";

// interface IPrams {
//     product_edit_form:string
// }

// const Product = async ({params}:{params:IPrams}) => {
const Product =  () => {
    // console.log("params" , params)

    //Using Search Params

    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');

    let product_id = params.get('product_id');

    // const [product, setProduct] = useState<any>({});

    let [formData, setFormData] = useState<any>({
      product_id: '',
      product_name: '',
      description: '',
      brand : '',
      price : '',
      instock_amount : '',
      category : '',
      images: [],
      loaded: false
    });



   // ************ The Whole Products Array Part ************

    // Extracting Array value from the laravel backend data
    let products: any = [] // This and the variable below are same

    let theEntireAllProductArray: any = []

    let UniqueProductsId: any = []

    // let productCategories: any = []

    // let productColors: any = []

    // let productReviews: any = []

    // Doing another method
    async function productExtractionOperation (){

    try{

        let someApiData = await fetch('https://laravel.valueadderhabib.com/api/products');

        if(!someApiData.ok){
        throw new Error('something went wrong regarding the network request.');
        }

        let someJsonData: any = await someApiData.json();

        someJsonData.forEach((element : any) => {
            UniqueProductsId.push(element.product_id);
        });

        UniqueProductsId = new Set(UniqueProductsId);

        console.log(UniqueProductsId);

        UniqueProductsId.forEach((unique_product_id: any) => {
            // The Single Product Object Initialization
            let theSingleProductObject: any = {};

            let loopedProductCategory: any = [];

            let theImagesArrayOfObjects: any = [];

            let theReviewsArrayOfObjects: any = [];

            let theSingleProductSpecificObjects: any =someJsonData.filter((item: any) => item.product_id == unique_product_id);

            theSingleProductSpecificObjects.forEach((single_object: any) => {

                // Product Category Mapping
                loopedProductCategory.push(single_object.category);

                // Product color and Image Mapping
                theImagesArrayOfObjects.push({
                    'image' : single_object.image,
                    'color' : single_object.color_name,
                    'colorCode' : single_object.color_code
                })

                // Product review Mapping
                single_object.customer_name && theReviewsArrayOfObjects.push({
                            // 'reviewerName' : single_object.reviewer_name,
                    'reviewerName' : single_object.customer_name,
                    'review' : single_object.review,
                    'reviewerAvatar' : single_object.customer_avatar,
                    'rating': single_object.rating
                });
            });



            // Setting Values to the Single Product Object
            theSingleProductObject['id'] = unique_product_id;

            theSingleProductObject['category'] = loopedProductCategory[0]; // Later You can customize this

                    // let unique_images_objects: any = new Set(theImagesArrayOfObjects);

                    // theSingleProductObject['images'] = [...unique_images_objects]; 

            let unique_images_objects_in_string_set_objects_format: any = new Set(theImagesArrayOfObjects.map((item:any) => JSON.stringify(item)));

            let unique_images_objects_in_string_array_format = [...unique_images_objects_in_string_set_objects_format]

            let unique_images_objects_in_actual_array_format = unique_images_objects_in_string_array_format.map(item => JSON.parse(item));

            theSingleProductObject['images'] = [...unique_images_objects_in_actual_array_format];

                    // let unique_reviews_objects: any = theReviewsArrayOfObjects ? new Set(theReviewsArrayOfObjects) : [];

                    // theSingleProductObject['reviews'] = [...unique_reviews_objects];

            let unique_reviews_objects_in_string_set_objects_format: any = theReviewsArrayOfObjects ? new Set(theReviewsArrayOfObjects.map((item:any) => JSON.stringify(item))) : [];

            let unique_reviews_objects_in_string_array_format = [...unique_reviews_objects_in_string_set_objects_format];

            let unique_reviews_objects_in_actual_array_format = unique_reviews_objects_in_string_array_format.map(item => JSON.parse(item));

            theSingleProductObject['reviews'] = [...unique_reviews_objects_in_actual_array_format];

            theSingleProductObject['name'] = theSingleProductSpecificObjects[0].name; 

            theSingleProductObject['description'] = theSingleProductSpecificObjects[0].description;

            theSingleProductObject['price'] = theSingleProductSpecificObjects[0].price;

            theSingleProductObject['brand'] = theSingleProductSpecificObjects[0].brand;

            theSingleProductObject['inStock'] = theSingleProductSpecificObjects[0].stock_amount > 0 ? true : false;

            theSingleProductObject['inStock_amount'] = theSingleProductSpecificObjects[0].stock_amount;



            // Pushing the Single Product Object to the Array
            theEntireAllProductArray.push(theSingleProductObject);

        });



        console.log(theEntireAllProductArray);

        // Setting the products Array for later pass down as card data
        products = theEntireAllProductArray;

        console.log('Products Array from product edit section >>> ' , products);

        const productData = products.find((item: any)=> item.id == product_id) // Not doing strict equality because the api response of the item.id is string

        // Checking
        console.log('Single Product details from product edit page >>> ' , productData)



        // Setting -> Product Data to the FormData state 
        setFormData({
            ...formData,
            product_id: productData?.id,
            product_name: productData?.name,
            description: productData?.description,
            brand: productData?.brand,
            price: productData?.price,
            instock_amount: productData?.inStock_amount,
            category: productData?.category,
            images: productData?.images,
            loaded: true
        });



    } catch(e){
    console.error('Catch Error :' , e);
    }

  }


  // Calling the whole async function within useEffect
  useEffect(() => {
    !formData?.product_name && productExtractionOperation();
  }, []);

    // ========== The Whole Products Array Part End ==========


    
    // const product = products.find((item: any)=> item.id == params.product_edit_form) // Not doing strict equality because the api response of the item.id is string

    // // Checking
    // console.log('Single Product details from product edit page >>> ' , product)

  

    // From Functionality*** 
      const handleChange = (e: any) => {
         if (e.target.name === 'images[]') {
                // Convert FileList to array for easier handling
                const filesArray:any = Array.from(e.target.files);
            
                setFormData({
                  ...formData,
                  images: filesArray, // Update images with array of File objects
                });
        } else {
          setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
        }
      };



      const handleSubmit = async (e:any) => {

        e.preventDefault();
    
        const data = new FormData();
        data.append('user_email',   typeof window !== 'undefined' ?  window?.localStorage.getItem('loggedInEmail') || '' : '');
        data.append('product_id', formData.product_id);
        data.append('product_name', formData.product_name);
        data.append('description', formData.description);
        data.append('brand', formData.brand);
        data.append('price', formData.price);
        data.append('instock_amount', formData.instock_amount);
        data.append('category', formData.category);
    
        for (let i = 0; i < formData.images.length; i++) {
          data.append('images[]', formData.images[i]);
        }
    
        try {
          const response = await fetch('https://laravel.valueadderhabib.com/api/dashboard/product_update', {
            method: 'POST',
            body: data,
          });
    
          if (response.ok) {

            // Handle successful form submission
            const responseData = await response.json(); // Parse the JSON response
            alert('Form submitted successfully: ' + responseData.message); 

            console.log('submitted form Data >>>' , {...formData});

          } else {

            // Handle errors
            const errorData = await response.json(); // Parse the JSON error response
            alert( 'Form submission error: ' + errorData.message);

          }
        } catch (error) {

          console.error('Form submission error', error);
          alert(' Form submission error - catch block');

        }
      };




   if(formData?.loaded){
     return ( 
       <div className="">
            <Container>

                <div className="flex flex-col mt-8 gap-4">
                <Card className="w-full max-w-md mx-auto mt-4">

                <CardHeader>

                    <CardTitle>Product Edit Panel</CardTitle>

                </CardHeader>

                <CardContent className="grid gap-4">

                    <form onSubmit={handleSubmit} encType="multipart/form-data">

                    <input type="hidden" name="product_id" value={formData?.product_id} />

                    <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <input name="product_name" id="name" className="w-full border border-slate-500 p-2 rounded-lg" onChange={handleChange} value={formData?.product_name} />
                    </div>

                    <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea name="description" id="description" placeholder="" className="w-full" onChange={handleChange}  value={formData?.description} />
                    </div>

                    <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Input name="brand" id="brand" placeholder="" className="w-full" onChange={handleChange}   value={formData?.brand}/>
                    </div>

                    <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input name="price" id="price" placeholder="" type="number" className="w-full" onChange={handleChange}  value={formData?.price} />
                    </div>

                    <div className="space-y-2">
                    <Label htmlFor="message">Instock Amount</Label>
                    <Input name="instock_amount" id="message" placeholder="" type="number" className="w-full" onChange={handleChange}   value={formData?.instock_amount}/>
                    </div>

                    <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input name="category" id="category" placeholder="" className="w-full" onChange={handleChange}   value={formData?.category}/>
                    </div>

                    <div className="space-y-2">
                    <Label htmlFor="images">Product Images</Label>
                    <Input name="images[]" id="images" onChange={handleChange}  type="file" multiple className="w-full"  />
                    <h3 className="text-sm text-blue-700">Note: Uploading Images will replace the old images</h3>
                    </div>

                    <CardFooter className="flex justify-end mt-4">
                    <Button className="mx-auto w-[200px]  px-8 py-2 border border-black bg-black text-white">Submit</Button>
                    </CardFooter>

                    </form>
                </CardContent>

                </Card>

                </div>
            </Container>

        </div> 
     ); 

    }else{
        return (
          <div className="p-8 flex flex-col items-center justify-center h-screen">
          <Container>

          <div className="flex flex-col items-center justify-center ">

            <img src="/images_icons/loading_gif.gif" className="h-[250px] w-[250px]" alt="loading" />

             <h1 className="text-3xl text-center p-4">Loading...</h1>

            </div>  
         
          </Container>
      </div> 
          )
    }
}
 
export default Product;