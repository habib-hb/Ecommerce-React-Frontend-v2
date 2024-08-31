import { Outlet, Link } from 'react-router-dom';


const Layout = () => {
    return ( 
        <div>
            <h1> The default Layout Hah</h1>


            <div>
                <nav>
                    <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/blogs">Blogs</Link>
                    </li>
                    </ul>
                </nav>
                <Outlet /> {/* This is where the routed content will be displayed */}
                </div>
        </div>


     );
}
 
export default Layout;