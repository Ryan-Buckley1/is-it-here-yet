import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Button, Grid, TextField } from "@mui/material";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [addUser, { error }] = useMutation(ADD_USER);
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
      const { data } = await addUser({
        variables: { ...formState },
      });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main>
      <h4 className="form-header">Sign Up</h4>
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
                className="form-input"
                label="Username"
                variant="filled"
                name="username"
                type="username"
                id="username"
                value={formState.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                className="form-input"
                label="Email"
                variant="filled"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                className="form-input"
                label="Password"
                variant="filled"
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
        {error && <div className="error">Sign up failed</div>}
      </div>
    </main>
  );
};

export default Signup;
