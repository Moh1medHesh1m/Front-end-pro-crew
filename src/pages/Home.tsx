
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Carosel from '../components/Carosel';
import Nav from '../components/Nav'


const Home = (props: { name: string }) => {
    const [name, setName] = useState('');
    const [item, setItem] = useState([] as any)


    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:8000/restaurant/all', {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });

                const content = await response.json()

                const data = content.map((element: any) => {
                    return {
                        id: element._id,
                        name: element.name,
                        type: element.type,
                        image: element.image
                    }

                })
                console.log(data)
                setItem(data)

            }
        )();
    }, []);
    console.log(item)

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:8000/api/user', {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });

                const content = await response.json();
                console.log("sad", content)
                console.log(content.username)
                setName(content.username);
            }
        )();
    }, []);
    return <div>
        <Nav name={name} setName={setName} />


        <div style={{ justifyContent: "center", marginTop: "-24px" }}>

            <Carosel />
        </div>

        <div>
            <h1 style={{ textAlign: "center" }}>Welcome to Restaurants</h1>

            <Row lg={3}>
                {item.map((element: any) => (

                    <Col className="d-flex">
                        <Card className="flex-fill" >
                            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                            <Card.Body>
                                <Card.Title className=''>{element.name}</Card.Title>
                                <Card.Text>
                                    {element.type}
                                </Card.Text>
                                <div> <Link to="/product-resturant" state={{ from: element.id }} style={{ textDecoration: 'none' }}  ><Button variant="light" >Visit Restaurant</Button> </Link></div>
                            </Card.Body>
                        </Card>
                    </Col>



                ))}
            </Row>
        </div>

    </div>
};

export default Home;
