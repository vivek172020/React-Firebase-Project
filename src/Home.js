import Blog from './Blog';
import Category from './Category';
import Collection from './Collection';
import ContactUs from './ContactUs';
import FAQS from './FAQS';
import Footer from './Footer';
import Looking from './Looking';
import MainSlider from './MainSlider';
import Mini_Slider from './Mini_Slider';
import MyHeader from './MyHeader';
import Myvideo from './Myvideo';
import Offer from './Offer';
import Reviews from './Reviews';
import Terms from './Terms';



function Home() {
    return (
        <>
            <Mini_Slider />
            <MyHeader />
            <MainSlider />
            <Category />
            <Looking />
            <Collection />
            <Offer />
            <Myvideo />
            <Blog />
            <Reviews />
            <FAQS />
            <Terms />
            <ContactUs />
            <Footer />
        </>
    )
}

export default Home;