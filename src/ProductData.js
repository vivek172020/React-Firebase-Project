import { Col, Container, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import { useEffect } from 'react';
import AddminPage from './AddminPage';
import { useNavigate } from 'react-router-dom';
import React from "react"
import MUIDataTable from "mui-datatables";
import firebaseApp from './FirebaseApp';
import Loader from './Loader';

function ProductData() {

    const Navigate = useNavigate()

    const [data, setData] = useState()
    const [LoaderShow, setLoaderShow] = useState(true)

    useEffect(() => {
        GetProductData()
        setLoaderShow(false)
    }, [])

    const GetProductData = () => {
        let productdata = []
        let db = firebaseApp.firestore()
        db.collection("ProductData")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {

                    productdata.push(doc.data())
                    setData(productdata)
                    setLoaderShow(false)
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    const handleDelete = (id) => {
        console.log(id)
        let db = firebaseApp.firestore()
        setLoaderShow(true)

        db.collection("ProductData").where("id", "==", id)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id)
                    db.collection("ProductData").doc(doc.id).delete().then(() => {
                        console.log("Document successfully deleted!");

                        GetProductData()
                        setLoaderShow(false)
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    });
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    const handleEdit = (id) => {
        console.log(id)
        Navigate('/AddProduct/' + id)
    }

    const columns = [
        {
            name: "",
            label: "No.",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => (

                    <span>{tableMeta.rowIndex + 1}</span>

                )
            }
        },
        {
            name: "Pname",
            label: "Product Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Pimg",
            label: "Product Imgage",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value) => (
                    <img src={value ? value[0] : ''} alt="Product" style={{ width: '100px', height: '100px' }} />

                ),
            }
        },
        // {
        //     name: "Pdescrip",
        //     label: "Product Descritiopn",
        //     options: {
        //         filter: true,
        //         sort: false,
        //     }
        // },
        {
            name: "Pprice",
            label: "Product Price",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Pstock",
            label: "Product Stock",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Pcolor",
            label: "Product Color",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Psize",
            label: "Product Size",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Pcate",
            label: "Product Category",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "",
            label: "Product Edit",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta) => (
                    <button onClick={() => handleEdit(data[tableMeta.rowIndex].id)} className='btn btn-dark px-2'>Edit</button>
                ),
            }
        },
        {
            name: "Product Delete",
            label: "Product Delete",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta) => (
                    <button onClick={() => handleDelete(data[tableMeta.rowIndex].id)} className='btn btn-dark px-2'>Delete</button>
                ),
            }
        },
    ];

    const options = {
        filterType: 'checkbox',
        responsive: 'scroll',
        selectableRows: 'none',
    };

    return (
        <>
            {LoaderShow && <Loader />}
            {LoaderShow ? <Loader /> : <AddminPage />}


            <div className='content-main-section left'>
                <Container className='showdiv mt-5 studentdetail'>
                    <Row>
                        <Col className='text-sm-center mt-3 mb-3'>
                            <h1 className="text-left ml-3">User Details</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <MUIDataTable
                                title={"Product List"}
                                data={data}
                                columns={columns}
                                options={options}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default ProductData;