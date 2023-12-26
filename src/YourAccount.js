import { Col, Container, Row } from "react-bootstrap";
import Mini_Slider from "./Mini_Slider";
import oderImg from './Images/Oder account.png'
import profileImg from './Images/Profile-picture-default-png.png'
import WishlistImg from './Images/wishlist.png'
import addressImg from './Images/address-map-pin._CB485934183_.png'
import securityImg from './Images/sign-in-lock._CB485931504_.png'
import paymentImg from './Images/Payments._CB485926359_.png'
import walletImg from './Images/amazon_pay._CB485946857_.png'
import contactImg from './Images/contact_us._CB623781998_.png'
import { Navigate, useNavigate } from "react-router-dom";
import MyHeader from "./MyHeader";


function YourAccount() {

    const Navigate = useNavigate()

    const YourAddress = (() => {
        Navigate('/YourAddress')
    })

    const YourOders = (() => {
        Navigate('/YourOder')

    })

    return (
        <>
            <Mini_Slider />
            <MyHeader />

            <section className="Your_Account-section">
                <Container>
                    <Row>
                        <Col>
                            <div className="Your_Account-header">
                                <h1>Your Account</h1>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col lg={4} className="mb-3">
                            <div className="Your_Account-oder">
                                <div className="Your_Account-oder_inner">
                                    <div><img className="oder-img pe-2 me-2" src={profileImg} /></div>
                                    <div>
                                        <h3 className="text-oder">Your Profile</h3>
                                        <span>Name, Email, or Number things again</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4} className="mb-3">
                            <div onClick={YourOders} className="Your_Account-oder">
                                <div className="Your_Account-oder_inner">
                                    <div><img className="oder-img pe-2 me-2" src={oderImg} /></div>
                                    <div>
                                        <h3 className="text-oder">Your Orders</h3>
                                        <span>Track, return, or buy things again</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4} className="mb-3">
                            <div className="Your_Account-oder">
                                <div className="Your_Account-oder_inner justify-content1">
                                    <div><img className="oder-img pe-2 me-2" src={WishlistImg} /></div>
                                    <div>
                                        <h3 className="text-oder">Your Wishlist</h3>
                                        <span>Track, return, or buy things again</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col lg={4} className="mb-3">
                            <div onClick={YourAddress} className="Your_Account-oder">
                                <div className="Your_Account-oder_inner">
                                    <div><img className="oder-img" src={addressImg} /></div>
                                    <div>
                                        <h3 className="text-oder">Your Address</h3>
                                        <span>Edit addresses for orders and gifts</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4} className="mb-3">
                            <div className="Your_Account-oder">
                                <div className="Your_Account-oder_inner">
                                    <div><img className="oder-img" src={securityImg} /></div>
                                    <div>
                                        <h3 className="text-oder">Login & Security</h3>
                                        <span>Edit login, name, and mobile number</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4} className="mb-3">
                            <div className="Your_Account-oder">
                                <div className="Your_Account-oder_inner">
                                    <div><img className="oder-img pe-2 me-2" src={walletImg} /></div>
                                    <div>
                                        <h3 className="text-oder">Your Wallet Balance</h3>
                                        <span>Add money to your balance</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col lg={4} className="mb-3">
                            <div className="Your_Account-oder">
                                <div className="Your_Account-oder_inner">
                                    <div><img className="oder-img pe-2 me-2" src={paymentImg} /></div>
                                    <div>
                                        <h3 className="text-oder">Payment Options</h3>
                                        <span>Edit or add payment methods</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4} className="mb-3">
                            <div className="Your_Account-oder">
                                <div className="Your_Account-oder_inner">
                                    <div><img className="oder-img pe-2 me-2" src={contactImg} /></div>
                                    <div>
                                        <h3 className="text-oder">Contact Us</h3>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default YourAccount;