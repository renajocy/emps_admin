async function cars1() {
    const fetchRes = await fetch("http://localhost:4567/cars")
    const cars = await fetchRes.json()

    const tableBody = document.querySelector('#cars-table tbody');

    cars.records.forEach(car => {
        const id = car.id
        const model = car.model
        const battery = car.battery_capacity
        const range = car.real_range
        const efficiency = car.efficiency
        const tableRow = `
          <tr>
            <td class="text-start">${model}</td>
            <td class="text-end">${battery}</td>
            <td class="text-end">${range}</td>
            <td class="text-end">${efficiency}</td>
            <td class="text-start">
                <div class="d-inline-block">
                    <button class="btn btn-warning" onclick="location.href='/editCar.html?id=${id}'">Edit</button>
                    <button class="btn btn-danger" onclick="removeCar('${id}')">Delete</button>
                </div>
            </td>
          </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', tableRow)
    })

    fetchRes = await fetch("http://localhost:4567/cars1")
    cars = await fetchRes.json()

    cars.records.forEach(car => {
        const id = car.id
        const model = car.model
        const battery = car.battery_capacity
        const range = car.real_range
        const efficiency = car.efficiency
        const tableRow = `
          <tr>
            <td class="text-start">${model}</td>
            <td class="text-end">${battery}</td>
            <td class="text-end">${range}</td>
            <td class="text-end">${efficiency}</td>
            <td class="text-start">
                <div class="d-inline-block">
                    <button class="btn btn-warning" onclick="location.href='/editCar.html?id=${id}'">Edit</button>
                    <button class="btn btn-danger" onclick="removeCar('${id}')">Delete</button>
                </div>
            </td>
          </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', tableRow)
    })
}

async function cars2() {
    const fetchRes = await fetch("http://localhost:4567/cars1")
    const cars = await fetchRes.json()

    const tableBody = document.querySelector('#cars-table tbody');

    cars.records.forEach(car => {
        const id = car.id
        const model = car.model
        const battery = car.battery_capacity
        const range = car.real_range
        const efficiency = car.efficiency
        const tableRow = `
          <tr>
            <td class="text-start">${model}</td>
            <td class="text-end">${battery}</td>
            <td class="text-end">${range}</td>
            <td class="text-end">${efficiency}</td>
            <td class="text-start">
                <div class="d-inline-block">
                    <button class="btn btn-warning" onclick="location.href='/editCar.html?id=${id}'">Edit</button>
                    <button class="btn btn-danger" onclick="removeCar('${id}')">Delete</button>
                </div>
            </td>
          </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', tableRow)
    })
}

async function addCar(event) {
    event.preventDefault()
    const form = event.target;

    const model = form.model.value;
    const battery = form.battery_capacity.value;
    const range = form.real_range.value;
    const efficiency = form.efficiency.value;

    const plugs = form.querySelectorAll('input[type="checkbox"]');
    

    const fetchRes = await fetch("http://localhost:4567/cars/add", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          model: model,
          battery_capacity: battery,
          real_range: range,
          efficiency: efficiency
      })
    })

    const fetchResJson = await fetchRes.json();

    plugs.forEach(async (plug) => {
      if(plug.checked) {
        const fetchRes2 = await fetch("http://localhost:4567/cars/plugs/add", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              car_id: fetchResJson.id,
              plug_id: plug.value
          })
        })
        
        if(!fetchRes2.ok) {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Car plug submission failed!'
          });
        }
      }
    })
    
    if (fetchRes.ok)  {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Car submitted successfully!'
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Car submission failed!'
      });
    }
    
    form.reset();
}

async function removeCar(id) {

  const confirmed = await Swal.fire({
    icon: 'warning',
    title: 'Are you sure?',
    text: 'You are about to delete this car. This action cannot be undone.',
    showCancelButton: true,
    confirmButtonText: 'Yes, remove it!',
    cancelButtonText: 'No, cancel'
  });

  if(confirmed.isConfirmed) {

    const fetchRes2 = await fetch(`http://localhost:4567/cars/plugs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          car_id: id
      })
    })

    const assosiatedPlugs = await fetchRes2.json();
    assosiatedPlugs.records.forEach(async (plug) => {
      const fetchRes3 = await fetch(`http://localhost:4567/cars/plugs/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: plug.id
        })
      })

      if(!fetchRes3.ok) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Car plug removal failed!'
        });
      }
    })

    const fetchRes = await fetch(`http://localhost:4567/cars/remove`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          id: id
      })
    })



    if(fetchRes.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Car removed successfully!'
      }).then(() => {
        location.reload();
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Car removal failed!'
      });
    }
  }
}

async function getCar(id) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: id
    })
  };
  const fetchRes = await fetch("http://localhost:4567/cars", options)
  const car = await fetchRes.json()
  return car
}

async function fillCarEdit(id){
  const car = await getCar(id);
  document.getElementById('id').value = car.id;
  document.getElementById('model').value = car.model;
  document.getElementById('battery_capacity').value = car.battery_capacity;
  document.getElementById('real_range').value = car.real_range;
  document.getElementById('efficiency').value = car.efficiency;
}

async function editCar(event) {
  event.preventDefault()
  const form = event.target;

  const id = form.id.value;
  const model = form.model.value;
  const battery = form.battery_capacity.value;
  const range = form.real_range.value;
  const efficiency = form.efficiency.value;

  const plugs = form.querySelectorAll('input[type="checkbox"]');

  const fetchRes = await fetch("http://localhost:4567/cars/update", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          id: id,
          model: model,
          battery_capacity: battery,
          real_range: range,
          efficiency: efficiency
      })
  })

  plugs.forEach(async (plug) => {
    const fetchRes2 = await fetch("http://localhost:4567/cars/plugs/find", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          car_id: id,
          plug_id: plug.value
      })
    })

    const foundPlug = await fetchRes2.json();

    if (plug.checked) {
      if (Object.keys(foundPlug.records).length === 0) {
        const fetchRes3 = await fetch("http://localhost:4567/cars/plugs/add", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              car_id: id,
              plug_id: plug.value
          })
        })
        
        if(!fetchRes3.ok) {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Car plug submission failed!'
          });
        }
      }
    } else {
      if (Object.keys(foundPlug.records).length !== 0 && foundPlug.records[0].id !== null) {
        const fetchRes3 = await fetch("http://localhost:4567/cars/plugs/remove", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              id: foundPlug.records[0].id
          })
        })

        if(!fetchRes3.ok) {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Car plug removal failed!'
          });
        }
      }
    }
  })

  if (fetchRes.ok)  {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Car edited successfully!'
    }).then(() => {
      // reload the page after user clicks OK on the success message
      location.href = '/index.html';
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: 'Car edit failed!'
    });
  }

  
}