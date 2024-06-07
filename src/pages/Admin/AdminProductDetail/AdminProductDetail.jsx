import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { FormControl, FormLabel, Text, Input, Textarea, Button, Select } from "@chakra-ui/react";
import { Formik, FieldArray } from "formik";
import { message } from "antd";
import { fetchProduct, updateProduct } from "../../../api";
import validationSchema from "./validations";
import styles from "./AdminProductDetail.module.css"

export default function AdminProductDetail() {
  const { product_id } = useParams();

  const { isLoading, isError, data, error } = useQuery(
    ["admin:product", product_id],
    () => fetchProduct(product_id)
  );
  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Error {error.message}</div>;
  }
  const handleSubmit = async (values, bag) => {
    console.log("submitted");
    message.loading({ content: "Loading... ", key: "product_update" });

    try {
      await updateProduct(values, product_id);

      message.success({
        content: "The product successfully updates",
        key: "product_update",
        duration: 2,
      });
    } catch (e) {
      message.error("the product does not updated.");
    }
  };
  return (
    <div className={styles.adminProductDetailPage}>
      <nav>
        <Link to='/admin/products' className={styles.backLink}>Back</Link>
      </nav>
      <div className={styles.productDetailForm}>
        <Formik
          initialValues={{
            title: data.title,
            description: data.description,
            category: data.category,
            price: data.price,
            photos: data.photos,
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
                  <form onSubmit={handleSubmit}>
                    <FormControl>
                      <FormLabel>Title</FormLabel>
                      <Input
                        name="title"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                        disabled={isSubmitting}
                        isInvalid={touched.title && errors.title}
                      />
                      {touched.title && errors.title && (
                        <Text mt={2} color="red.500">
                          {errors.title}
                        </Text>
                      )}
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Description</FormLabel>
                      <Textarea
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        disabled={isSubmitting}
                        isInvalid={touched.description && errors.description}
                      />
                      {touched.description && errors.description && (
                        <Text mt={2} color="red.500">
                          {errors.description}
                        </Text>
                      )}
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
                      </Select>
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Price</FormLabel>
                      <Input
                        name="price"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.price}
                        disabled={isSubmitting}
                        isInvalid={touched.description && errors.description}
                      />
                      {touched.price && errors.price && (
                        <Text mt={2} color="red.500">
                          {errors.price}
                        </Text>
                      )}
                    </FormControl>
                    <FormControl mt={4}>
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
                      Update
                    </Button>
                  </form>
                </div>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
}