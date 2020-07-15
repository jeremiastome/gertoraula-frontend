import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, findRenderedComponentWithType } from "react-dom/test-utils";
import { Col } from "shards-react";
import Alumnos from "../components/alumnos/Alumnos";
import 'mutationobserver-shim';
import { useAuth0 } from "./../react-auth0-spa";
import Alumno from "../components/alumnos/Alumno";


const user = {
  email: 'testUser@gmail.com',
  email_verified: true,
  sub: 'google-oauth2|2147627834623744883746',
};

jest.mock('./../react-auth0-spa');

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

  useAuth0.mockReturnValue({
    isAuthenticated: true,
    user,
    datosDeUsuario : {rol: '' },
    logout: jest.fn(),
    loginWithRedirect: jest.fn(),
  });
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
        nombre: "Carlos",
        apellido: "Rodriguez"
    },{
      id: 3,
      nombre: "Martin",
      apellido: "Perez"
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

  const alumnosRender = container.querySelectorAll("[data-testid='alumnoId']");

  expect(alumnosRender.length).toEqual(3);  
});