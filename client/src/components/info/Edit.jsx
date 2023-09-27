import React, {useEffect, useState} from 'react';
import {deleteUser, getInfo, setInfo} from "../../actions/info";
import {logout} from "../../reducers/userReducer";
import {useDispatch} from "react-redux";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";

const ValidSchema = Yup.object().shape({
    group: Yup.string()
        .matches(/^[А-ЮІЇҐ]{2}-[0-9]{2}$/, "Некоректна форма, наприклад ІТ-03")
        .required('Обов\'язкове поле'),
    variant: Yup.string()
        .min(1, 'Варіант повинен бути більше 1 символу!')
        .max(3, 'Варіант повинен бути менше 3 символів!')
        .required('Обов\'язкове поле'),
    phone: Yup.string()
        .test('len', 'Телефону повинен мати 10 символів', val => val.length === 10)
        .required('Обов\'язкове поле'),
});

const Edit = () => {

    const [isValueLoaded, setIsValueLoaded] = useState(false)
    const [data, setData] = useState({
        group: '',
        variant: '',
        phone: '',
    });

    useEffect(() => {
        getInfo().then((result) => {
            const userData = result.user;
            setData({
                group: userData.group,
                variant: userData.variant,
                phone: userData.phone,
            });
            setIsValueLoaded(true)
        });
    }, []);

    const dispatch = useDispatch()

    return !isValueLoaded ? (<div>Loading...</div>) : (
        <div className='container_form'>
            <h1>Редагування профілю</h1>
            <Formik
                initialValues={{
                    group: data.group,
                    variant: data.variant,
                    phone: data.phone,
                }}
                validationSchema={ValidSchema}
                onSubmit={values => setInfo(values.group, values.variant, values.phone)}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className={"header_container"}>
                            <p>Група</p>
                            {errors.group && touched.group ? <div className={"message_error"}>{errors.group}</div> : null}
                        </div>
                        <Field name="group" type="text" placeholder="Введіть групу..." maxlength="5"/>

                        <div className={"header_container"}>
                            <p>Варіант</p>
                            {errors.variant && touched.variant ? <div className={"message_error"}>{errors.variant}</div> : null}
                        </div>
                        <Field name="variant" type="number" placeholder="Введіть варіант..." maxlength="3"/>

                        <div className={"header_container"}>
                            <p>Телефон</p>
                            {errors.phone && touched.phone ? <div className={"message_error"}>{errors.phone}</div> : null}
                        </div>
                        <Field name="phone" type="number" maxLength="10" placeholder="Введіть телефон..." maxlength="10"/>
                        <button type="submit" >Редагувати</button>
                    </Form>
                )}
            </Formik>
            <button style={{background: "red"}} onClick={()=> {deleteUser(); dispatch(logout())}}>Видалити профіль</button>

        </div>
    );
};

export default Edit;