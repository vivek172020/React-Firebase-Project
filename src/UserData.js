import { Col, Container, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import { useEffect } from 'react';
import AddminPage from './AddminPage';
import firebaseApp from './FirebaseApp';
import MUIDataTable from 'mui-datatables';

function UserData() {

    const [data, setData] = useState([])

    useEffect(() => {

        let userData = []

        let db = firebaseApp.firestore()
        db.collection("db_User")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());

                    userData.push(doc.data())
                    setData(userData)

                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });


    }, [])

    const columns = [
        {
            name: '',
            label: 'No',
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (

                    <span>{tableMeta.rowIndex + 1}</span>

                )
            },
        },
        {
            name: 'first_name',
            label: "Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: 'email',
            label: "Email",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: 'password',
            label: "Password",
            options: {
                filter: true,
                sort: false,
            }
        },
    ];


    const options = {
        filterType: 'checkbox',
        selectableRows: 'none',
        responsive: 'scroll',
    };



    return (
        <>
            <AddminPage />


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
                                title={"User List"}
                                data={data}
                                columns={columns}
                                options={options}
                            />
                        </Col>
                    </Row>
                </Container>
            </div >
        </>
    )
}

export default UserData;