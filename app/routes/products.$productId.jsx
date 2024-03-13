import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";

export async function loader({ request, params }) {
  const { productId } = params;
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(
    `#graphql
          query getProductById($id: ID!){
            product(id: $id){
              title,
              totalInventory, 
              productType, 
              priceRangeV2{
                maxVariantPrice{
                    amount
                }
              }
              featuredImage{
                url
              },
            }
          }
        `,
    {
      variables: {
        id: `gid://shopify/Product/${productId}`,
      },
    },
  );
  const result = await response.json();

  return json(result?.data?.product);
}

export default function ProductDetails() {
  const productData = useLoaderData();
  console.log(productData);
  return (
    <div>
      <h3>Product Title: {productData?.title}</h3>
      <img
        style={{ width: "500px" }}
        src={productData?.featuredImage?.url}
        alt=""
      />
      <h4>Total Stocks: {productData?.totalInventory}</h4>
      <h4>Price: ${productData?.priceRangeV2?.maxVariantPrice?.amount}</h4>
    </div>
  );
}
