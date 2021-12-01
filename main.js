const findGender = async () => {
    const response = await fetch('https://api.genderize.io/?name=hassan');
    const responseJson = await response.json(); //extract JSON from the http response
    console.log(responseJson);
}
