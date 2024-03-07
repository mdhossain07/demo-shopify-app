import { useState } from "react";


export default function Signup({onAdd}) {

    const [productData, setProductData] = useState({
        title: "", 
        status: "", 
        type: ""
      })
    
    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setProductData({...productData, [name]: value})
    }

  return (
        <form onSubmit={() => onAdd(productData)}>
                  <input
                    type="text"
                    name="title"
                    placeholder="product title"
                    value={productData.title}
                    onChange={handleChange}
                  />
                  <br />
                  <input
                    type="text"
                    name="status"
                    placeholder="product status"
                    value={productData.status}
                    onChange={handleChange}
                  />
                  <br />
                  <input
                    type="text"
                    name="type"
                    placeholder="product type"
                    value={productData.type}
                    onChange={handleChange}
                  />
                  <br />
                  <br />
                  <button>Add Product</button>
        </form>
  );
}
