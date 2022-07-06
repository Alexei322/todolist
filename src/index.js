import "./styles.css";
import {
  initializeProject,
  outputItems,
  getItems,
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
  console.log(projecttext.textContent);
  const itemDiv = addNewProject(projecttext.value);
  projects.appendChild(itemDiv);
  const wowow = initializeProject(projecttext.value);
  outputItems();
});

const displayProjects = () => {
  const allProjects = getItems();
  allProjects.forEach(item, () => {
    addNewProject({ name: item.name, tasks: item.tasks });
  });
  return allProjects;
};

const createProjectDiv = () => {
  const projectForm = document.createElement("div");
  projectForm.classList.add("projectItem");
  return projectForm;
};

const addNewProject = (content) => {
  const projectItem = createProjectDiv();
  projectItem.textContent = content;
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
