import "bootstrap-icons/font/bootstrap-icons.css";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Mini_Slider from './Mini_Slider';
import * as Yup from "yup";
import { useFormik } from "formik";
import MyHeader from "./MyHeader";
import firebaseApp from "./FirebaseApp";
import { useEffect, useState } from "react";

function Registration() {

    const Navigate = useNavigate()
    const [Data, setData] = useState()
    console.log(Data)

    useEffect(() => {
        GetUserData()

    }, [])

    const GetUserData = () => {
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
    }


    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirm_password: ""
        },
        validationSchema: Yup.object({
            first_name: Yup.string()
                .min(2, "Mininum 2 characters")
                .max(15, "Maximum 15 characters")
                .required("Required!"),
            last_name: Yup.string()
                .min(2, "Mininum 2 characters")
                .max(15, "Maximum 15 characters")
                .required("Required!"),
            email: Yup.string()
                .email("Invalid email format")
                .required("Required!"),
            password: Yup.string()
                .min(8, "Minimum 8 characters")
                .required("Required!"),
            confirm_password: Yup.string()
                .oneOf([Yup.ref("password")], "Password's not match")
                .required("Required!")
        }),
        onSubmit: values => {
            //   console.log(JSON.stringify(values, null, 2));
            values['id'] = Date.now()
            values['address'] = []
            values['cart'] = []
            values['oderID'] = []

            let alreadyReg = false

            for (let i = 0; i < Data.length; i++) {
                if (Data[i].email == values.email) {
                    alreadyReg = true
                }
            }

            if (alreadyReg) {
                alert('Registration Already Exit')
            } else {
                // Add a new document with a generated id.
                let db = firebaseApp.firestore()
                db.collection("db_User").add(values)
                    .then((docRef) => {
                        console.log("Document written with ID: ", docRef.id);
                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
                GetUserData()
                alert('Registration Successfully')
                Navigate('/Login')
                formik.resetForm()
            }
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
                            <h3>Create account</h3>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col lg={{ span: 6, offset: 3 }}>
                        <div className="contact_form">
                            <div className="App">
                                <form onSubmit={formik.handleSubmit}>
                                    <div>
                                        <input
                                            type="text"
                                            name="first_name"
                                            placeholder="First Name"
                                            value={formik.values.first_name}
                                            onChange={formik.handleChange}
                                        />
                                        {formik.errors.first_name && formik.touched.first_name && (
                                            <p>{formik.errors.first_name}</p>
                                        )}
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="last_name"
                                            placeholder="Last Name"
                                            value={formik.values.last_name}
                                            onChange={formik.handleChange}
                                        />
                                        {formik.errors.last_name && formik.touched.last_name && (
                                            <p>{formik.errors.last_name}</p>
                                        )}
                                    </div>
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
                                    <div>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                        />
                                        {formik.errors.password && formik.touched.password && (
                                            <p>{formik.errors.password}</p>
                                        )}
                                    </div>
                                    <div>
                                        <input
                                            type="password"
                                            name="confirm_password"
                                            placeholder="Confirm Password"
                                            value={formik.values.confirm_password}
                                            onChange={formik.handleChange}
                                        />
                                        {formik.errors.confirm_password &&
                                            formik.touched.confirm_password && (
                                                <p>{formik.errors.confirm_password}</p>
                                            )}
                                    </div>
                                    <div className="text-center">
                                        <button type="submit">Submit</button>
                                    </div>
                                </form>
                            </div>


                        </div>
                    </Col>
                </Row>
            </Container>

            {/* <table>
                <tbody>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Passward</th>
                        <th>Confirm Passward</th>
                        <th>Delete</th>
                    </tr>
                </tbody>
                {data.map((item) => {
                    return (
                        <tbody>
                            <tr>
                                <td>{item.Fname}</td>
                                <td>{item.Lname}</td>
                                <td>{item.Email}</td>
                                <td>{item.Pass}</td>
                                <td>{item.Cpass}</td>
                                <td><button onClick={() => handleDelete(item.id)}>Delete</button></td>
                                <td><button onClick={() => handleEdit(item.id)}>Edit</button></td>
                            </tr>
                        </tbody>
                    )
                }
                )}
            </table> */}
        </>
    )
}

export default Registration;

// const handlePassChange = (e) => {
//     setPass(e.target.value)
// }

// const hanleCpassChagne = (e) => {
//     setCpass(e.target.value)
// }

// const handleSubmit = () => {

//     console.log('handleSubmit called')
//     let alreadyReg = false

//     for (let i = 0; i < data.length; i++) {
//         if (data[i].Email === Email) {
//             alreadyReg = true
//         }
//     }
//     if (alreadyReg) {
//         alert('Please Enter Unique Email Address')
//     } else {

//         if (Pass == Cpass) {
//             let obj = {
//                 Fname: Fname,
//                 Lname: Lname,
//                 Email: Email,
//                 Pass: Pass,
//                 Cpass: Cpass,
//                 id: Date.now(),
//                 cart: []
//             }
//             setData([...data, obj])
//             alert('Registration Successfully')
//             console.log([...data, obj])

//             setFname('')
//             setLname('')
//             setEmail('')
//             setPass('')
//             setCpass('')
//             localStorage.setItem("user", JSON.stringify([...data, obj]))

//             Navigate('/Login')
//         } else {
//             alert('Passward not match')
//         }
//     }
// }

// const handleSubmit = () => {
//     if (editingId !== '') {
//         let editedRow = data.find(item => item.id === editingId);
//         console.log(editingId)

//         if (editedRow) {
//             editedRow.Fname = Fname
//             editedRow.Lname = Lname
//             editedRow.Email = Email
//             editedRow.Pass = Pass
//             editedRow.Cpass = Cpass

//             console.log(data)

//             setEditingId('')

//             setFname('')
//             setLname('')
//             setEmail('')
//             setPass('')
//             setCpass('')
//         }

//     } else {
//         let obj = {
//             Fname: Fname,
//             Lname: Lname,
//             Email: Email,
//             Pass: Pass,
//             Cpass: Cpass,
//             id: Date.now()
//         }
//         setData([...data, obj])
//         console.log([...data, obj])

//         setFname('')
//         setLname('')
//         setEmail('')
//         setPass('')
//         setCpass('')
//     }
// }

// const handleDelete = (id) => {
//     let fillterData = data.filter((item) => item.id !== id)
//     setData(fillterData)
//     console.log(fillterData)
// }

// const handleEdit = (id) => {
//     let editData = data.find((item) => item.id === id)
//     console.log(id)

//     if (editData) {
//         setEditingId(id);
//         setFname(editData.Fname)
//         setLname(editData.Lname)
//         setEmail(editData.Email)
//         setPass(editData.Pass)
//         setCpass(editData.Cpass)
//     }
// }
// const handleEdit = (all) => {
//     setFname(all.Fname)
//     setLname(all.Lname)
//     setEmail(all.Email)
//     setPass(all.Pass)
//     setCpass(all.Cpass)
// }



