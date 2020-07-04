import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Alumnos from "../components/alumnos/Alumnos";
import 'mutationobserver-shim';

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
        pathname: "localhost:3000/curso",
        asistencias : [],
        fecha : new Date(),
        asistenciasAEliminar : [],
        cursoId : 1,
        cursoName : "Curso test"
    })    
}));

let container = null;
beforeEach(() => {
  // configurar un elemento del DOM como objetivo del renderizado
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // limpieza al salir
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renderiza datos de usuario", async () => {
    const alumno = {
        id: 1,
        nombre: "Joni",
        apellido: "Baez"
    };
      
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve([alumno])
    })
  );

  await act(async () => {
    render(<Alumnos data-testid="alumnoId" />, container);
  });

  const title = container.querySelector("[data-testid='title']");
  expect(title.textContent).toEqual("Curso Curso test");  

  const alumnos = container.querySelector("[data-testid='alumnos']");
  //expect(alumnos.length).toEqual("Joni");  
});