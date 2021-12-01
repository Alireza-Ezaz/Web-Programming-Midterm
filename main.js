// This function sends and get request to determine the gender and finally shows data on html page
const findGender = async () => {
    document.getElementById("saved-answer").innerHTML = null; // empty the saved answer when new request comes
    let name = document.getElementById('name').value;
    if (checkUserInput(name)) {
        document.getElementById("error-container").style.visibility = 'hidden'; //Hide error container when input name is ok and previous request had errors
        const response = await fetch('https://api.genderize.io/?name=' + name);
        let person = {name: '', gender: '', probability: 0, count: 0};
        await response.json().then(result => {  //extract JSON from the http response and store in javascript object
            person.count = result['count'];
            person.name = result['name'];
            person.gender = result['gender'];
            person.probability = result['probability'];
        });
        document.getElementById("prediction-probability").innerHTML = person.probability; // show the probability in html
        document.getElementById("prediction-gender").innerHTML = person.gender; // show the gender in html
        if (localStorage.getItem(name) != null) {
            document.getElementById("saved-answer").innerHTML = localStorage.getItem(name); // show the saved answer if exists
        }
        if (person.gender == null) { // check errors from server
            document.getElementById("error-container").innerHTML = 'Server does not know the answer';
            document.getElementById("error-container").style.visibility = 'visible';
        }
        if (person.gender != null) { // select a default value for radio button based on prediction (You can still change it)
            document.getElementById(person.gender.toLowerCase()).checked = true;
        }
    } else { // show error container when input is invalid
        document.getElementById("error-container").innerHTML = 'Name is invalid. Try again with new name';
        document.getElementById("error-container").style.visibility = 'visible'; //Show error container when input name is ok
    }
}

// This function saves the name and gender in localstorage
const saveAnswer = () => {
    let name = document.getElementById('name').value;
    let genderToSave = document.querySelector('input[name="radio1"]:checked') != null
        ? document.querySelector('input[name="radio1"]:checked').value
        : null;
    if (checkUserInput(name) && genderToSave != null) { // Save name and gender in localStorage if inputs are ok
        document.getElementById("error-container").style.visibility = 'hidden'; //Hide error container when input name is ok
        localStorage.setItem(name, genderToSave);
        document.getElementById("saved-answer").innerHTML = genderToSave;
    } else {
        document.getElementById("error-container").innerHTML = 'Cannot save. Make sure you selected the gender and typed the name';
        document.getElementById("error-container").style.visibility = 'visible'; //Show error container when input name is ok
    }
}

// This function removes the name and gender from localstorage
const removeSavedAnswer = () => {
    let savedAnswerToRemove = document.getElementById('saved-answer').innerHTML;
    console.log(savedAnswerToRemove);
    if (savedAnswerToRemove != null) { // If the name was saved before this will remove it
        localStorage.removeItem(document.getElementById('name').value);
    }
    document.getElementById('saved-answer').innerHTML = null;
}

//This function checks weather the input value is in wrong format or no
const checkUserInput = (inp) => {
    let regExpression = /^[a-zA-Z\s]*$/; // RegEx to accept only letters and space
    if (inp.length <= 0 || inp.length > 255 || !regExpression.test(inp)) { // returns false if min or max size not considered or regEx
        return false;
    } else {
        return true;
    }
}
