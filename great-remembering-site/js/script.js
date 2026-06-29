function toggleBelief(item) {
  item.classList.toggle('active');
}

function toggleDeepDetail(button) {
  const item = button.closest('li');
  if (!item) return;
  item.classList.toggle('show-deep');
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element && value) element.textContent = value;
}

function createBeliefItem(belief) {
  const li = document.createElement('li');
  li.onclick = function () { toggleBelief(li); };

  const strong = document.createElement('strong');
  strong.textContent = belief.title || '';

  const details = document.createElement('span');
  details.className = 'details';
  details.textContent = belief.summary || '';

  const deepDetails = document.createElement('span');
  deepDetails.className = 'deep-details';
  deepDetails.textContent = belief.details || '';

  const expandButton = document.createElement('button');
  expandButton.className = 'expand-btn';
  expandButton.textContent = '▸';
  expandButton.onclick = function (event) {
    event.stopPropagation();
    toggleDeepDetail(expandButton);
  };

  li.appendChild(strong);
  li.appendChild(document.createTextNode(' '));
  li.appendChild(details);
  li.appendChild(document.createTextNode(' '));
  li.appendChild(deepDetails);
  li.appendChild(document.createTextNode(' '));
  li.appendChild(expandButton);

  if (belief.moreLink) {
    const moreButton = document.createElement('button');
    moreButton.className = 'dive-btn';
    moreButton.textContent = 'More';
    moreButton.onclick = function (event) {
      event.stopPropagation();
      window.open(belief.moreLink, '_blank');
    };
    li.appendChild(document.createTextNode(' '));
    li.appendChild(moreButton);
  }

  return li;
}

async function loadSiteContent() {
  try {
    const response = await fetch('content/site.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Could not load content/site.json');
    const data = await response.json();

    setText('site-title', data.title);
    setText('quote-rotator', data.quote);
    setText('vision-heading', data.vision && data.vision.heading);
    setText('vision-body', data.vision && data.vision.body);
    setText('vision-quote', data.vision && data.vision.quote);
    setText('beliefs-heading', data.beliefsHeading);
    setText('footer-text', data.footer);

    const list = document.getElementById('beliefs-list');
    if (list && Array.isArray(data.beliefs)) {
      list.innerHTML = '';
      data.beliefs.forEach(function (belief) {
        list.appendChild(createBeliefItem(belief));
      });
    }
  } catch (error) {
    console.warn(error);
  }
}

document.addEventListener('DOMContentLoaded', loadSiteContent);
