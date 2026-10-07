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
    { video:"db/assets/videos/drone.mp4", tag:"AAV-Autonomous Aerial Vehicle", tag_up:"Air", title: 'Project "Icarus" ', description: "[Autonomuos Drone]" },
    { video:"db/assets/videos/Robot.mp4", tag:"UGV-Unmanned Groud Vehicle", tag_up:"Ground", title: 'Project "Talos" ', description: "[Unmanned Groud Vehicle]" },
    { video:"db/assets/videos/Controlbox.mp4", tag:"GCS-Ground Control Station",tag_up:"Control", title: 'Project "Promachos" ', description: "[Ground Control Station]" },
    { video:"db/assets/videos/BoudingBox.mp4", tag:"Object Recognition",tag_up:"AI", title: '"Prometheus" Protocol ', description: "[Object Recognition]" },
    { video:"db/assets/videos/Encryption.mp4", tag:"Encryption System",tag_up:"Security", title: '"Phalanx" Protocol', description: "[Encryption System]" },
    { video:"db/assets/videos/Athena_Protocol.mp4", tag:"Commanding Control System",tag_up:"Command", title: '"Athena" Protocol ', description: "[Commanding Control System]" },
    

    
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
      <p class="project-tag_up">${project.tag_up}</p>
      <p class="project-title">${project.title}</p>
      <p class="project-description">${project.description}</p>
    </article>
  `;
}

const projectList = document.querySelector(".our_projects");
if (projectList) {
  projectList.innerHTML = projects.map(renderCard).join("");

  const revealObserver = new IntersectionObserver((entries, observer) => {
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

const tickerTrack = document.querySelector(".ticker-track");
if (tickerTrack) {
  const names = projects.map(project => project.title.replace(/"/g, "").trim());
  // Repeat the list so the row fills even very wide screens; overflow is cut off.
  tickerTrack.innerHTML = Array(4).fill(names).flat()
    .map(name => `<span class="ticker-item">${name}</span>`)
    .join("");
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
    { position:"01", role: "Project Icarus", tag: "Icarus", title: "Project Icarus", description: "Help build our autonomous drone: the airframe, flight controller, sensors and navigation software that let it fly a mission on its own.", number: 4 },
    { position:"02", role: "Project Talos", tag: "Talos", title: "Project Talos", description: "Help build our unmanned ground vehicle: the chassis, drivetrain, motor control and the autonomy that lets it handle rough terrain.", number: 4 },
    { position:"03", role: "Phalanx Protocol", tag: "Phalanx", title: "Phalanx Protocol", description: "Secure every link between our vehicles and the ground station by designing encrypted, tamper-proof communication that works in real time.", number: 2 },
    { position:"04", role: "Athena Protocol", tag: "Athena", title: "Athena Protocol", description: "Build the command layer that ties it all together, coordinating multiple vehicles, sharing mission data and turning sensor input into decisions.", number: 2 },
    { position:"05" ,role: "Social Media & Communications", tag: "Social Media & Communications", title: "Social Media & Communications", description: "Tell the ATLAS story: film our builds, run our social channels and turn the progress in the workshop into content people want to follow.", number: 2 },
    { position:"06", role: "Finance & Outreach", tag: "Finance & Outreach", title: "Finance & Outreach", description: "Manage the team's budget, find sponsors and build relationships with companies that help fund and equip our projects.", number: 2 },
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
  const TYPE_SPEED = 20;

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
  { group: "President<br>Project Co-Leader<br> Mechatronics Engineer", photo:"db/assets/people/chpetrou.jpg",  role: "Promachos<br>Icarus<br>Talos", name: "Charalampos Petrou" },
  { group: "Vice President<br>Project Co-Leader<br>Software Engineer", photo:"db/assets/people/APastekova.jpg",   role: "Promachos<br>Prometheus ", name: "Adela Pašteková" },
  { group: "Software Engineer", photo:"db/assets/people/M.Savkina.jpeg",   role: "Promachos<br>Prometheus ", name: "Marija Savkina" },
  { group: "Software Engineer", photo:"db/assets/people/A.Zalanyi.png",   role: "Promachos<br>Prometheus ", name: "Alex Zalanyi" },
  { group: "Project Co-Leader<br>Mechatronics Engineer", photo:"db/assets/people/Mikolaj.jpeg",  role: "Talos", name: "Mikolaj Tyliszczak" },
  { group: "Project Co-Leader<br>Mechatronics Engineer", photo:"db/assets/people/ManuelAFernandez.jpeg",   role: "Talos", name: "Manuel Alonso Fernández" },
  { group: "Project Co-Leader<br>Mechatronics Engineer", photo:"db/assets/people/NMazur.jpeg",   role: "Icarus", name: "Natalia Mazur" },
  { group: "Project Co-Leader<br>Mechatronics Engineer", photo:"db/assets/people/JRuiz.jpeg",   role: "Icarus", name: "Juan Ruiz" },
  { group: "Project Co-Leader<br>Mechatronics Engineer", photo:"db/assets/people/ASharma.jpeg",   role: "Athena", name: "Aditya Raj Sharma" },
  { group: "Project Co-Leader<br>Software Engineer", photo:"db/assets/people/D.Coll.jpeg",   role: "Athena", name: "David Coll" },
  { group: "Project Co-Leader<br>Mechatronics Engineer", photo:"db/assets/people/noprofile.jpg",   role: "Phalanx", name: "Ilyas Meduri" },
  { group: "Project Co-Leader<br>Software Engineer", photo:"db/assets/people/Diego.jpeg",   role: "Phalanx", name: "Diego Chamorro Segura" },
  // { group: "Communication", photo:"db/assets/people/noprofile.jpg",   role: "Social Media", name: "[Name]" },
];

function renderPersonCard(person) {
  const photo = person.photo || "db/assets/people/noprofile.jpg";
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
