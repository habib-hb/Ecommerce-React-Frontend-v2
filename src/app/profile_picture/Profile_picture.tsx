 


import axios from "axios";
import Container from "../components/Container";

const Profile_picture = () => {

    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        let profileImageFile = formData.get('profile_picture');
        let user_email = formData.get('user_email');

        let formDataToSend = new FormData();
        formDataToSend.append('user_email' , user_email ?? '');
        formDataToSend.append('profile_picture' , profileImageFile ?? '');


        axios.post('https://laravel.valueadderhabib.com/api/dashboard/profile_picture_upload' , formDataToSend)
        .then((response) => {
            console.log('Success:', response.data);

            window.location.href = '/profile';
        })
        .catch((error) => {
            console.error('Error:', error);

            alert('Something Went Wrong');
        });

    }

    const user_email=   typeof window !== 'undefined' ?  window?.localStorage.getItem('loggedInEmail')  : '';

    return ( 
        <Container>

            <div>

                <h1 className="text-3xl text-center p-8">Upload Profile Picture</h1>

                <form onSubmit={formSubmit} encType="multipart/form-data" className="flex flex-col items-center justify-center gap-4">

                    <input type="file" name="profile_picture" />

                    <input type="hidden" name='user_email' value={user_email ? user_email : ''} />

                    <button type="submit" className="bg-black hover:bg-slate-800 text-white font-bold py-2 px-4 rounded">Upload</button>

                </form>

            </div>

        </Container>
     );
}
 
export default Profile_picture;