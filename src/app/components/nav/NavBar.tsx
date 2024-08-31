// import Link from "next/link";
import Container from "../Container";
// import {Redressed} from "next/font/google"
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
// import { getCurrentUser } from "@/actions/getCurrentUser";

// const redressed = Redressed({subsets:["latin"], weight: ["400"]});

const NavBar = () => {

    // const currentUser = await getCurrentUser();

    return ( 
        <div
        className="sticky
        top-0
        bg-slate-200
        w-full
        shadow-sm
        z-30"
        >
            <div className="py-4 border-b-[1px] px-4">
                <Container>
                    <div className="flex items-center justify-between gap-3 md:gap-0">
                        <a href="/" className={`text-2xl flex flex-row align-middle items-center font-extralight`}><img className="h-[40px]" src='/images_icons/shop_logo_3.png' alt='logo' /> HBshop</a>
                        {/* <div className="hidden md:block">Search</div> */}
                        <div className="flex items-center gap-8 md:gap-12">
                            <CartCount/>
                            <UserMenu currentUser={null}/>
                        </div>
                    </div>
                </Container>
            </div>
            </div>
     );
}
 
export default NavBar;