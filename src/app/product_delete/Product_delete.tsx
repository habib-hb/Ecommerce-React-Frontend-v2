 


import { useEffect, useState } from "react";
import Container from "../components/Container";
import ProductDeleteCard from "../components/products/ProductDeleteCard";

const Product_delete = () => {

  const [products, setProducts] = useState<any>([]);
  const [productLoaded , setProductLoaded] = useState(false);


  async function fetchProducts() {
    
  
  // ************ The Whole Products Array Part ************

    // Extracting Array value from the laravel backend data
    // let products: any = []  // This and the variable below are same

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
                });

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



        console.log(theEntireAllProductArray);

        // Setting the products Array for later pass down as card data
        setProducts(theEntireAllProductArray);

        setProductLoaded(true);



    } catch(e){
    console.error('Catch Error :' , e);
    }

    // ========== The Whole Products Array Part End ==========


    console.log('Product REview Check >>>' , products[2]);



  }

    useEffect(() => {
       !productLoaded && fetchProducts();
    }, []);

    

    if(productLoaded){

      return (
        <div className="p-8">
          <Container>    

            <div className="flex flex-col justify-center items-center p-8">
                <h1 className="text-3xl font-bold">Product Delete Section</h1>
                <p>Click on the specific delete button of the product you want to delete</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
              {products.map((product:any)=>{
                  return <ProductDeleteCard data={product} key={Math.random()}/>
              })}
            </div>

          </Container>
        </div>
      )

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
 
export default Product_delete;