import { Col, Container, Row } from "react-bootstrap";
import fram_95 from './Images/Frame_95.png'
import fram_96 from './Images/Frame_96.png'
import fram_97 from './Images/Frame_97.png'
import fram_98 from './Images/Frame_98.png'
import fram_99 from './Images/Frame_99.png'
import fram_100 from './Images/Frame_100.png'
import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';



function Looking() {

    useEffect(() => {
        AOS.init({
            duration: 2000,
        });
    }, []);

    return (
        <>
            <section className="looking-section">
                <Container className="looking-pd-box">
                    <Row >
                        <Col>
                            <div data-aos="fade-up" className="looking-title">
                                <h1 data-aos="zoom-in-down">I’M LOOKING FOR..</h1>
                            </div>
                        </Col>
                    </Row>
                    <Row data-aos="fade-up">
                        <Col lg={2} md={6}>
                            <div className="looking-box">
                                <div className="looking-img">
                                    <img className="img-fluid" src={fram_95} />
                                </div>
                                <div className="looking-content">
                                    <h3>SHIRT</h3>
                                </div>
                            </div>
                        </Col>
                        <Col lg={2} md={6}>
                            <div className="looking-box">
                                <div className="looking-img">
                                    <img className="img-fluid" src={fram_96} />
                                </div>
                                <div className="looking-content">
                                    <h3>PANTS</h3>
                                </div>
                            </div>
                        </Col>
                        <Col lg={2} md={6}>
                            <div className="looking-box">
                                <div className="looking-img">
                                    <img className="img-fluid" src={fram_97} />
                                </div>
                                <div className="looking-content">
                                    <h3>COATS</h3>
                                </div>
                            </div>
                        </Col>
                        <Col lg={2} md={6}>
                            <div className="looking-box">
                                <div className="looking-img">
                                    <img className="img-fluid" src={fram_98} />
                                </div>
                                <div className="looking-content">
                                    <h3>SHOES</h3>
                                </div>
                            </div>
                        </Col>
                        <Col lg={2} md={6}>
                            <div className="looking-box">
                                <div className="looking-img">
                                    <img className="img-fluid" src={fram_99} />
                                </div>
                                <div className="looking-content">
                                    <h3>BAGS</h3>
                                </div>
                            </div>
                        </Col>
                        <Col lg={2} md={6}>
                            <div className="looking-box">
                                <div className="looking-img">
                                    <img className="img-fluid" src={fram_100} />
                                </div>
                                <div className="looking-content">
                                    <h3>ACCESSORIES</h3>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Looking;