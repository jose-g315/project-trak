import {
  addProject,
  listProjects,
  setCurrentProject,
  getCurrentProject,
  deleteProject,
  editProject,
  addTask,
  deleteTask,
  updateTaskStatus,
} from './projects';
import {
  clearContent,
  renderContent,
  renderProjectBanner,
  changeProjectLi,
  renderEditForm,
  toggleEditForm,
  renderProjectLi,
  removeTaskRow,
} from './dom';

const input = document.getElementById('quickProject');
const form = document.getElementById('projectForm');
const list = document.querySelector('.projectList');
const banner = document.querySelector('.projectBanner');
const header = document.querySelector('.taskHeader');
const dialog = document.getElementById('taskDialog');
const taskForm = document.querySelector('.taskForm');
const cancelTaskBtn = document.getElementById('cancelTaskBtn');
const table = document.querySelector('.taskTable');

function bindEvents() {
  form.addEventListener('submit', handleAddProjectClick);
  list.addEventListener('click', handleProjectListClick);
  banner.addEventListener('click', handleProjectBannerClick);
  header.addEventListener('click', handleHeaderClick);
  taskForm.addEventListener('submit', handleTaskSubmit);
  cancelTaskBtn.addEventListener('click', handleCancelTaskForm);
  table.addEventListener('click', handleTableClick);
}
function handleTableClick(e) {
  const button = e.target.closest('button');
  const checkbox = e.target.closest('input');
  const row = e.target.closest('tr');
  if (!row) return;
  const taskId = row.dataset.id;

  if (button) {
    deleteTask(taskId);
    removeTaskRow(taskId);
  }
  if (checkbox) {
    const isChecked = e.target.checked;
    updateTaskStatus(taskId, isChecked ? 'completed' : 'pending');
    if (isChecked) {
      row.classList.add('taskCompleted');
    } else {
      row.classList.remove('taskCompleted');
    }
  }
}
function handleTaskSubmit(e) {
  e.preventDefault();
  console.log('Task added:', e.target.name.value);
  const formData = new FormData(e.target);
  const taskObj = Object.fromEntries(formData.entries());
  let newTask = addTask(taskObj);
  console.table(newTask);
  taskForm.reset();
  dialog.close('submit');
  renderContent(getCurrentProject());
}
function handleCancelTaskForm() {
  taskForm.reset();
  console.log('closed');
  dialog.close('cancel');
}

function handleHeaderClick(e) {
  const button = e.target.closest('button');
  if (!button) return;
  const action = button.dataset.action;
  if (action === 'add') {
    dialog.showModal();
  }
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
  renderContent(getCurrentProject());
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
      console.log(getCurrentProject());
      //renderContent(getCurrentProject());
      clearContent();
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
