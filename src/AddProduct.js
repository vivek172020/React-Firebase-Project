import { useEffect, useState } from 'react';
import AddminPage from './AddminPage';
import { Col, Container, Row } from 'react-bootstrap';
import firebaseApp from './FirebaseApp';
import { Formik, useFormik } from 'formik';
import * as Yup from "yup";
import Loader from './Loader';
import { Navigate, useNavigate } from 'react-router-dom';
let imageData = []
function AddProduct() {
    const Navigate = useNavigate()

    const [Pimg, setPimg] = useState([])
    const [AllProductData, setAllProductData] = useState([])
    const [CurrentID, setCurrentID] = useState('')
    const [UpdateID, setUpdateID] = useState('')
    const [LoaderShow, setLoaderShow] = useState(true)

    useEffect(() => {
        let url = window.location.href

        let arr = url.split('/')
        let id = url.substring(url.lastIndexOf('/') + 1)
        console.log(arr)

        if (arr.length > 4) {
            setCurrentID(arr[4])
            GetDataByID(arr[4])
        }
        GetProductData()
        setLoaderShow(false)
    }, [])
    const GetProductData = () => {
        let myproductdata = []
        let db = firebaseApp.firestore()
        db.collection("ProductData")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    myproductdata.push(doc.data())
                    setAllProductData(myproductdata)
                    console.log(AllProductData)
                    setLoaderShow(false)
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    const formik = useFormik({
        initialValues: {
            Pname: "",
            Pimg: [],
            Pdescrip: "",
            Pprice: "",
            Pstock: "",
            Pcolor: "",
            Psize: "",
            Pcate: "",
        },
        validationSchema: Yup.object({
            Pname: Yup.string()
                .min(1, "Mininum 1 characters")
                .max(50, "Maximum 50 characters")
                .required("Required!"),
            // Pimg: Yup.string()
            //     .required("Required!"),
            Pdescrip: Yup.string()
                .required("Required!"),
            Pprice: Yup.string()
                .min(1, "Minimum 1 characters")
                .required("Required!"),
            Pstock: Yup.string()
                .required("Required!"),
            Pcolor: Yup.string()
                .required("Required!"),
            Psize: Yup.string()
                .required("Required!"),
            Pcate: Yup.string()
                .required("Required!")
        }),
        onSubmit: values => {
            console.log(CurrentID)
            if (CurrentID && CurrentID != '') {
                UpdateProduct(UpdateID, values);

            } else {
                AddData(values)

            }
        }
    });

    const AddData = (values) => {
        console.log(values)
        setLoaderShow(true)
        values['id'] = Date.now()

        // Add a new document with a generated id.
        let db = firebaseApp.firestore()
        db.collection("ProductData").add(values)
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                setLoaderShow(false)
                formik.resetForm()
                imageData([])
                setPimg([])
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });

        alert('Product Add Successfully')
    }

    const GetDataByID = (id) => {
        console.log(id)

        let db = firebaseApp.firestore()
        db.collection("ProductData").where("id", "==", Number(id))
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    formik.setFieldValue('Pname', doc.data().Pname)
                    setPimg(doc.data().Pimg)
                    formik.setFieldValue('Pdescrip', doc.data().Pdescrip)
                    formik.setFieldValue('Pprice', doc.data().Pprice)
                    formik.setFieldValue('Pstock', doc.data().Pstock)
                    formik.setFieldValue('Pcolor', doc.data().Pcolor)
                    formik.setFieldValue('Psize', doc.data().Psize)
                    formik.setFieldValue('Pcate', doc.data().Pcate)
                    setUpdateID(doc.id)
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    const UpdateProduct = (UpdateID, values) => {
        console.log(values)
        let db = firebaseApp.firestore()
        var washingtonRef = db.collection("ProductData").doc(UpdateID);

        return washingtonRef.update({
            Pname: values.Pname,
            Pimg: Pimg,
            Pdescrip: values.Pdescrip,
            Pprice: values.Pprice,
            Pstock: values.Pstock,
            Pcolor: values.Pcolor,
            Psize: values.Psize,
            Pcate: values.Pcate
        })
            .then(() => {
                console.log("Document successfully updated!");
                setUpdateID('')
                setCurrentID('')
                Navigate('/AddProduct')
                formik.resetForm()
                imageData([])
                setPimg([])
                alert('Product Update Successfully')
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });
    }
    const handleImageUpload = (e) => {

        for (let i = 0; i < e.target.files.length; i++) {
            uploadImageInDatabase(e.target.files[i])

        }
    }

    const uploadImageInDatabase = (file) => {
        setLoaderShow(true)
        const guid = () => {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return String(s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4());
        }

        let myPromise = new Promise((resolve, reject) => {

            const myGuid = guid();
            const storageUrl = firebaseApp.storage('gs://vivek-ebe0e.appspot.com/')
            const storageRef = storageUrl.ref();
            const uploadTask = storageRef.child('Image').child(myGuid).put(file)
            uploadTask.on('state_changed',
                (snapShot) => {

                }, (err) => {
                    //catches the errors
                    console.log(err)
                    reject(err)
                }, () => {

                    firebaseApp
                        .storage('gs://vivek-ebe0e.appspot.com/')
                        .ref()
                        .child('Image')

                        .child(myGuid)
                        .getDownloadURL()
                        .then(fireBaseUrl => {
                            resolve(fireBaseUrl)
                        }).catch(err => {
                            console.log('error caught', err)
                        })
                })
        })
        myPromise.then(url => {
            imageData.push(url)
            console.log(imageData)
            setPimg(imageData)
            formik.setFieldValue('Pimg', imageData)
            setLoaderShow(false)


        }).catch(err => {
            console.log('error caught', err)
        })
    }

    // const handleImageChange = (e) => {




    const handleRemoveImg = (index) => {
        const updatedImages = [...Pimg];
        updatedImages.splice(index, 1);
        setPimg(updatedImages);

    };

    return (
        <>
            {LoaderShow && <Loader />}
            {LoaderShow ? <Loader /> : <AddminPage />}


            <div className='content-main-section left'>
                <Container className='showdiv mt-5 studentdetail'>
                    <Row>
                        <Col xs={12} className='text-sm-center mt-3 mb-3'>
                            <h1 className="text-left ml-3">Add Product</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="contact_form">
                                <div className="App">
                                    <form onSubmit={formik.handleSubmit}>
                                        <div>
                                            <label className="productLabel my-0" for="name">Product Name:</label>
                                            <input
                                                type="text"
                                                name="Pname"
                                                value={formik.values.Pname}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.errors.Pname && formik.touched.Pname && (
                                                <p>{formik.errors.Pname}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="productLabel my-0" for="name">Product Images:</label>
                                            <input
                                                type="file"
                                                name="Pimg"
                                                multiple
                                                onChange={handleImageUpload}
                                            />
                                            {Pimg.map((item, index) => {
                                                return (
                                                    <div key={index}>
                                                        <img className='myImg' id="myimg" src={item} alt="Preview" />
                                                        <button onClick={() => handleRemoveImg(index)} className='btn btn-dark px-3 py-1 ms-2'>Delete</button>
                                                    </div>
                                                );
                                            })}

                                        </div>
                                        <div>
                                            <label className="productLabel my-0" for="name">Product Description:</label>
                                            <input
                                                type="text"
                                                name="Pdescrip"
                                                value={formik.values.Pdescrip}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.errors.Pdescrip && formik.touched.Pdescrip && (
                                                <p>{formik.errors.Pdescrip}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="productLabel my-0" for="name">Product Price:</label>
                                            <input
                                                type="text"
                                                name="Pprice"
                                                value={formik.values.Pprice}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.errors.Pprice && formik.touched.Pprice && (
                                                <p>{formik.errors.Pprice}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="productLabel my-0" for="name">Product Stock:</label>
                                            <input
                                                type="text"
                                                name="Pstock"
                                                value={formik.values.Pstock}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.errors.Pstock &&
                                                formik.touched.Pstock && (
                                                    <p>{formik.errors.Pstock}</p>
                                                )}
                                        </div>
                                        <div>
                                            <label className="productLabel my-0" for="name">Product Color:</label>
                                            <input
                                                type="text"
                                                name="Pcolor"
                                                value={formik.values.Pcolor}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.errors.Pcolor &&
                                                formik.touched.Pcolor && (
                                                    <p>{formik.errors.Pcolor}</p>
                                                )}
                                        </div>
                                        <div>
                                            <label className="productLabel my-0" for="name">Product Size:</label>
                                            <select className="productLabel mt-0" value={formik.values.Psize} onChange={formik.handleChange} name="Psize" id="goggles">
                                                <option>Select Categary</option>
                                                <option>S</option>
                                                <option>M</option>
                                                <option>L</option>
                                                <option>XL</option>
                                                <option>XXL</option>
                                            </select>
                                            {formik.errors.Psize &&
                                                formik.touched.Psize && (
                                                    <p>{formik.errors.Psize}</p>
                                                )}
                                        </div>
                                        <div>
                                            <label className="productLabel my-0" for="name">Product Categary:</label>
                                            <select className="productLabel mt-0" value={formik.values.Pcate} onChange={formik.handleChange} name="Pcate" id="goggles">
                                                <option>Select Categary</option>
                                                <option>Men</option>
                                                <option>Women</option>
                                                <option>Child</option>
                                            </select>
                                            {formik.errors.Pcate &&
                                                formik.touched.Pcate && (
                                                    <p>{formik.errors.Pcate}</p>
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
            </div >
        </>
    )
}

export default AddProduct;


//     const file = e.target.files
//     let data = []
//     for (let i = 0; i < file.length; i++) {
//         if (file[i]) {
//             const reader = new FileReader()
//             reader.readAsDataURL(file[i])

//             reader.onload = () => {
//                 data.push(reader.result)
//                 setPimg(data)
//                 formik.setFieldValue('Pimg', data)
//                 console.log(data)
//             }
//         }
//     }
// };