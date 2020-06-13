export default function() {
  return [
    {
      title: "Cursos",
      to: "/home",
      htmlBefore: '<i class="material-icons">class</i>',
      htmlAfter: ""
    },
    {
      title: "Nuevo curso",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/nuevoCurso",
    },
    {
      title: "Nuevo alumno",
      htmlBefore: '<i class="material-icons">class</i>',
      to: "/nuevoAlumno",
    },
    {
      title: "Alumnos",
      htmlBefore: '<i class="material-icons">person_search</i>',
      to: "/alumnos",
    }
    /*{
      title: "Forms & Components",
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: "/components-overview",
    },
    {
      title: "Tables",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/tables",
    },
    {
      title: "User Profile",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/user-profile-lite",
    },
    {
      title: "Errors",
      htmlBefore: '<i class="material-icons">error</i>',
      to: "/errors",
    }*/
  ];
}
