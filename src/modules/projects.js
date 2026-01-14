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
  setCurrentProject(project.projectId);
  projects = [...projects, project];
  saveData(projects);
}
function editProject(newProject) {
  const currentProject = getCurrentProject();
  if (!currentProject) return;
  projects = projects.map((project) =>
    project.projectId === currentProject.projectId
      ? { ...project, ...newProject }
      : project
  );
  saveData(projects);
}
function deleteProject() {
  const project = getCurrentProject();
  if (!project) return;
  projects = projects.filter((p) => p.projectId !== project.projectId);
  currentProjectId = null;
  saveData(projects);
}
function listProjects() {
  return projects.map((projects) => ({ ...projects }));
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
  project.tasks = [...project.tasks, newTask];
  saveData(projects);
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
function editTask(taskId, newData) {
  const project = getCurrentProject();
  if (!project) return;
  let task = getTaskById(taskId);
  if (task) {
    let updatedTask = { ...task, ...newData };
    project.tasks = project.tasks.map((task) =>
      task.id === taskId ? updatedTask : task
    );
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
  editTask,
  getTaskById,
};
