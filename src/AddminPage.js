import menubar from './Images/menu.png'
import logo from './Images/logo.png'
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from 'react-router-dom';
import MyHeader from './MyHeader';

function AddminPage() {
    return (
        <>
            <header className="header-fix-top-section">
                <div className="d-xl-none abce">
                    <img className='me-3 mr-3 imgmenu' src={menubar} />
                </div>

                <MyHeader />
            </header>

            <div id="s-sidebar-back" className="sidebar-backdrop d-xl-none d-none"></div>

            <div className='sidebar-main-section shadow'>
                <div className='brand-title'>
                    <a className='d-inline-flex align-items-center cursor-pointer' href='/'>
                        <img className='img-fluid' src={logo} />
                    </a>
                </div>
                <div className='sidebar-main-section-inner pt-xl-3'>
                    <div className='sidebar-main-inner-menu'>
                        <div className='sidebar-main-inner-list'>
                            <ul className='p-0'>
                                <Link to={'/UserData'}><li><bdi><i className="bi bi-grid-3x3-gap"></i><span className="sidebars">User Data</span></bdi></li> </Link>
                                <Link to={'/AddProduct'}><li><bdi><i className="bi bi-grid-3x3-gap"></i><span className="sidebars">Add products</span></bdi></li> </Link>
                                <Link to={'/ProductData'}><li><bdi><i className="bi bi-grid-3x3-gap"></i><span className="sidebars">Products Data</span></bdi></li> </Link>
                                <Link to={'/AdminOderData'}><li><bdi><i className="bi bi-grid-3x3-gap"></i><span className="sidebars">Oder Data</span></bdi></li> </Link>
                                <Link to={'/Dashboard'}><li><bdi><i className="bi bi-grid-3x3-gap"></i><span className="sidebars">Dashboard</span></bdi></li> </Link>
                                <a><li><bdi><i className="bi bi-grid-3x3-gap"></i><span className="sidebars">Profile</span></bdi></li> </a>
                                <a><li><bdi><i className="bi bi-grid-3x3-gap"></i><span className="sidebars">Profile</span></bdi></li> </a>
                                <a><li><bdi><i className="bi bi-grid-3x3-gap"></i><span className="sidebars">Profile</span></bdi></li> </a>
                                <a><li><bdi><i className="bi bi-grid-3x3-gap"></i><span className="sidebars">Profile</span></bdi></li> </a>
                                <a><li><bdi><i className="bi bi-grid-3x3-gap"></i><span className="sidebars">Profile</span></bdi></li> </a>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AddminPage;