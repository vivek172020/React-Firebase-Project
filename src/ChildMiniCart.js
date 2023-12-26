import { useState } from "react"

export default function ChildMiniCart(props) {

    const [qty, setQty] = useState(1)

    const increment = () => {
        let number = qty
        setQty(number + 1)
        console.log(number + 1)
        props.getqty(number + 1, props.data.id)

    }
    const decrement = () => {
        if (qty > 1) {
            let number = qty
            setQty(number - 1)
            console.log(number - 1)
            props.getqty(number - 1, props.data.id)
        }
    }
    return (
        <>
            <div className="drawer__items">
                <div className="drawer__img">
                    <img className="img-fluid" src={props.data.Pimg[0]} />
                </div>
                <div className='drawer__content'>
                    <a href='#' className="cart-item__name">{props.data.Pname}</a>
                    <div className='d-flex mt-2'><dt className='cart-size'>Size:</dt><dd className='cart-size ps-1 pb-0 mb-0'> S, </dd></div>
                    <div className='d-flex'><dt className='cart-size'>Color:</dt> <dd className='cart-size ps-1'> Black,</dd></div>
                    <div className='d-flex'><dt className='cart-size'>Price:</dt> <dd className='cart-size ps-1 pb-3'>${props.data.Pprice}.00</dd></div>

                    <div className='d-flex'>
                        <div className="price-per-item__container cart">
                            <button className="quantity__button" onClick={decrement}>-</button>
                            <input className="quantity__input" type="tel" name="quantity" value={qty} ></input>
                            <button className="quantity__button" onClick={increment}>+</button>
                        </div>
                        <div onClick={() => props.RemoveInCart(props.data.id)} className='cart_delete'>
                            <i className="bi bi-trash3"></i>
                        </div>
                        <div className='cart_price'>
                            <span>${props.data.Pprice * qty}.00</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}