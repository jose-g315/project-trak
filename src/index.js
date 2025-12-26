// index.js
import './styles.css';
import { getCurrentProject, listProjects } from './modules/projects';
import { renderContent, renderProjectList } from './modules/dom';
import { bindEvents } from './modules/events';

function initializeApp() {
  console.table(listProjects());
  renderProjectList(listProjects());
  renderContent(getCurrentProject());
  bindEvents();
}

initializeApp();
