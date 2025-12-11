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
function editProject(newName) {
  const project = getCurrentProject();
  if (!project) return null;
  const index = projects.findIndex((c) => c.projectId === project.projectId);
  if (index !== -1) {
    projects[index].projectName = newName;
    return project.projectId;
  }
}
function deleteProject() {
  const project = getCurrentProject();
  if (!project) return null;

  const index = projects.findIndex((c) => c.projectId === project.projectId);
  if (index !== -1) {
    projects.splice(index, 1);
    currentProjectId = null;
    console.table(projects);
    console.log(project.projectId + ' :deleted');
    return project.projectId;
  }
}
function listProjects() {
  return projects;
}

function initializeDefaultProject() {
  let project1 = createProject('My Project');
  projects.push(project1);
  setCurrentProject(project1.projectId);
  console.log('Current Project:' + project1.projectId);
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
