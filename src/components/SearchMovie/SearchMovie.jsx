import { Formik, Form, Field } from "formik";

const SearchForm = () => {
  return (
    <>
      <Formik
        initialValues={{ text: "" }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="text" />
            <button type="submit" disabled={isSubmitting}>
              Search
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SearchForm;
