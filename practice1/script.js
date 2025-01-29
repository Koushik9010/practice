const submit = document.getElementById("submit");

//console.log({ fname, lname, submit });

submit.onclick = function () {
  const firstName = document.getElementById("fname").value;
  const lastName = document.getElementById("lname").value;

  if (firstName.trim().length <= 2 || lastName.trim().length <= 2)
    return alert("Please enter valid names with more than 2 characters");

  //alert(`${firstName} ${lastName}`);

  //document.getElementById("firstName").innerText = `Full Name: ${firstName} ${lastName}`;
  document.getElementById("firstName").innerText = `First Name: ${firstName}`;
  document.getElementById("lastName").innerText = `Last Name: ${lastName}`;
};
