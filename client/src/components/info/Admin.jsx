import React, {useEffect, useState} from 'react';
import {deleteUserAdmin, getUsers, setInfoAdmin} from "../../actions/info";
import * as Yup from 'yup';
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
        .test('len', 'Номер телефону повинен мати 10 символів', val => val.length === 10)
        .required('Обов\'язкове поле'),
});

const UserForm = (dataUser) => {

    const [isEditing, setIsEditing] = useState(false);
    // const [isVisible, setIsVisible] = useState(true);
    const handleClickEdit = () => {
        setIsEditing(true);
    };

    const handleClickCancel = () => {
        setIsEditing(false);
    };

    const handleClickDelete = (id) => deleteUserAdmin(id);

    return (
        <div>
                <div className={"container_form"}>
                    {isEditing ? ( // Відображаємо input, якщо isEditing === true
                        <div>
                            <div>Ел.адреса: {dataUser.data.email}</div>
                            <Formik
                                initialValues={{
                                    group: dataUser.data.group,
                                    variant: dataUser.data.variant,
                                    phone: dataUser.data.phone,
                                }}
                                value={dataUser}
                                validationSchema={ValidSchema}
                                onSubmit={values => {
                                    setInfoAdmin(dataUser.data._id, values.group, values.variant, values.phone)
                                    handleClickCancel()
                                }}
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
                                        <Field name="variant" type="text" placeholder="Введіть варіант..." maxlength="3"/>

                                        <div className={"header_container"}>
                                            <p>Телефон</p>
                                            {errors.phone && touched.phone ? <div className={"message_error"}>{errors.phone}</div> : null}
                                        </div>
                                        <Field name="phone" type="text" placeholder="Введіть телефон..." maxlength="10"/>

                                        <div>
                                            <button  type="submit" >Підтвердити</button>
                                            <button id={"bg_gray"} onClick={handleClickCancel}>Скасувати</button>
                                        </div>

                                    </Form>
                                )}
                            </Formik>

                        </div>

                    ) : ( // Відображаємо div, якщо isEditing === false
                        <div>
                            <div>Ел.адреса: {dataUser.data.email}</div>
                            <div>Группа: {dataUser.data.group}</div>
                            <div>Варіант: {dataUser.data.variant}</div>
                            <div>Телефон: {dataUser.data.phone}</div>
                            <button onClick={handleClickEdit}>Редагувати</button>
                        </div>

                    )}
                    <button id={"bg_red"} onClick={() => handleClickDelete(dataUser.data._id)}>Видалити</button>
                </div>
        </div>
    )
}

const Admin = () => {

    const [data, setData] = useState({
        group: '',
        variant: '',
        phone: '',
    });

    useEffect(() => {
        getUsers().then((result) => {
            setData(result);
        });
    }, [data]);

    const divs = Array.from({ length: data.length }, (_, index) => (
        <div key={index}>
            <UserForm data={data[index]}/>
        </div>
    ));

    return (
        <div className={"admin_container"}>
            {divs}
        </div>
    );
};

export default Admin;