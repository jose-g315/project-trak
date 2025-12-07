// index.js
import './styles.css';
import { listProjects } from './modules/projects';
import { renderProjects } from './modules/dom';
import { bindEvents } from './modules/events';

function initializeApp() {
  console.table(listProjects());
  bindEvents();
  renderProjects(listProjects());
}

initializeApp();
