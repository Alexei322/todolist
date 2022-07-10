import "./styles.css";
import { formatDistance, subDays } from "date-fns";
import {
  initializeProject,
  outputItems,
  getItems,
  checkIfPresent,
  getProjects,
  assignTask,
  getTasks,
} from "./projectsandtasks.js";

const createProjectButton = document.querySelector(".createproject");
const addProjectForm = document.querySelector(".newproject");
const projects = document.querySelector(".projects");
const projecttext = document.querySelector(".projecttext");
const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
const taskForm = document.querySelector(".taskform");
const taskSection = document.querySelector(".colhome");
const modalTasksDropdown = document.querySelector(".form-select");
const allItemsButton = document.querySelector(".alltasksbutton");

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
  const formOut = [];
  const taskData = new FormData(taskForm);
  const selectedProject = taskData.get("floatingSelect");
  for (let key of taskData.keys()) {
    let myObj = {};
    myObj.key = key;
    myObj.value = taskData.get(key);
    formOut.push(myObj);
  }
  console.log(formOut);
  assignTask(selectedProject, formOut);
  console.log(getItems());
});

addProjectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const projectValue = projecttext.value;
  if (checkIfPresent(projectValue) === false) {
    const itemDiv = addNewProject(projectValue);
    projects.appendChild(itemDiv);
    initializeProject(projectValue);
    populateProjectsModal();
  } else {
    alert("Project already present!", "danger");
  }

  outputItems();
});

allItemsButton.addEventListener("click", (e) => {
  taskSection.textContent = "";
  const allProjects = getProjects();
  console.log(allProjects);
  allProjects.forEach((project) => {
    const projectTasks = getTasks(project);
    projectTasks.forEach((task) => {
      taskSection.appendChild(createTaskDiv(task));
    });
  });
});

const addNewProjectEventlistener = (projectButton) => {
  projectButton.addEventListener("click", (e) => {
    console.log(getTasks(projectButton.textContent));
    const projectTasks = getTasks(projectButton.textContent);
    taskSection.textContent = "";
    projectTasks.forEach((taskArr) => {
      taskSection.appendChild(createTaskDiv(taskArr));
    });
  });
};

const createProjectDiv = () => {
  const projectForm = document.createElement("div");
  projectForm.classList.add("projectitem");
  return projectForm;
};

const createProject = (projectname) => {
  const projectButton = document.createElement("button");
  projectButton.classList.add("projectbutton", "btn", "btn-dark");
  projectButton.textContent = projectname;
  addNewProjectEventlistener(projectButton);
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
    const listItem = document.createElement("option");
    listItem.value = item;
    listItem.textContent = item;
    modalTasksDropdown.appendChild(listItem);
  });
  console.log(projects);
};

const createTaskDiv = (obj) => {
  const taskCol = document.createElement("div");
  taskCol.classList.add("col");
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  const headingCard = document.createElement("h5");
  headingCard.classList.add("card-title");
  headingCard.textContent = obj[0].value;
  const carddescription = document.createElement("p");
  carddescription.classList.add("carddescription");
  carddescription.textContent = obj[1].value;
  const dateSection = document.createElement("p");
  dateSection.classList.add("card-date");
  dateSection.textContent = obj[2].value;
  const prioritySection = document.createElement("div");
  if (obj[4]) {
    prioritySection.classList.add("carddescription");
    prioritySection.textContent = "HIGH PRIORITY";
  }
  cardBody.append(headingCard, carddescription, dateSection, prioritySection);
  cardDiv.appendChild(cardBody);
  taskCol.appendChild(cardDiv);
  return taskCol;
};
