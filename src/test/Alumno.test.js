import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { useHistory, useLocation } from 'react-router-dom';
import { act } from "react-dom/test-utils";
import Alumno from "../components/alumnos/Alumno";

var location;
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
        pathname: "localhost:3000/curso",
        asistencias: [],
        asistenciasAEliminar: []
    })    
}));

var container;
beforeEach(() => {    
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renderiza un alumno de la lista", async () => {  
  const alumno = {
    id: 1,
    nombre: "Joni",
    apellido: "Baez"
  };
  
  act(() => {
    render(<Alumno 
        id={`small-stats-${alumno.id}`}
        variation="1"
        value={alumno.nombre +' '+ alumno.apellido}
        select={() => {}}
        alumno={alumno}
        refresh={() => {}}/>, container);
  });

  const nombreLabel = container.querySelector("[data-testid='nombre']");
  expect(nombreLabel.textContent).toEqual("Joni Baez");
});


it("al hacer click cambia el color del background", async () => {  
    const alumno = {
      id: 1,
      nombre: "Joni",
      apellido: "Baez"
    };
    
    act(() => {
      render(<Alumno 
          id={`small-stats-${alumno.id}`}
          variation="1"
          value={alumno.nombre +' '+ alumno.apellido}
          select={() => {}}
          alumno={alumno}
          refresh={() => {}}/>, container);
    });
  
    const card = container.querySelector("[data-testid='cardId']");
    const cardBody = container.querySelector("[data-testid='cardBodyId']");

    expect(card.style).toHaveProperty('background', 'rgb(128, 203, 196)');
   
    act(() => {
        cardBody.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(card.style).toHaveProperty('background', '');

    act(() => {
        cardBody.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(card.style).toHaveProperty('background', 'rgb(128, 203, 196)');
  });