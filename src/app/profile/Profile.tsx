 


import { useEffect, useState } from "react";
import Container from "../components/Container";
import axios from "axios";

const Profile = () => {

    // Retriving The user Data from backend database
    const [user , setUser] = useState<any>(null);

    const userAcc =   typeof window !== 'undefined' ?  window?.localStorage.getItem('loggedInEmail') : '';

    async function userDataExtraction() {
        await axios.post('https://laravel.valueadderhabib.com/api/user_data_retrive' , {
            email : userAcc
        }).then((response) => {

            console.log('User Avatar from retrived data >>>' + response.data.avatar);

            // const userNameElement = document.getElementById('user_name');
            // userNameElement ? userNameElement.innerHTML = response.data.data.name : null;

            setUser(response.data.data);

            response.data.avatar && setUser((prev:any)=>({...prev, avatar : response.data.avatar}));

            setLoading(false);

        }).catch((error) => {

            console.error('Something went wrong in the user data extraction >>>' + error);

        });
    }

    
        useEffect(() => {

            if(userAcc && user == null) {

                userDataExtraction();

             }

        }, []);
        
    

    // End Retriving



    const [loading , setLoading] = useState(true);


    if(loading){ 

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
    else {   
        return ( 
            <Container>
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-3xl mt-8 px-8 py-2 border border-black">Your Profile</h1>
                    <h2><span className="font-bold">Name: </span>{user?.name}</h2>
                    <h2><span className="font-bold">E-mail: </span>{user?.email}</h2>

                    {user?.avatar ? <img src={user?.avatar} alt="Avatar" height={200} width={200} className="border border-black rounded-lg" /> : null}

                    {user?.avatar ? <a href='profile_picture'><h2 className="px-8 py-2 bg-black text-white rounded-lg shadow-md hover:opacity-80">Change Profile Picture</h2></a> : <a href='profile_picture'><h2 className="px-8 py-2 bg-black text-white rounded-lg shadow-md hover:opacity-80">Add Profile Picture</h2></a>}

                </div>
            </Container>
     );
}



}
 
export default Profile;