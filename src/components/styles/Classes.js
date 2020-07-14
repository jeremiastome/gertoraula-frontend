import classNames from "classnames";

export const Classes = {

    cardBodyClasses : classNames(
       "p-0 d-flex"
    ),
    
    valueClasses : classNames(
        "stats-small__value",
        "count",
        "my-3" 
    ),

    innerWrapperClasses : classNames(
        "d-flex",
        "flex-column m-auto"
    ),

    dataFieldClasses : () => {
        return { 
        borderRadius: '0.5rem',
        boxShadow: '0 0.46875rem 2.1875rem rgba(90,97,105,.1), 0 0.9375rem 1.40625rem rgba(90,97,105,.1), 0 0.25rem 0.53125rem rgba(90,97,105,.12),0 0.125rem 0.1875rem rgba(90,97,105,.1);'
        }
    },

    cardClasses : classNames(
      "stats-small",
      `stats-small--1`
    ),

    dataFieldClasses2 : classNames(
        "stats-small__data",
        "text-center"
    ),

    labelClasses : classNames(
        "stats-small__label",
        "text-uppercase",
         "mb-1"
    ),

    canvasHeight : () =>  {
        return 0
    }
    
};
