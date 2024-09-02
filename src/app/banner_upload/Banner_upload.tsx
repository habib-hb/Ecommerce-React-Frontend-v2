 


import axios from "axios";
import Container from "../components/Container";
import toast from "react-hot-toast";

const Banner = () => {

    const formSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        let profileImageFile = formData.get('banner_picture');
        let user_email = localStorage.getItem('loggedInEmail');

        let formDataToSend = new FormData();
        formDataToSend.append('admin_email' , user_email ?? '');
        formDataToSend.append('banner_picture' , profileImageFile ?? '');

        try{
       const response = await axios.post('https://laravel.valueadderhabib.com/api/dashboard/banner_picture_upload' , formDataToSend)
            console.log('Success:', response.data);

            toast.success('Banner Is Uploaded');

            window.location.href = '/';
        }
        catch(error:any) {
            console.error('Error:', error);

            alert(error.response.data.message);

            toast.error("Banner Is Not Uploaded");
        };

    }

    
    // let user_email:any = "";

    // useEffect(() => {
    //     user_email = typeof window !== 'undefined' ? window?.localStorage.getItem('loggedInEmail') : '';
    // }, []);

    return ( 
        <Container>

            <div>

                <h1 className="text-3xl text-center p-8">Upload Banner</h1>

                <form onSubmit={formSubmit} encType="multipart/form-data" className="flex flex-col items-center justify-center gap-4">

                    <input type="file" name="banner_picture" className="border border-black p-8 rounded-lg"/>

                    <button type="submit" className="bg-black hover:bg-slate-800 text-white font-bold py-2 px-4 rounded">Upload</button>

                </form>

            </div>

        </Container>
     );
}
 
export default Banner;