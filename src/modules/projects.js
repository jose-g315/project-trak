import { createTask } from './tasks';
let projects = [
  {
    projectId: 'a1b2c3d4-e5f6-7890-ab12-34567890abcd',
    projectName: 'Website Redesign',
    tasks: [
      {
        id: '1',
        name: 'Design new homepage',
        description: 'Create wireframes and mockups for the homepage',
        dueDate: '2026-01-15',
        priority: 'High',
        status: 'In Progress',
      },
      {
        id: '2',
        name: 'Update CSS framework',
        description: 'Migrate from Bootstrap 4 to TailwindCSS',
        dueDate: '2026-01-20',
        priority: 'Medium',
        status: 'Pending',
      },
    ],
  },
  {
    projectId: 'b2c3d4e5-f6a7-8901-bc23-45678901bcde',
    projectName: 'Mobile App Launch',
    tasks: [
      {
        id: '3',
        name: 'Implement login flow',
        description: 'Add authentication with JWT tokens',
        dueDate: '2026-02-01',
        priority: 'High',
        status: 'In Progress',
      },
      {
        id: '4',
        name: 'App Store submission',
        description: 'Prepare assets and metadata for iOS/Android stores',
        dueDate: '2026-02-10',
        priority: 'High',
        status: 'Pending',
      },
    ],
  },
  {
    projectId: 'c3d4e5f6-a7b8-9012-cd34-56789012cdef',
    projectName: 'Marketing Campaign',
    tasks: [
      {
        id: '5',
        name: 'Social media ads',
        description: 'Design and schedule posts for Facebook and Instagram',
        dueDate: '2026-01-25',
        priority: 'Medium',
        status: 'Pending',
      },
      {
        id: '6',
        name: 'Email newsletter',
        description: 'Draft and send campaign emails to subscribers',
        dueDate: '2026-01-28',
        priority: 'Low',
        status: 'Pending',
      },
    ],
  },
  {
    projectId: 'd4e5f6a7-b8c9-0123-de45-67890123def0',
    projectName: 'Data Migration',
    tasks: [
      {
        id: '7',
        name: 'Export legacy data',
        description: 'Extract data from old CRM system',
        dueDate: '2026-01-18',
        priority: 'High',
        status: 'Completed',
      },
      {
        id: '8',
        name: 'Import to new system',
        description: 'Load data into Salesforce',
        dueDate: '2026-01-22',
        priority: 'High',
        status: 'In Progress',
      },
    ],
  },
  {
    projectId: 'e5f6a7b8-c9d0-1234-ef56-78901234ef01',
    projectName: 'Customer Portal',
    tasks: [
      {
        id: '9',
        name: 'User dashboard',
        description: 'Develop dashboard with recent activity and stats',
        dueDate: '2026-02-05',
        priority: 'Medium',
        status: 'Pending',
      },
      {
        id: '10',
        name: 'Support ticket system',
        description: 'Integrate ticket submission and tracking',
        dueDate: '2026-02-12',
        priority: 'High',
        status: 'Pending',
      },
    ],
  },
];
let currentProjectId = null;

function createProject(projectName) {
  return {
    projectId: crypto.randomUUID(),
    projectName,
    tasks: [],
  };
}
function setCurrentProject(id) {
  currentProjectId = id;
}
function getCurrentProject() {
  return projects.find((c) => c.projectId === currentProjectId) || null;
}
function addProject(projectName) {
  let project = createProject(projectName);
  projects.push(project);
  return project;
}
function editProject(newName) {
  const project = getCurrentProject();
  if (!project) return null;
  project.projectName = newName;
  return project;
}
function deleteProject() {
  const project = getCurrentProject();
  if (!project) return null;

  projects = projects.filter((c) => c.projectId !== project.projectId);
  currentProjectId = null;
  return project;
}
function listProjects() {
  return [...projects];
}

function initializeDefaultProject() {
  let project1 = createProject('My Project');
  projects.push(project1);
  setCurrentProject(project1.projectId);
}
initializeDefaultProject();

function addTask(task) {
  const project = getCurrentProject();
  if (!project) throw new Error('Project not found');
  let newTask = createTask(task);
  project.tasks.push(newTask);

  return newTask;
}
function deleteTask(taskId) {
  const project = getCurrentProject();
  if (!project) throw new Error('Project not found');
  const index = project.tasks.findIndex((task) => task.id === taskId);
  if (index !== -1) {
    project.tasks.splice(index, 1);
  }
  console.table(project.tasks);
}
function updateTaskStatus(taskId, status) {
  const project = getCurrentProject();
  if (!project) throw new Error('Project not found');

  const task = project.tasks.find((t) => t.id === taskId);
  if (task) {
    task.status = status;
    console.table(project.tasks);
  }
}

export {
  addProject,
  listProjects,
  setCurrentProject,
  getCurrentProject,
  deleteProject,
  editProject,
  addTask,
  deleteTask,
  updateTaskStatus,
};
