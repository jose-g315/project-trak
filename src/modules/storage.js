function saveData(projects) {
  localStorage.setItem('projects', JSON.stringify(projects));
}
function loadProjects() {
  const data = localStorage.getItem('projects');
  return data ? JSON.parse(data) : null;
}

export { saveData, loadProjects };
