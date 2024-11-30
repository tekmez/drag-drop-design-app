export const saveDesign = (design: object) => {
    localStorage.setItem("design", JSON.stringify(design));
  };
  
  export const loadDesign = () => {
    const design = localStorage.getItem("design");
    return design ? JSON.parse(design) : null;
  };