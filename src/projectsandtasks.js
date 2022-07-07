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

const getTasks = (projectname) => {
  returnTasks = [];
  const specificProject = allItems.find((item) => {
    item.name === projectname;
  });

  allItems.forEach(item, () => {
    if ((item.name = projectname)) {
      returnTasks.push(item.tasks);
    }
  });
};

export { initializeProject, outputItems, getItems, checkIfPresent };
