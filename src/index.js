import "./styles.css";
import {
  initializeProject,
  outputItems,
  getItems,
  checkIfPresent,
  getProjects,
} from "./projectsandtasks.js";

const createProjectButton = document.querySelector(".createproject");
const addProjectForm = document.querySelector(".newproject");
const projects = document.querySelector(".projects");
const projecttext = document.querySelector(".projecttext");
const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
const taskForm = document.querySelector(".taskform");
const taskSection = document.querySelector(".colhome");
const modalTasksDropdown = document.querySelector(".dropdown-menu");

const alert = (message, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertPlaceholder.append(wrapper);
};

createProjectButton.addEventListener("click", (e) => {
  toggleActive(addProjectForm);
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const myTask = createTaskDiv();
  // myTask.textContent = outputForm(taskForm);
  taskSection.appendChild(myTask);
});

addProjectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const projectValue = projecttext.value;
  const itemDiv = addNewProject(projectValue);
  if (checkIfPresent(projectValue) === false) {
    projects.appendChild(itemDiv);
    initializeProject(projectValue);
    populateProjectsModal();
  } else {
    alert("Project already present!", "danger");
  }

  outputItems();
});

const createProjectDiv = () => {
  const projectForm = document.createElement("div");
  projectForm.classList.add("projectitem");
  return projectForm;
};

const createProject = (projectname) => {
  const projectButton = document.createElement("button");
  projectButton.classList.add("projectbutton", "btn", "btn-dark");
  projectButton.textContent = projectname;
  return projectButton;
};

const addNewProject = (content) => {
  const projectItem = createProjectDiv();
  const projectButton = createProject(content);
  projectItem.append(projectButton);
  return projectItem;
};

const toggleActive = (item) => {
  if (item.classList.contains("hidden")) {
    item.classList.remove("hidden");
  } else {
    item.classList.add("hidden");
  }
};

const populateProjectsModal = () => {
  modalTasksDropdown.textContent = "";
  const projects = getProjects();
  projects.forEach((item) => {
    const listParent = document.createElement("li");
    const listItem = document.createElement("a");
    listItem.classList.add("dropdown-item");
    listItem.href = "#";
    listItem.textContent = item;
    listParent.appendChild(listItem);
    modalTasksDropdown.appendChild(listParent);
  });
};

const createTaskDiv = () => {
  const taskCol = document.createElement("div");
  taskCol.classList.add("col");
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  const headingCard = document.createElement("h5");
  headingCard.classList.add("card-title");
  const carddescription = document.createElement("p");
  carddescription.classList.add("carddescription");
  const dateSection = document.createElement("p");
  dateSection.classList.add("card-date");
  cardBody.append(headingCard, carddescription, dateSection);
  cardDiv.appendChild(cardBody);
  taskCol.appendChild(cardDiv);
  return taskCol;
};
