
const quotes = [
  "This is not politics...",
  "...this is a reimagining of life on Earth...",
  "...that will plant the seed...",
  "...for future survival"
];
let quoteIndex = 0;
const rotator = document.getElementById("quote-rotator");
function rotateQuote() {
  if (rotator) {
    rotator.textContent = quotes[quoteIndex];
    quoteIndex = (quoteIndex + 1) % quotes.length;
  }
}
rotateQuote();
setInterval(rotateQuote, 5000);

function toggleBelief(el) {
  el.classList.toggle('expanded');
}

function toggleDeepDetail(btn) {
  const li = btn.closest("li");
  li.classList.toggle("expanded");
  btn.textContent = li.classList.contains("expanded") ? "▴" : "▸";
}

function copyBelief(btn) {
  const detail = btn.parentElement.querySelector('.details')?.textContent || "";
  const deep = btn.parentElement.querySelector('.deep-details')?.textContent || "";
  const text = `${detail} ${deep}`.trim();
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
  });
}
