async function allPlugs() {
    const fetchRes = await fetch("http://localhost:4567/plugs")
    const plugs = await fetchRes.json()

    const tableBody = document.querySelector('#plugs-table tbody');

    plugs.records.forEach(plug => {
        const id = plug.id
        const plug_type = plug.plug_type
        const tableRow = `
          <tr>
            <td class="text-start">${plug_type}</td>
            <td class="text-start">
                <div class="d-inline-block">
                    <button class="btn btn-warning" onclick="location.href='/editPlug.html?id=${id}'">Edit</button>
                    <button class="btn btn-danger" onclick="removePlug('${id}')">Delete</button>
                </div>
            </td>
          </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', tableRow)
    })
}

async function addPlug(event) {
    event.preventDefault()
    const form = event.target;

    const plug_type = form.plug_type.value;

    const fetchRes = await fetch("http://localhost:4567/plugs/add", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            plug_type: plug_type
        })
    })
    
    if (fetchRes.ok)  {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Plug submitted successfully!'
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Plug submission failed!'
      });
    }

    form.reset();
}

async function removePlug(id) {
    const confirmed = await Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: 'You will not be able to recover this plug!',
        showCancelButton: true,
        confirmButtonText: 'Yes, remove it!',
        cancelButtonText: 'No, keep it'
    });

    if (confirmed.isConfirmed) {
        const fetchRes = await fetch(`http://localhost:4567/plugs/remove`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        })

        if (fetchRes.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Plug removed successfully!'
            }).then(() => {
                location.reload()
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Plug removal failed!'
            });
        }
    }
}

async function getPlug(id) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id
        })
    };

    const fetchRes = await fetch("http://localhost:4567/plugs", options)
    const plug = await fetchRes.json()
    return plug
}

async function fillPlugEdit(id){
    const plug = await getPlug(id);
    document.getElementById('id').value = plug.id;
    document.getElementById('plug_type').value = plug.plug_type;
}

async function editPlug(event) {
    event.preventDefault()
    const form = event.target;

    const id = form.id.value;
    const plug_type = form.plug_type.value;

    const fetchRes = await fetch("http://localhost:4567/plugs/update", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            plug_type: plug_type
        })
    })

    if (fetchRes.ok)  {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Car edited successfully!'
        }).then(() => {
          // reload the page after user clicks OK on the success message
          location.href = '/plugs.html';
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Car edit failed!'
        });
      }
}

async function printPlugs(id) {
    const selectElement = document.getElementById('plug_types');

    const fetchRes = await fetch("http://localhost:4567/plugs")
    const plugs = await fetchRes.json()

    plugs.records.forEach(plug => {
        const plugDiv = document.createElement('div');
        plugDiv.classList.add('input-group', 'mb-3');

        const checkboxDiv = document.createElement('div');
        checkboxDiv.classList.add('input-group-text');

        const checkbox = document.createElement('input');
        checkbox.classList.add('form-check-input');
        checkbox.type = 'checkbox';
        checkbox.value = plug.id;
        checkboxDiv.appendChild(checkbox);

        const plugTypeSpan = document.createElement('span');
        plugTypeSpan.classList.add('input-group-text', 'flex-grow-1');
        plugTypeSpan.innerText = plug.plug_type;


        plugDiv.appendChild(checkboxDiv);
        plugDiv.appendChild(plugTypeSpan);

        selectElement.appendChild(plugDiv);
    });

    
    if (id != null) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                car_id: id
            })
        }

        const fetchRes = await fetch("http://localhost:4567/cars/plugs", options)
        const carPlugs = await fetchRes.json()

        carPlugs.records.forEach(carPlug => {
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                if (checkbox.value === carPlug.plug_id.id) {
                    checkbox.checked = true;
                }
            });
        });
    }

}