const list = document.querySelector('.projectList');
const content = document.querySelector('.content');
const banner = document.querySelector('.projectBanner');

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
  if (project) {
    banner.textContent = '';
    banner.textContent = project.projectName;
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.dataset.action = 'edit';
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.dataset.action = 'delete';
    banner.append(editBtn, deleteBtn);
    content.appendChild(banner);
  } else {
    banner.textContent = '';
  }
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

export {
  renderProjectList,
  renderProjectLi,
  renderProjectBanner,
  changeProjectLi,
  renderEditForm,
  toggleEditForm,
};
