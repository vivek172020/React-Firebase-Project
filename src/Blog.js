import { Container, Row, Col } from "react-bootstrap";
import blog_1 from './Images/blog-1.png'
import blog_2 from './Images/blog-2_bd7deb71-4826-4b19-a122-32f7d0c670cd.png'
import blog_3 from './Images/blog-3.png'
import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';

function Blog() {

    useEffect(() => {
        AOS.init({
            duration: 2000,
        });
    }, []);

    return (
        <>
            <section className="blog-section">
                <Container>
                    <Row>
                        <Col>
                            <div className="blog-title">
                                <h3 data-aos="zoom-in-down">OUR LATEST BLOG</h3>
                                <p>The freshest and most exciting news</p>
                            </div>
                        </Col>
                    </Row>

                    <Row data-aos="fade-up">
                        <Col lg={4} md={4} className="mt-4">
                            <div className="blog-box">
                                <div className="blog-img">
                                    <img className="img-fluid" src={blog_1} />
                                </div>
                                <div className="blog-content">
                                    <h3>Nullam Ultricies Ligula Velit Quis Vehicula</h3>
                                    <p>Nam tempus turpis at metus scelerisque placerat nulla deumantos sollicitudin felis. Pellentesque diam dolor, elementum et lobortis at, mollis ut risus. Sedcuman des faucibus sullamcorper mattis fusce molestie elit a lorem tempus scelerisque blandit est cursus. Quisque volutpat orci ut metus malesuada...</p>
                                    <a href="">Read More</a>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4} md={4} className="mt-4">
                            <div className="blog-box">
                                <div className="blog-img">
                                    <img className="img-fluid" src={blog_2} />
                                </div>
                                <div className="blog-content">
                                    <h3>Nullam Ultricies Ligula Velit Quis Vehicula</h3>
                                    <p>Nam tempus turpis at metus scelerisque placerat nulla deumantos sollicitudin felis. Pellentesque diam dolor, elementum et lobortis at, mollis ut risus. Sedcuman des faucibus sullamcorper mattis fusce molestie elit a lorem tempus scelerisque blandit est cursus. Quisque volutpat orci ut metus malesuada...</p>
                                    <a href="">Read More</a>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4} md={4} className="mt-4">
                            <div className="blog-box">
                                <div className="blog-img">
                                    <img className="img-fluid" src={blog_3} />
                                </div>

                                <div className="blog-content">
                                    <h3>Nullam Ultricies Ligula Velit Quis Vehicula</h3>
                                    <p>Nam tempus turpis at metus scelerisque placerat nulla deumantos sollicitudin felis. Pellentesque diam dolor, elementum et lobortis at, mollis ut risus. Sedcuman des faucibus sullamcorper mattis fusce molestie elit a lorem tempus scelerisque blandit est cursus. Quisque volutpat orci ut metus malesuada...</p>
                                    <a href="">Read More</a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row data-aos="fade-up">
                        <Col>
                            <div className="blog-viewAll">
                                <button>VIEW ALL <i className="bi bi-arrow-right"></i></button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Blog;