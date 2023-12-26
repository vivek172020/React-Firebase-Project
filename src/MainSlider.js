import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Col, Container, Row } from "react-bootstrap";
import banner1 from './Images/banner-1.png'
import banner2 from './Images/banner-2.png'
import video1 from './Images/video.mp4'
import 'animate.css/animate.min.css';
import { useNavigate } from "react-router-dom";

function MainSlider() {

    const Navigate = useNavigate()

    const GoShopNowPage = (() => {
        Navigate('/FilterProductPage')
    })

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        nav: true,
        slidesToScroll: 1,
        autoplayTimeout: 9000,
        autoplay: true

    };
    return (
        <>
            <section className="review-section11">
                <div className="main_slider_box">
                    <Slider {...settings}>

                        <div className="slide_1">
                            <div>
                                <video className='video1' src={video1} autoPlay muted loop></video>
                            </div>
                            <Container className="slide_content active1">
                                <Row>
                                    <Col lg={{ span: 4, offset: 1 }}>
                                        <div className="slide_text active1 animate__animated animate__pulse animate__infinite	infinite">
                                            <h6>TRENDS IN FASHION</h6>
                                            <p>20% DISCOUNT</p>
                                            <button onClick={GoShopNowPage}>Shop Now <i className="bi bi-arrow-right"></i></button>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                        <div className="slide_1">
                            <div>
                                <img className="img-fluid" src={banner2} />
                            </div>
                            <Container className="slide_content">
                                <Row>
                                    <Col lg={{ span: 4, offset: 1 }}>
                                        <div className="slide_text animate__animated animate__pulse animate__infinite	infinite">
                                            <h6>TRENDS IN FASHION</h6>
                                            <p>20% DISCOUNT IN ALL WOMEN'S FASHION...</p>
                                            <button onClick={GoShopNowPage}>Shop Now <i className="bi bi-arrow-right"></i></button>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>

                        <div className="slide_1">
                            <div>
                                <img className="img-fluid" src={banner1} />
                            </div>
                            <Container className="slide_content">
                                <Row>
                                    <Col lg={{ span: 4, offset: 1 }}>
                                        <div className="slide_text animate__animated animate__pulse animate__infinite	infinite">
                                            <h6>TRENDS IN FASHION</h6>
                                            <p>50% DISCOUNT ON JACKETS AND HETS.</p>
                                            <button onClick={GoShopNowPage}>Shop Now <i className="bi bi-arrow-right"></i></button>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Slider>
                </div>
            </section>
        </>
    )
}

export default MainSlider;




