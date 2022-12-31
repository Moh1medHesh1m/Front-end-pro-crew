import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import Nav from '../components/Nav';
import { CartContext } from '../context/cartContext';
import Shop from './Shop';
function RestaurantHome() {
  const [name, setName] = useState('');
  const location = useLocation();
  const { from } = location.state;
  const { resId, setResId, title, setTitle, price, setPrice, list, setList }: any = useContext(CartContext)
  const [bool, setBool] = useState(true)

  const [item, setItem] = useState([] as any)
  const prevId = from


  // useEffect(() => {
  //   console.log(resId, '- Has changed')

  //   setList([])
  // console.log(list)

  // }, [resId]) // <-- here put the parameter to listen


  useEffect(() => {
    (
      async () => {
        const response = await fetch(`http://localhost:8000/product/${from}`, {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',


        });

        const content = await response.json()
        console.log(from)

        console.log(content)
        const data = content.map((element: any) => {
          return {
            id: element._id,
            title: element.title,
            description: element.description,
            price: element.price
          }

        })
        setItem(data)
        console.log(data)
      }
    )(

    );
  }, []);


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




  return (
    <>
      <Nav name={name} setName={setName} />
      {/* <div>{name}
    
    </div> */}



      <div>


        <div>
          <Row lg={3}>
            {item.map((element: any) => (

              <Col className="d-flex">
                <Card className="flex-fill" style={{ width: "100px" }}>
                  {/* <Card.Img variant="top" src="holder.js/100px180"  /> */}
                  <Card.Body>
                    <Card.Title>{element.title}</Card.Title>
                    <Card.Text>
                      {element.description}
                    </Card.Text>
                    <Card.Text>
                      {element.price}
                    </Card.Text>

                    <Button variant="light" onClick={() => {
                      console.log(list)

                      setTitle(element.title)
                      setPrice(element.price)
                      setResId(from)
                      // if (resId != prevId) {
                      //   list.empty()
                      // }
                      // console.log("sadadad"+list[list.length].resId )
                      // console.log({ resId: from, list, boo: (list.length > 0), booboo: (list.length > 0) && list[list.length - 1].resId != from })
                      const newItem = {
                        id: element.id,
                        title: element.title,
                        price: element.price,
                        resId: from

                      };
                      if (list.length > 0 && list[list.length - 1].resId != from) {
                        console.log('aLERT ')
                        // alert("NOt the same restruatn");
                        const confirmation = window.confirm("Cant order from 2 resturant!, clear cart first?");
                        if (confirmation) {

                          setList([newItem])
                          console.log('after empty ')
                        } else {
                          // do nothing
                        }
                      } else setList([...list, newItem])

                      console.log(list)

                      console.log(resId)
                    }}>Add to cart</Button>
                  </Card.Body>
                </Card>
              </Col>



            ))}
          </Row>
        </div>


      </div>



    </>
  )
}

export default RestaurantHome