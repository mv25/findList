const listElement = document.getElementById("list");
const filterElement = document.getElementById("filter");

let users = [];

filterElement.addEventListener("input", (event) => {
  const value = event.target.value.toLowerCase();
  render(users.filter((user) => user.name.toLowerCase().includes(value)));
});

async function start() {
  listElement.innerHTML = "Loading...";
  try {
    const resp = await fetch("https://jsonplaceholder.typicode.com/users");
    users = await resp.json();
    setTimeout(() => {
      render(users);
    }, 2000);
  } catch (e) {
    listElement.style.color = "red";
    listElement.innerHTML = e.message;
  }
}

function render(users = []) {
  if (users.length === 0) {
    listElement.innerHTML = "No matched users!";
  } else {
    const html = users.map(toHTML).join("");
    listElement.innerHTML = html;
  }
}

function toHTML(user) {
  return `
        <li class="list-group-item">${user.name}</li>
    `;
}

start();
