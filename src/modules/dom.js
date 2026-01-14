const list = document.querySelector('.projectList');
const banner = document.querySelector('.projectBanner');
const header = document.querySelector('.taskHeader');
const table = document.querySelector('.taskTable');

function clearContent() {
  banner.textContent = 'Select/Add a Project';
  header.textContent = '';
  table.textContent = '';
}
function renderContent(project) {
  if (project) {
    highlightCurrentProject(project);
    renderProjectBanner(project);
  }
}
function highlightCurrentProject(project) {
  document.querySelectorAll('.projectList li').forEach((li) => {
    li.classList.remove('current');
  });
  const li = document.querySelector(`li[data-id="${project.projectId}"]`);
  li.classList.add('current');
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
  const bannerHeader = document.createElement('h1');
  bannerHeader.textContent = project.projectName;
  const btnDiv = document.createElement('div');
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Rename';
  editBtn.dataset.action = 'edit';
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.dataset.action = 'delete';
  deleteBtn.classList.add('deleteBtn');
  btnDiv.append(editBtn, deleteBtn);
  banner.append(bannerHeader, btnDiv);

  renderTaskHeader();
  renderTaskTable(project.tasks);
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
  taskHeader.textContent = 'Tasks';
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
    // if task is completed
    if (task.status === 'completed') {
      row.classList.add('taskCompleted');
    }
    const statusCell = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');
    checkbox.checked = task.status === 'completed';
    statusCell.appendChild(checkbox);
    const nameCell = document.createElement('td');
    nameCell.textContent = task.name;
    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = task.description;
    const dueDateCell = document.createElement('td');
    dueDateCell.textContent = task.dueDate;
    const priorityCell = document.createElement('td');
    priorityCell.textContent = task.priority;
    priorityCell.classList.add(displayPriority(task.priority));
    displayPriority(priorityCell.textContent);
    const actionCell = document.createElement('td');
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.dataset.action = 'edit';
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.dataset.action = 'delete';
    deleteBtn.classList.add('deleteBtn');
    actionCell.append(editBtn, deleteBtn);

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
function displayPriority(priority) {
  let className = '';
  switch (priority) {
    case 'High': {
      className = 'high';
      return className;
    }
    case 'Medium': {
      className = 'medium';
      return className;
    }
    case 'Low': {
      className = 'low';
      return className;
    }
  }
}

export {
  clearContent,
  renderContent,
  renderProjectBanner,
  renderProjectList,
  renderEditForm,
  toggleEditForm,
};
