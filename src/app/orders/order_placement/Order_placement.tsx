 


import Container from "../../components/Container";
import { useEffect, useState } from "react";

const Order_placement = () => {
    const [order_placed , setOrder_placed] = useState(false);

    // Get Items from LocalStorage as a string
    let ordered_products =   typeof window !== 'undefined' ? window?.localStorage.getItem('eShopCartItems') as string : '';

    let orderer_email =   typeof window !== 'undefined' ? window?.localStorage.getItem('loggedInEmail') : '';



    // Order Placement Function
    async function placeOrder() {

            let response = await fetch('http://127.0.0.1:8000/api/dashboard/all_orders_data_for_order_placement_by_users')

        if(response.ok) {

                let json_response = await response.json();

                console.log(json_response);

                let userSpecificPreviousOrder = json_response.filter((order : any) => {
                    return order.user_email == orderer_email
                })

            if(userSpecificPreviousOrder.length > 0) {

                    // alert('Previous Data Found')

                    let userSpecificPreviousOrdersData = JSON.parse(userSpecificPreviousOrder[0].orders_data);

                    let previousOrderProductIds:any = [];

                    userSpecificPreviousOrdersData.forEach((product : any) => {

                        previousOrderProductIds.push(product.id)

                    })

                    let newly_ordered_products_json = JSON.parse(ordered_products)

                    let updatedOrdersData = newly_ordered_products_json.map((product : any) => {

                        if(previousOrderProductIds.includes(product.id)) {

                           let productPreviousOrderDataFilteredProduct = userSpecificPreviousOrdersData.filter((data : any) => {
                                return data.id == product.id
                            })

                           let productPreviousOrderData = productPreviousOrderDataFilteredProduct[0]; 

                           // Updating the previous order data
                           userSpecificPreviousOrdersData = userSpecificPreviousOrdersData.filter((product : any) => {
                                return product.id != productPreviousOrderData.id
                           })
                            
                           let productNewOrderDataFilteredArray = newly_ordered_products_json.filter((data : any) => {
                                return data.id == product.id
                            })

                           let productNewOrderData = productNewOrderDataFilteredArray[0];

                           let productUpdatedProductData = {...productNewOrderData, "quantity": parseInt(productNewOrderData.quantity) + parseInt(productPreviousOrderData.quantity)}

                           return productUpdatedProductData;

                        }else{

                            return product

                        }

                    })

                    // Combining the newly added or newly updated data with the previous data
                    updatedOrdersData = [...updatedOrdersData , ...userSpecificPreviousOrdersData]


                    // Placing the updated Order
                    let order_details = {
                        ordered_products : JSON.stringify(updatedOrdersData),
                        orderer_email : orderer_email
                    }

                    let response = await fetch('http://127.0.0.1:8000/api/dashboard/order_placement' , {
                        method : 'POST',
                        headers : {
                            'Content-Type' : 'application/json'
                        },
                        body : JSON.stringify(order_details)
                    })
            
                    if(response.ok) {
            
                        // alert('Updated Order Placed')

                        typeof window !== 'undefined' &&  window?.localStorage.removeItem('eShopCartItems')
            
                        setOrder_placed(true)

                        window.location.href = '/'
            
                    }else {
            
                        alert('Something went wrong within the updated order placement')
            
                    }
                    
                    

            }else{



                    let order_details = {
                        ordered_products : ordered_products,
                        orderer_email : orderer_email
                    }

                    let response = await fetch('http://127.0.0.1:8000/api/dashboard/order_placement' , {
                        method : 'POST',
                        headers : {
                            'Content-Type' : 'application/json'
                        },
                        body : JSON.stringify(order_details)
                    })
            
                    if(response.ok) {
            
                        // alert('New Order Placed')

                        typeof window !== 'undefined' && window?.localStorage.removeItem('eShopCartItems')
            
                        setOrder_placed(true)

                        window.location.href = '/'
            
                    }else {
            
                        alert('Something went wrong')
            
                    }

                }

        }else{

                // alert('First Order Placement')

                let order_details = {
                    ordered_products : ordered_products,
                    orderer_email : orderer_email
                }

                let response = await fetch('http://127.0.0.1:8000/api/dashboard/order_placement' , {
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify(order_details)
                })
        
                if(response.ok) {
        
                    // alert('Very First Order Placed')

                    typeof window !== 'undefined' &&  window?.localStorage.removeItem('eShopCartItems')
        
                    setOrder_placed(true)

                    window.location.href = '/'
        
                }else {
        
                    alert('Something went wrong')
        
                }

            }

       }



    useEffect(() => {

        !order_placed && ordered_products && placeOrder()
        
    }, [])


    if(order_placed) {

                return (
                    <Container>

                        <div className="flex flex-col justify-center items-center">

                        <img src="/images_icons/task_done.gif" alt="Order Processing" className="w-[250px] rounded-lg mb-4" />

                        <h1 className="text-3xl text-center p-4">Order Has Been Placed!!</h1>

                        </div>

                    </Container>
                )

    }else{

                return ( 

                    <Container>

                        <div className="flex flex-col justify-center items-center">

                          <img src="/images_icons/work-in-progress.gif" alt="Order Processing" className="w-[250px] rounded-lg mb-4" />

                          <h1 className="text-3xl text-center p-4">Order Processing...</h1>

                        </div>
                       
                    </Container>

                );

    }
}
 
export default Order_placement;