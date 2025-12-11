import {
  addProject,
  listProjects,
  setCurrentProject,
  getCurrentProject,
  deleteProject,
  editProject,
} from './projects';
import {
  renderProjectBanner,
  changeProjectLi,
  renderEditForm,
  toggleEditForm,
  renderProjectLi,
} from './dom';

const input = document.getElementById('quickProject');
const form = document.getElementById('projectForm');
const list = document.querySelector('.projectList');
const banner = document.querySelector('.projectBanner');

function bindEvents() {
  form.addEventListener('submit', handleAddProjectClick);
  list.addEventListener('click', handleProjectListClick);
  banner.addEventListener('click', handleProjectBannerClick);
}

function handleAddProjectClick(e) {
  e.preventDefault();
  const projectName = input.value.trim();
  if (projectName) {
    const addedProject = addProject(projectName);
    renderProjectLi(addedProject);
    console.table(listProjects());
    form.reset();
  }
}
function handleProjectListClick(e) {
  const projectId = e.target.dataset.id;
  setCurrentProject(projectId);
  renderProjectBanner(getCurrentProject());
  console.table(listProjects());
}
function handleProjectBannerClick(e) {
  const button = e.target.closest('button');
  if (!button) return;

  const action = button.dataset.action;
  switch (action) {
    case 'edit':
      renderEditForm();
      break;
    case 'delete': {
      const deletedProject = deleteProject();
      changeProjectLi(deletedProject, action);
      console.table(listProjects());
      renderProjectBanner(getCurrentProject());
      break;
    }
    case 'cancel':
      e.preventDefault();
      toggleEditForm();
      break;
    case 'accept': {
      const input = document.querySelector('.newNameInput');
      e.preventDefault();
      if (!input.checkValidity()) {
        input.reportValidity();
        return;
      }
      const newName = input.value.trim();
      const editedProject = editProject(newName);
      changeProjectLi(editedProject, action, newName);
      toggleEditForm();
      renderProjectBanner(getCurrentProject());
      console.table(listProjects());
    }
  }
}
export { bindEvents };
