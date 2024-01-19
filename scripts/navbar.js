function navBar()
{
    const navbarContainer = document.getElementById("navbar");

    // Create the navbar elements
    const navElement = document.createElement("nav");
    navElement.classList.add("navbar", "navbar-expand-lg", "navbar-light", "bg-light");

    const ulElement = document.createElement("ul");

    // Create the li elements
    const liCars = document.createElement("li");
    const liPlugs = document.createElement("li");
    const liUsers = document.createElement("li");

    // Set the classes for the navbar elements
    navElement.classList.add("navbar", "navbar-expand");
    ulElement.classList.add("navbar-nav", "me-auto");

    // Set the classes for the li elements
    liCars.classList.add("nav-item");
    liPlugs.classList.add("nav-item");
    liUsers.classList.add("nav-item");

    // Create the link elements for each li element
    const linkCars = document.createElement("a");
    linkCars.classList.add("nav-link");
    linkCars.href = "index.html";
    linkCars.textContent = "Cars";

    const linkPlugs = document.createElement("a");
    linkPlugs.classList.add("nav-link");
    linkPlugs.href = "plugs.html";
    linkPlugs.textContent = "Plugs";

    const linkUsers = document.createElement("a");
    linkUsers.classList.add("nav-link");
    linkUsers.href = "users.html";
    linkUsers.textContent = "Users";

    // Append the link elements to the li elements
    liCars.appendChild(linkCars);
    liPlugs.appendChild(linkPlugs);
    liUsers.appendChild(linkUsers);

    // Append the li elements to the ul element
    ulElement.appendChild(liCars);
    ulElement.appendChild(liPlugs);
    ulElement.appendChild(liUsers);

    // Append the ul element to the nav element
    navElement.appendChild(ulElement);

    // Append the nav element to the navbar container
    navbarContainer.appendChild(navElement);
}

function addScriptAndLinkTags() {
    const head = document.getElementsByTagName('head')[0];

    // create the script tag
    const sweetAlertScript = document.createElement('script');
    sweetAlertScript.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11.0.20/dist/sweetalert2.min.js';
  
    // create the link tag
    const sweetAlertLink = document.createElement('link');
    sweetAlertLink.rel = 'stylesheet';
    sweetAlertLink.href = 'https://cdn.jsdelivr.net/npm/sweetalert2@11.0.20/dist/sweetalert2.min.css';
  
    const bootstrapLink = document.createElement('link');
    bootstrapLink.crossOrigin = 'anonymous';
    bootstrapLink.rel = 'stylesheet';
    bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css';
    bootstrapLink.integrity = "sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD";
    
    const bootstrapScript = document.createElement('script');
    bootstrapScript.crossOrigin = 'anonymous';
    bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js';
    bootstrapScript.integrity = "sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN";


    // append the tags to the head
    head.appendChild(bootstrapLink);
    head.appendChild(sweetAlertScript);
    head.appendChild(sweetAlertLink);
    head.appendChild(bootstrapScript);
    
}
