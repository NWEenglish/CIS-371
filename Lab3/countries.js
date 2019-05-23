const showIndividualCountry = snapshot => {
  const country = snapshot.val();
  // Use backquotes (not "forward" quoates) for JS string interpolation
  console.log(`Key ${snapshot.key}: ${country.name}`);
  
  // Adds items to the table
  const tbParent = document.getElementById("countries");
  const tbRow = tbParent.insertRow(1);
  const cell1 = tbRow.insertCell(0);
  const cell2 = tbRow.insertCell(1);
  const cell3 = tbRow.insertCell(2);
  const cell4 = tbRow.insertCell(3);
  const cell5 = tbRow.insertCell(4);

  tbRow.setAttribute("id", `${snapshot.key}`);
  cell1.innerHTML = `${country.name}`;
  cell2.innerHTML = `${country.code}`;
  cell3.innerHTML = `${country.capital}`;
  cell4.innerHTML = `${country.population}`;
  cell5.innerHTML = `${country.region}`;
};

const showData = snapshot => {
  const data = snapshot.val();
  console.log(`Key ${snapshot.key}: ${data}`);
};


let targetRef = firebase.database().ref("countries");
targetRef.set(null); // delete the entire country data

let dbRef = firebase.database().ref("countries");

const whoIsGone = snapshot => {
  const country = snapshot.val();
  console.log(`Country Removed: ${snapshot.key} = ${country.name}`);
  
  var row = document.getElementById(`${snapshot.key}`);
  row.parentNode.removeChild(row);

};

dbRef.on("child_removed", whoIsGone);

// Region: Asia
dbRef.push().set({
  name: "Afghanistan",
  code: "AFG",
  capital: "Kabul",
  population: 27657145,
  region: "Asia"
});

dbRef.push().set({
  name: "Bahrain",
  code: "BHR",
  capital: "Manama",
  population: 1404900,
  region: "Asia"
});

// Region: Africa
dbRef.push().set({
  name: "Benin",
  code: "BEN",
  capital: "Porto-Novo",
  population: 10653654,
  region: "Africa"
});

dbRef.push().set({
  name: "Burkina Faso",
  code: "BFA",
  capital: "Ouagadougou",
  population: 272967,
  region: "Africa"
});

// Region: Europe
dbRef.push().set({
  name: "Germany",
  code: "DEU",
  capital: "Berlin",
  population: 81770900,
  region: "Europe"
});

dbRef.push().set({
  name: "France",
  code: "FRA",
  capital: "Paris",
  population: 66710000,
  region: "Europe"
});

// Region: Americas
dbRef.push().set({
  name: "United States of America",
  code: "USA",
  capital: "Washington, D.C.",
  population: 323947000,
  region: "Americas"
});

dbRef.push().set({
  name: "Canada",
  code: "CAN",
  capital: "Ottawa",
  population: 36155487,
  region: "Americas"
});

// Region: Oceania
dbRef.push().set({
  name: "Australia",
  code: "AUS",
  capital: "Canberra",
  population: 24117360,
  region: "Oceania"
});

dbRef.push().set({
  name: "New Zealand",
  code: "NZL",
  capital: "Wellington",
  population: 4697854,
  region: "Oceania"
});

dbRef.on("value", showData);

console.log("DEBUG: Before calling ON");
dbRef.on("child_added", showIndividualCountry);
console.log("DEBUG: After calling ON");
