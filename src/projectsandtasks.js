import { isEqual, isSameDay } from "date-fns";

let allItems = [];


const setIntoLocal = (item, tasks) => {
  localStorage.setItem(item, JSON.stringify(tasks));
}
const assignProject = (project) => {
  allItems.push(project);
  setIntoLocal(project.name, project)
};
const assignTask = (projectname, task) => {
  const myProject = allItems.find((item) => item.name === projectname);
  myProject.tasks.push(task);
  setIntoLocal(projectname, myProject)
};

const initializeProject = (name) => {
  if (checkIfPresent(name) === false) {
    const myProject = {
      name: name,
      tasks: [],
    };
    assignProject(myProject);
  }
};

const checkIfPresent = (project) => {
  let returnVal = false;
  allItems.forEach((item) => {
    if (item.name === project) {
      returnVal = true;
    }
  });
  return returnVal;
};

const outputItems = () => {
  allItems.forEach((item) => {
    console.log(item);
  });
};

const getItems = () => {
  const itemCopy = allItems;
  return itemCopy;
};

const getProjects = () => {
  const names = [];
  allItems.forEach((item) => {
    names.push(item.name);
  });

  return names;
};

const getTasks = (project) => {
  const myTasks = allItems.find((item) => item.name === project);
  return myTasks.tasks;
};

const getProjectsDueToday = () => {
  const todayTasks = [];
  const todayDate = new Date();
  allItems.forEach((item) => {
    item.tasks.forEach((task) => {
      console.log(task);
      console.log(task.datetime, todayDate);
      if (isSameDay(task.datetime, todayDate)) {
        todayTasks.push(task);
      }
    });
  });

  return todayTasks;
};

export {
  initializeProject,
  outputItems,
  getItems,
  checkIfPresent,
  getProjects,
  assignTask,
  getTasks,
  getProjectsDueToday,
};
