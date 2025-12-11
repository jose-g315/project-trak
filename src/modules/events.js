import {
  addProject,
  listProjects,
  setCurrentProject,
  getCurrentProject,
  deleteProject,
  editProject,
} from './projects';
import {
  renderProjects,
  renderProjectBanner,
  changeProjectLi,
  renderEditForm,
  toggleEditForm,
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
    addProject(projectName);
    form.reset();
    console.table(listProjects());
    renderProjects(listProjects());
  }
}
function handleProjectListClick(e) {
  const projectId = e.target.dataset.id;
  setCurrentProject(projectId);
  renderProjectBanner(getCurrentProject());
  console.log(projectId);
}
function handleProjectBannerClick(e) {
  const button = e.target.closest('button');

  if (!button) return;
  const action = button.dataset.action;
  if (action === 'edit') {
    renderEditForm();
  } else if (action === 'delete') {
    const deletedLi = deleteProject();
    changeProjectLi(deletedLi, action);
    console.log('Delete clicked');
    renderProjectBanner(getCurrentProject());
  } else if (action === 'cancel') {
    e.preventDefault();
    toggleEditForm();
  } else if (action == 'accept') {
    const input = document.querySelector('.newNameInput');
    e.preventDefault();
    if (!input.checkValidity()) {
      input.reportValidity();
      return;
    }
    input.required = true;
    const newName = input.value.trim();
    const editedLi = editProject(newName);
    changeProjectLi(editedLi, action, newName);
    toggleEditForm();
    renderProjectBanner(getCurrentProject());
  }
}
export { bindEvents };
