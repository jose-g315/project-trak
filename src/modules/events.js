import * as projectManager from './projects';
import * as domManager from './dom';
import { fillForm } from './utility';

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
    switch (button.dataset.action) {
      case 'delete':
        projectManager.deleteTask(taskId);
        domManager.renderProjectBanner(projectManager.getCurrentProject());
        break;
      case 'edit': {
        const task = projectManager.getTaskById(taskId);
        dialog.dataset.mode = 'edit';
        dialog.dataset.taskId = taskId;
        if (task) {
          fillForm(task);
          dialog.showModal();
          break;
        }
      }
    }
  }
  if (checkbox) {
    const isChecked = e.target.checked;
    projectManager.editTask(
      taskId,
      isChecked ? { status: 'completed' } : { status: 'pending' }
    );
    if (isChecked) {
      row.classList.add('taskCompleted');
    } else {
      row.classList.remove('taskCompleted');
    }
  }
}
function handleTaskSubmit(e) {
  e.preventDefault();
  const mode = dialog.dataset.mode;
  const taskId = dialog.dataset.taskId;
  const formData = new FormData(e.target);
  const taskObj = Object.fromEntries(formData.entries());
  if (mode === 'edit') {
    projectManager.editTask(taskId, taskObj);
  } else if (mode === 'add') {
    projectManager.addTask(taskObj);
  }
  taskForm.reset();
  dialog.close('submit');
  domManager.renderContent(projectManager.getCurrentProject());
}
function handleCancelTaskForm() {
  taskForm.reset();
  dialog.close('cancel');
}

function handleHeaderClick(e) {
  const button = e.target.closest('button');
  if (!button) return;
  const action = button.dataset.action;
  if (action === 'add') {
    dialog.dataset.mode = 'add';
    dialog.showModal();
  }
}

function handleAddProjectClick(e) {
  e.preventDefault();
  const projectName = input.value.trim();
  if (projectName) {
    projectManager.addProject(projectName);
    domManager.renderProjectList(projectManager.listProjects());
    form.reset();
  }
}
function handleProjectListClick(e) {
  const projectId = e.target.dataset.id;
  projectManager.setCurrentProject(projectId);
  domManager.renderContent(projectManager.getCurrentProject());
  console.table(projectManager.listProjects());
}
function handleProjectBannerClick(e) {
  const button = e.target.closest('button');
  if (!button) return;

  const action = button.dataset.action;
  switch (action) {
    case 'edit':
      domManager.renderEditForm();
      break;
    case 'delete': {
      projectManager.deleteProject();
      domManager.renderProjectList(projectManager.listProjects());
      domManager.clearContent();
      break;
    }
    case 'cancel':
      e.preventDefault();
      domManager.toggleEditForm();
      break;
    case 'accept': {
      const input = document.querySelector('.newNameInput');
      e.preventDefault();
      if (!input.checkValidity()) {
        input.reportValidity();
        return;
      }
      const newName = input.value.trim();
      projectManager.editProject({
        projectName: newName,
      });
      domManager.renderProjectList(projectManager.listProjects());
      domManager.toggleEditForm();
      domManager.renderProjectBanner(projectManager.getCurrentProject());
    }
  }
}
export { bindEvents };
