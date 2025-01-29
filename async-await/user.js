const userDetailsDiv = document.getElementById("user-details");

// Function to fetch and display user details
const fetchUserDetails = async () => {
  let urlParams = new URLSearchParams(window.location.search);
  let userId = urlParams.get("id");

  if (!userId) {
    userDetailsDiv.innerHTML = "<h2>User ID not found!</h2>";
    return;
  }

  try {
    let result = await fetch(`https://dummyjson.com/users/${userId}`);
    let user = await result.json();

    let userDetails = `
      <div class="user-card">
        <img src="${user.image}" alt="User Image" />
        <h3>${user.firstName} ${user.lastName}</h3>
        <p><strong>Age:</strong> ${user.age}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
        <p><strong>Address:</strong> ${user.address.address}, ${user.address.city}</p>
        <p><strong>Company:</strong> ${user.company.name}</p>
      </div>
    `;

    userDetailsDiv.innerHTML = userDetails;
  } catch (error) {
    userDetailsDiv.innerHTML = `<h2>Error fetching user details: ${error.message}</h2>`;
  }
};

// Fetch user details on page load
window.addEventListener("load", fetchUserDetails);
