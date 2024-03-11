import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export async function loader({ params, request }) {
  const { admin } = await authenticate.admin(request);
  console.log(admin);
  const { id } = params;

  // console.log(id);

  const response = await admin.graphql(
    `#graphql
          query getProductById($id: ID!){
            product(id: $id){
              title,
              description, 
              productType,
            }
          }
        `,
    {
      variables: {
        id: `gid://shopify/Product/${id}`,
      },
    },
  );
  const responseJson = await response.json();

  return json({
    productData: responseJson?.data?.product,
  });
}

export async function action({ params, request }) {

  const { admin } = await authenticate.admin(request);
  const { id } = params;

  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const productType = formData.get("productType");

  console.log(title, description, productType);
  
  const response = await admin.graphql(
    `#graphql
    
    mutation productUpdate($input: ProductInput!){
  productUpdate(input: $input){
    product{
      id, 
      title,
      description,
      productType
    }
  }
}`,
{
  variables: {
    input: {
      id: `gid://shopify/Product/${id}`,
      title: title,
      descriptionHtml: description,
      productType: productType
	  }
  }
}
  );
  const result = await response.json();

  return json({ updatedData: result});
}
