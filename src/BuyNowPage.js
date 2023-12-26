import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import Mini_Slider from "./Mini_Slider";
import img1 from './Images/product-1.png'
import Terms from "./Terms";
import Footer from "./Footer";
import { useEffect } from "react";
import { useState } from "react";
import ReactImageMagnify from 'react-image-magnify'
import Button from 'react-bootstrap/Button';
import form from 'react-bootstrap/Form';
import modal from 'react-bootstrap/Modal';
import { useFormik } from "formik";
import * as Yup from "yup";
import Loader from "./Loader";
import firebaseApp from "./FirebaseApp";
import MyHeader from "./MyHeader";
import { langContext } from "./ContextProvider";
import { useContext } from "react";


function BuyNowPage() {
    const { CartLength, setCartLength } = useContext(langContext)
    const [LoaderShow, setLoaderShow] = useState(true)
    const [Pname, setPname] = useState('')
    const [img, setimg] = useState('')
    const [Pimg, setPimg] = useState([])
    const [Pprice, setPprice] = useState('')
    const [Pstock, setPstock] = useState('')
    const [Pdescrip, setPdescrip] = useState('')
    const [show, setShow] = useState(false);
    const [addressData, setaddressData] = useState([])
    const [qty, setQty] = useState(1)
    const [CurrentProductID, setCurrentProductID] = useState('')
    // const [data, setData] = useState([])
    // const [OderData, setOderData] = useState([])

    console.log(CurrentProductID)
    useEffect(() => {

        BuyProductData()
    }, [])

    const BuyProductData = (() => {
        let url = window.location.href
        let id = url.substring(url.lastIndexOf('/') + 1)
        console.log(id)

        if (id) {
            let db = firebaseApp.firestore()
            db.collection("ProductData").where("id", "==", Number(id))
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        console.log(doc.id, " => ", doc.data());

                        setPname(doc.data().Pname)
                        setPimg(doc.data().Pimg)
                        setimg(doc.data().Pimg[0])
                        setPprice(doc.data().Pprice)
                        setPstock(doc.data().Pstock)
                        setPdescrip(doc.data().Pdescrip)
                        setCurrentProductID(doc.data().id)

                        setLoaderShow(false)
                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        }

    })

    const AddInCart = (() => {
        if (localStorage.getItem('LoginID')) {
            let LoginUserID = localStorage.getItem('LoginID')
            console.log(LoginUserID, 'LoginUserId')

            let db = firebaseApp.firestore()
            db.collection("db_User").where("id", "==", Number(LoginUserID))
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        console.log(doc.id, " => ", doc.data());

                        let LoginUser = doc.data()

                        if (!Array.isArray(LoginUser.cart)) {
                            LoginUser.cart = [];
                        }

                        let alreadyInCart = false

                        for (let i = 0; i < LoginUser.cart.length; i++) {
                            console.log(LoginUser.cart[i].productID)
                            if (LoginUser.cart[i].productID == CurrentProductID) {
                                alreadyInCart = true
                            }
                        }
                        if (alreadyInCart) {
                            alert('Product is already in the cart.')

                        } else {
                            console.log(LoginUser.cart)
                            LoginUser.cart.push({
                                productID: CurrentProductID,
                                id: Date.now(),
                                qty: 1
                            })
                            setCartLength(LoginUser.cart.length)
                            var washingtonRef = db.collection("db_User").doc(doc.id);

                            return washingtonRef.update({
                                cart: LoginUser.cart,

                            })
                                .then(() => {
                                    console.log("Document successfully updated!");
                                    alert('Product added to cart successfully.')
                                })
                                .catch((error) => {
                                    console.error("Error updating document: ", error);
                                });
                        }
                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        } else {
            alert('Login Required')
        }
    })


    const BuyNowItems = (() => {
        if (localStorage.getItem('LoginID')) {
            let LoginUserID = localStorage.getItem('LoginID')
            console.log(LoginUserID, 'LoginUserId')

            let db = firebaseApp.firestore()
            db.collection("db_User").where("id", "==", Number(LoginUserID))
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                        let LoginUser = doc.data()

                        if (LoginUser.address.length == 0) {
                            setShow(true);
                            alert('Address Required')
                        } else {
                            let MyOderID = Date.now()

                            let obj = {
                                productID: Number(CurrentProductID),
                                id: MyOderID,
                                quantaty: qty,
                                price: Pprice,
                                LoginUser: LoginUserID,
                                status: 0
                            }

                            // Add a new document with a generated id.
                            db.collection("AddminOderData").add({
                                productID: Number(CurrentProductID),
                                id: MyOderID,
                                quantaty: qty,
                                price: Pprice,
                                LoginUser: LoginUserID,
                                status: 0
                            })
                                .then((docRef) => {
                                    console.log("Document written with ID: ", docRef.id);
                                })
                                .catch((error) => {
                                    console.error("Error adding document: ", error);
                                });

                            var washingtonRef = db.collection("db_User").doc(doc.id);
                            console.log(doc.data())
                            let LoginUser = doc.data()
                            let NewOderData = [...LoginUser.oderID, obj]

                            return washingtonRef.update({
                                oderID: NewOderData
                            })
                                .then(() => {
                                    console.log("Document successfully updated!");
                                    alert('Oder Successfully')
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

        }
    })

    const ViewFront = (item) => {
        setimg(item)
    }
    const handleClose = () => setShow(false);

    const handleSave = (() => {

        document.getElementById('addr-btn').click()
    })

    const formik = useFormik({
        initialValues: {
            country: "",
            full_name: "",
            apartment_name: '',
            area_name: '',
            pincode: '',
            city_name: '',
            state_name: '',
            default_address: ''
        },
        validationSchema: Yup.object({
            country: Yup.string()
                .required("Required!"),

            full_name: Yup.string()
                .min(2, "Mininum 2 characters")
                .max(15, "Maximum 15 characters")
                .required("Required!"),

            apartment_name: Yup.string()
                .min(2, "Mininum 2 characters")
                .max(30, "Maximum 30 characters")
                .required("Required!"),

            area_name: Yup.string()
                .min(2, "Mininum 2 characters")
                .max(30, "Maximum 30 characters")
                .required("Required!"),

            pincode: Yup.string()
                .min(6, "Mininum 6 characters")
                .max(6, "Maximum 6 characters")
                .required("Required!"),

            city_name: Yup.string()
                .min(2, "Mininum 2 characters")
                .max(20, "Maximum 20 characters")
                .required("Required!"),
            state_name: Yup.string()
                .min(2, "Mininum 2 characters")
                .max(20, "Maximum 20 characters")
                .required("Required!"),

            default_address: Yup.string()


        }),
        onSubmit: values => {

            if (localStorage.getItem('LoginID')) {
                let LoginUserID = localStorage.getItem('LoginID')
                console.log(LoginUserID, 'LoginUserId')

                let db = firebaseApp.firestore()
                db.collection("db_User").where("id", "==", Number(LoginUserID))
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            console.log(doc.id, " => ", doc.data());

                            let LoginUser = doc.data()
                            let newAddress = [...LoginUser.address, values]

                            var washingtonRef = db.collection("db_User").doc(doc.id);
                            console.log(doc.id)
                            return washingtonRef.update({
                                address: newAddress
                            })
                                .then(() => {
                                    console.log("Document successfully updated!");
                                    formik.resetForm()
                                    setShow(false)
                                    alert('Address added in successfully.')

                                })
                                .catch((error) => {
                                    console.error("Error updating document: ", error);
                                });
                        });
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    });
            }
        }
    });

    const Decrement = () => {
        if (qty > 1) {
            let number = qty
            setQty(number - 1)
        }
    }
    const Increment = () => {
        let number = qty
        setQty(number + 1)
    }

    return (
        <>
            {LoaderShow && <Loader />}
            <Mini_Slider />
            <MyHeader />
            <section className="Buynow_sectoion">
                <Container>
                    <Row>
                        <>
                            <Col lg={6}>
                                <Row>
                                    <Col xs={3}>
                                        <div>
                                            <ul className="p-0 mini_Buy_Box">

                                                {Pimg.map((item) => {
                                                    return (
                                                        <>
                                                            <li className="text-center mb-4">
                                                                <button className="img_1_btn"><img onClick={() => ViewFront(item)} className="myImg2 img-fluid" src={item} /> </button>
                                                            </li>
                                                            {/* <li className="text-center mb-4">
                                                                <button className="img_1_btn"> <img className="myImg2 img-fluid" src={Pimg} /> </button>
                                                            </li>
                                                            <li className="text-center mb-4">
                                                                <button className="img_1_btn"><img className="myImg2 img-fluid" src={Pimg} /> </button>
                                                            </li> */}
                                                        </>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    </Col>
                                    <Col xs={9}>
                                        {/* <div> <ReactImageMagnify id="view1" src={img} className="img-fluid" /></div> */}
                                        <div> <ReactImageMagnify
                                            {...{
                                                smallImage: {
                                                    alt: 'Small Image',
                                                    isFluidWidth: true,
                                                    src: img,
                                                },
                                                largeImage: {
                                                    src: img,
                                                    width: 1200,
                                                    height: 1800,
                                                },
                                            }}
                                        /></div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={6} className="m-auto">
                                <div className="buynow_info_box">
                                    <div className="buynow_info_title">
                                        <h1>{Pname}</h1>
                                    </div>
                                    <div className="buynow_info_price">
                                        <span className="price-item price-item--regular">
                                            ${Pprice}
                                        </span>
                                    </div>
                                    <div className="buynow_info_countview">
                                        <p className="countview m-0"><i className="bi bi-eye-fill"></i><b><span className="viwer_pro">18</span></b><span className="view_people">People are viewing this right now</span></p>
                                    </div>
                                    <div className="stock_alert">
                                        <b>Availability : </b> {Pstock} item(s) in stock!
                                    </div>
                                    <div className="shippingMsg">
                                        <b>Estimated delivery</b> : <span id="fromDate">Oct 5, 2023</span> - <span id="toDate">Oct 13, 2023</span>.
                                    </div>
                                    <div className="timer">
                                        <p className="timer__title">Hurry up! Sales End In</p>
                                        <div className="timer-display">
                                            <div className="timer-block">
                                                <span className="timer-block__num" id="day">213</span>
                                                <span className="timer-block__unit">Days</span>
                                            </div>
                                            <div className="timer-block">
                                                <span className="timer-block__num" id="Hours">21</span>
                                                <span className="timer-block__unit">Hours</span>
                                            </div>
                                            <div className="timer-block">
                                                <span className="timer-block__num" id="Min">39</span>
                                                <span className="timer-block__unit">Days</span>
                                            </div>
                                            <div className="timer-block">
                                                <span className="timer-block__num" id="day">52</span>
                                                <span className="timer-block__unit">Sec</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="size-color">
                                        <fieldset className="product-form__input mb-3">
                                            <legend className="form__label">Size</legend>
                                            <input type="radio" name="Size" value="S" checked=""></input>
                                            <label for="template--16165438783662__main-1-0" title="S">
                                                S
                                            </label>
                                            <input type="radio" name="Size" value="S" checked=""></input>
                                            <label for="template--16165438783662__main-1-0" title="M">
                                                M
                                            </label>
                                            <input type="radio" name="Size" value="S" checked=""></input>
                                            <label for="template--16165438783662__main-1-0" title="L">
                                                L
                                            </label>
                                            <input type="radio" name="Size" value="S" checked=""></input>
                                            <label for="template--16165438783662__main-1-0" title="XL">
                                                XL
                                            </label>
                                            <input type="radio" name="Size" value="S" checked=""></input>
                                            <label for="template--16165438783662__main-1-0" title="XXL">
                                                XXL
                                            </label>
                                        </fieldset>
                                        <fieldset className="product-form__input">
                                            <legend className="form__label">Color</legend>
                                            <input type="radio" name="Size" value="Black" checked=""></input>
                                            <label className="option-image" for="template--16165438783662__main-1-0" title="Black">
                                                <img src={Pimg[0]} />
                                            </label>
                                        </fieldset>
                                    </div>
                                    <div className="buynow_info_wishlist mt-3">
                                        <div className="wishlist">
                                            <button className="button-wishlis"><i className="bi bi-heart"></i></button>
                                            <span className="wish-title">Add to wishlist</span>
                                        </div>
                                    </div>
                                    <Row className="product-form__input product-form__quantity">
                                        <Col lg={4} className="mb-3">
                                            <div className="price-per-item__container">
                                                <button onClick={Decrement} className="quantity__button">-</button>
                                                <input className="quantity__input" type="tel" name="quantity" value={qty} form="product-form-template--16165438783662__main" max="null"></input>
                                                <button onClick={Increment} className="quantity__button">+</button>
                                            </div>
                                        </Col>
                                        <Col lg={8}>
                                            <div onClick={() => AddInCart()} className="AddtoCart_btn">
                                                <button className="bun_cart_btn"><span>ADD TO CART</span></button>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div onClick={() => BuyNowItems()} className="buyNow_btn">
                                                <button>BUY IT NOW</button>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="buynow_info_wishlist description">
                                        <b>Description:</b>
                                        <span>{Pdescrip}</span>
                                    </div>
                                </div>
                            </Col>
                        </>
                    </Row>
                </Container>
            </section>

            <>
                {/* <Button variant="primary" onClick={handleShow}>
                    Launch demo modal
                </Button> */}

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a new address</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={formik.handleSubmit}>
                            <div>
                                <label>Country/Region</label>
                                <select
                                    name="country"
                                    value={formik.values.country}
                                    onChange={formik.handleChange}
                                    style={{ display: "block", width: "100%" }}
                                >
                                    <option value="" label="Select a country">
                                        Select a country{" "}
                                    </option>
                                    <option value="India" label="India">
                                        {" "}
                                        India                                </option>
                                    <option value="United State" label="United State">
                                        United State
                                    </option>

                                    <option value="Canada" label="Canada">
                                        Canada
                                    </option>
                                </select>
                                {formik.errors.country && formik.touched.country && (
                                    <p>{formik.errors.country}</p>
                                )}
                            </div>
                            <div>
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="full_name"
                                    value={formik.values.full_name}
                                    onChange={formik.handleChange}
                                    style={{ width: "100%" }}
                                />
                                {formik.errors.full_name && formik.touched.full_name && (
                                    <p>{formik.errors.full_name}</p>
                                )}
                            </div>
                            <div>
                                <label>Flat, House no., Building, Company, Apartment</label>
                                <input
                                    type="text"
                                    name="apartment_name"
                                    value={formik.values.apartment_name}
                                    onChange={formik.handleChange}
                                    style={{ width: "100%" }}
                                />
                                {formik.errors.apartment_name && formik.touched.apartment_name && (
                                    <p>{formik.errors.apartment_name}</p>
                                )}
                            </div>
                            <div>
                                <label>Area, Street, Sector, Village</label>
                                <input
                                    type="text"
                                    name="area_name"
                                    value={formik.values.area_name}
                                    onChange={formik.handleChange}
                                    style={{ width: "100%" }}
                                />
                                {formik.errors.area_name && formik.touched.area_name && (
                                    <p>{formik.errors.area_name}</p>
                                )}
                            </div>
                            <div>
                                <label>Pincode</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={formik.values.pincode}
                                    onChange={formik.handleChange}
                                    placeholder="6 digits [0-9] PIN code"
                                    style={{ width: "100%" }}
                                />
                                {formik.errors.pincode && formik.touched.pincode && (
                                    <p>{formik.errors.pincode}</p>
                                )}
                            </div>
                            <div className="d-flex">
                                <div>
                                    <label>Town/City</label>
                                    <input
                                        type="text"
                                        name="city_name"
                                        value={formik.values.city_name}
                                        onChange={formik.handleChange}
                                        style={{ width: "95%" }}
                                    />
                                    {formik.errors.city_name && formik.touched.city_name && (
                                        <p>{formik.errors.city_name}</p>
                                    )}
                                </div>
                                <div>
                                    <label>State</label>
                                    <input
                                        type="text"
                                        name="state_name"
                                        value={formik.values.state_name}
                                        onChange={formik.handleChange}
                                        style={{ width: "100%" }}
                                    />
                                    {formik.errors.state_name && formik.touched.state_name && (
                                        <p>{formik.errors.state_name}</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                {/* <label>State</label> */}
                                <input
                                    type="checkbox"
                                    name="default_address"
                                    value={formik.values.default_address}
                                    onChange={formik.handleChange}
                                />
                                <span>Make this my default address</span>
                                {formik.errors.default_address && formik.touched.default_address && (
                                    <p>{formik.errors.default_address}</p>
                                )}
                            </div>
                            <div className="text-center d-none">
                                <button id="addr-btn" type="submit">Submit</button>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" className="px-3" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" className="px-3" onClick={handleSave}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>

            <Terms />
            <Footer />
        </>
    )

}


export default BuyNowPage;