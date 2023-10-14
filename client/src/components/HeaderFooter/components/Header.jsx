import {Link} from "react-router-dom";
import HeaderLoginRegister from "./headerLoginRegister";
import {useSelector} from "react-redux";


const Header = () => {


    const User = useSelector(state=>state.user)

    return (
        <div className='header'>
            <div className="wrapper">
                <div className="header_block block flex between">
                    <div className="header_logo">
                        <h1 className="title">
                            <Link to='/'>BLOG</Link>
                        </h1>
                    </div>
                    <div className="header_menu">
                        <ul className="mainMenu flex">
                            <li><Link to='/'>Home</Link></li>
                            {User?.name&&<li><Link to='/myPosts'>My posts</Link></li>}
                            {User?.name&&<li><Link to='/myComments'>My comments</Link></li>}

                        </ul>
                    </div>
                    <HeaderLoginRegister/>
                </div>
            </div>
        </div>
    );
};

export default Header;