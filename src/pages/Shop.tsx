
import React,{useContext} from 'react'
import { Table } from 'react-bootstrap'
import { CartContext } from '../context/cartContext'

function Shop() {
  const {title,setTitle,price,setPrice,list,setList} :any = useContext(CartContext)
  const total = (list.reduce((a :any ,v :any) =>  a = a + v.price , 0 ))
  return (
    <>
    <Table striped bordered hover variant="dark">
    <thead>
      <tr>
      
        <th>Order</th>
        <th>Price</th>
        
      </tr>
    </thead>
    <tbody>
    
    { list.map((element:any)=>(
        <tr>
<td>{element.title}</td>
<td>{element.price}</td>
</tr>

        ))}
       

   
    
    </tbody>
  </Table>
 <div>
  <>
  <h1>price</h1>
  <h1>{total}</h1>
  
  </>
  </div>
  </>
          );
    
}

export default Shop