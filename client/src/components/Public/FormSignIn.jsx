import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useUser } from "../../hook/useUser";

export const FormSignIn = () => {
  // --------------------------------------------------------------------------------
  const { postUser } = useUser();

  // --------------------------------------------------------------------------------
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordAux: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("El nombre de usuario es obligatorio.")
        .min(3, "El nombre de usuario debe tener entre 3 y 90 caracteres.")
        .max(90, "El nombre de usuario debe tener entre 3 y 90 caracteres."),
      email: Yup.string()
        .required("El email es obligatorio.")
        .email("Email invalido.")
        .min(5, "El email ingresado debe tener entre 5 y 90 caracteres.")
        .max(90, "El email ingresado debe tener entre 5 y 90 caracteres."),
      password: Yup.string()
        .required("La contraseña es obligatoria.")
        .matches(
          /^[0-9a-zA-Z]+$/,
          "La contraseña solo puede tener letras en minúscula, mayúscula y números."
        )
        .matches("[0-9]", "La contraseña debe tener al menos un número.")
        .min(8, "La contraseña ingresada debe tener entre 8 y 25 caracteres.")
        .max(25, "La contraseña ingresada debe tener entre 8 y 25 caracteres.")
        .oneOf(
          [Yup.ref("passwordAux")],
          "Las contraseñas ingresadas no coinciden"
        ),
      passwordAux: Yup.string().required(
        "La contraseña auxiliar es obligatoria."
      ),
    }),
    onSubmit: async (FormData) => {
      if (await postUser(FormData)) {
        formik.handleReset();
      }
    },
  });

  // --------------------------------------------------------------------------------
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nombre de Usuario:</label>
        <input
          type="text"
          className="form-control"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
        ></input>
        {formik.errors.username && (
          <small className="text-danger">{formik.errors.username}</small>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Email:</label>
        <input
          type="email"
          className="form-control"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        ></input>
        {formik.errors.email && (
          <small className="text-danger">{formik.errors.email}</small>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Password:</label>
        <input
          type="password"
          className="form-control"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        ></input>
        {formik.errors.password && (
          <small className="text-danger">{formik.errors.password}</small>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Password Nuevamente:</label>
        <input
          type="password"
          className="form-control"
          name="passwordAux"
          onChange={formik.handleChange}
          value={formik.values.passwordAux}
        ></input>
        {formik.errors.passwordAux && (
          <small className="text-danger">{formik.errors.passwordAux}</small>
        )}
      </div>
      <button type="submit" className="btn btn-primary">
        Registrarse
      </button>
    </form>
  );
};
