const projectList = document.getElementById('projects');
const dialog = document.getElementById('project-dialog');
const tooltip = dialog.querySelector('.tooltip');
const byId = new Map(projects.map(project => [project.id, project]));
const storageKey = 'noah-portfolio-seen';
let openedFrom;

function loadSeen() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return new Set(Array.isArray(saved) ? saved.filter(id => byId.has(id)) : []);
  } catch {
    return new Set();
  }
}
const seen = loadSeen();

function sprite(id) {
  return `<svg viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true">${sprites[id]}</svg>`;
}

function chips(tags) {
  return `<span class="chips">${tags.map(tag => `<span class="chip">${tag}</span>`).join('')}</span>`;
}

function externalLink(label, href, extra = '') {
  return `<a class="game-button ${extra}" href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;
}

function projectRecording(recording) {
  if (!recording) return '';
  if (recording.url) return `<div class="recording">${externalLink(recording.label, recording.url)}</div>`;
  return `<details class="recording">
    <summary>${recording.label}</summary>
    <img loading="lazy" src="${recording.image}" alt="${recording.alt}">
    <a href="${recording.image}" target="_blank" rel="noopener noreferrer">Open full-size recording</a>
  </details>`;
}

function projectItem(project) {
  return `<button type="button" class="item" data-project="${project.id}" aria-haspopup="dialog">
    <span class="slot">${sprite(project.id)}</span>
    <span class="item-info">
      <span class="item-title">${project.name}</span>
      <span class="item-description">${project.description}</span>
    </span>
    ${chips(project.tags.slice(0, 2))}
    <span class="item-end"><span class="seen"${seen.has(project.id) ? '' : ' hidden'}>Seen</span><span class="chevron" aria-hidden="true"></span></span>
  </button>`;
}

function openProject(project, trigger) {
  openedFrom = trigger;
  if (!seen.has(project.id)) {
    seen.add(project.id);
    try {
      localStorage.setItem(storageKey, JSON.stringify([...seen]));
    } catch {
      // Keep the seen marker for this visit if browser storage is unavailable.
    }
    trigger.querySelector('.seen').hidden = false;
  }
  tooltip.innerHTML = `<button type="button" class="close" aria-label="Close project" autofocus>×</button>
    <header class="tooltip-head">
      <span class="slot">${sprite(project.id)}</span>
      <div>
        <h2 id="project-title">${project.name}</h2>
        <p class="rarity ${project.rarity.toLowerCase()}">${project.rarity}</p>
        ${project.date ? `<p class="date">${project.date}</p>` : ''}
      </div>
    </header>
    <ul class="details">${project.details.map(detail => `<li>${detail}</li>`).join('')}</ul>
    ${chips(project.tags)}
    ${projectRecording(project.recording)}
    <div class="actions">${project.links.map(([label, href], index) => externalLink(label, href, index ? 'secondary' : '')).join('')}</div>`;
  dialog.showModal();
  tooltip.scrollTop = 0;
  tooltip.querySelector('.close').focus();
}

projectList.addEventListener('click', event => {
  const trigger = event.target.closest('[data-project]');
  if (trigger) openProject(byId.get(trigger.dataset.project), trigger);
});

let backdropPress = false;
dialog.addEventListener('pointerdown', event => { backdropPress = event.target === dialog; });
dialog.addEventListener('click', event => {
  if (event.target.closest('.close') || (backdropPress && event.target === dialog)) dialog.close();
  backdropPress = false;
});

dialog.addEventListener('close', () => openedFrom?.focus({ preventScroll: true }));
dialog.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  const controls = [...tooltip.querySelectorAll('a[href], button, summary')].filter(control => control.getClientRects().length);
  if (event.shiftKey && document.activeElement === controls[0]) {
    event.preventDefault();
    controls.at(-1).focus();
  } else if (!event.shiftKey && document.activeElement === controls.at(-1)) {
    event.preventDefault();
    controls[0].focus();
  }
});

document.querySelector('.world img').src = forestPhoto;
projectList.innerHTML = projects.map(projectItem).join('');
