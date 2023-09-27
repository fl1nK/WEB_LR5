import React, {useEffect, useState} from 'react';
import {registration} from "../../actions/user";
import * as Yup from 'yup';
import {Field, Form, Formik} from "formik";

const ValidSchema = Yup.object().shape({
    email: Yup.string().email('Некоректна ел. адреса!').required('Обов\'язкове поле'),
    password: Yup.string()
        .min(3, 'Пароль повинен бути більше 3 символів!')
        .max(50, 'Пароль повинен бути менше 50 символів!')
        .required('Обов\'язкове поле'),
});

const Registration = () => {
    return (
        <div className='container_form'>
            <h1>Реєстрація</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={ValidSchema}
                onSubmit={values => registration(values.email, values.password)}
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

                        <button type="submit">Зареєструватися</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Registration;