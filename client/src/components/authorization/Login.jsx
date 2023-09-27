import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {login} from "../../actions/user";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";

const ValidSchema = Yup.object().shape({
    email: Yup.string().email('Некоректна ел. адреса!').required('Обов\'язкове поле'),
    password: Yup.string()
        .min(3, 'Пароль повинен бути більше 3 символів!')
        .max(50, 'Пароль повинен бути менше 50 символів!')
        .required('Обов\'язкове поле'),
});

const Login = () => {
    const dispatch = useDispatch()

    return (
        <div className='container_form'>
            <h1>Авторизація</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={ValidSchema}
                onSubmit={values => dispatch(login(values.email, values.password))}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className={"header_container"}>
                            <p>Ел. адреса</p>
                            {errors.email && touched.email ? <div className={"message_error"}>{errors.email}</div> : null}
                        </div>
                        <Field name="email" type="email" placeholder="Введіть ел. адресу..."/>

                        <div className={"header_container"}>
                            <p>Пароль</p>
                            {errors.password && touched.password ? (<div className={"message_error"}>{errors.password}</div>) : null}
                        </div>
                        <Field name="password" placeholder="Введіть пароль..."/>

                        <button type="submit" >Увійти</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;