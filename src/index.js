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

createProjectButton.addEventListener("click", (e) => {
  toggleActive(addProjectForm);
});

addProjectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const projectValue = projecttext.value;
  const itemDiv = addNewProject(projectValue);
  if (checkIfPresent(projectValue) === false) {
    projects.appendChild(itemDiv);
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
  projectButton.classList.add("projectbutton", "btn", "btn-info");
  projectButton.textContent = projectname;
  return projectButton;
};

const addNewProject = (content) => {
  const projectItem = createProjectDiv();
  const projectButton = createProject(content);
  projectItem.append(projectButton);
  return projectItem;
};

const createTaskModal = () => {
  const modal = document.createElement("div");
  modal.classList.add("modal-dialog", "modal-dialog-centered");
  return modal;
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
