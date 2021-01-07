let signup = (() => {

    const createElement = (name, inputClass, type = 'div', classOrID = 'id') => {
        let variable = document.createElement(type);
        variable.setAttribute(classOrID, name);
        if (inputClass) {
            variable.setAttribute('class', inputClass)
        }
        return variable;;
    }