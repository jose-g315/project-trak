// index.js
import './styles.css';
import { getCurrentProject, listProjects } from './modules/projects';
import { renderProjectBanner, renderProjects } from './modules/dom';
import { bindEvents } from './modules/events';

function initializeApp() {
  console.table(listProjects());
  renderProjects(listProjects());
  renderProjectBanner(getCurrentProject());
  bindEvents();
}

initializeApp();
