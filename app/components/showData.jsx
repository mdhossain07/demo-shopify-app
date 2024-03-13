import { Link } from "@remix-run/react";
import Button from "./Button";

export default function ShowData({ products, onUpdate }) {

  // console.log(products);
  return (
    <div>
      <table className="table-fixed">
        <thead>
          <tr>
            <th>Product Id</th>
            <th>Product Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Action</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products?.edges?.map((product) => (
            <tr key={product.node.id}>
              <td>{product?.node?.id}</td>
              <td>{product?.node?.title}</td>
              <td>{product?.node?.descriptionHtml}</td>
              <td><img style={{width: '150px'}} src={product?.node?.featuredImage?.url} alt="" /></td>
              <td>
                {" "}
                <Link to={`/products/${product?.node?.id.split("/")[4]}`}>
                  See Details{" "}
                </Link>{" "}
              </td>
              <td>
                <Button product={product} />
              </td>
              <td>
                <button onClick={() => onUpdate(product)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 
