import { Container, Row, Col } from "react-bootstrap";
import offer_bg_1 from './Images/offer-bg-1.png'
import offer_bg_2 from './Images/offer-bg-2.png'
import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';

function Offer() {

    useEffect(() => {
        AOS.init({
            duration: 2000,
        });
    }, []);

    return (
        <>
            <section className="offer-section">
                <Container>
                    <Row>
                        <Col>
                            <div className="offer_title">
                                <h2 data-aos="zoom-in-down"> EXCLUSIVE OFFER! </h2>
                                <p>UNBOX YOUR HAPPINESS WITH PANDORA</p>                            </div>
                        </Col>
                    </Row>
                    <Row data-aos="fade-up">
                        <Col lg={6} className="mb-4">
                            <div className="offer_box">
                                <div className="offer_img">
                                    <img className="img-fluid" src={offer_bg_1} />
                                </div>

                                <div className="offer_content">
                                    <h3>MEN’S WEAR</h3>
                                    <p>Big Sale 50% Off</p>
                                    <button>Shop Now</button>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="offer_box">
                                <div className="offer_img">
                                    <img className="img-fluid" src={offer_bg_2} />
                                </div>

                                <div className="offer_content">
                                    <h3>FLASH SALE</h3>
                                    <p>Upto 60% Discount</p>
                                    <button>Shop Now</button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Offer;