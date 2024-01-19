async function allUsers() {
    const fetchRes = await fetch("http://localhost:4567/users")
    const users = await fetchRes.json()

    const tableBody = document.querySelector('#users-table tbody');

    users.records.forEach(user => {
        const id = user.id
        const name = user.username
        const email = user.email
        const tableRow = `
            <tr>
                <td class="text-start">${name}</td>
                <td class="text-start">${email}</td>
                <td class="text-start">
                    <div class="d-inline-block">
                        <button class="btn btn-warning" onclick="location.href='/editUser.html?id=${id}'">Edit</button>
                        <button class="btn btn-danger" onclick="removeUser('${id}')">Delete</button>
                    </div>
                </td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', tableRow)
    })
}

async function addUser(event) {
    event.preventDefault()
    const form = event.target;

    const name = form.username.value;
    const email = form.email.value;
    const password = form.password.value;

    const fetchRes = await fetch("http://localhost:4567/users/add", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: name,
            email: email,
            password: password
        })
    })

    if (fetchRes.ok)  {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'User submitted successfully!'
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'User submission failed!'
      });
    }
    
    form.reset();
}

async function removeUser(id) {

    const confirmed = await Swal.fire({
    icon: 'warning',
    title: 'Are you sure?',
    text: 'You are about to delete this user. This action cannot be undone.',
    showCancelButton: true,
    confirmButtonText: 'Yes, remove it!',
    cancelButtonText: 'No, cancel'
  });

    if(confirmed.isConfirmed) {
        fetchRes = await fetch(`http://localhost:4567/users/remove`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        })
        if (fetchRes.ok)  {
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'User deleted successfully!'
            }).then(() => {
                location.reload();
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'User deletion failed!'
            });
        }
    }
}

async function editUser(event) {
    event.preventDefault()
    const form = event.target;

    const name = form.username.value;
    const email = form.email.value;
    const password = form.password.value;

    const fetchRes = await fetch("http://localhost:4567/users/update", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: form.id.value,
            username: name,
            email: email,
            password: password
        })
    })

    if (fetchRes.ok) {
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'User updated successfully!'
        }).then(() => {
            location.href = '/users.html';
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'User update failed!'
        });
    }

}

async function fillUserEdit(id) {
    
    const fetchRes = await fetch(`http://localhost:4567/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id
        })
    })
    const user = await fetchRes.json()

    document.getElementById('id').value = user.id;
    document.getElementById('username').value = user.username;
    document.getElementById('email').value = user.email;
    document.getElementById('password').value = user.password;
}