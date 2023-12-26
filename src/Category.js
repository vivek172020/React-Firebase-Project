import { Container, Row, Col } from "react-bootstrap";
import women from './Images/collection-1.png'
import men from './Images/collection-2.png'
import kids from './Images/collection-3.png'
import 'animate.css/animate.min.css';
import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';


function Category() {

    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);


    return (
        <>
            <section className="mt-5">
                <Container>
                    <Row>
                        <Col>
                            <div className="category_title">
                                <h1 data-aos="zoom-in-down">SHOP BY CATEGORY</h1>
                                <p>You’ll Always Be In Fashion With Our Collection Of Clothing</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row className="mt-4" data-aos="fade-up">
                        <Col lg={4} md={4} data-aos="flip-left">
                            <div className="category-box">
                                <div className="category-img">
                                    <div className="womenImg">
                                        <img className="img-fluid" src={women} />
                                    </div>
                                </div>
                                <div className="category-btn">
                                    <button>WOMEN</button>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4} md={4}>
                            <div className="category-box">
                                <div className="category-img">
                                    <div className="womenImg">
                                        <img className="img-fluid" src={men} />
                                    </div>
                                </div>
                                <div className="category-btn">
                                    <button>MEN</button>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4} md={4} data-aos="flip-right">
                            <div className="category-box">
                                <div className="category-img">
                                    <div className="womenImg">
                                        <img className="img-fluid" src={kids} />
                                    </div>
                                </div>
                                <div className="category-btn">
                                    <button>KID'S</button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Category;