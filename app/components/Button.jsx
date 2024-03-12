import { Form, useNavigation } from "@remix-run/react";

const Button = ({ product }) => {
  const handleConfirm = () => {
    confirm("Sure you want to delete? ");
  };

  const navigation = useNavigation();
  const isSubmitting =
    navigation?.formData?.get("_action") === "delete" &&
    navigation?.formData?.get("productId") === product?.node?.id &&
    navigation.state;
  return (
    <div>
      <Form method="post">
        <input type="hidden" name="productId" value={product?.node?.id} />
        <button
          type="submit"
          name="_action"
          value="delete"
          onClick={handleConfirm}
        >
          {isSubmitting ? "Deleting..." : "Delete"}
        </button>
      </Form>
    </div>
  );
};

export default Button;
