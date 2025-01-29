const displayDiv = document.getElementById("display-users");

window.addEventListener("load", async () => {
  let urlParams = new URLSearchParams(window.location.search);
  if (urlParams) {
    let id = urlParams.get("id");

    if (!id) return;
    try {
      let result = await fetch("https://dummyjson.com/users/" + id);
      let data = await result.json();
      displayDiv.innerHTML = JSON.stringify(data);
    } catch (error) {
      alert(error.messaage);
    }
  }
});

const displayData = async (data) => {
  // let data = await fetchData()

  data?.users.map((value, index) => {
    let htmlMarkup = `
            <div class="user-card" id="${index}">
                <img src="${value.image}" />
                <h3>${index + 1}. ${value.firstName} ${value.lastName}</h3>
                <p>Age: ${value.age}</p>
                <p>Email: ${value.email}</p>
                <p>Phone: ${value.phone}</p><a href="./user.html?id=${value?.id}" target="_blank">See user details</a>
            </div>
        `;

    displayDiv.insertAdjacentHTML("beforeend", htmlMarkup);
  });
};

const fetchData = async () => {
  try {
    let result = await fetch("https://dummyjson.com/user", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    let data = await result.json();
    displayData(data);
  } catch (error) {
    alert(error.messaage);
  }
};
