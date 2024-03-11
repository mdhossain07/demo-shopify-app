import { Link } from "@remix-run/react";

export default function ShowData({ products, loading }) {
  
  if (loading) {
    return (
      <>
        <h2>Data is fetching</h2>
      </>
    );
  }
  return (
    <div>
      <table className="table-fixed">
        <thead>
          <tr>
            <th>Product Id</th>
            <th>Product Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products?.edges?.map((product) => (
            <tr key={product.node.id}>
              <td>{product?.node?.id}</td>
              <td>{product?.node?.title}</td>
              <td>{product?.node?.descriptionHtml}</td>
              <td> <Link to = {`/products/${product?.node?.id.split("/")[4]}`}>See Details </Link> </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
