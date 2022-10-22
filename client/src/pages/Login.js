import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Button, Container, Grid, TextField } from "@mui/material";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });

  const [login, { error }] = useMutation(LOGIN_USER);
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <main>
      <h4 className="form-header">Login to continue your tracking!</h4>
      <div>
        <form onSubmit={handleFormSubmit}>
          <Grid
            className="user-form"
            container
            spacing={3}
            direction="column"
            alignItems="center"
          >
            <Grid item>
              <TextField
                label="Email"
                variant="filled"
                className="form-input"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Password"
                variant="filled"
                className="form-input"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                className="user-submit-btn"
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        {error && <div className="error">Login failed! </div>}
      </div>
    </main>
  );
};

export default Login;
