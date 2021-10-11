import React from "react";
import { Formik, Form } from "formik";
import { Box } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import { useMutation } from "urql";

interface registerProps {}

const REGISTER_MUT = `
    mutation Register($username: String!, $password: String!){
        register(options: {username: $username, password: $password}){
            errors{
                field
                message
            }
            user{
                id
                username
            }
        }
    }
`;

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useMutation(REGISTER_MUT);
  return (
    <Wrapper variant="regular">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => register(values)}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              placeholder="Username"
              label="Username"
              name="username"
            />
            <Box mt={4}>
              <InputField
                placeholder="Password"
                label="Password"
                name="password"
                type="password"
              />
            </Box>
            <Button type="submit" mt={4} isLoading={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
