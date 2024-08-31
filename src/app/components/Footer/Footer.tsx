// import a from "next/a";
import Container from "../Container";
import FooterList from "./FooterList";
import {MdFacebook} from "react-icons/md";
import {AiFillTwitterCircle , AiFillInstagram , AiFillYoutube } from "react-icons/ai";

const Footer = () => {
    return ( 
        <footer className="bg-slate-200 text-slate-900 text-sm mt-16">
            <Container>
                <div
                    className="
                    flex
                    flex-col
                    md:flex-row
                    justify-between
                    pt-16
                    pb-8
                    px-4
                    "
                >
                    <img src="/images_icons/thank-you-1.png" className="h-[300px]" alt="thank you" />


                    <div className="
                        w-full
                        md:w-1/3
                        mb-6
                        md:mb-0
                    ">
                    <h3 className="text-base font-bold mb-2">About Us</h3>
                    <p className="mb-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga, voluptatem voluptatibus nesciunt sapiente officia ullam iure saepe temporibus laboriosam aliquid.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga, voluptatem voluptatibus nesciunt sapiente officia ullam iure saepe temporibus laboriosam aliquid.</p>
                    <p>&copy; {new Date().getFullYear()} HB-Shop All Rights Reserved</p>
                    </div>

                    <FooterList>
                    <h3 className="text-base font-bold mb-2">Follow Us</h3>
                    <div className="flex gap-2">
                    <a href={"#"}>
                        <MdFacebook size={24}/>
                    </a>
                    <a href={"#"}>
                        <AiFillTwitterCircle size={24}/>
                    </a>
                    <a href={"#"}>
                        <AiFillInstagram size={24}/>
                    </a>
                    <a href={"#"}>
                        <AiFillYoutube size={24}/>
                    </a>
                    </div>
                    </FooterList>
                    </div> 
            </Container>
        </footer>
    );
}
 
export default Footer;