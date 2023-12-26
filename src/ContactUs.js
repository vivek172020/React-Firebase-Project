import { Col, Container, Row } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';



function ContactUs() {

    useEffect(() => {
        AOS.init({
            duration: 2000,
        });
    }, []);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [cat, setCat] = useState('')
    const [number, setNumber] = useState('')
    const [data, setData] = useState([])

    const handleNameChange = (e) => {
        setName(e.target.value)

    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)

    }

    const handleSubmit = () => {
        let obj = {
            name: name,
            email: email,
            category: cat,
            tel: number,
            id: Date.now()
        }

        setData([...data, obj])
        console.log([...data, obj])
    }

    return (
        <>
            <section className="contactUs-section">
                <Container>
                    <Row>
                        <Col>
                            <div className="blog-title">
                                <h3 data-aos="zoom-in-down">CONTACT US</h3>
                                <p>The freshest and most exciting news</p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={{ span: 6, offset: 3 }}>
                            <div className="contact_form">
                                <input type="text" value={name} onChange={handleNameChange} placeholder="Your Name" id="fname" />
                                <input type="email" value={email} onChange={handleEmailChange} placeholder="Your Email" id="email" />
                                <select value={cat} onChange={(e) => setCat(e.target.value)}>
                                    <option>Choose Your Category</option>
                                    <option>Women</option>
                                    <option>Men</option>
                                    <option>Kid's</option>
                                </select>
                                <input value={number} onChange={(e) => setNumber(e.target.value)} type="number" placeholder="Enter Contact Number" id="number" />
                                <textarea placeholder="Message" rows={5}></textarea>
                                <button onClick={handleSubmit}>Send Message</button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default ContactUs;