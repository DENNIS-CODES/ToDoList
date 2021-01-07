let signup = (() => {

    const createElement = (name, inputClass, type = 'div', classOrID = 'id') => {
        let variable = document.createElement(type);
        variable.setAttribute(classOrID, name);
        if (inputClass) {
            variable.setAttribute('class', inputClass)
        }
        return variable;;
    }
     //change tempDiv to body once out of VSCode initialized template
     let signInContainer = createElement('signInContainer');
     const tempDiv = document.querySelector('body');
     tempDiv.appendChild(signInContainer);
 
     let companyNameContainer = createElement('companyNameContainer');
     let companyName = document.createElement('img')
     companyName.setAttribute('id', 'companyName')
     companyName.src = "images/logo_transparent.png"
     companyNameContainer.appendChild(companyName)
 
     let welcomeContainer = createElement('welcomeContainer');
     let welcomeText = createElement('welcomeText');
     welcomeText.innerHTML = "Welcome Back!"
     welcomeContainer.appendChild(welcomeText)
 
     let signInButton = createElement('signInButton', "button");
     let signInButtonText = createElement('signInButtonText');
     signInButtonText.innerHTML = "Sign In"
     signInButton.appendChild(signInButtonText)