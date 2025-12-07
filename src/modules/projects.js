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
}
function editProject(id) {}
function deleteProject(id) {}
function listProjects() {
  return projects;
}

function initializeDefaultProject() {
  let project1 = createProject('My Project');
  projects.push(project1);
}
initializeDefaultProject();

export { addProject, listProjects };
