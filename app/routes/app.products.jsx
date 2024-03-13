import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { useActionData, useLoaderData } from "@remix-run/react";
import ShowData from "../components/showData";
import { useState } from "react";
import UpdateProduct from "../components/UpdateProduct";

export default function Products() {
  const products = useLoaderData();
  const data = useActionData();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
    console.log(data);

  if (!products) {
    setIsLoading(true);
  }

  function handleUpdateProduct(product) {
    setShowModal(true);
    setSelectedProduct(product);
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">Shopify Products</h2>
      <ShowData
        products={products}
        loading={isLoading}
        onUpdate={handleUpdateProduct}
      />
      <br />
      <br />
      {showModal && <UpdateProduct product={selectedProduct} />}
    </div>
  );
}

export async function loader({ request }) {
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(
    `#graphql
        query getProducts{
            products(first: 15){
                edges{
                    node{
                        id, 
                        title,
                        descriptionHtml,
                        featuredImage{
                          url
                        }
            }
        }
    }
}`,
  );
  const result = await response.json();
  //   console.log("products", result.data.products);
  return json(result.data.products);
}

export async function action({ request }) {
  const { admin } = await authenticate.admin(request);

  const formData = await request.clone().formData();
  const _action = formData.get("_action");

  switch (_action) {
    case "delete":
      const pId = formData.get("productId");

      await admin.graphql(
        `#graphql
        mutation productDelete($input: ProductDeleteInput!){
          productDelete(input: $input){
            deletedProductId
          }
        }`,

        {
          variables: {
            input: {
              id: pId,
            },
          },
        },
      );
      // const result = await response.json();
      return json({ status: "Product Deleted..." });
      break;

    case "update":
      const prodId = formData.get("prodId");
      const title = formData.get("title");
      const details = formData.get("details");
      const res = await admin.graphql(
        `#graphql
        mutation productUpdate($input: ProductInput!){
          productUpdate(input: $input){
            product{
              id, 
              title, 
              descriptionHtml
            }
          }
        }`,

        {
          variables: {
            input: {
              id: prodId,
              title: title,
              descriptionHtml: details,
            },
          },
        },
      );
      const result = await res.json();
      console.log(result?.data?.productUpdate?.product?.id);
      return json({ status: "Product Updated" });
      break;

    default:
      break;
  }
}
