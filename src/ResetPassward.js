import "bootstrap-icons/font/bootstrap-icons.css";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Mini_Slider from './Mini_Slider';
import * as Yup from "yup";
import { useFormik } from "formik";
import MyHeader from "./MyHeader";
import firebaseApp from "./FirebaseApp";

function ResetPassward() {
    const Navigate = useNavigate()
    const [Data, setData] = useState()

    useEffect(() => {
        let userData = []

        let db = firebaseApp.firestore()
        db.collection("db_User")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());

                    userData.push(doc.data())
                    setData(userData)
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }, [])

    const formik = useFormik({
        initialValues: {
            email: "",

        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email format")
                .required("Required!"),
        }),
        //   console.log(JSON.stringify(values, null, 2));
        onSubmit: values => {

            console.log(values)

            // let login = false
            // let LoginID = ''
            // for (let i = 0; i < Data.length; i++) {
            //     if (Data[i].email == values.email && Data[i].password == values.password) {
            //         login = true
            //         LoginID = Data[i].id
            //     }
            // }
            // if (login) {
            //     localStorage.setItem('LoginID', LoginID)
            //     formik.resetForm()
            //     alert('Login Successfully')
            //     Navigate('/')
            // } else {
            //     alert('something went wrong')
            // }
        }
    });

    return (
        <>

            <Mini_Slider />
            <MyHeader />

            <Container>
                <Row className='text-center'>
                    <Col>
                        <div className='create_title mb-4'>
                            <h3>Reset your password</h3>
                        </div>
                    </Col>
                </Row>
                <Row className='text-center'>
                    <Col>
                        <div className='create_title mb-4'>
                            <p>We will send you an email to reset your password</p>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col lg={{ span: 6, offset: 3 }}>
                        <div className="contact_form text-center">
                            {/* <input type="email" value={Email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" id="email" />
                            <input type="pass" value={Pass} onChange={(e) => setPass(e.target.value)} placeholder="Enter Passward" id="passward" />
                            <input type="pass" value={Cpass} onChange={(e) => setCpass(e.target.value)} className='mb-2' placeholder="Confirm Passward" id="passward" />
                            <p><a href='' className='loginForgot'>Forgot your password?</a></p>
                            <button onClick={LoginPage} className='login_Btn my-4'>SIGN IN</button><br />
                            <Link to={'/Registration'} className='loginForgot create'>Create Account</Link> */}

                            <div className="App">
                                {/* <h1>Validation with Formik + Yup</h1> */}

                                <form onSubmit={formik.handleSubmit}>
                                    <div>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                        />
                                        {formik.errors.email && formik.touched.email && (
                                            <p>{formik.errors.email}</p>
                                        )}
                                    </div>

                                    <div className="text-center">
                                        <button type="submit">Submit</button>
                                    </div>
                                </form>
                            </div>
                            <Link to={'/Login'} className='loginForgot create btn btn-light py-2 px-4'>Cancel</Link>
                        </div>
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default ResetPassward;

// const [Email, setEmail] = useState('')
// const [Pass, setPass] = useState('')
// const [Cpass, setCpass] = useState('')

// const LoginPage = () => {

//     const data = JSON.parse(localStorage.getItem('user'))

//     let loginalready = false
//     let loginID = ''

//     for (let i = 0; i < data.length; i++) {
//         if (data[i].Email === Email && data[i].Pass === Pass && data[i].Cpass === Cpass) {
//             loginalready = true
//             loginID = data[i].id
//         }

//     }
//     if (loginalready) {
//         console.log([...data])
//         alert('Login Successfully')
//         localStorage.setItem("loginData", loginID)

//         Navigate('/')

//         setEmail('')
//         setPass('')
//         setCpass('')
//     } else {
//         alert('Invaild Details')
//     }
// }

// --------------This is ternery oprater----------------

// let data = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : []
// let login = false
// for (let i = 0; i < data.length; i++) {
//     if (data[i].email == values.email && data[i].password == values.password) {
//         login = true
//     }

// }

// if (login) {
//     alert('login SUccessfully')
// } else {
//     alert('something went wrong')
// }

// -------------this is regular condition-----------
// let data = []
// if (localStorage.getItem('user')) {
//     data = localStorage.getItem('user')

//     let login = false
//     for (let i = 0; i < data.length; i++) {
//         if (data[i].email == values.email && data[i].password == values.password) {
//             login = true
//         }

//     }

//     if (login) {
//         alert('login SUccessfully')
//     } else {
//         alert('something went wrong')
//     }
// }