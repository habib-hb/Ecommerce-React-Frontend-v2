// import { getCurrentUser } from "./../../actions/getCurrentUser";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import LoginForm from "./LoginForm";

 const Login = () => {

    // const currentUser = await getCurrentUser()

    return ( 
        <Container>
            <FormWrap>
                <LoginForm currentUser={null}/>
            </FormWrap>
        </Container>
     );
 }
  
 export default Login;