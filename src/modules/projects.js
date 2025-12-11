let projects = [];
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
  return projects.find((c) => c.projectId === currentProjectId) || null;
}
function addProject(projectName) {
  let project = createProject(projectName);
  projects.push(project);
  return project;
}
function editProject(newName) {
  const project = getCurrentProject();
  if (!project) return null;
  project.projectName = newName;
  return project;
}
function deleteProject() {
  const project = getCurrentProject();
  if (!project) return null;

  projects = projects.filter((c) => c.projectId !== project.projectId);
  currentProjectId = null;
  return project;
}
function listProjects() {
  return [...projects];
}

function initializeDefaultProject() {
  let project1 = createProject('My Project');
  projects.push(project1);
  setCurrentProject(project1.projectId);
}
initializeDefaultProject();

export {
  addProject,
  listProjects,
  setCurrentProject,
  getCurrentProject,
  deleteProject,
  editProject,
};
