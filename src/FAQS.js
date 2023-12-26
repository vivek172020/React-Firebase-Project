import { Container, Row, Col } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';


function FAQS() {

    useEffect(() => {
        AOS.init({
            duration: 2000,
        });
    }, []);

    return (
        <>
            <section className="Faqs-section">
                <Container>
                    <Row>
                        <Col>
                            <div className="Faqs_title">
                                <h2 data-aos="zoom-in-down" className="mb-5">FAQs</h2>
                            </div>
                        </Col>
                    </Row>

                    <Row data-aos="fade-up">
                        <Col lg={{ span: 8, offset: 2 }}>
                            <div>
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>What Shipping Methods Are Available?</Accordion.Header>
                                        <Accordion.Body>
                                            <p>Male evening subdue heaven Is, seas great creepeth under second evening from give theyre upon third give void bring fowl image years all. Cant life a. Dominion god which dont upon.</p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>What are shipping times and costs?</Accordion.Header>
                                        <Accordion.Body>
                                            <p>Complimentary ground shipping within 1 to 7 business days</p>
                                            <p>In-store collection available within 1 to 7 business days</p>
                                            <p>Next-day and Express delivery options also available</p>
                                            <p>Purchases are delivered in an orange box tied with a Bolduc ribbon, with the exception of certain items</p>
                                            <p>See the delivery FAQs for details on shipping methods, costs and delivery times</p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>What payment methods can I use?</Accordion.Header>
                                        <Accordion.Body>
                                            <p>Credit Card: Visa, MasterCard, Discover, American Express, JCB, Visa Electron. The total will be charged to your card when the order is shipped.</p>
                                            <p>PayPal: Shop easily online without having to enter your credit card details on the website.Your account will be charged once the order is completed. To register for a PayPal account, visit the website <a href="https://paypal.com" target="_blank" title="https://paypal.com">paypal.com</a>.</p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item className="boder_bottom" eventKey="3">
                                        <Accordion.Header>What is your exchanges, returns and refunds policy?</Accordion.Header>
                                        <Accordion.Body>
                                            <p>Items returned within 14 days of their original shipment date in same as new condition will be eligible for a full refund or store credit. Refunds will be charged back to the original form of payment used for purchase. Customer is responsible for shipping charges when making returns and shipping/handling fees of original purchase is non-refundable.</p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default FAQS;