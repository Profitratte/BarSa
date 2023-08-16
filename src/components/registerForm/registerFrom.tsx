import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';

export default function RegisterForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleRegister = (event: React.FormEvent) => {
      event.preventDefault();
      // Add your register logic here
      console.log('Logging in...');
    };

    return(
        <div>
            <Formik
                initialValues={{ username: '', password: '' }}
                validate={values => {
                    const errors = {username};
                    if (!values.username) {
                    errors.username = 'Benötigt';
                    } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)
                    ) {
                    errors.username = 'Username nicht gefunden';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                    }, 400);
                }}
                >
                {({ isSubmitting }) => (
                    <Form>
                    <Field type="text" name="username" placeholder="Username"/>
                    <ErrorMessage name="username" component="div" />
                    <Field type="password" name="password" placeholder="Passwort"/>
                    <ErrorMessage name="password" component="div" />
                    <button type="submit" disabled={isSubmitting}>
                        Registrieren
                    </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}