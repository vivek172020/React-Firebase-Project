import { Container, Row, Col } from "react-bootstrap";
import videoImg from './Images/4iVYTQe88b8-HD.jpg'
import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';

function Myvideo() {

    useEffect(() => {
        AOS.init({
            duration: 2000,
        });
    }, []);

    return (
        <>
            <section className="Myvideo-section">
                <Container>
                    <Row data-aos="fade-up">
                        <Col>
                            <div className="video_box">
                                <a href="https://youtu.be/4iVYTQe88b8?t=53">
                                    <img className="img-fluid" src={videoImg} />
                                </a>
                                <span className="video_btn"><i className="bi fs-2 bi-play-fill"></i></span>

                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}
export default Myvideo;