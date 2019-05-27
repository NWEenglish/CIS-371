const el = document.getElementById('numSlider');
el.addEventListener('change', sliderListener);

function sliderListener(ev) {
    console.log('Slider value is ' + ev.target.value);
    const ulParent = document.getElementById("itemList");
    const len = Number(ev.target.value);
    const link = "https://randomuser.me/api?results=" + len;

    const elOut = document.getElementById('userCount');
    elOut.innerText = ev.target.value;

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

    fetch(link)
        .then(r => r.json())
        .then(d => {
            console.log('Got some data', d);
            const tbParent = document.getElementById("randUser");

            // Remove previous items from list.
            for (let k = document.getElementById("randUser").rows.length - 1; k > 0; k--) {
                document.getElementById("randUser").deleteRow(k);
            }

            // Adds items to the table.
            for (let k = 0; k < d.info.results; k++) {

                // Creates a new row.
                const tbRow = tbParent.insertRow(k+1);
                const cell1 = tbRow.insertCell(0);
                const cell2 = tbRow.insertCell(1);
                const cell3 = tbRow.insertCell(2);
                const cell4 = tbRow.insertCell(3);
                const cell5 = tbRow.insertCell(4);
                const cell6 = tbRow.insertCell(5);

                // Populates each cell.
                cell1.innerHTML = d.results[k].name.first + " " + d.results[k].name.last;
                cell2.innerHTML = d.results[k].email;
                cell3.innerHTML = d.results[k].login.username;
                cell4.innerHTML = d.results[k].phone;
                cell5.innerHTML = d.results[k].dob.date.split('T')[0];
                cell6.innerHTML = "<img src=" + d.results[k].picture.thumbnail + "></img>";
            }
        });
}
