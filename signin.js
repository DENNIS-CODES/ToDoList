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

     let emailPasswordContainer = createElement('emailPasswordContainer');
     let emailContainer = createElement('emailContainer')
     let emailInputArea = createElement('emailInputArea', "", 'textarea');
     emailInputArea.setAttribute('name', 'email')
     emailInputArea.setAttribute('scroll', 'none')
     emailInputArea.setAttribute('placeholder', 'Email Address')
     let emailIcon = createElement('emailIcon', "icon", "img")
     emailIcon.src = "images/envelope.svg"
     emailContainer.appendChild(emailIcon)
     emailContainer.appendChild(emailInputArea)
     emailPasswordContainer.appendChild(emailContainer)
 
     let passwordInputArea = createElement('passwordInputArea', "", 'input');
     let passwordContainer = createElement('passwordContainer')
     passwordInputArea.setAttribute('name', 'password')
     passwordInputArea.setAttribute('placeholder', "Password")
     passwordInputArea.setAttribute('type', "password")
     let passwordIcon = createElement('passwordIcon', "icon", "img")
     passwordIcon.src = "images/padlock.svg"
     passwordContainer.appendChild(passwordIcon)
     passwordContainer.appendChild(passwordInputArea)
     emailPasswordContainer.appendChild(passwordContainer)