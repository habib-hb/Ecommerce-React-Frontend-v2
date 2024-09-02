 


import Container from "../../components/Container";
import { useEffect, useState } from "react";

const Order_placement = () => {
    const [order_placed , setOrder_placed] = useState(false);

    const [paymentOption , setPaymentOption] = useState('');

    const [address_phone , setAddress_phone] = useState({
                                                        address : '',
                                                        phone : ''});

    // Get Items from LocalStorage as a string
    let ordered_products =   typeof window !== 'undefined' ? window?.localStorage.getItem('eShopCartItems') as string : '';

    let orderer_email =   typeof window !== 'undefined' ? window?.localStorage.getItem('loggedInEmail') : '';




    // Order Placement Function
    async function placeOrder() {

            let response = await fetch('https://laravel.valueadderhabib.com/api/dashboard/all_orders_data_for_order_placement_by_users')

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
                        orderer_email : orderer_email,
                        orderer_address : address_phone.address,
                        orderer_phone : address_phone.phone,
                        order_payment_option : paymentOption,
                        order_payment_status : 'Pending'
                    }

                    let response = await fetch('https://laravel.valueadderhabib.com/api/dashboard/order_placement' , {
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
                        orderer_email : orderer_email,
                        orderer_address : address_phone.address,
                        orderer_phone : address_phone.phone,
                         order_payment_option : paymentOption,
                        order_payment_status : 'Pending'
                    }

                    let response = await fetch('https://laravel.valueadderhabib.com/api/dashboard/order_placement' , {
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
                    orderer_email : orderer_email,
                    orderer_address : address_phone.address,
                    orderer_phone : address_phone.phone,
                    order_payment_option : paymentOption,
                    order_payment_status : 'Pending'
                }

                let response = await fetch('https://laravel.valueadderhabib.com/api/dashboard/order_placement' , {
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

              // !order_placed && ordered_products && address_phone.address && address_phone.phone && placeOrder()
        if(!order_placed && ordered_products && address_phone.address && address_phone.phone){
            placeOrder()
        }
        
    }, [ order_placed , ordered_products , address_phone.address , address_phone.phone ])

    const address_phone_submit = (e:any) => {

        e.preventDefault();

        let phone = e.target.phone.value;

        let address = e.target.address.value;

        if(phone && address) {

            setAddress_phone((prev : any) => ({...prev , phone : phone , address : address}))

            localStorage.setItem('orderer_address' , address)
            localStorage.setItem('orderer_phone' , phone)

        }else{

            alert('Please Fill All The Details')

        }

    }




    if(order_placed) {

                return (
                    <Container>

                        <div className="flex flex-col justify-center items-center">

                        <img src="/images_icons/task_done.gif" alt="Order Processing" className="w-[250px] rounded-lg mb-4" />

                        <h1 className="text-3xl text-center p-4">Order Has Been Placed!!</h1>

                        </div>

                    </Container>
                )





    }else if(paymentOption == ''){
 

        return (

            <Container>

            <div id='payment_option_popup' className="flex flex-col justify-center items-center">

               

                    {/* Delivered Dialoge Box Feature */}
                    <div className={`mt-8 h-[50vh] w-[80vw] md:w-[50vw] border border-black bg-gray-100 rounded-lg shadow-xl flex flex-col items-center justify-center ${1==1 ? '' : 'hidden'}`}>
                    
                    <div className="flex flex-col justify-center items-center">

                    <p className="text-blue-600 text-2xl text-center p-8">Which Payment Option Do You Prefer ?</p>

                                <div className="flex gap-4">

                                <button className="bg-blue-600 text-white rounded-lg px-4 py-2 w-[50%] md:w-[150px] hover:scale-110 mt-2" onClick={()=>setPaymentOption('online')}>Online Payment</button>

                                <button className="bg-black text-white rounded-lg px-4 py-2 w-[50%] md:w-[150px] hover:scale-110 mt-2" onClick={()=>setPaymentOption('local')}>Pay Locally</button>

                            </div>
                        </div>
                    </div>

            </div>


        </Container>

        )




    }else if(paymentOption !=='' && (address_phone.address == '' || address_phone.phone == '')){

         return (   <Container>
                   
            <div className="flex flex-col justify-center items-center">

                  <h1 className="text-3xl text-center p-4">Delivery Details</h1>

                <form onSubmit={address_phone_submit} className="flex flex-col justify-center items-center">

                    <div className="flex flex-col">
                    <label>Phone</label>
                    <input className="px-4 py-2 border border-black w-[90vw] md:w-[60vw] my-4 rounded-lg hover:scale-105" type="phone" name="phone" />
                    </div>

                    <div className="flex flex-col">
                    <label>Address</label>
                    <input className="px-4 py-2 border border-black w-[90vw] md:w-[60vw] rounded-lg hover:scale-105" type="address" name="address" />
                   
                    </div>

                    <input type="submit" className=" bg-black text-white rounded-lg px-4 py-2 w-[50%] md:w-[150px] hover:scale-110 mt-8" value="Send" />
                   
                </form>

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