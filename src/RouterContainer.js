import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Registration from "./Registration";
import AddminPage from "./AddminPage";
import UserData from "./UserData";
import AddProduct from "./AddProduct";
import ProductData from "./ProductData";
import BuyNowPage from "./BuyNowPage";
import YourAccount from "./YourAccount";
import YourAddress from "./YourAddress";
import ResetPassward from "./ResetPassward";
import CartPage from "./CartPage";
import ChildCartPage from "./ChildCartPage";
// import AddProduct from "./AddProduct";
// import ProductData from "./ProductData";
// import BuyNowPage from "./BuyNowPage.";
// import CartPage from "./CartPage";
// import FilterProductPage from "./FilterProductPage";
// import YourAccount from "./YourAccount";
// import YourAddress from "./YourAddress";
// import YourOder from "./YourOder";
// import CheckOut from "./CheckOut";
// import ChildCartPage from "./ChildCartPage";
// import AdminOderData from "./AdminOderData";
// import ChildCheckOut from "./ChildCheckOut";
// import Dashboard from "./Dashboard";
// import GlobleState from "./GlobleState";


function RouterContainer() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Registration" element={<Registration />} />
                    <Route path="/AddminPage" element={<AddminPage />} />
                    <Route path="/UserData" element={<UserData />} />
                    <Route path="/AddProduct" element={<AddProduct />} />
                    <Route path="/AddProduct/:id" element={<AddProduct />} />
                    <Route path="/ProductData" element={<ProductData />} />
                    <Route path="/BuyNowPage/:id" element={<BuyNowPage />} />
                    <Route path="/YourAccount" element={<YourAccount />} />
                    <Route path="/YourAddress" element={<YourAddress />} />
                    <Route path="/ResetPassward" element={<ResetPassward />} />
                    <Route path="/CartPage" element={<CartPage />} />
                    <Route path="/ChildCartPage" element={<ChildCartPage />} />

                    {/* 
                    
                    
                    
                    <Route path="/FilterProductPage" element={<FilterProductPage />} />
                    
                    
                    <Route path="/YourOder" element={<YourOder />} />
                    <Route path="/CheckOut" element={<CheckOut />} />
                   
                    <Route path="/AdminOderData" element={<AdminOderData />} />
                    <Route path="/ChildCheckOut" element={<ChildCheckOut />} />
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route path="/GlobleState" element={<GlobleState />} /> */}
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default RouterContainer;