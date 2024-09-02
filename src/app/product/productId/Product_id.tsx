 


import Container from "../../components/Container";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import ReviewForm from "./ReviewForm";
// import { getCurrentUser } from "@/actions/getCurrentUser";
// import { products } from "@/utils/products";
// import { useSession } from 'next-auth/react';
import { useEffect, useState } from "react";
import { ReviewsProvider } from "./ReviewsContext";

// interface IPrams {
//     productId:string
// }

const Product =  () => { //{params}:{params:IPrams}
    // console.log("params" , params)

    let productId : any = ''

    if(typeof window !== 'undefined'){

        const queryString = typeof window !== 'undefined' ? window.location.search : '';
        const urlParams = new URLSearchParams(queryString);

        // Access a specific query parameter
        const paramValue = urlParams.get('id');
        console.log(paramValue); 

        productId = paramValue

    }

    const [products, setProducts] = useState<any>([]);

    // For the single perticular product
    const [product , setProduct] = useState<any>({});

    const [productLoaded, setProductLoaded] = useState(false);

    async function fetchProducts() {

   // ************ The Whole Products Array Part ************

    // Extracting Array value from the laravel backend data
    // let products: any = [] // This and the variable below are same

    let theEntireAllProductArray: any = []

    let UniqueProductsId: any = []

    // let productCategories: any = []

    // let productColors: any = []

    // let productReviews: any = []

    // Doing another method
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



            // Pushing the Single Product Object to the Array
            theEntireAllProductArray.push(theSingleProductObject);

        });



        console.log('prev statement' , theEntireAllProductArray);

        // Setting the products Array for later pass down as card data
        setProducts([...theEntireAllProductArray]);

        console.log('All Products >>> ' , products);



    } catch(e){
    console.error('Catch Error :' , e);
    }

    // ========== The Whole Products Array Part End ==========


    
    setProduct(theEntireAllProductArray.find((item: any)=> item.id == productId)); // Took 'theEntireAllProductArray' instead of 'products' state because the useState uses asycronous system which makes the value of products unavailable in the current run.  Not doing strict equality because the api response of the item.id is string

    setProductLoaded(true);

    // testing
    console.log('Single Specific product >>> ' , product);

    // let currentUser = getCurrentUser();

}


    useEffect(() => {
       !productLoaded && fetchProducts();  
    }, []);


    if(product?.id){
    return ( 
        <div className="p-8">
            <Container>
                <ProductDetails product={product}/>  
                <div className="flex flex-col mt-20 gap-4">
                    

                    <ReviewsProvider>

                        <ReviewForm product={product}/>
                        
                        <ListRating product={product}/>

                    </ReviewsProvider>

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