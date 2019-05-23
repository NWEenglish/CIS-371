const el = document.getElementById('numSlider');
el.addEventListener('change', sliderListener);

function sliderListener(ev) {
    alert('Slider value is ' + ev.target.value);
    const ulParent = document.getElementById("itemList");
    const len = Number(ev.target.value);

    const elOut = document.getElementById('userCount');
    elOut.innerText = ev.target.value;

    const elSeedOut = document.getElementById('randSeed');
    elSeedOut.innerText = 12345678;

    // Removes items from the list.
    const items = document.querySelectorAll('#itemList > li');
    for (let z of items) {
        ulParent.removeChild(z);
    }

    // Adds items to the list.
    for (let k = 0; k < len; k++) {
        const liChild = document.createElement('li');
        const liText = document.createTextNode('Item#' + k);
        liChild.appendChild(liText);
        ulParent.appendChild(liChild);
    }

    fetch('https://randomuser.me/api?results=3')
        .then(convertRequestToJson)
        .then(showData);
}

function convertRequestToJson(r) {
    return r.json();
}

function showData(d) {
    console.log('Got some data', d);

    let k = 0;

    for (let k = 0; k < d.info.results; k++) {
        const ulParent = document.getElementById("randUser");
        const liChild = document.createElement('li');
        const liText = document.createTextNode('Item#' + k + " " + 
            d.results[k].name.first + " " + d.results[k].name.last);
        liChild.appendChild(liText);
        ulParent.appendChild(liChild);
    }
}
