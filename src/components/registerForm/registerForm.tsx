import { useState } from "react";
import Link from "next/link";

import { Button, TextField } from "@mui/material";

interface FormValues {
    username: string;
    password: string;
  }

export default function RegisterForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegistration = async (username: string, password: string) => {
        try {
          const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }), // Include other registration data here
          });
    
          if (response.ok) {
            // Registration successful, handle redirection or other actions
            console.log("response: ", await response.json());
          } else {
            // Registration failed, handle error
          }
        } catch (error) {
          console.error('Registration error:', error);
        };
      };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        //debug
        console.log("values: ", username, password)

        await handleRegistration(username, password)
    }

    return (
        <form onSubmit={async (e) => {await handleSubmit(e)}}>
            <TextField
                type="text"
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
            />
            <TextField
                type="password"
                label="Passwort"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                />
            <Button type="submit" variant="contained" color="primary">
                Login
            </Button>
        </form>
    )
  
    /* const handleLogin = () => {

    //const handleLogin = (event: React.FormEvent) => {
      //event.preventDefault();
      // Add your login logic here
      console.log('Logging in...');

      const handleRegistration = async () => {
        try {
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }), // Include other registration data here
          });
    
          if (response.ok) {
            // Registration successful, handle redirection or other actions
            console.log("response: ",  response.json());
          } else {
            // Registration failed, handle error
          }
        } catch (error) {
          console.error('Registration error:', error);
        };
      };

      handleRegistration();
    };

    const initialValues = { username: '', password: '' }

    const validate = (values: FormValues)=> {
        const errors = {username};
        if (!values.username) {
        errors.username = 'Benötigt';
        } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)
        ) {
        errors.username = 'Username nicht gefunden';
        }
        return errors;
    }

    const onSubmit = (values: FormValues, { setSubmitting }: any) => {
        setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
        handleLogin();
        }, 400);
    }

    return(
        <div>
            <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={onSubmit}
                >
                {({ isSubmitting }: any) => (
                    <Form>
                    <Field type="text" name="username" placeholder="Username"/>
                    <ErrorMessage name="username" component="div" />
                    <Field type="password" name="password" placeholder="Passwort"/>
                    <ErrorMessage name="password" component="div" />
                    <Button type="submit" disabled={isSubmitting}>
                        Einloggen
                    </Button>
                    </Form>
                )}
            </Formik>
        </div>
    ) */
}