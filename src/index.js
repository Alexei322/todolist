import "./styles.css";

const createProjectButton = document.querySelector(".createproject");
const addProjectForm = document.querySelector(".newproject");

createProjectButton.addEventListener("click", (e) => {
  toggleActive(addProjectForm);
});

const createProjectDiv = () => {
  const projectForm = document.createElement("div");
  projectForm.classList.add("projectForm");
};
const createProject = (title, description, duedate, priority) => {
  return { title, description, duedate, priority };
};

const toggleActive = (item) => {
  if (item.classList.contains("hidden")) {
    item.classList.remove("hidden");
    console.log("!");
  } else {
    item.classList.add("hidden");
  }
};
