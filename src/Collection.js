import { Col, Container, Row } from "react-bootstrap";
import React, { useContext, useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebaseApp from "./FirebaseApp";
import Loader from "./Loader";
import { langContext } from "./ContextProvider";


function Collection() {
    const { CartLength, setCartLength } = useContext(langContext)
    const [data, setData] = useState([])
    const Navigate = useNavigate()

    const GoShopNowPage = (() => {
        Navigate('/FilterProductPage')
    })

    useEffect(() => {
        AOS.init({
            duration: 2000,
        });
        GetProductData()
    }, []);

    const GetProductData = () => {
        let db = firebaseApp.firestore()
        let myproductdata = []
        db.collection("ProductData")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    myproductdata.push(doc.data())
                    console.log(myproductdata)
                    setData(myproductdata)
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    const handleBuyID = ((id) => {
        // localStorage.setItem('BuyProductID', id)
        Navigate('/BuyNowPage/' + id)
    })

    const AddInCart = ((id) => {
        if (localStorage.getItem('LoginID')) {
            console.log(id, 'productID')
            let LoginUserID = localStorage.getItem('LoginID')
            console.log(LoginUserID, 'LoginUserId')

            let db = firebaseApp.firestore()
            db.collection("db_User").where("id", "==", Number(LoginUserID))
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        console.log(doc.id, " => ", doc.data());

                        let LoginUser = doc.data()
                        let alreadyInCart = false

                        for (let i = 0; i < LoginUser.cart.length; i++) {
                            console.log(LoginUser.cart[i].productID)
                            if (LoginUser.cart[i].productID == (Number(id))) {
                                alreadyInCart = true
                            }
                        }
                        if (alreadyInCart) {
                            alert('Product is already in the cart.')

                        } else {
                            LoginUser.cart.push({
                                productID: id,
                                id: Date.now(),
                                qty: 1
                            })
                            var washingtonRef = db.collection("db_User").doc(doc.id);

                            return washingtonRef.update({
                                cart: LoginUser.cart
                            })
                                .then(() => {
                                    console.log("Document successfully updated!");
                                    alert('Product added to cart successfully.')
                                    setCartLength(LoginUser.cart.length)
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

    return (
        <>

            <section className="collection-section">
                <Container>
                    <Row>
                        <Col>
                            <div data-aos="fade-up" className="collection-title">
                                <h3 data-aos="zoom-in-down">TRENDY COLLECTION</h3>
                                <p>Fashion As Unique As You Are.</p>
                            </div>
                        </Col>
                    </Row>
                    <Row data-aos="fade-up">
                        <Col>
                            <ul className="collection-title-btn">
                                <li>
                                    <button className="active">BEST SELLER</button>
                                </li>
                                <li>
                                    <button>NEW ARRIVALS</button>
                                </li>
                                <li>
                                    <button>TOP TRANDING</button>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                    <Row>

                        {data.map((item, i) => {
                            return (
                                <Col key={i} data-aos="fade-up" lg={3} md={6}>
                                    <div onClick={() => handleBuyID(item.id)} className="collection-box">
                                        <div className="product_card">
                                            <img className="img-fluid" src={item.Pimg[0]} />
                                            <img className="img-fluid product_card_2" src={item.Pimg[1]} />
                                        </div>
                                        <div className="hover_button">
                                            <div className="next_btn">
                                                <button className="wishilist_btn">
                                                    <i className="bi bi-suit-heart"></i>
                                                </button>
                                                <button className="wishilist_btn search">
                                                    <i className="bi bi-search-heart"></i>
                                                </button>
                                                <button onClick={() => AddInCart(item.id)} className="wishilist_btn cart">
                                                    <i className="bi bi-cart3"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="prdoduct_content">
                                            <h3><a href="">{item.Pname}</a></h3>

                                            <div className="price">
                                                <span className="price-item">${item.Pprice}</span>
                                            </div>

                                            <div className="product_color">
                                                <span className="color_item">
                                                    <span className="color_black"></span>

                                                </span>
                                            </div>
                                        </div>

                                    </div>
                                </Col>
                            )
                        })}

                        {/* <Col data-aos="fade-up" lg={3} md={6}>
                            <div className="collection-box">
                                <div className="product_card">
                                    <img className="img-fluid" src={product_2} />
                                    <img className="img-fluid product_card_2" src={product_2_2} />
                                </div>
                                <div className="hover_button">
                                    <div className="next_btn">
                                        <button className="wishilist_btn">
                                            <i className="bi bi-suit-heart"></i>
                                        </button>
                                        <button className="wishilist_btn search">
                                            <i className="bi bi-search-heart"></i>
                                        </button>
                                        <button className="wishilist_btn cart">
                                            <i className="bi bi-cart3"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="prdoduct_content">
                                    <h3><a href="">Studio Studio Hoodie For Women</a></h3>
                                    <div className="price">
                                        <span className="price-item">$540.00</span>
                                    </div>
                                    <div className="product_color">
                                        <span className="color_item">
                                            <span className="color_black"></span>
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </Col> */}
                        {/* <Col data-aos="fade-up" lg={3} md={6}>
                            <div className="collection-box">
                                <div className="product_card">
                                    <img className="img-fluid" src={product_3} />
                                    <img className="img-fluid product_card_2" src={product_3_3} />
                                </div>
                                <div className="hover_button">
                                    <div className="next_btn">
                                        <button className="wishilist_btn">
                                            <i className="bi bi-suit-heart"></i>
                                        </button>
                                        <button className="wishilist_btn search">
                                            <i className="bi bi-search-heart"></i>
                                        </button>
                                        <button className="wishilist_btn cart">
                                            <i className="bi bi-cart3"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="prdoduct_content">
                                    <h3><a href="">Maison Black Hoodie</a></h3>
                                    <div className="price">
                                        <span className="price-item">
                                            $820.00
                                        </span>
                                    </div>
                                    <div className="product_color">
                                        <span className="color_item">
                                            <span className="color_black"></span>
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </Col> */}
                        {/* <Col data-aos="fade-up" lg={3} md={6}>
                            <div className="collection-box">
                                <div className="product_card">
                                    <img className="img-fluid" src={product_4} />
                                    <img className="img-fluid product_card_2" src={product_4_4} />
                                </div>
                                <div className="hover_button">
                                    <div className="next_btn">
                                        <button className="wishilist_btn">
                                            <i className="bi bi-suit-heart"></i>
                                        </button>
                                        <button className="wishilist_btn search">
                                            <i className="bi bi-search-heart"></i>
                                        </button>
                                        <button className="wishilist_btn cart">
                                            <i className="bi bi-cart3"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="prdoduct_content">
                                    <h3><a href="">Sojo Women Hoodie - Black</a></h3>
                                    <div className="price">
                                        <span className="price-item">$690.00</span>
                                    </div>
                                    <div className="product_color">
                                        <span className="color_item">
                                            <span className="color_black"></span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Col> */}
                    </Row>
                    <Row>
                        <Col data-aos="fade-up">
                            <div onClick={GoShopNowPage} className="shopNow_btn">
                                <button>Shop Now <i className="bi bi-arrow-right"></i></button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section >
        </>
    )
}

export default Collection;