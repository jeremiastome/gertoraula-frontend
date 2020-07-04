import classNames from "classnames";

export const Classes = {

    cardBodyClasses : classNames(
       "1" === "1" ? "p-0 d-flex" : "px-0 pb-0"
    ),
    
    valueClasses : classNames(
        "stats-small__value",
        "count",
        "1" === "1" ? "my-3" : "m-0"
    ),

    innerWrapperClasses : classNames(
        "d-flex",
        "1" === "1" ? "flex-column m-auto" : "px-3"
    ),

    dataFieldClasses : () => {
        return { 
        borderRadius: '0.5rem',
        boxShadow: '0 0.46875rem 2.1875rem rgba(90,97,105,.1), 0 0.9375rem 1.40625rem rgba(90,97,105,.1), 0 0.25rem 0.53125rem rgba(90,97,105,.12),0 0.125rem 0.1875rem rgba(90,97,105,.1);'
        }
    },

    cardClasses : classNames(
      "stats-small",
      true && `stats-small--1`
    ),

    dataFieldClasses2 : classNames(
        "stats-small__data",
        "1" === ",1" && "text-center"
    ),

    labelClasses : classNames(
        "stats-small__label",
        "text-uppercase",
        "1" !== "1" && "mb-1"
    ),

    canvasHeight : () =>  {
        if("1" === "1") {
            return 0;
        }
        return 0
    }
    
};
