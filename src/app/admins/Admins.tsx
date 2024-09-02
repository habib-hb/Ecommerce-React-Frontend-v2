 

import Container from "../components/Container";
import axios from "axios";
import { useEffect, useState } from "react";

const Admins = () => {


    const [admins , setAdmins] = useState<any>([]);

    const [dialogBoxOpen, setDialogBoxOpen] = useState(false);

    const [targetedAdmin, setTargetedAdmin] = useState<any>('');

    const [hideTargetedAdmins, setHideTargetedAdmins] = useState<any>([]);

    const [checked_unauthorized, setChecked_unauthorized] = useState(false);


    //Extracting the Admins data from laravel backend
    async function fetchAdmins() {
        await axios.get('https://laravel.valueadderhabib.com/api/admins?email='+ (typeof window !== 'undefined' ? window?.localStorage.getItem('loggedInEmail') : ''))
         .then((response) => {
 
             console.log(response.data);
 
             setAdmins(response.data);
 
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
        fetchAdmins();

        //Set interval function
        setInterval(() => {
            
            if(localStorage.getItem('admin_updated') == 'updated'){

                localStorage.removeItem('admin_updated');
                window.location.reload();

            }

        }, 500);
       
    }, [])



    async function deleteAdmin(admin_id : any) {
        const response = await fetch(`https://laravel.valueadderhabib.com/api/dashboard/admin_delete/${admin_id}?email=${typeof window !== 'undefined' ? window?.localStorage.getItem('loggedInEmail') : ''}`);
        if(response.ok){
            alert('Admin Deleted');
            setDialogBoxOpen(false);
            setHideTargetedAdmins([...hideTargetedAdmins, admin_id]);
            window.location.reload();
        }else{
            alert('Something went wrong');
        }
    }


    if(admins.length > 0){

    return ( 
        <Container>

           <h1 className="text-3xl text-center p-4 border border-black max-w-[80vw] md:max-w-[400px] mx-auto my-8">Admins</h1>

           {admins.map((admin:any)=>{
                return (
                    <div className={`flex flex-col justify-center items-center p-8 border border-black rounded-lg mb-4 mx-2 shadow-lg ${dialogBoxOpen ? 'opacity-50' : ''} ${hideTargetedAdmins.includes(admin.user_id) ? 'hidden' : ''}`}>
                        
                        <img src={admin.customer_avatar} alt={admin.customer_name} className="w-64 h-64 rounded-lg mb-4" />
                        <h1 className="text-2xl font-bold">{admin.customer_name}</h1>
                        <p>{admin.admin_email}</p>
                        <button className="bg-red-600 text-white rounded-lg px-4 py-2 w-[50%] md:w-[150px] hover:scale-110 mt-2" onClick={() => {setDialogBoxOpen(true); setTargetedAdmin(admin.user_id)}}>Delete</button>


                    </div>
                )
            })}



             {/* Dialoge Box Feature */}
             <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[50vh] w-[80vw] md:w-[50vw] border border-black bg-gray-100 rounded-lg shadow-xl flex flex-col items-center justify-center ${dialogBoxOpen ? '' : 'hidden'}`}>
                        
                        <div className="flex flex-col justify-center items-center">

                        <p className="text-red-600 text-2xl text-center p-8">Are You Sure You Want To Delete This Admin?</p>

                            <div className="flex gap-4">
                             <button className="bg-red-600 text-white rounded-lg px-4 py-2 w-[50%] md:w-[150px] hover:scale-110 mt-2" onClick={()=>deleteAdmin(targetedAdmin)}>Delete</button>

                             <button className="bg-black text-white rounded-lg px-4 py-2 w-[50%] md:w-[150px] hover:scale-110 mt-2" onClick={()=>setDialogBoxOpen(false)}>Cancel</button>
                             </div>
                        </div>
             </div>



             {/* Add Admin Functionality */}
             <a href="/admins/add_admin"><button className="block bg-black text-white rounded-lg px-4 py-2 w-[50%] md:w-[150px] hover:scale-110 mt-8 mx-auto">Add Admin</button></a>


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
 
export default Admins;