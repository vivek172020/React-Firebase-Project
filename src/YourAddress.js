import { Col, Container, Modal, Row } from "react-bootstrap";
import Mini_Slider from "./Mini_Slider";
import { useState } from "react";
import { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import form from 'react-bootstrap/Form';
import modal from 'react-bootstrap/Modal';
import { useFormik } from "formik";
import * as Yup from "yup";
import MyHeader from "./MyHeader";
import firebaseApp from "./FirebaseApp";

function YourAddress() {

    const [data, setdata] = useState({})
    const [addressData, setaddressData] = useState([])

    const [show, setShow] = useState(false);
    const [CurrentDocID, setCurrentDocID] = useState('')

    useEffect(() => {
        GetCurrentUserData()

    }, [])

    const GetCurrentUserData = () => {

        if (localStorage.getItem('LoginID')) {

            let LoginUser = localStorage.getItem('LoginID')
            let db = firebaseApp.firestore()
            db.collection("db_User").where("id", "==", Number(LoginUser))
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        console.log(doc.id, " => ", doc.data());

                        let UserData = doc.data()
                        setdata(UserData)
                        setCurrentDocID(doc.id)
                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        }
    }

    const AddressRemove = ((index) => {
        console.log(index)

        const updatedUserData = { ...data };
        updatedUserData.address.splice(index, 1)

        let db = firebaseApp.firestore()
        var washingtonRef = db.collection("db_User").doc(CurrentDocID);

        return washingtonRef.update({
            address: updatedUserData.address
        })
            .then(() => {
                console.log("Document successfully updated!");
                GetCurrentUserData()
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    })

    // -------------------------

    const handleClose = () => setShow(false);

    const handleSave = (() => {

        document.getElementById('addr-btn').click()
    })

    const formik = useFormik({
        initialValues: {
            country: "",
            full_name: "",
            apartment_name: '',
            area_name: '',
            pincode: '',
            city_name: '',
            state_name: '',
            default_address: ''
        },
        validationSchema: Yup.object({
            country: Yup.string()
                .required("Required!"),

            full_name: Yup.string()
                .min(2, "Mininum 2 characters")
                .max(15, "Maximum 15 characters")
                .required("Required!"),

            apartment_name: Yup.string()
                .min(2, "Mininum 2 characters")
                .max(30, "Maximum 30 characters")
                .required("Required!"),

            area_name: Yup.string()
                .min(2, "Mininum 2 characters")
                .max(30, "Maximum 30 characters")
                .required("Required!"),

            pincode: Yup.string()
                .min(6, "Mininum 6 characters")
                .max(6, "Maximum 6 characters")
                .required("Required!"),

            city_name: Yup.string()
                .min(2, "Mininum 2 characters")
                .max(20, "Maximum 20 characters")
                .required("Required!"),
            state_name: Yup.string()
                .min(2, "Mininum 2 characters")
                .max(20, "Maximum 20 characters")
                .required("Required!"),

            default_address: Yup.string()
        }),
        onSubmit: values => {

            if (localStorage.getItem('LoginID')) {
                let LoginUserID = localStorage.getItem('LoginID')
                console.log(LoginUserID, 'LoginUserId')

                let db = firebaseApp.firestore()
                db.collection("db_User").where("id", "==", Number(LoginUserID))
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            console.log(doc.id, " => ", doc.data());

                            let LoginUser = doc.data()
                            let newAddress = [...LoginUser.address, values]


                            var washingtonRef = db.collection("db_User").doc(doc.id);
                            console.log(doc.id)
                            return washingtonRef.update({
                                address: newAddress
                            })
                                .then(() => {
                                    console.log("Document successfully updated!");
                                    setShow(false)
                                    formik.resetForm()
                                    alert('Address added in successfully.')
                                    GetCurrentUserData()

                                })
                                .catch((error) => {
                                    console.error("Error updating document: ", error);
                                });
                        });
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    });
            }
        }
    });

    const AddAddress = (() => {
        setShow(true);
    })

    return (
        <>
            <Mini_Slider />
            <MyHeader />

            <section className="YourAddress-section">
                <Container>
                    <Row>
                        <Col>
                            <div className="py-4">
                                <h2>Your Addresses</h2>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4} md={4}>
                            <div onClick={AddAddress} className="a-box first-desktop-address-tile">
                                <div className="a-box-inner a-padding-extra-large">
                                    <div id="ya-myab-plus-address-icon" className="a-section a-spacing-none address-plus-icon aok-inline-block"></div>
                                    <h2 className="a-color-tertiary">Add address</h2>
                                </div>
                            </div>
                        </Col>

                        {data.address && data.address.map((item, i) => {
                            return (
                                <>
                                    <Col key={i} lg={4} md={4}>
                                        <div className="a-box a-spacing-none normal-desktop-address-tile">
                                            <div className="a-box-inner a-padding-none">
                                                <div className="a-section a-spacing-none default-section">
                                                    <span className="a-size-small a-color-secondary default-line-item">Default: &nbsp;</span>
                                                </div>
                                                <div className="a-section address-section-with-default">
                                                    <div className="a-row a-spacing-small">
                                                        <ul className="p-0">
                                                            <li><span id="address-ui-widgets-FullName" className="id-addr-ux-search-text text-bold">{item.full_name}</span></li>
                                                            <li><span className="id-addr-ux-search-text">{item.apartment_name}</span></li>
                                                            <li><span className="id-addr-ux-search-text">{item.area_name}</span></li>
                                                            <li><span className="id-addr-ux-search-text">{item.city_name}, {item.state_name}, {item.pincode}</span></li>
                                                            <li><span className="id-addr-ux-search-text">{item.country}</span></li>
                                                            <li className="mt-4 addr-edit-color"><span>Edit</span> <b className="color-throuth">|</b> <span onClick={() => AddressRemove(i)}>Remove</span></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </>
                            )
                        })}
                    </Row>
                </Container>

            </section>

            <>
                {/* <Button variant="primary" onClick={handleShow}>
                    Launch demo modal
                </Button> */}

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a new address</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={formik.handleSubmit}>
                            <div>
                                <label>Country/Region</label>
                                <select
                                    name="country"
                                    value={formik.values.country}
                                    onChange={formik.handleChange}
                                    style={{ display: "block", width: "100%" }}
                                >
                                    <option value="" label="Select a country">
                                        Select a country{" "}
                                    </option>
                                    <option value="India" label="India">
                                        {" "}
                                        India                                </option>
                                    <option value="United State" label="United State">
                                        United State
                                    </option>

                                    <option value="Canada" label="Canada">
                                        Canada
                                    </option>
                                </select>
                                {formik.errors.country && formik.touched.country && (
                                    <p>{formik.errors.country}</p>
                                )}
                            </div>
                            <div>
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="full_name"
                                    value={formik.values.full_name}
                                    onChange={formik.handleChange}
                                    style={{ width: "100%" }}
                                />
                                {formik.errors.full_name && formik.touched.full_name && (
                                    <p>{formik.errors.full_name}</p>
                                )}
                            </div>
                            <div>
                                <label>Flat, House no., Building, Company, Apartment</label>
                                <input
                                    type="text"
                                    name="apartment_name"
                                    value={formik.values.apartment_name}
                                    onChange={formik.handleChange}
                                    style={{ width: "100%" }}
                                />
                                {formik.errors.apartment_name && formik.touched.apartment_name && (
                                    <p>{formik.errors.apartment_name}</p>
                                )}
                            </div>
                            <div>
                                <label>Area, Street, Sector, Village</label>
                                <input
                                    type="text"
                                    name="area_name"
                                    value={formik.values.area_name}
                                    onChange={formik.handleChange}
                                    style={{ width: "100%" }}
                                />
                                {formik.errors.area_name && formik.touched.area_name && (
                                    <p>{formik.errors.area_name}</p>
                                )}
                            </div>
                            <div>
                                <label>Pincode</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={formik.values.pincode}
                                    onChange={formik.handleChange}
                                    placeholder="6 digits [0-9] PIN code"
                                    style={{ width: "100%" }}
                                />
                                {formik.errors.pincode && formik.touched.pincode && (
                                    <p>{formik.errors.pincode}</p>
                                )}
                            </div>
                            <div className="d-flex">
                                <div>
                                    <label>Town/City</label>
                                    <input
                                        type="text"
                                        name="city_name"
                                        value={formik.values.city_name}
                                        onChange={formik.handleChange}
                                        style={{ width: "95%" }}
                                    />
                                    {formik.errors.city_name && formik.touched.city_name && (
                                        <p>{formik.errors.city_name}</p>
                                    )}
                                </div>
                                <div>
                                    <label>State</label>
                                    <input
                                        type="text"
                                        name="state_name"
                                        value={formik.values.state_name}
                                        onChange={formik.handleChange}
                                        style={{ width: "100%" }}
                                    />
                                    {formik.errors.state_name && formik.touched.state_name && (
                                        <p>{formik.errors.state_name}</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                {/* <label>State</label> */}
                                <input
                                    type="checkbox"
                                    name="default_address"
                                    value={formik.values.default_address}
                                    onChange={formik.handleChange}
                                />
                                <span>Make this my default address</span>
                                {formik.errors.default_address && formik.touched.default_address && (
                                    <p>{formik.errors.default_address}</p>
                                )}
                            </div>
                            <div className="text-center d-none">
                                <button id="addr-btn" type="submit">Submit</button>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" className="px-3" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" className="px-3" onClick={handleSave}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>

        </>
    )
}

export default YourAddress;