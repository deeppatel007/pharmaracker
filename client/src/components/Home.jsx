import axios from "axios";
import { useState, useEffect } from "react";
import { Card ,Row, Col} from "react-bootstrap";
const Home = () => {
  var [userData, setData] = useState([]);

  const profileData = async () => {
    try {
      const res = await axios.get(`https://reqres.in/api/users?page=2`)
    //   setUserdata(userdata => ([...userdata, res.data]));
    setData( userData => ([...userData,res.data.data]));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
   profileData()
   } , [])


  console.log(userData[0]);
   return (
    <>
    
    <Row xs={1} md={4} className="g-4 ">
    {userData[0].map(user => (
                            
                           
                            <Col className='mb-3 mt-3'>
                            <Card style={{ width: '20rem' }}>
                            <Card.Body>
                                <Card.Title>{user.id}</Card.Title>
                                <Card.Text>
                                    {user.email}
                                </Card.Text> 
                            </Card.Body>
                            </Card>
                            </Col>
                            

                        ))
    }
                        </Row>
    
    
    </>
  );
};

export default Home;
