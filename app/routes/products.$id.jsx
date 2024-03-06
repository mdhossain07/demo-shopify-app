import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export async function loader({ params, request}) {

    const {admin} = await authenticate.admin(request);
    const { id } = params;

    const response = await admin.graphql(
        `#graphql
          query getProductById($id: ID!){
            product(id: $id){
              title
            }
          }
        `,
        {
          variables: {
              id: `gid://shopify/Product/${id}`
          }
        }
      );
      const responseJson = await response.json();

    return json({
        data: responseJson?.data?.product?.title
    })
}
