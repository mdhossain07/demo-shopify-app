import { authenticate } from "../shopify.server"

export const action = async ({request, params}) => {
    const {admin} = await authenticate.admin(request);
    console.log(admin);

    const formData = await request.formData();

    console.log(formData);


}