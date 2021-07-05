import { Form, Container, Row, Col, Button, Card } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs'
import { useState } from 'react';
import Output from './Output';
import axios from 'axios';

const url = 'http://localhost:5000/api';

const district = ['Select', 'Ahmedabad','Amreli','Anand','Aravalli','Banaskantha (Palanpur)','Bharuch','Bhavnagar','Botad','Chhota Udepur','Dahod',
'Dangs (Ahwa)','Devbhoomi Dwarka','Gandhinagar','Gir Somnath','Jamnagar','Junagadh','Kachchh','Kheda (Nadiad)','Mahisagar',
'Mehsana','Morbi','Narmada (Rajpipla)','Navsari','Panchmahal','Patan','Porbandar','Rajkot','Sabarkantha','Surat',
'Surendranagar','Tapi','Vadodara','Valsad']

const Search = () => {

    const medicinenameinitial = {
        name: '',
        district: ''
    }

    const [medicinename, setMedicinename] = useState(medicinenameinitial);

    const [ clickdone, setClickdone ] = useState(false);

    
    
    const [medicinedata, setMedicinedata] = useState([]);

    const medicinefinder = async(medicine) => {
        try {
            await axios.get(`${url}/medicine/search`, {'params': {name: medicine.name}})
                 .then((response) => {
                    setMedicinedata(response.data);
                 })
        }
        catch(error) {
            console.log('Error while finding medicine',error);
        }
    }

    
    
    const onValueChange = (e) => {
        setMedicinename({...medicinename, [e.target.name]: e.target.value });
    }

    const clickhandler = () => {
        setClickdone(true)
        medicinefinder(medicinename)
    }

    return (
        <>
            {
                clickdone ? 
                <Output medicine={medicinedata} district={medicinename.district}/>
                :
                <Card style={{ display: 'flex', 
                width: '35%',
                margin: '100px auto',
                borderRadius: '5px',
                background: 'rgba(255,255,255, 0.15)',
                padding: 30 }} className="mx-auto">
                    <h4 className="mx-auto mb-4" style={{color: '#ffffff'}}>
                        <BsSearch style={{color: '#ffffff', fontSize: 20}} className="mr-2"/>
                        Search Medicines
                    </h4>
                    <Form>
                    <Form.Group>
                        <Form.Label style={{fontSize: 20, color: '#ffffff'}}>
                            <span>Enter Medicine Name</span>
                        </Form.Label>
                        <Form.Control type="text" onChange={(e) => onValueChange(e)} value={medicinename.name} name="name" placeholder="Enter Medicine Name"/>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1" className="mb-4">
                            <Form.Label style={{fontSize: 20, color: '#ffffff'}}>Select District Name</Form.Label>
                            <Form.Control onChange={(e) => onValueChange(e)} value={medicinename.district} name="district" as="select">
                            {
                                district.map((dis) => (
                                    <option>{dis}</option>
                                ))
                            }
                            </Form.Control>
                        </Form.Group>
                        <Button onClick={clickhandler} size="lg" variant="success" className="d-flex mx-auto">
                            Search
                        </Button>
                    </Form>
                </Card>
            }
        </>
    )
}

export default Search;