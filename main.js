const findGender = async () => {
    let name = document.getElementById('name').value;
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
}
