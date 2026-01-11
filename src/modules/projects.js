import { saveData, loadProjects } from './storage';

// projects
let projects = loadProjects() || [];
let currentProjectId = null;

function createProject(projectName) {
  return {
    projectId: crypto.randomUUID(),
    projectName,
    tasks: [],
  };
}
function setCurrentProject(id) {
  currentProjectId = id;
}
function getCurrentProject() {
  return (
    projects.find((project) => project.projectId === currentProjectId) || null
  );
}
function addProject(projectName) {
  let project = createProject(projectName);
  if (!project) return;
  projects.push(project);
  saveData(projects);
  return project;
}
function editProject(newName) {
  const project = getCurrentProject();
  if (!project) return;
  project.projectName = newName;
  saveData(projects);
  return project;
}
function deleteProject() {
  const project = getCurrentProject();
  if (!project) return;
  projects = projects.filter((p) => p.projectId !== project.projectId);
  currentProjectId = null;
  saveData(projects);
  return project;
}
function listProjects() {
  // shallow clone of each object so it can't be mutated
  return projects.map((p) => ({ ...p }));
}
function initializeDefaultProject() {
  if (projects.length === 0) {
    let project1 = createProject('My Project');
    projects.push(project1);
    setCurrentProject(project1.projectId);
    saveData(projects);
  }
}
initializeDefaultProject();

// tasks
function createTask({
  name,
  description,
  dueDate,
  priority,
  status = 'pending',
}) {
  return {
    id: crypto.randomUUID(),
    name: name,
    description: description,
    dueDate: dueDate,
    priority: priority,
    status,
  };
}
function addTask(task) {
  const project = getCurrentProject();
  if (!project) return;
  let newTask = createTask(task);
  project.tasks.push(newTask);
  saveData(projects);
  return newTask;
}
function deleteTask(taskId) {
  const project = getCurrentProject();
  if (!project) return;
  const task = getTaskById(taskId);
  if (task) {
    project.tasks = project.tasks.filter((task) => task.id !== taskId);
    saveData(projects);
  }
}
function updateTaskStatus(taskId, status) {
  const project = getCurrentProject();
  if (!project) return;
  const task = getTaskById(taskId);
  if (task) {
    task.status = status;
    saveData(projects);
  }
}
function editTask(taskId, newData) {
  const project = getCurrentProject();
  if (!project) return;
  const task = getTaskById(taskId);
  if (task) {
    Object.assign(task, newData);
    saveData(projects);
  }
}
function getTaskById(taskId) {
  const project = getCurrentProject();
  if (!project) return;
  return project.tasks.find((task) => task.id === taskId);
}

export {
  addProject,
  listProjects,
  setCurrentProject,
  getCurrentProject,
  deleteProject,
  editProject,
  addTask,
  deleteTask,
  updateTaskStatus,
  editTask,
  getTaskById,
};
// Refactoring complete go to dom.js next and also check to see what other module uses gettaskbyId.
