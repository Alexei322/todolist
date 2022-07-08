import "./styles.css";
import {
  initializeProject,
  outputItems,
  getItems,
  checkIfPresent,
} from "./projectsandtasks.js";

const createProjectButton = document.querySelector(".createproject");
const addProjectForm = document.querySelector(".newproject");
const submitProjectButton = document.querySelector(".newproject > button");
const projectRow = document.querySelector(".icondescriprow");
const projects = document.querySelector(".projects");
const projecttext = document.querySelector(".projecttext");
// const addTaskBut = document.querySelector(".addtaskbutton");
const alertPlaceholder = document.getElementById("liveAlertPlaceholder");

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

addProjectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const projectValue = projecttext.value;
  const itemDiv = addNewProject(projectValue);
  if (checkIfPresent(projectValue) === false) {
    projects.appendChild(itemDiv);
  } else {
    alert("Project already present!", "danger");
  }
  initializeProject(projectValue);
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

const createTask = (title, description, duedate, priority) => {
  return { title, description, duedate, priority };
};

const toggleActive = (item) => {
  if (item.classList.contains("hidden")) {
    item.classList.remove("hidden");
  } else {
    item.classList.add("hidden");
  }
};
