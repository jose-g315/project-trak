import { addProject, listProjects } from './projects';
import { renderProjects } from './dom';

const input = document.getElementById('quickProject');
const form = document.getElementById('projectForm');

function bindEvents() {
  form.addEventListener('submit', handleAddCompanyClick);
}

function handleAddCompanyClick(e) {
  e.preventDefault();
  const projectName = input.value.trim();
  if (projectName) {
    addProject(projectName);
    form.reset();
    console.table(listProjects());
    renderProjects(listProjects());
  }
}
export { bindEvents };
