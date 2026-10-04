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
    { photo: "../db/assets/noimage.jpg",alt: "[Project Icarus]", video:"../db/assets/videos/drone.mp4", tag:"AAV-Autonomous Aerial Vehicle", title: 'Project "Icarus" ', description: "[Autonomuos Drone]" },
    { photo: "../db/assets/noimage.jpg",alt: "[Project Talos]", video:"../db/assets/videos/robot.mp4", tag:"UGV-Unmanned Groud Vehicle", title: 'Project "Talos" ', description: "[Unmanned Groud Vehicle]" },
    { photo: "../db/assets/noimage.jpg",alt: "[Project Promachos]", video:"../db/assets/videos/Controlbox.mp4", tag:"GCS-Ground Control Station", title: 'Project "Promachos" ', description: "[Ground Control Station]" },
    { photo: "../db/assets/noimage.jpg",alt: "[Prometheus Protocol]", video:"../db/assets/videos/BoudingBox.mp4", tag:"Object Recognition", title: '"Prometheus" Protocol ', description: "[Object Recognition]" },
    { photo: "../db/assets/noimage.jpg",alt: "[Phalanx Protocol]", video:"../db/assets/videos/Encryption.mp4", tag:"Encryption System", title: '"Phalanx" Protocol', description: "[Encryption System]" },
    { photo: "../db/assets/noimage.jpg",alt: "[Athena Protocol]", video:"../db/assets/videos/Athena_Protocol.mp4", tag:"Commanding Control System", title: '"Athena" Protocol ', description: "[Commanding Control System]" },
    

    
]

function renderCard(project, index) {
  const isBig = index === 0 || index === 5;
  const media = project.video
    ? `<video class="project-photo project-video" src="${project.video}#t=0.001"
         muted loop playsinline preload="metadata" aria-label="${project.alt}"></video>`
    : `<img class="project-photo" src="${project.photo}" alt="${project.alt}">`;
  return `
    <article class="project-card${isBig ? " project-card-big" : ""}">
      ${media}
      <p class="project-tag">${project.tag}</p>
      <p class="project-title">${project.title}</p>
      <p class="project-description">${project.description}</p>
    </article>
  `;
}

const projectList = document.querySelector(".our_projects");
if (projectList) {
  projectList.innerHTML = projects.map(renderCard).join("");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    // Cards entering together form a visual row; stagger them left to right.
    entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
      .forEach((entry, order) => {
        entry.target.style.transitionDelay = `${order * 0.25}s`;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
  }, { threshold: 0.15 });

  projectList.querySelectorAll(".project-card").forEach(card => {
    card.classList.add("reveal-left");
    revealObserver.observe(card);
  });
}

const projectHeading = document.querySelector(".project_text");
if (projectHeading) {
  const text = projectHeading.textContent.trim();
  projectHeading.setAttribute("aria-label", text);
  projectHeading.innerHTML = [...text]
    .map((char, i) => `<span class="letter" style="--i:${i}" aria-hidden="true">${char}</span>`)
    .join("");

  const headingObserver = new IntersectionObserver((entries, observer) => {
    if (entries[0].isIntersecting) {
      projectHeading.classList.add("is-visible");
      observer.disconnect();
    }
  }, { threshold: 0.5 });
  headingObserver.observe(projectHeading);
}

document.querySelectorAll(".project-video").forEach(video => {
  video.addEventListener("mouseenter", () => {
    video.play().catch(() => {}); 
  });
  video.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0;
  });
});

const avaible_roles=[
    { position:"01", role: "Mechanical Engineer", tag: "Mechanical", title: "Mechanical Engineer", description: "Design and build the frames, mounts and moving parts of our projects.", number: 5 },
    { position:"02", role: "Electrical Engineer", tag: "Electrical", title: "Electrical Engineer", description: "Design circuits, wiring and power systems that bring the hardware to life.", number: 4 },
    { position:"03", role: "Software Developer", tag: "Software", title: "Software Developer", description: "Write the code that controls our machines, from embedded firmware to apps.", number: 6 },
    { position:"04", role: "Embedded Engineer", tag: "Embedded", title: "Embedded Engineer", description: "Program microcontrollers and connect sensors so every part talks to each other.", number: 3 },
    { position:"05" ,role: "Designer", tag: "Design", title: "Designer", description: "Shape how our projects look and feel, from 3D models to our visual identity.", number: 2 },
    { position:"06", role: "Project Manager", tag: "Management", title: "Project Manager", description: "Keep the team on track, plan milestones and make sure we ship on time.", number: 2 },
]

function renderRoleRow(role) {
  return `
    <tr>
    <td class="role-position">${role.position}</td>
      <td class="role-name">${role.title}</td>
      <td class="role-description">${role.description}</td>
      <td class="role-number">${role.number}</td>
    </tr>
  `;
}

const rolesList = document.getElementById("roles_list");
if (rolesList) {
  rolesList.innerHTML = avaible_roles.map(renderRoleRow).join("");
}
const missionText = document.querySelector(".mission_text");
if (missionText) {
  const fullText = missionText.textContent;
  const TYPE_SPEED = 45;

  missionText.innerHTML =
    '<span class="visually-hidden"></span>' +
    '<span aria-hidden="true"><span class="typed"></span><span class="cursor"></span><span class="untyped"></span></span>';
  const typed = missionText.querySelector(".typed");
  const untyped = missionText.querySelector(".untyped");
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
    typed.textContent = fullText;
    untyped.textContent = "";
  } else {
    const observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        observer.disconnect();
        typeMission();
      }
    }, { threshold: 1, rootMargin: "0px 0px -25% 0px" });
    observer.observe(missionText);
  }
}

const team = [
  { group: "Management", number: "", role: "President", name: "[Name]" },
  { group: "Management", number: "", role: "Vice President", name: "[Name]" },
  { group: "Icarus", number: "01", role: "[Role]", name: "[Name]" },
  { group: "Icarus", number: "01", role: "[Role]", name: "[Name]" },
  { group: "Talos", number: "02", role: "[Role]", name: "[Name]" },
  { group: "Talos", number: "02", role: "[Role]", name: "[Name]" },
  { group: "Promachos", number: "03", role: "[Role]", name: "[Name]" },
  { group: "Promachos", number: "03", role: "[Role]", name: "[Name]" },
  { group: "Prometheus", number: "04", role: "[Role]", name: "[Name]" },
  { group: "Prometheus", number: "04", role: "[Role]", name: "[Name]" },
  { group: "Athena", number: "05", role: "[Role]", name: "[Name]" },
  { group: "Athena", number: "05", role: "[Role]", name: "[Name]" },
  { group: "Phalanx", number: "06", role: "[Role]", name: "[Name]" },
  { group: "Phalanx", number: "06", role: "[Role]", name: "[Name]" },
  { group: "Communication", number: "", role: "Social Media", name: "[Name]" },
];

function renderPersonCard(person) {
  const photo = person.photo || "../db/assets/people/noprofile.jpg";
  const tag = person.number ? `${person.number} ${person.group}` : person.group;
  return `
    <article class="person-card">
      <div class="person-photo-wrap">
        <img class="person-photo" src="${photo}" alt="${person.name}, ${person.role}">
        <span class="person-tag">${tag}</span>
      </div>
      <div class="person-info">
        <p class="person-name">${person.name}</p>
        <p class="person-role">${person.role}</p>
      </div>
    </article>
  `;
}

const teamGrid = document.querySelector(".team-grid");
if (teamGrid) {
  teamGrid.innerHTML = team.map(renderPersonCard).join("");
}
