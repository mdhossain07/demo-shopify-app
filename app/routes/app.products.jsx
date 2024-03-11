import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { useLoaderData } from "@remix-run/react";
import ShowData from "../components/showData";
import { useState } from "react";

export default function Products() {
  const products = useLoaderData();
  const [isLoading, setIsLoading] = useState(false);
  //   console.log(products);

  if (!products) {
    setIsLoading(true);
  }
  return (
    <div>
      <h2 className="text-2xl font-semibold">Shopify Products</h2>
      <ShowData products={products} loading= {isLoading}/>
    </div>
  );
}

export async function loader({ request }) {
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(
    `#graphql
        query getProducts{
            products(first: 10){
                edges{
                    node{
                        id, 
                        title,
                        descriptionHtml
            }
        }
    }
}`,
  );
  const result = await response.json();
  //   console.log("products", result.data.products);
  return json(result.data.products);
}
