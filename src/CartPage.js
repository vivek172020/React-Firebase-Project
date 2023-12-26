import { Col, Container, Row } from "react-bootstrap";
import Mini_Slider from "./Mini_Slider";
import cartImg_1 from './Images/Sojo_Hoodie_Black3.jpg'
import { useEffect } from "react";
import { useState } from "react";
import ChildCartPage from "./ChildCartPage";
import MyHeader from "./MyHeader";
import { langContext } from "./ContextProvider";
import { useContext } from "react";
import firebaseApp from "./FirebaseApp";

function CartPage() {
    const { CartLength, setCartLength } = useContext(langContext)
    const [CartData, setCartData] = useState([])
    const [qty, setQty] = useState(1)
    const [TotalPrice, setTotalPrice] = useState(0)
    const [CurrentUser, setCurrentUser] = useState()
    const [ProductData, setProductData] = useState()

    useEffect(() => {
        CartInGetData()

    }, [])

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
        getPrice(CartInProduct)
    }

    const handleremove = ((id) => {

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


    const getPrice = (data) => {
        let price = 0
        data.forEach((item) => {
            // console.log(item.Pprice)
            let qty = 1
            console.log(item.qty)
            if (item.qty) {
                qty = item.qty
            }
            console.log(qty)
            price = price + (Number(item.Pprice) * qty)
            console.log(Number(item.Pprice))
        })
        console.log(price)
        setTotalPrice(price)
        // console.log(item.Pprice)
    }

    const getqty = (s, id) => {
        setQty(s, id)
        console.log(s, id)
        console.log(TotalPrice)
        for (let i = 0; i < CurrentUser.cart.length; i++) {
            if (CurrentUser.cart[i].productID === id) {
                console.log(CurrentUser.cart[i].productID)
                CurrentUser.cart[i].qty = s
                console.log(CurrentUser.cart[i].qty = s)
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

        getPrice(cartArray)

    }



    return (
        <>
            <Mini_Slider />
            <MyHeader />

            <section>
                {CartData && CartData.length ? <Container>
                    <Row>
                        <Col className="text-center my-5">
                            <div>
                                <h1>Your cart</h1>
                            </div>
                        </Col>
                    </Row>
                    <Row className="text-start py-3 border-bottom border-top">
                        <Col lg={6} xs={8}><div><h5>Product</h5></div></Col>
                        <Col lg={3} className="d-none d-lg-inline-block text-center"><div><h5>Quantity</h5></div></Col>
                        <Col lg={3} xs={4} className="text-center"><div><h5>Total</h5></div></Col>
                    </Row>

                    {CartData.map((item, i) => {
                        return (
                            <>
                                <ChildCartPage data={item} getqty={getqty} RemoveInCart={handleremove} />
                                {/* <Row key={i} className="align-items-center py-3 border-bottom">
                                    <Col lg={6} xs={8}>
                                        <div className="drawer__items b-0 justify-content-start">
                                            <div className="drawer__img cartPage">
                                                <img className="img-fluid" src={item.Pimg[0]} />
                                            </div>
                                            <div className='drawer__content'>
                                                <a href='#' className="cart-item__name">{item.Pname}</a>

                                                <div className='cart_price cartPage mt-3 mb-1'>
                                                    <span>${item.Pprice}.00</span>
                                                </div>

                                                <div className='d-flex'><dt className='cart-size my-1'>Size:</dt><dd className='cart-size ps-1 pb-0 mb-0 my-1'> S, </dd></div>
                                                <div className='d-flex'><dt className='cart-size my-1'>Color:</dt> <dd className='cart-size ps-1 pb-3 my-1'> Black</dd></div>

                                                <div className='d-flex justify-content-center align-items-center d-lg-none'>
                                                    <div className="price-per-item__container cart ms-md-0 ms-sm-0 ms-xs-0 mx-2">
                                                        <button className="quantity__button">-</button>
                                                        <input className="quantity__input" type="tel" name="quantity" value={1} ></input>
                                                        <button className="quantity__button">+</button>
                                                    </div>
                                                    <div className='cart_delete'>
                                                        <i className="bi bi-trash3"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={3} className="d-none d-lg-inline-block">
                                        <div className='d-flex justify-content-center align-items-center'>
                                            <div className="price-per-item__container cart mx-2">
                                                <button className="quantity__button">-</button>
                                                <input className="quantity__input" type="tel" name="quantity" value={1} ></input>
                                                <button className="quantity__button">+</button>
                                            </div>
                                            <div className='cart_delete'>
                                                <i className="bi bi-trash3"></i>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={3} xs={4} className="text-center">
                                        <div className='cart_price'>
                                            <span>${item.Pprice}.00</span>
                                        </div>
                                    </Col>
                                </Row> */}
                            </>
                        )
                    })}

                </Container> :
                    <Container>
                        <Row>
                            <Col className="text-center my-5">
                                <div>
                                    <h1>Your cart is empty</h1>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                }

                {CartData && CartData.length ? <Container>
                    <Row>
                        <Col lg={4}>
                            <div>
                                <a href="">Continue Shopping</a>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div>
                                <p>Order Special Instruction</p>
                                <textarea cols={40} rows={5}></textarea>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div>
                                <h3>Order Summary</h3>
                                <table className="w-100">
                                    <tbody>
                                        <tr>
                                            <td className="text-left">Items:</td>
                                            <td class="text-right a-align-bottom aok-nowrap">${TotalPrice}.00</td>
                                        </tr>
                                        {/* <tr>
                                            <td class="text-left">Delivery:</td>
                                            <td class="text-right a-align-bottom aok-nowrap">₹420.00</td>
                                        </tr>
                                        <tr>
                                            <td class="text-left">Total:</td>
                                            <td class="text-right a-align-bottom aok-nowrap">₹5,456.00</td>
                                        </tr>
                                        <tr>
                                            <td class="text-left">Promotion Applied:</td>
                                            <td class="text-right a-align-bottom aok-nowrap">-₹420.00</td>
                                        </tr>
                                        <tr className="w-100">
                                            <td ><hr /></td>
                                        </tr>

                                        <tr>
                                            <td class="a-color-price a-size-medium text-left a-text-bold">Order Total:</td>
                                            <td class="a-color-price a-size-medium text-right a-align-bottom aok-nowrap grand-total-price a-text-bold">₹5,036.00</td>
                                        </tr> */}
                                        <tr className="text-center">
                                            <td class="a-color-price a-size-medium text-center a-text-bold"><button className="w-100 my-5 btn btn-dark">CHECK OUT</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Col>
                    </Row>
                </Container> :
                    <Container>
                        <Row>
                            <Col className="text-center">
                                <div>
                                    <button className="px-4 py-2 border-0 text-light bg-dark fw-medium">Continue Shopping</button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                }

            </section>
        </>
    )
}
export default CartPage;