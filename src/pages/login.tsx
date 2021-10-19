import React from "react";
import { Formik, Form } from "formik";
import { Box } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <Wrapper variant="regular">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            console.log("router.push();");
            router.push("/");
          }
        }}
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
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
