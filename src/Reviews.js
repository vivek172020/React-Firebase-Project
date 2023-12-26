// import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Col, Container, Row } from "react-bootstrap";
import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';

function Reviews() {

    useEffect(() => {
        AOS.init({
            duration: 2000,
        });
    }, []);


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        nav: false,
        slidesToScroll: 1,
        autoplay: true

    };
    return (
        <>
            <section className="review-section">
                <Container className="review_bg">
                    <Row>
                        <Col>
                            <div className="review-title">
                                <h2 data-aos="zoom-in-down">CUSTOMER REVIEWS</h2>
                                <p>what says our customers about us!</p>
                            </div>
                        </Col>
                    </Row>
                    <Row data-aos="fade-up">
                        <Col>
                            <div className="review-box">
                                <div>
                                    <Slider {...settings}>
                                        <div className="rebiew_content">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget varius nunc. Integer faucibus nibh odio, ut mattis turpis blandit ullamcorper. In pellentesque urna nec lectus iaculis, eget mollis tortor venenatis. Praesent nec arcu quis nisi dictum tincidunt. Integer gravida libero non nulla posuere, ac ullamcorper turpis varius. Praesent at fringilla lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc quis libero erat. Praesent sapien urna, mollis id tincidunt egestas, tempor eget elit.</p>
                                            <h3>Mack Johnson</h3>
                                            <span>Fashion Designer</span>
                                        </div>
                                        <div className="rebiew_content">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget varius nunc. Integer faucibus nibh odio, ut mattis turpis blandit ullamcorper. In pellentesque urna nec lectus iaculis, eget mollis tortor venenatis. Praesent nec arcu quis nisi dictum tincidunt. Integer gravida libero non nulla posuere, ac ullamcorper turpis varius. Praesent at fringilla lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc quis libero erat. Praesent sapien urna, mollis id tincidunt egestas, tempor eget elit.</p>
                                            <h3>Luies Charls</h3>
                                            <span>Developer</span>
                                        </div>
                                        <div className="rebiew_content">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget varius nunc. Integer faucibus nibh odio, ut mattis turpis blandit ullamcorper. In pellentesque urna nec lectus iaculis, eget mollis tortor venenatis. Praesent nec arcu quis nisi dictum tincidunt. Integer gravida libero non nulla posuere, ac ullamcorper turpis varius. Praesent at fringilla lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc quis libero erat. Praesent sapien urna, mollis id tincidunt egestas, tempor eget elit.</p>
                                            <h3>Jecob Goeckno</h3>
                                            <span>Manager</span>
                                        </div>
                                    </Slider>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}




export default Reviews;