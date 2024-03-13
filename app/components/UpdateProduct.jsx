import { Form } from "@remix-run/react";
import { useState } from "react";

export default function UpdateProduct({ product }) {
  const [title, setTitle] = useState(product?.node?.title);
  const [details, setDetails] = useState(product?.node?.descriptionHtml);
  return (
    <div>
      <Form method="post">
        <label htmlFor="">Title: </label>
        <input
          type="text"
          name="title"
          id=""
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="">Description: </label>
        <input
          type="text"
          name="details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <br />
        <input type="hidden" name="prodId" value={product.node?.id} />
        <button name="_action" type="submit" value="update">Update</button>
      </Form>
    </div>
  );
}
