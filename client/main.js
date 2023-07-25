const baseUrl = 'http://localhost:3000/api/users'

// Put DOM elements into variables
const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone')
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');


// Retrieve user details from local storage if present
// let users= localStorage.getItem('users');
// users = users ? JSON.parse(users) : [];

// // Display existing users from local storage 
// displayUsers();

document.addEventListener('DOMContentLoaded', () => {
  // Retrieve and display users from the API
  axios.get(baseUrl)
    .then((res) => {
      displayUsers(res.data)
      console.log(res.data)
    })
    .catch((err) => console.log(err));

  // Listen for form submit
  myForm.addEventListener('submit', onSubmit);
});

function onSubmit(e) {
  e.preventDefault();

  if (nameInput.value === '' || emailInput.value === '' || phoneInput.value === '') {
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';
    setTimeout(() => msg.remove(), 3000);
  } else {
    // Create user object
    const user = {
      name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value
    };


    // Add user to users array
    // users.push(user);

    // Store users array in local storage

    axios
      .post(
        baseUrl,
        user
      )
      .then(() => {
        // Retrieve updated list of users and display them
        axios
          .get(baseUrl)
          .then((res) => displayUsers(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));


    // localStorage.setItem('users', JSON.stringify(users));

    // Display users
    // displayUsers();

    // Clear fields
    nameInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';
  }
}

// Display users from local storage
function displayUsers(data) {
  // Clear existing user list
  userList.innerHTML = '';


  // Loop through users array and create list items
  if (Array.isArray(data)) {
    data.forEach((user) => {
      const li = document.createElement('li');
      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = 'Delete';
      deleteButton.addEventListener('click', () => deleteUser(user.id)); // Add event listener to delete button
      deleteButton.className = 'deleteBtn'



      const editButton = document.createElement('button');
      editButton.innerHTML = 'Edit';
      editButton.addEventListener('click', () => editUser(user.id)); // Add event listener to edit button
      editButton.className = 'editBtn'

      li.appendChild(document.createTextNode(`${user.name}: ${user.email} : ${user.phone}`));
      li.appendChild(editButton);
      li.appendChild(deleteButton);
      userList.appendChild(li);
    })
  };
}


// Delete user from users array and update local storage
function deleteUser(userId) {
  axios
    .delete(
      `${baseUrl}/${userId}`
    )
    .then(() => {
      // Refresh the user list
      axios
        .get(baseUrl)
        .then((res) => displayUsers(res.data))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function editUser(userId) {
  axios
    .get(`${baseUrl}/${userId}`)
    .then((res) => {
      // Prefill input boxes with user data
      nameInput.value = res.data.name;
      emailInput.value = res.data.email;
      phoneInput.value = res.data.phone;

      // Update form submit event listener to update user data
      myForm.removeEventListener('submit', onSubmit);
      myForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const updatedUser = {
          name: nameInput.value,
          email: emailInput.value,
          phone: phoneInput.value
        };

        axios
          .put(
            `${baseUrl}/${userId}`,
            updatedUser
          )
          .then(() => {
            // Retrieve updated list of users and display them
            axios
              .get(baseUrl)
              .then((res) => displayUsers(res.data))
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));

        // Clear fields
        nameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';

        // Reset form submit event listener to original onSubmit function
        myForm.removeEventListener('submit', onSubmit);
        myForm.addEventListener('submit', onSubmit);
      });
    })
    .catch((err) => console.log(err));
}







