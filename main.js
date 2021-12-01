const findGender = async () => {
    let name = document.getElementById('name').value;
    console.log(name);
    const response = await fetch('https://api.genderize.io/?name=' + name);
    const responseJson = await response.json(); //extract JSON from the http response
    console.log(responseJson);
}
