const findGender = async () => {
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
    } else {
        document.getElementById("error-container").style.visibility = 'visible'; //Show error container when input name is ok
    }
}

const checkUserInput = (inp) => {
    let regExpression = /^[a-zA-Z\s]*$/;
    if (inp.length > 255 || !regExpression.test(inp)) {
        return false;
    } else {
        return true;
    }
}
