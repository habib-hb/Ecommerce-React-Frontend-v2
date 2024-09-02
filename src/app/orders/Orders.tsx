 


import { useEffect, useState } from "react";
import Container from "../components/Container";

const Orders = () => {
    const [orders , setOrders] = useState<any>([]);

    const [deliveredDialogBoxOpen, setDeliveredDialogBoxOpen] = useState(false);

    const [removedDialogBoxOpen, setremovedDialogBoxOpen] = useState(false);

    const [adminDeny, setAdminDeny] = useState(false);

    const [order_fulfilled, setOrder_fulfilled] = useState(false);

    // const [targetedProduct, setTargetProduct] = useState<any>('');

    const [deliveredUpdateFunctionParameters , setDeliveredUpdateFunctionParameters] = useState<any>({});

    const [removeProductFunctionParameters , setRemoveProductFunctionParameters] = useState<any>({});

    async function fetchAllOrdersData() {

        const response = await fetch(`https://laravel.valueadderhabib.com/api/dashboard/all_orders_data?email=${ typeof window !== 'undefined' ? window?.localStorage.getItem('loggedInEmail') : ''}`);

        if(response.ok) {

            let json_response = await response.json();

            setOrders(json_response);

                    // alert('Data Retrived for ' + json_response[0].user_id);

        }else{

            let json_response = await response.json();

            alert(json_response.message);

            if(json_response.message == 'No orders found.'){
                setOrder_fulfilled(true);
            }else if(json_response.message == 'Admin not found. Thus the request for the data has been denied.'){
                setAdminDeny(true);
            }else{
                alert('Something Went Wrong.')
            }

           


        }

    }


    useEffect(() => {

        orders.length == 0 && fetchAllOrdersData();
        
    }, [orders])


  // Delivered Product Funtionality
   async function delivered_product(details : any) {

        let updated_order_details = details.order_details.filter((product : any) => {
            return product.id != details.product_id
        });

            console.log('Previous Order Data >>>' , details.order_details);
            console.log('Updated Order Data >>>' , updated_order_details);

         

            if(updated_order_details.length > 0) {
                // Post request to deliver product
                const response = await fetch('https://laravel.valueadderhabib.com/api/dashboard/order_delivered' , {
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({order_id : details.order_id , orders_data : updated_order_details})
                });

                if(response.ok) {
                    alert('Product Delivered')

                    setDeliveredDialogBoxOpen(false)

                    //This will trigger the useEffect which will reload the component and will update the orders list  
                    setOrders([]);


                }else{
                    alert('Something went wrong')
                }

            }else{ // The data that is stored in the database is a string version of a big json array object, so when there is no order data in that json array, I'm attemting to delete the record from the database completely

                    // Post request to deliver product
                    const response = await fetch('https://laravel.valueadderhabib.com/api/dashboard/delete_order' , {

                        method : 'POST',

                        headers : {
                            'Content-Type' : 'application/json'
                        },

                        body : JSON.stringify({order_id : details.order_id })
                    });

                    if(response.ok) {

                        alert('Order Fulfilled')

                        setDeliveredDialogBoxOpen(false)

                        setOrders([]);


                    }else{
                        alert('Something went wrong while deleting the order')
                    }

            }   
        
   }



   // Deleting Product Funtionality
    async function remove_product(details : any) {

        let updated_order_details = details.order_details.filter((product : any) => {

            return product.id != details.product_id

        });

            console.log('Previous Order Data >>>' , details.order_details);
            console.log('Updated Order Data >>>' , updated_order_details);

        

            if(updated_order_details.length > 0) {
                // Post request to deliver product
                const response = await fetch('https://laravel.valueadderhabib.com/api/dashboard/order_delivered' , {
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({order_id : details.order_id , orders_data : updated_order_details})
                });

                if(response.ok) {
                    alert('Product Order Deleted')

                    setremovedDialogBoxOpen(false)

                    setOrders([]);


                }else{
                    alert('Something went wrong')
                }

            }else{// The data that is stored in the database is a string version of a big json array object, so when there is no order data in that json array, I'm attemting to delete the record from the database completely

                    // Post request to deliver product
                    const response = await fetch('https://laravel.valueadderhabib.com/api/dashboard/delete_order' , {

                        method : 'POST',

                        headers : {
                            'Content-Type' : 'application/json'
                        },

                        body : JSON.stringify({order_id : details.order_id })
                    });

                    if(response.ok) {

                        alert('Order Removed')

                        setremovedDialogBoxOpen(false)

                        setOrders([]);


                    }else{
                        alert('Something went wrong while deleting the order')
                    }

            }   
        
    }




    if(orders?.length > 0) {

                // [{"id":1,"name":"iphone 14","description":"Short description","category":"Phone","brand":"apple","selectedImg":{"image":"https://m.media-amazon.com/images/I/71p-tHQ0u1L._AC_SX679_.jpg","color":"White","colorCode":"#FFFFFF"},"quantity":2,"price":"2999.00"},{"id":26,"name":"really!","description":"fdsf","category":"trt","brand":"dsfd","selectedImg":{"image":"https://laravel.valueadderhabib.com/storage/images/rokia afzal.jpeg","color":"rokia afzal","colorCode":"#ff2245"},"quantity":2,"price":"454.00"}]

        return ( 

                <Container>

                        <h1 className="text-3xl text-center p-4 border border-black max-w-[80vw] md:max-w-[400px] mx-auto my-8 rounded-lg">All Orders</h1>
                    {/* The user specific Data Based on Users. 'Orders' represents the array laravel created from all the order data available on the 'orders' table on the backend. */}
                    {orders.map((order : any) => {
                            let orderDataJson = JSON.parse(order.orders_data);

                            // Calculating the grand total
                            let grand_total = 0;
                            orderDataJson.map((data : any) => {
                                grand_total += parseInt(data.price) * parseInt(data.quantity);
                            })

                    return (
                        // The user specific Data
                        <div key={Math.random()} className="text-2xl bg-slate-50 text-black border-2 border-black rounded-lg p-4 mt-2 mb-16 cursor-pointer w-[90vw] md:w-[60vw] text-center shadow-xl mx-auto">

                                        <div className="my-4">

                                                <img src={order.customer_avatar ? order.customer_avatar : 'https://laravel.valueadderhabib.com/storage/images/unknown_user.jpg'} alt="USER" className="h-[200px] mx-auto rounded-lg border border-black" />
                       

                                                <h1 className="text-lg">Customer: <span className="text-base md:text-2xl font-bold">{order.name}</span></h1>

                                                <h1 className="text-lg">Email: <span className="text-base md:text-2xl font-bold">{order.email}</span></h1>

                                        </div>

                            {/* The Products ordered by the specific user. This data is processed from the whole array that is received as string format from a single 'orders' table's row. This array presents the ordered products ordered by the specific user  */}
                            { orderDataJson.map((data : any) => {

                                    // The products data
                                    return (
                                        <div>

                                            <div className=" mx-auto bg-slate-200 p-8 rounded-lg my-8 flex flex-col justify-center items-center border border-black shadow-md">
                                                <img src={data.selectedImg.image} alt="" className="h-[200px] mx-auto mb-2" />
                                                <h1 className="text-lg">Product: <span className="text-lg md:text-2xl font-bold">{data.name}</span></h1>

                                                <h1 className="text-lg">Price : <span className="text-2xl font-bold">{data.price}</span></h1>

                                                <h1 className="text-lg">Quantity : <span className="text-2xl font-bold">{data.quantity}</span></h1>

                                                <button className="bg-blue-700 text-white w-[90%] md:w-[50%] my-4 py-2 rounded-lg hover:scale-110" onClick={()=>{ 
                                                      
                                                    setDeliveredUpdateFunctionParameters({order_id : order.order_id , product_id: data.id ,  order_details : orderDataJson});

                                                    setDeliveredDialogBoxOpen(true)

                                                    }}>Mark As Delivered</button>

                                                <button className="bg-red-700 text-white w-[90%] md:w-[50%] my-4 py-2 rounded-lg hover:scale-110" onClick={()=>{ 
                                                      
                                                      setRemoveProductFunctionParameters({order_id : order.order_id , product_id: data.id ,  order_details : orderDataJson});
  
                                                      setremovedDialogBoxOpen(true)
  
                                                      }}>Reject Order</button>

                                            </div>


                                            {/* Delivered Dialoge Box Feature */}
                                            <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[50vh] w-[80vw] md:w-[50vw] border border-black bg-gray-100 rounded-lg shadow-xl flex flex-col items-center justify-center ${deliveredDialogBoxOpen ? '' : 'hidden'}`}>
                                            
                                            <div className="flex flex-col justify-center items-center">

                                            <p className="text-blue-600 text-2xl text-center p-8">Are You Sure That This Product Has Been Delivered To The Customer?</p>

                                                     <div className="flex gap-4">
                                                        <button className="bg-blue-600 text-white rounded-lg px-4 py-2 w-[50%] md:w-[150px] hover:scale-110 mt-2" onClick={()=>delivered_product(deliveredUpdateFunctionParameters)}>Delivered</button>

                                                        <button className="bg-black text-white rounded-lg px-4 py-2 w-[50%] md:w-[150px] hover:scale-110 mt-2" onClick={()=>setDeliveredDialogBoxOpen(false)}>Cancel</button>
                                                    </div>
                                                </div>
                                            </div>



                                            {/* Remove Product Dialoge Box Feature */}
                                            <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[50vh] w-[80vw] md:w-[50vw] border border-black bg-gray-100 rounded-lg shadow-xl flex flex-col items-center justify-center ${removedDialogBoxOpen ? '' : 'hidden'}`}>
                                            
                                            <div className="flex flex-col justify-center items-center">

                                            <p className="text-red-600 text-2xl text-center p-8">Are You Sure You Want To Reject This Product Order?</p>

                                                     <div className="flex gap-4">
                                                        <button className="bg-red-600 text-white rounded-lg px-4 py-2 w-[50%] md:w-[150px] hover:scale-110 mt-2" onClick={()=>remove_product(removeProductFunctionParameters)}>Delete</button>

                                                        <button className="bg-black text-white rounded-lg px-4 py-2 w-[50%] md:w-[150px] hover:scale-110 mt-2" onClick={()=>setremovedDialogBoxOpen(false)}>Cancel</button>
                                                    </div>
                                                </div>
                                            </div>



                                        </div>
                                      
                                    )
                                    
                            }) }

                        <div className="flex flex-col p-8 border border-black w-[90%] md:w-[30%] mx-auto rounded-lg justify-center items-center shadow-lg">

                                <h2 className="text-2xl font-bold">Grand Total</h2>
                                <h2><span className="text-4xl font-bold text-blue-700">{grand_total}</span>Tk.</h2>

                         </div>

                        </div>

                        )
                        
                        
                        
                    })}

                   
                    
                </Container>

        );

    }else if(adminDeny){

        return (

            <div className="p-8 flex flex-col items-center justify-center h-screen">
                <Container>

                <div className="flex flex-col items-center justify-center ">

                   <h1 className="text-3xl text-center p-4">Admin Access Denied !!</h1>

                  </div>  
               
                </Container>
            </div>

        );

    }
    else if(order_fulfilled){

        return (

            <div className="p-8 flex flex-col items-center justify-center h-screen">
                <Container>

                <div className="flex flex-col items-center justify-center ">

                   <h1 className="text-3xl text-center p-4">All Orders Are Fulfilled !!</h1>

                  </div>  
               
                </Container>
            </div>

        );

    }
    else{

        return (

            <div className="p-8 flex flex-col items-center justify-center h-screen">
                <Container>

                <div className="flex flex-col items-center justify-center ">

                  <img src="/images_icons/loading_gif.gif" className="h-[250px] w-[250px]" alt="loading" />

                   <h1 className="text-3xl text-center p-4">Loading...</h1>

                  </div>  
               
                </Container>
            </div>

        );

    }
}
 
export default Orders;