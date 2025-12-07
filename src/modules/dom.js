function renderProjects(projects) {
  const projectList = document.querySelector('.projectList');
  projectList.textContent = '';
  projects.forEach((project) => {
    const projectCard = document.createElement('div');
    projectCard.textContent = project.projectName;
    projectList.appendChild(projectCard);
  });
}

export { renderProjects };
