fetch("header.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("header_div").innerHTML = data;
    });

fetch("footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer_div").innerHTML = data;
    });

const projects=[
    { photo: "../db/assets/PHONE.jpeg",alt: "Project1", tag:"Project1", title: "Project 1 ", description: "description" },
    { photo: "../db/assets/noimage.jpeg",alt: "Project2", tag:"Project2", title: "Project 2 ", description: "description" },
    { photo: "../db/assets/noimage.jpeg",alt: "Project3", tag:"Project3", title: "Project 3 ", description: "description" },
    { photo: "../db/assets/noimage.jpeg",alt: "Project4", tag:"Project4", title: "Project 4 ", description: "description" },
    { photo: "../db/assets/noimage.jpeg",alt: "Project5", tag:"Project5", title: "Project 5 ", description: "description" },

    
]

function renderCard(project) {
  return `
    <article class="project-card">
      <img class="project-photo" src="${project.photo}" alt="${project.alt}">
      <p class="project-tag">${project.tag}</p>
      <p class="project-title">${project.title}</p>
      <p class="project-description">${project.description}</p>
    </article>
  `;
}

// Turn every project into a card and put them all inside <div class="our_projects">
const projectList = document.querySelector(".our_projects");
if (projectList) {
  projectList.innerHTML = projects.map(renderCard).join("");
}

const avaible_roles=[
    { role: "Mechanical Engineer", tag: "Mechanical", title: "Mechanical Engineer", description: "Design and build the frames, mounts and moving parts of our projects.", number: 5 },
    { role: "Electrical Engineer", tag: "Electrical", title: "Electrical Engineer", description: "Design circuits, wiring and power systems that bring the hardware to life.", number: 4 },
    { role: "Software Developer", tag: "Software", title: "Software Developer", description: "Write the code that controls our machines, from embedded firmware to apps.", number: 6 },
    { role: "Embedded Engineer", tag: "Embedded", title: "Embedded Engineer", description: "Program microcontrollers and connect sensors so every part talks to each other.", number: 3 },
    { role: "Designer", tag: "Design", title: "Designer", description: "Shape how our projects look and feel, from 3D models to our visual identity.", number: 2 },
    { role: "Project Manager", tag: "Management", title: "Project Manager", description: "Keep the team on track, plan milestones and make sure we ship on time.", number: 2 },
]

// One table row per role
function renderRoleRow(role) {
  return `
    <tr>
      <td class="role-name">${role.title}</td>
      <td class="role-description">${role.description}</td>
      <td class="role-number">${role.number}</td>
    </tr>
  `;
}

// Fill <tbody id="roles_list"> with every role
const rolesList = document.getElementById("roles_list");
if (rolesList) {
  rolesList.innerHTML = avaible_roles.map(renderRoleRow).join("");
}
// Typing animation for the mission text. Starts when the section scrolls into view.
// The not-yet-typed part stays in place but invisible, so the layout doesn't jump.
const missionText = document.querySelector(".mission_text");
if (missionText) {
  const fullText = missionText.textContent;
  const TYPE_SPEED = 45; // milliseconds per letter

  missionText.innerHTML =
    '<span class="visually-hidden"></span>' +
    '<span aria-hidden="true"><span class="typed"></span><span class="cursor"></span><span class="untyped"></span></span>';
  const typed = missionText.querySelector(".typed");
  const untyped = missionText.querySelector(".untyped");
  // Set as plain text, not HTML, so any symbols in the mission show up as written
  missionText.querySelector(".visually-hidden").textContent = fullText;
  untyped.textContent = fullText;

  function typeMission() {
    let i = 0;
    const timer = setInterval(function () {
      i++;
      typed.textContent = fullText.slice(0, i);
      untyped.textContent = fullText.slice(i);
      if (i >= fullText.length) clearInterval(timer);
    }, TYPE_SPEED);
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    // People who turned off motion just see the whole text
    typed.textContent = fullText;
    untyped.textContent = "";
  } else {
    const observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        observer.disconnect();
        typeMission();
      }
    }, { threshold: 1, rootMargin: "0px 0px -25% 0px" }); // whole text visible and above the bottom quarter of the screen
    observer.observe(missionText);
  }
}

// Team members on the roles page, grouped by their tag (department)
const team = [
  { photo: "../db/assets/people/chpetrou.jpg", tag: "Management", alt: "President", title: "President", name: "Charalampos Petrou" },
  { photo: "../db/assets/people/noprofile.jpg", tag: "Management", alt: "Vice President", title: "Vice President", name: "Adela Pasteková" },
  { photo: "../db/assets/people/noprofile.jpg", tag: "Electronics Department", alt: "Chief Electronics Engineer", title: "Chief Electronics Engineer", name: "Mikolaj Jakub Tyliszczak" },
  { photo: "../db/assets/people/noprofile.jpg", tag: "Software Department", alt: "Chief Software Engineer", title: "Chief Software Engineer", name: "Diego Chamorro Segura" },
  { photo: "../db/assets/people/noprofile.jpg", tag: "Mechanical Department", alt: "Chief Mechanical Engineer", title: "Chief Mechanical Engineer", name: "Natalia Anna Mazur" },
  // { photo: "../db/assets/people/noprofile.jpg", alt: "Head of Ethics & Safety Committee", title: "Head of Ethics & Safety Committee", name: "Name here" },
  { photo: "../db/assets/people/noprofile.jpg", tag: "Communication Department", alt: "Head of Communications & Outreach", title: "Head of Communications & Outreach", name: "Manuel Alonso Fernandez" },
  // { photo: "../db/assets/people/noprofile.jpg", alt: "Research Department Chief Scientist", title: "Research Department Chief Scientist", name: "Name here" },
  // { photo: "../db/assets/people/noprofile.jpg", alt: "Treasurer", title: "Treasurer", name: "Name here" },
  { photo: "../db/assets/people/noprofile.jpg", tag: "Electronics Department", alt: "Electronics Engineer", title: "Electronics Engineer <br> Mechanical Engineer", name: "Juan Ruiz" },
  { photo: "../db/assets/people/noprofile.jpg", tag: "Software Department", alt: "Software Engineer", title: "Software Engineer", name: "David Coll Sánchez" },
  { photo: "../db/assets/people/chpetrou.jpg", tag: "Mechanical Department", alt: "Mechanical Engineer", title: "Mechanical Engineer", name: "Charalampos Petrou" },
  { photo: "../db/assets/people/noprofile.jpg", tag: "Software Department", alt: "Software Engineer", title: "Software Engineer", name: "Adela Pasteková" },
  // { photo: "../db/assets/people/noprofile.jpg", alt: "Mechanical Engineer", title: "Mechanical Engineer", name: "Name here" },
  // { photo: "../db/assets/people/noprofile.jpg", alt: "Ethics & Safety Committee Officer", title: "Ethics & Safety Committee Officer", name: "Name here" },
  // { photo: "../db/assets/people/noprofile.jpg", alt: "Communications & Outreach Officer", title: "Communications & Outreach Officer", name: "Name here" },
  // { photo: "../db/assets/people/noprofile.jpg", alt: "Research Scientist", title: "Research Scientist", name: "Name here" },
];

function renderPersonCard(person) {
  return `
    <div class="person-card">
      <img class="person-photo" src="${person.photo}" alt="${person.alt}">
      <p class="person-title">${person.title}</p>
      <p class="person-name">${person.name}</p>
    </div>
  `;
}

// One section per department, in the order they first appear in the list
const teamGrid = document.querySelector(".team-grid");
if (teamGrid) {
  const departments = [...new Set(team.map(person => person.tag))];
  teamGrid.innerHTML = departments.map(dept => `
    <div class="dept-section">
      <h2 class="dept-title">${dept}</h2>
      <div class="dept-cards">
        ${team.filter(person => person.tag === dept).map(renderPersonCard).join("")}
      </div>
    </div>
  `).join("");
}
