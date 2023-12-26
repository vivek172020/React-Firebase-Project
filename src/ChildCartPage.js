import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";


function ChildCartPage(props) {

    const [qty, setQty] = useState(1)

    const increment = () => {
        let number = qty
        setQty(number + 1)
        props.getqty(number + 1, props.data.id)
    }

    const decrement = () => {
        if (qty > 1) {
            let number = qty
            setQty(number - 1)
            props.getqty(number - 1, props.data.id)
        }
    }

    return (
        <>
            <Container>
                <Row className="align-items-center py-3 border-bottom">
                    <Col lg={6} xs={8}>
                        <div className="drawer__items b-0 justify-content-start">
                            <div className="drawer__img cartPage">
                                <img className="img-fluid" src={props.data?.Pimg[0]} />
                            </div>
                            <div className='drawer__content'>
                                <a href='#' className="cart-item__name">{props.data.Pname}</a>

                                <div className='cart_price cartPage mt-3 mb-1'>
                                    <span>${props.data.Pprice}.00</span>
                                </div>

                                <div className='d-flex'><dt className='cart-size my-1'>Size:</dt><dd className='cart-size ps-1 pb-0 mb-0 my-1'> S, </dd></div>
                                <div className='d-flex'><dt className='cart-size my-1'>Color:</dt> <dd className='cart-size ps-1 pb-3 my-1'> Black</dd></div>

                                <div className='d-flex justify-content-center align-items-center d-lg-none'>
                                    <div className="price-per-item__container cart ms-md-0 ms-sm-0 ms-xs-0 mx-2">
                                        <button className="quantity__button" onClick={decrement}>-</button>
                                        <input className="quantity__input" type="tel" name="quantity" value={qty} ></input>
                                        <button className="quantity__button" onClick={increment}>+</button>
                                    </div>
                                    <div onClick={() => props.RemoveInCart(props.data.id)} className='cart_delete'>
                                        <i className="bi bi-trash3"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={3} className="d-none d-lg-inline-block">
                        <div className='d-flex justify-content-center align-items-center'>
                            <div className="price-per-item__container cart mx-2">
                                <button className="quantity__button" onClick={decrement}>-</button>
                                <input className="quantity__input" type="tel" name="quantity" value={qty} ></input>
                                <button className="quantity__button" onClick={increment}>+</button>
                            </div>
                            <div className='cart_delete' onClick={() => props.RemoveInCart(props.data.id)}>
                                <i className="bi bi-trash3"></i>
                            </div>
                        </div>
                    </Col>
                    <Col lg={3} xs={4} className="text-center">
                        <div className='cart_price'>
                            <span>${props.data.Pprice * qty}.00</span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ChildCartPage;