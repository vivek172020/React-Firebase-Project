import { Col, Container, Row } from "react-bootstrap";
import service_1 from './Images/service-icon-1.png'
import service_2 from './Images/service-icon-2.png'
import service_3 from './Images/service-icon-3.png'
import service_4 from './Images/service-icon-4.png'
import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';

function Terms() {

    useEffect(() => {
        AOS.init({
            duration: 2000,
        });
    }, []);

    return (
        <>
            <section className="terms-section">
                <Container>
                    <Row data-aos="fade-up">
                        <Col lg={3} md={6}>
                            <div className="terms-box mb-4">
                                <div className="terms-img">
                                    <img className="img-fluid" src={service_1} />                                </div>
                                <div className="terms-content">
                                    <h3>100 DAY RETURNS</h3>
                                    <p>No-Nonsense Return Policy<br />If You Aren't Happy.</p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={3} md={6}>
                            <div className="terms-box mb-4">
                                <div className="terms-img">
                                    <img className="img-fluid" src={service_2} />                                </div>
                                <div className="terms-content">
                                    <h3>FREE SHIPPING</h3>
                                    <p>Your Precious Package Is<br />Expedited And Insured.</p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={3} md={6}>
                            <div className="terms-box mb-4">
                                <div className="terms-img">
                                    <img className="img-fluid" src={service_3} />                                </div>
                                <div className="terms-content">
                                    <h3>SECURE PAYMENT</h3>
                                    <p>Your Payment Information Is<br />Encryption.</p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={3} md={6}>
                            <div className="terms-box mb-4">
                                <div className="terms-img">
                                    <img className="img-fluid" src={service_4} />                                </div>
                                <div className="terms-content">
                                    <h3>CUSTOMER SUPPORT</h3>
                                    <p>Our Support Team Are<br />Ready 24/7 To Answer Any Have.</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Terms;