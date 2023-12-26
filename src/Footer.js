import { Container, Row, Col } from "react-bootstrap";
import footer_logo from './Images/footer-logo.png'


function Footer() {
    return (
        <>
            <section className="footer-section">
                <Container>
                    <Row>
                        <Col lg={3} md={6} className="mb-5">
                            <div className="footer_1_box">
                                <div className="footer_1_img">
                                    <img className="img-fluid" src={footer_logo} />
                                </div>

                                <div className="footer_1_icon">
                                    <a className="facebook" href=""><i className="bi facebook_icon bi-facebook"></i></a>
                                    <a className="facebook" href=""><i className="bi facebook_icon bi-instagram"></i></a>
                                    <a className="facebook" href=""><i className="bi facebook_icon bi-twitter"></i></a>
                                    <a className="facebook" href=""><i className="bi facebook_icon bi-pinterest"></i></a>
                                </div>
                            </div>
                        </Col>
                        <Col lg={3} md={6} className="mb-5">
                            <div className="footer_2_box">
                                <div className="footer_2_title">
                                    <h2>CATEGORIES</h2>
                                </div>
                                <ul className="footer_2_category p-0">
                                    <li><a href="">Men</a> </li>
                                    <li><a href="">Women</a> </li>
                                    <li><a href="">Kids</a> </li>

                                </ul>
                            </div>
                        </Col>
                        <Col lg={3} md={6} className="mb-5">
                            <div className="footer_2_box">
                                <div className="footer_2_title">
                                    <h2>QUICK LINKS</h2>
                                </div>
                                <ul className="footer_2_category p-0">
                                    <li><a href="">Home</a> </li>
                                    <li><a href="">About us</a> </li>
                                    <li><a href="">Contact Us</a> </li>
                                    <li><a href="">Privacy Policy</a> </li>
                                    <li><a href="">FAQ’s</a> </li>
                                    <li><a href="">Shipping & Return Policy</a> </li>
                                </ul>
                            </div>
                        </Col>
                        <Col lg={3} md={6} className="mb-5">
                            <div className="footer_2_box">
                                <div className="footer_2_title">
                                    <h2>GET THE NEWSLETER</h2>
                                </div>
                                <form className="footer_form">
                                    <input type="text" style={{ color: 'white' }} placeholder="Email Address" />
                                    <button>SUBSCRIBE</button>
                                </form>
                            </div>
                        </Col>
                    </Row>
                    <Row className="footer_border">
                        <Col lg={6}>
                            <div className="footer_copyright">
                                <span><p>© 2023, <a href="https://pandora-fashi.myshopify.com/" title="https://pandora-fashi.myshopify.com/">Pandora Fashi </a></p></span>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <ul className="footer_terms">
                                <li><i className="visa_icon"></i></li>
                                <li><i className="visa_icon"></i></li>
                                <li><i className="visa_icon"></i></li>
                                <li><i className="visa_icon"></i></li>
                                <li><i className="visa_icon"></i></li>
                                <li><i className="visa_icon"></i></li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </section >
        </>
    )
}

export default Footer;