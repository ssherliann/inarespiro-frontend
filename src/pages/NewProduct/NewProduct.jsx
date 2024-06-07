import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { Formik, FieldArray } from "formik";
import { FormControl, FormLabel, Input, Textarea, Button, Select } from "@chakra-ui/react";
import { message } from "antd";
import { postProduct } from "../../api";
import validationSchema from "./validations";
import styles from "./NewProduct.module.css";

function NewProduct() {
  const queryClient = useQueryClient();
  const newProductMutation = useMutation(postProduct, {
    onSuccess: () => queryClient.invalidateQueries("admin:products"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    message.loading({ content: "Loading...", key: "product_update" });

    const newValues = {
      ...values,
      photos: JSON.stringify(values.photos),
    };

    newProductMutation.mutate(newValues, {
      onSuccess: () => {
        message.success({
          content: "Add Product is successfully",
          key: "product_update",
          duration: 2,
        });
        setSubmitting(false);
      },
    });
  };

  return (
    <div className={styles.newProductPage}>
      <nav>
        <Link to="/admin" className={styles.backLink}>
          Back
        </Link>
      </nav>
      <div className={styles.newProductTable}>
        <Formik
          initialValues={{
            title: "",
            description: "",
            price: "",
            category: "", 
            photos: [],
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleSubmit,
            errors,
            touched,
            handleChange,
            handleBlur,
            values,
            isSubmitting,
          }) => (
            <>
              <div>
                <div>
                  <form onSubmit={handleSubmit}>
                    <FormControl>
                      <FormLabel>Title</FormLabel>
                      <Input
                        name="title"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                        isInvalid={!!errors.title && touched.title}
                      />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Description</FormLabel>
                      <Textarea
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        isInvalid={!!errors.description && touched.description}
                      />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Price</FormLabel>
                      <Input
                        name="price"
                        type="number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.price}
                        isInvalid={!!errors.price && touched.price}
                      />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Category</FormLabel>
                      <Select
                        name="category"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.category}
                        isInvalid={!!errors.category && touched.category}
                      >
                        <option value="">Select a category</option>
                        <option value="Rings">Rings</option>
                        <option value="Necklaces">Necklaces</option>
                        <option value="Bracelets">Bracelets</option>
                        <option value="Chains">Chains</option>
                        <option value="Earrings">Earrings</option>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Photos</FormLabel>
                      <FieldArray
                        name="photos"
                        render={(arrayHelpers) => (
                          <div>
                            {values.photos &&
                              values.photos.map((photo, index) => (
                                <div key={index}>
                                  <Input
                                    name={`photos.${index}`}
                                    value={photo}
                                    disabled={isSubmitting}
                                    onChange={handleChange}
                                    width="90%"
                                  />
                                  <Button
                                    ml="4"
                                    type="button"
                                    colorScheme="red"
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              ))}
                            <Button
                              mt="5"
                              onClick={() => arrayHelpers.push("")}
                            >
                              Add a Photo
                            </Button>
                          </div>
                        )}
                      />
                    </FormControl>
                    <Button
                      mt={4}
                      width="full"
                      type="submit"
                      isLoading={isSubmitting}
                    >
                      Add Product
                    </Button>
                  </form>
                </div>
              </div>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default NewProduct;
