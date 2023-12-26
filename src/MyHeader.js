import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "bootstrap-icons/font/bootstrap-icons.css";
import logo from './Images/logo.png'
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import ChildMiniCart from "./ChildMiniCart";
import { langContext } from './ContextProvider';
import { useContext } from 'react';
import firebaseApp from './FirebaseApp';

function MyHeader() {
    const { CartLength, setCartLength } = useContext(langContext)
    const [value, setValue] = useState('Register')
    const [value1, setValue1] = useState('Login')
    const [CartData, setCartData] = useState([])
    const [qty, setQty] = useState(1)
    const [TotalPrice, setTotalPrice] = useState(0)
    const [CurrentUser, setCurrentUser] = useState()
    const [ProductData, setProductData] = useState()

    const Navigate = useNavigate()

    const Registration = () => {
        if (value === 'Register') {
            Navigate('/Registration')

        } else {
            Navigate('/YourAccount')
        }
    }
    const handleLoginLogout = () => {
        if (value1 === 'Log out') {
            localStorage.removeItem("LoginID")

            setValue('Register')
            setValue1('Login')
            Navigate('/')
        } else {

            Navigate('/Login')
        }
    }

    useEffect(() => {
        if (localStorage.getItem('LoginID')) {
            setValue('Your Account')
            setValue1('Log out')
        }

        // ----------------Cart Section---------------
        CartInGetData()

    }, [])

    const OpenCart = (() => {
        if (document.getElementById('cart-section')) {
            document.getElementById('cart-section').classList.add('active')
        }
    })

    const CartInGetData = async () => {
        let CurrentUserArray = {}
        let AllProductArray = []
        let CartInProduct = []
        if (localStorage.getItem('LoginID')) {
            const loggedInUser = localStorage.getItem('LoginID')

            let db = firebaseApp.firestore()
            await db.collection("db_User").where("id", "==", Number(loggedInUser))
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        console.log(doc.id, " => ", doc.data());
                        CurrentUserArray = doc.data()
                        setCartLength(CurrentUserArray.cart.length)
                        setCurrentUser(CurrentUserArray)
                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });

            await db.collection("ProductData")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        console.log(doc.id, " => ", doc.data());
                        AllProductArray.push(doc.data())
                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });

            for (let i = 0; i < AllProductArray.length; i++) {
                for (let j = 0; j < CurrentUserArray.cart.length; j++) {
                    if (AllProductArray[i].id == CurrentUserArray.cart[j].productID) {
                        CartInProduct.push(AllProductArray[i])
                    }
                }
            }

            setProductData(AllProductArray)
            setCartData(CartInProduct)
        }
        getprice(CartInProduct)
    }

    // ------------------Cart Section-------------
    const handleremoveINCart = ((id) => {

        console.log(id)

        if (localStorage.getItem('LoginID')) {
            const loggedInUser = localStorage.getItem('LoginID')

            let db = firebaseApp.firestore()
            db.collection("db_User").where("id", "==", Number(loggedInUser))
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());

                        let CurrentCartUser = doc.data()

                        const RemoveRow = CurrentCartUser.cart.findIndex(obj => obj.productID == id)
                        console.log(RemoveRow)

                        if (RemoveRow !== -1) {
                            CurrentCartUser.cart.splice(RemoveRow, 1);

                            var washingtonRef = db.collection("db_User").doc(doc.id);

                            // Set the "capital" field of the city 'DC'
                            return washingtonRef.update({
                                cart: CurrentCartUser.cart
                            })
                                .then(() => {
                                    console.log("Document successfully updated!");
                                    CartInGetData()
                                    setCartLength(CurrentCartUser.cart.length)
                                })
                                .catch((error) => {
                                    // The document probably doesn't exist.
                                    console.error("Error updating document: ", error);
                                });
                        }
                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        } else {
            alert('Login Required.');
        }

    })

    const CloseCart = (() => {
        if (document.getElementById('cart-section')) {
            document.getElementById('cart-section').classList.remove('active')
        }
    })

    const getqty = (v, id) => {
        setQty(v, id)
        console.log(v, id)

        for (let i = 0; i < CurrentUser.length; i++) {
            if (CurrentUser.cart[i].productID == id) {
                CurrentUser.cart[i].qty = v
            }
        }

        let cartArray = []
        for (let i = 0; i < ProductData.length; i++) {
            for (let j = 0; j < CurrentUser.cart.length; j++) {
                if (ProductData[i].id == CurrentUser.cart[j].productID) {

                    let obj = ProductData[i]
                    obj['qty'] = CurrentUser.cart[j].qty
                    obj['cartId'] = CurrentUser.cart[j].id
                    console.log(obj['cartId'])

                    cartArray.push(obj)
                }
            }
        }
        getprice(cartArray, v)
    }

    const getprice = (data, v) => {
        let price = 0
        data.forEach(item => {
            let qty = 1
            if (item.qty) {
                qty = v
            }
            price = price + (Number(item.Pprice) * qty)
        });
        setTotalPrice(price)
    }

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand href="#home">
                        <img className='NavLogo' src={logo} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="m-auto">
                            <Nav.Link className='nav-bar1 active' href="/">Home</Nav.Link>
                            <NavDropdown title="Shop" id="basic-nav-dropdown">
                                <div className='d-flex'>
                                    <div>
                                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2"> Another action </NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    </div>
                                    <div>
                                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2"> Another action </NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    </div>
                                </div>
                            </NavDropdown>
                            <NavDropdown title="Themes" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>

                            </NavDropdown>
                            <Nav.Link href="#link">Blog</Nav.Link>
                            <Nav.Link href="#link">About Us</Nav.Link>
                            <Nav.Link href="#link">More</Nav.Link>
                        </Nav>

                        {/* <!-- -----Header Right----- --> */}

                        <div className='m-auto nav-right'>

                            {/* <!-- ----search bar--- --> */}

                            <div className='search-header' id='search'>
                                <div className='search-toggle'>
                                    <i className="bi bi-search"></i>
                                </div>
                                <div>
                                    <form className="search-product d-none" id="abcd" action="" method="get" role="search">
                                        <input type="search" className="search-inp" name="" id="" placeholder="Search products..." />
                                        <button type="submit"><i className="bi bi-search"></i></button>
                                    </form>
                                </div>
                            </div>

                            {/* -----------User bar----------- */}

                            <Dropdown className='person-header'>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    <i className="bi person-toggle bi-person"></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={Registration}>{value}</Dropdown.Item>
                                    <Dropdown.Item onClick={handleLoginLogout}>{value1}</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            {/* <!-- -----wishlist bar------ --> */}

                            <div className="wishlist-header">
                                <div className="wishlist-text">
                                    <a href=""><i className="bi bi-heart"></i></a>
                                </div>
                                <span className="wishlist-count d-none">0</span>
                            </div>

                            {/* <!-- -----cart bar----- --> */}

                            <div className="cart-header">
                                <div className="cart togg">
                                    <div className="shopping-cart" title="View your shopping cart">
                                        <div onClick={OpenCart} className="cart-price">
                                            <i className="bi bi-bag"></i>
                                            <div id="cart-qty" className="cart-qty">
                                                {CartLength}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <section className="cart-section drawer" id='cart-section'>
                <div className="drawer__inner">
                    <div div className="drawer__header">
                        <h2 className="drawer__heading">Your cart</h2>
                        <button onClick={CloseCart} className="drawer__close">Back <i className="bi bi-chevron-right"></i></button>
                    </div>


                    {CartData.map((item) => {
                        return (
                            <>
                                <ChildMiniCart data={item} getqty={getqty} RemoveInCart={handleremoveINCart} />
                            </>
                        )
                    })}
                    {/* {CartData.map((item, i) => {
                        return (
                            <>
                                <ChildMiniCart data={item} getqty={getqty} RemoveInCart={handleremoveINCart} /> */}
                    {/* <div key={i} className="drawer__items">
                                    <div className="drawer__img">
                                        <img className="img-fluid" src={item.Pimg[0]} />
                                    </div>
                                    <div className='drawer__content'>
                                        <a href='#' className="cart-item__name">{item.Pname}</a>
                                        <div className='d-flex mt-2'><dt className='cart-size'>Size:</dt><dd className='cart-size ps-1 pb-0 mb-0'> S, </dd></div>
                                        <div className='d-flex'><dt className='cart-size'>Color:</dt> <dd className='cart-size ps-1'> Black,</dd></div>
                                        <div className='d-flex'><dt className='cart-size'>Price:</dt> <dd className='cart-size ps-1 pb-3'>${item.Pprice}.00</dd></div>

                                        <div className='d-flex'>
                                            <div className="price-per-item__container cart">
                                                <button className="quantity__button" onClick={decrement}>-</button>
                                                <input className="quantity__input" type="tel" name="quantity" value={qty} ></input>
                                                <button className="quantity__button" onClick={increment}>+</button>
                                            </div>
                                            <div onClick={() => RemoveInCart(item.id)} className='cart_delete'>
                                                <i className="bi bi-trash3"></i>
                                            </div>
                                            <div className='cart_price'>
                                                <span>${item.Pprice * qty}.00</span>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                    {/* </>
                        )
                    })} */}

                    {CartData && CartData.length ?
                        <div className='estimateTotal_bottom'>
                            <div className='estimateTotal'>
                                <div className='totals'>
                                    <h2 className="mb-0">Estimated total</h2>
                                    <p className="mb-0">${TotalPrice}.00 USD</p>
                                </div>
                            </div>
                            <div className='checkOut_viewCart'>
                                <button>CHECK OUT</button>
                                <Link to={'/CartPage'} className='view_cart'>View Cart</Link>
                            </div>
                        </div> :
                        <Container>
                            <Row>
                                <Col className="text-center my-5">
                                    <div>
                                        <h1>Your cart is empty</h1>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-center">
                                    <div>
                                        <button className="px-4 py-2 border-0 text-light bg-dark fw-medium">Continue Shopping</button>
                                    </div>
                                </Col>
                            </Row>
                        </Container>

                    }
                </div>

            </section >
        </>
    );
}

export default MyHeader;