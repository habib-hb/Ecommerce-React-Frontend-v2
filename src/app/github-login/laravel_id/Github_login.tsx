 
import axios from "axios";
import { useEffect } from "react";
import Container from "../../components/Container";


// Operation : Extraction the email information from Laravel regarding Github Account
const GithubLogin = () => {

    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');

    let laravel_id = params.get('laravel_id');

    const fetchGithubInfo = async () => {
        try {
            const response = await axios.post('https://laravel.valueadderhabib.com/api/get_github_info', { laravel_id: laravel_id },
            { withCredentials: true });

            console.log('Success');

            let github_email_data = response.data;

            typeof window !== 'undefined' && window?.localStorage.setItem('loggedInEmail', github_email_data.email);

            console.log('github email >>>', github_email_data.email);

            window.location.href = '/';

        } catch (error) {

            console.error('Failed', error);

        }
    };


    // Calling the above function within the useEffect
    useEffect(() => {

        fetchGithubInfo();
        
    }, [laravel_id]);
    

    return ( 
        <div className="p-8 flex flex-col items-center justify-center h-screen">

                <Container>

                <div className="flex flex-col items-center justify-center ">

                  <img src="/images_icons/redirecting_gif.gif" className="h-[250px] w-[250px]" alt="loading" />

                   <h1 className="text-3xl text-center p-4">Redirecting...</h1>

                  </div>  
               
                </Container>
                
            </div>
     );
}
 
export default GithubLogin;