import { Link  } from "@remix-run/react";
import { DataTable, LegacyCard, Page } from "@shopify/polaris";
import Button from "./Button";

export default function ShowData({ products, loading }) {
  
  console.log(products);
  
  if (loading) {
    return (
      <>
        <h2>Data is fetching</h2>
      </>
    );
  }

const rows = [
  ['Emerald Silk Gown', '$875.00', 124689, 140, '$122,500.00'],
    ['Mauve Cashmere Scarf', '$230.00', 124533, 83, '$19,090.00'],
    [
      'Navy Merino Wool Blazer with khaki chinos and yellow belt',
      '$445.00',
      124518,
      32,
      '$14,240.00',
    ],
  ];


  
  return (
    <div>
      <table className="table-fixed">
        <thead>
          <tr>
            <th>Product Id</th>
            <th>Product Title</th>
            <th>Description</th>
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
              <td> <Link to = {`/products/${product?.node?.id.split("/")[4]}`}>See Details </Link> </td>
              <td>
                <Button product={product}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <Page title="Shopify Products">
      <LegacyCard>
        <DataTable
          columnContentTypes={[
            'text',
            'numeric',
            'numeric',
            'numeric',
            'numeric',
          ]}
          headings={[
            'Product',
            'Price',
            'SKU Number',
            'Net quantity',
            'Net sales',
          ]}
          rows={rows}
          // totals={['', '', '', 255, '$155,830.00']}
        />
      </LegacyCard>
    </Page>
    </div>
  );
}
