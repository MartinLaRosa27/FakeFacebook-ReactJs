import React from "react";
import * as Yup from "yup";
import { usePublication } from "../../hook/usePublication";
import { useFormik } from "formik";
import { useOutletContext } from "react-router-dom";

export const CrearPublicacion = () => {
  // --------------------------------------------------------------------------------
  const [user] = useOutletContext();

  // --------------------------------------------------------------------------------
  const { postPublication } = usePublication();

  // --------------------------------------------------------------------------------
  const formik = useFormik({
    initialValues: {
      text: "",
    },
    validationSchema: Yup.object({
      text: Yup.string()
        .required("El contenido de la publicación es obligatorio.")
        .min(
          5,
          "El contenido de la publicación debe tener entre 5 y 144 caracteres."
        )
        .max(
          144,
          "El contenido de la publicación debe tener entre 5 y 144 caracteres."
        ),
    }),
    onSubmit: async (FormData) => {
      if (await postPublication(FormData, user.id)) {
        formik.handleReset();
      }
    },
  });

  // --------------------------------------------------------------------------------
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Contenido de la Publicación:</label>
        <input
          type="text"
          className="form-control"
          name="text"
          onChange={formik.handleChange}
          value={formik.values.text}
        ></input>
        {formik.errors.text && (
          <small className="text-danger">{formik.errors.text}</small>
        )}
      </div>
      <button type="submit" className="btn btn-primary">
        Crear Publicación
      </button>
    </form>
  );
};
