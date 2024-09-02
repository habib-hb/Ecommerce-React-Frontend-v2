 

import Container from "../../components/Container";
import axios from "axios";
import { useEffect, useState } from "react";

const Add_admin = () => {


    const [customers , setCustomers] = useState<any>([]);

    const [dialogBoxOpen, setDialogBoxOpen] = useState(false);

    const [targetedCustomer, setTargetedCustomer] = useState<any>('');

    const [hideTargetedCustomers, setHideTargetedCustomers] = useState<any>([]);

    const [checked_unauthorized, setChecked_unauthorized] = useState(false);


    //Extracting the Admins data from laravel backend
    async function fetchPotentialAdmins() {

        await axios.get('https://laravel.valueadderhabib.com/api/add_admin_get_customers?email='+(typeof window !== 'undefined' ? window?.localStorage.getItem('loggedInEmail') : ''))
         .then((response) => {
 
             console.log(response.data);
 
             setCustomers(response.data);
 
         })
         .catch((error) => {
             console.error(error);
 
             alert(error.response.data.message);
 
             if(error.response.data.message == 'Admin not found. Thus the request for the data has been denied.'){
                 setChecked_unauthorized(true);
             }
 
         });

     }



     // Calling the above function within the useEffect
    useEffect(() => {
        fetchPotentialAdmins();
    }, [])



    async function addAdmin(customer_id : any) {

        const response = await fetch(`https://laravel.valueadderhabib.com/api/dashboard/add_admin_insert_customer` , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({targeted_customer_id : customer_id , admin_email : typeof window !== 'undefined' ? window?.localStorage.getItem('loggedInEmail') : ''})
        });

        if(response.ok){

            alert('Admin Added');

            setDialogBoxOpen(false);

            setHideTargetedCustomers([...hideTargetedCustomers, customer_id]);

            localStorage.setItem('admin_updated' , 'updated');

            window.location.reload();

        }else{

            alert('Something went wrong');

        }

    }


    if(customers.length > 0){

    return ( 
        <Container>

           <h1 className={`text-3xl text-center p-4 border border-black max-w-[80vw] md:max-w-[400px] mx-auto my-8 ${dialogBoxOpen ? 'opacity-50' : ''}`}>Add Admins</h1>

           {/* Only taking the potential admins */}
           {customers.filter((customer:any)=>(customer.admin_email == null)).map((customer:any)=>{
                return (
                    <div className={`flex flex-col justify-center items-center p-8 border border-black rounded-lg mb-4 mx-2 shadow-lg ${dialogBoxOpen ? 'opacity-50' : ''} ${hideTargetedCustomers.includes(customer.customer_id) ? 'hidden' : ''}`}>
                        
                        <img src={customer.customer_avatar} alt={customer.customer_name} className="w-64 h-64 rounded-lg mb-4" />
                        <h1 className="text-2xl font-bold">{customer.customer_name}</h1>

                        <p>{customer.email}</p>

                        <button className="bg-black text-white rounded-lg px-4 py-2 w-[50%] md:w-[150px] hover:scale-110 mt-2" onClick={() => {setDialogBoxOpen(true); setTargetedCustomer(customer.customer_id)}}>Add As Admin</button>


                    </div>
                )
            })}



             {/* Dialoge Box Feature */}
             <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[50vh] w-[80vw] md:w-[50vw] border border-black bg-gray-100 rounded-lg shadow-xl flex flex-col items-center justify-center ${dialogBoxOpen ? '' : 'hidden'}`}>
                        
                        <div className="flex flex-col justify-center items-center">

                        <p className="text-blue-600 text-2xl text-center p-8">Are You Sure You Want To Add This User As An Admin?</p>

                            <div className="flex gap-4">
                             <button className="bg-blue-600 text-white rounded-lg px-4 py-2 w-[50%] md:w-[150px] hover:scale-110 mt-2" onClick={()=>addAdmin(targetedCustomer)}>Add</button>

                             <button className="bg-black text-white rounded-lg px-4 py-2 w-[50%] md:w-[150px] hover:scale-110 mt-2" onClick={()=>setDialogBoxOpen(false)}>Cancel</button>
                             </div>
                        </div>
             </div>



            


        </Container>
     );

    }else{

            if(checked_unauthorized){
                return (
                    <Container>
                        <h1 className="text-3xl text-center p-4 border border-black max-w-[400px] mx-auto my-8">Admins</h1>
                        <h1 className="text-3xl text-center p-4 border border-black max-w-[400px] mx-auto my-8">Unauthorized</h1>
                    </Container>
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
}
 
export default Add_admin;