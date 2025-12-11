// index.js
import './styles.css';
import { getCurrentProject, listProjects } from './modules/projects';
import { renderProjectBanner, renderProjectList } from './modules/dom';
import { bindEvents } from './modules/events';

function initializeApp() {
  console.table(listProjects());
  renderProjectList(listProjects());
  renderProjectBanner(getCurrentProject());
  bindEvents();
}

initializeApp();
