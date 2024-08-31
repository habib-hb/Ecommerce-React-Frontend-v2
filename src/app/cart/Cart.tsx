// import { getCurrentUser } from "./../../actions/getCurrentUser";
import Container from "../components/Container";
import CartClient from "./CartClient";

const Cart = () => {
    // const currentUser = await getCurrentUser()
    return ( 
        <div className="pt-8 px-4">

            <Container>
                <CartClient currentUser = {null}/>
            </Container>

        </div>
     );
}
 
export default Cart;