import { useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import SearchBar from '../../../shared/searchBar';

function AddCustomerOrder() {
  //const [selectedDate, handleDateChange] = useState(new Date());
  const [products, setProducts] = useState([]);
  
    useEffect(()=>{
        axios.get("http://localhost:5172/product/get")
        .then((response)=> {
          setProducts((existingData) => {
            return response.data;
          });
          console.log(products)
   })
    },[products]);
  
  const [productDetails, setProductDetails] = useState([])

  let arrayproduct = {};
  function addProduct() {
 
    if (Object.keys(arrayproduct).length !== 0 && !productDetails.some(el => el.id=== arrayproduct.id))
      setProductDetails([...productDetails, arrayproduct])
  }
  
  function onSelectedProduct(product) {
    arrayproduct = {
      id:product.id,
      code: product.code,
      name: product.label,
      count: 1
  };
  
  }

  function handleChange(index, event) {
     const { name,value } = event.target;
    const list = [...productDetails];
    list[index][name] = value;
    setProductDetails(list);
  }

  return (
    <>
      <Form>
    
        <Form.Group className="mb-3">
          <Form.Label htmlFor="">Disabled input</Form.Label>
          <Form.Control id="disabledTextInput" placeholder="Disabled input" />
        </Form.Group>

        <br />
        <SearchBar
          products={products}
          onSelectedProduct={onSelectedProduct}
        ></SearchBar>
        <br />
      
        {productDetails.length > 0 &&
          <table>
            <thead><tr>
              <th>Name</th>
              <th>Count</th>
            </tr>
            </thead>
        
            <tbody>
              {productDetails.map((pro, index) => (

                <tr key={index}>
                  <td>{pro.name} - {pro.code}</td>
                  <td>
                    <input type='number'name='count' value={pro.count} onChange={(event) => handleChange(index, event)} min="1"/>
                  </td>
                </tr>
        
   
            ))}
            </tbody>
          </table>
        }
   
        <br />
        <Button onClick={addProduct} disabled="">+</Button>
        <br />
        <Button type="submit">Submit</Button>
 
      </Form>

    </>
    )

}

export default AddCustomerOrder;