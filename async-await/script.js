const displayDiv = document.getElementById("display-users");

const displayData = async (data) => {
  let tableMarkup = `
          <thead>
              <tr>
                  <th>Number</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Details</th>
              </tr>
          </thead>
          <tbody>
  `;

  data?.users.forEach((value, index) => {
    tableMarkup += `
          <tr>
              <td>${index + 1}</td>
              <td><img src=${value.image}></td>
              <td>${value.firstName} ${value.lastName}</td>
              <td>${value.age}</td>
              <td>${value.email}</td>
              <td>${value.phone}</td>
              <td>
                <button class="info-btn" data-user-id="${value.id}">
                  <i class="fa-solid fa-info"></i>
                </button>
              </td>
          </tr>
      `;
  });

  tableMarkup += `</tbody></table>`;
  displayDiv.innerHTML = tableMarkup;

  // Attach event listeners after inserting the table
  document.querySelectorAll(".info-btn").forEach((button) => {
    button.addEventListener("click", function () {
      let userId = this.getAttribute("data-user-id");
      window.open(`user.html?id=${userId}`, "_blank");
    });
  });
};

const fetchData = async () => {
  try {
    let result = await fetch("https://dummyjson.com/users", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    let data = await result.json();
    displayData(data);
  } catch (error) {
    alert(error.message);
  }
};
