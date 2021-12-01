const findGender = async () => {
    document.getElementById("saved-answer").innerHTML = ''; // empty the saved answer when new request comes
    let name = document.getElementById('name').value;
    if (checkUserInput(name)) {
        document.getElementById("error-container").style.visibility = 'hidden'; //Hide error container when input name is ok
        console.log(name);
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
            document.getElementById("saved-answer").innerHTML = localStorage.getItem(name);
        }
        if (person.gender == null) {
            document.getElementById("error-container").innerHTML = 'Server does not know the answer';
            document.getElementById("error-container").style.visibility = 'visible';
        }
    } else {
        document.getElementById("error-container").innerHTML = 'Name is invalid. Try again with new name';
        document.getElementById("error-container").style.visibility = 'visible'; //Show error container when input name is ok
    }
}

const saveGender = () => {
    let name = document.getElementById('name').value;
    let genderToSave = document.querySelector('input[name="radio1"]:checked') != null
        ? document.querySelector('input[name="radio1"]:checked').value
        : null;
    if (checkUserInput(name) && genderToSave != null) {
        document.getElementById("error-container").style.visibility = 'hidden'; //Hide error container when input name is ok
        localStorage.setItem(name, genderToSave);
    } else {
        document.getElementById("error-container").innerHTML = 'Cannot save. Make sure you selected the gender and typed the name';
        document.getElementById("error-container").style.visibility = 'visible'; //Show error container when input name is ok
    }
}

const checkUserInput = (inp) => {
    let regExpression = /^[a-zA-Z\s]*$/;
    if (inp.length <= 0 || inp.length > 255 || !regExpression.test(inp)) {
        return false;
    } else {
        return true;
    }
}
