import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, findRenderedComponentWithType } from "react-dom/test-utils";
import Alumnos from "../components/alumnos/Alumnos";
import 'mutationobserver-shim';
import Alumno from "../components/alumnos/Alumno";

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
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renderiza lista de alumnos", async () => {
    const alumnos = [{
        id: 1,
        nombre: "Joni",
        apellido: "Baez"
    },{
        id: 2,
        nombre: "Joni",
        apellido: "Baez"
    }
  ];
      
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(alumnos)
    })
  );

  await act(async () => {
    render(<Alumnos data-testid="alumnoId" />, container);
  });

  const title = container.querySelector("[data-testid='title']");
  expect(title.textContent).toEqual("Curso Curso test");  
});