import Carousel from 'react-bootstrap/Carousel';


function Mini_Slider() {
    return (
        <>
            <Carousel className='mini-slider-section' data-bs-theme="dark">
                <Carousel.Item>
                    <span>FREE SHIPPING ON DOMESTIC ORDERS OVER $150</span>

                </Carousel.Item>
                <Carousel.Item>
                    <span>NEW OFFERS THIS WEEKEND ONLY TO GET 50%</span>

                </Carousel.Item>
                <Carousel.Item>
                    <span>NEW COLLECTION IN WOMEN</span>

                </Carousel.Item>
            </Carousel>
        </>
    )
}

export default Mini_Slider;
