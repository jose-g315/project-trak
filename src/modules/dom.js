const list = document.querySelector('.projectList');
const banner = document.querySelector('.projectBanner');
const header = document.querySelector('.taskHeader');
const table = document.querySelector('.taskTable');

function renderContent(project) {
  if (project) {
    renderProjectBanner(project);
    renderTaskHeader();
    renderTaskTable(project.tasks);
  } else {
    banner.textContent = '';
    header.textContent = '';
    table.textContent = '';
  }
}
function renderProjectList(projects) {
  list.textContent = '';
  projects.forEach((project) => {
    const projectCard = document.createElement('li');
    projectCard.dataset.id = project.projectId;
    projectCard.textContent = project.projectName;
    list.appendChild(projectCard);
  });
}
function renderProjectBanner(project) {
  banner.textContent = '';
  banner.textContent = project.projectName;
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.dataset.action = 'edit';
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.dataset.action = 'delete';
  banner.append(editBtn, deleteBtn);

  renderTaskHeader();
  renderTaskTable(project.tasks);
}
function renderProjectLi(project) {
  const projectCard = document.createElement('li');
  projectCard.dataset.id = project.projectId;
  projectCard.textContent = project.projectName;
  list.append(projectCard);
}
function changeProjectLi(project, action, name) {
  const li = document.querySelector(`li[data-id="${project.projectId}"]`);
  if (li && action === 'delete') {
    li.remove();
  } else if (li && action === 'accept') {
    li.textContent = name;
  }
}
function removeTaskRow(taskId) {
  const row = document.querySelector(`tr[data-id="${taskId}"]`);
  if (row) {
    row.remove();
  }
}
function toggleEditForm() {
  banner.lastChild.remove();
}
function renderEditForm() {
  const existingForm = document.querySelector('.editForm');
  if (existingForm) return;

  const editForm = document.createElement('form');
  editForm.id = 'editForm';
  editForm.classList.add('editForm');
  const input = document.createElement('input');
  input.required = true;
  input.classList.add('newNameInput');
  input.id = 'nameInput';
  const acceptBtn = document.createElement('button');
  acceptBtn.textContent = 'Accept';
  acceptBtn.type = 'submit';
  acceptBtn.dataset.action = 'accept';
  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancel';
  cancelBtn.dataset.action = 'cancel';
  editForm.append(input, acceptBtn, cancelBtn);
  banner.appendChild(editForm);
}
function renderTaskHeader() {
  header.textContent = '';
  const addTaskBtn = document.createElement('button');
  const taskHeader = document.createElement('div');
  taskHeader.textContent = 'Hello';
  addTaskBtn.textContent = 'Add Task';
  addTaskBtn.dataset.action = 'add';
  header.append(taskHeader, addTaskBtn);
}
function renderTaskTable(tasks) {
  table.textContent = '';
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const headers = [
    '',
    'Name',
    'Description',
    'Due Date',
    'Priority',
    'Actions',
  ];
  headers.forEach((text) => {
    const th = document.createElement('th');
    th.textContent = text;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);
  const tableBody = document.createElement('tbody');
  tableBody.textContent = '';
  tasks.forEach((task) => {
    const row = document.createElement('tr');
    row.dataset.id = task.id;
    const statusCell = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');
    statusCell.appendChild(checkbox);
    const nameCell = document.createElement('td');
    nameCell.textContent = task.name;
    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = task.description;
    const dueDateCell = document.createElement('td');
    dueDateCell.textContent = task.dueDate;
    const priorityCell = document.createElement('td');
    priorityCell.textContent = task.priority;
    const actionCell = document.createElement('button');
    actionCell.textContent = 'Delete';
    actionCell.dataset.action = 'delete';

    row.append(
      statusCell,
      nameCell,
      descriptionCell,
      dueDateCell,
      priorityCell,
      actionCell
    );
    tableBody.appendChild(row);
  });
  table.appendChild(tableBody);
}

export {
  renderContent,
  renderProjectBanner,
  renderProjectList,
  renderProjectLi,
  changeProjectLi,
  renderEditForm,
  toggleEditForm,
  removeTaskRow,
};
