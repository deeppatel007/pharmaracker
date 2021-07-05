import { Col, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import {FaClinicMedical} from 'react-icons/fa';
import axios from 'axios';

const url = 'http://localhost:5000/api';

const Output = (props) => {
    
    const medicinedata = props.medicine;
    const district = props.district;
    

    const [ userdata,setUserdata ] = useState([]);

    const userFinder = (medicine) => {
        try {
            axios.get(`${url}/user/search`,{'params':{username: medicine.username}})
            .then ((res) => {
                if(district === res.data[0].district)
                {
                    setUserdata(userdata => [...userdata, res.data]);
                }
            })
        }catch(err) {
            console.log('Error while finding User',err);
        }
    }

    useEffect(() => {
        setUserdata([])
        for(var i = 0; i < medicinedata.length; i++)
        {
            userFinder(medicinedata[i]);
        }
    }, [medicinedata])



    
    return (
        <Row xs={1} md={2} className="g-4" style={{margin: '3% 3%'}}>
            {
                userdata.map(user => (
                    <Col className = "mb-3">
                        <Card border="success" style = {{backgroundColor: 'rgba(255,255,255, 0.15)', color: '#ffffff', borderWidth: '2px'}}>
                            <Card.Body> 
                                <Card.Title style={{textTransform: 'uppercase'}}><FaClinicMedical className="mb-2"/> {user[0].shopname}</Card.Title>
                                <Card.Text>
                                    <span style={{color:'#5cb85c'}}>Owner Name: </span>{user[0].fullname}
                                    <br/>
                                    <span style={{color:'#5cb85c'}}>Shop Address: </span>{user[0].shopaddress}
                                    <br/>
                                    <span style={{color:'#5cb85c'}}>Pincode: </span>{user[0].pincode}
                                    <br/>
                                    <span style={{color:'#5cb85c'}}>Phone: </span>{user[0].phone}
                                    <br/>
                                    <span style={{color:'#5cb85c'}}>Email: </span>{user[0].email}
                                    <br/>
                                    <span style={{color:'#5cb85c'}}>Features: </span>{user[0].features} 
                                    <br/>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))
            }
        </Row>   
    )
}


export default Output;
