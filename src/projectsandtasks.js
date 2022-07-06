let allItems = [];
const assignProject = (project) => {
  allItems.push(project);
};
const assignTask = (projectname, task) => {
  allItems.forEach(item, () => {
    if ((item.name = projectname)) {
      item.tasks.push(task);
    }
  });
};
const initializeProject = (name) => {
  if (checkIfPresent(name) === true) {
    const myProject = {
      name: name,
      tasks: [],
    };
    assignProject(myProject);
  }
};

const checkIfPresent = (project) => {
  let returnVal = true;
  allItems.forEach((item) => {
    if (item.name === project) {
      console.log("PRESENT");
      returnVal = false;
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

export { initializeProject, outputItems, getItems };
