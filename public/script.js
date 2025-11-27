// Load a new quote from API
async function loadQuote() {
  try {
    const res = await fetch('/api/motivation');
    const data = await res.json();
    const box = document.getElementById('quoteBox');
    box.innerText = `"${data.quote}"`;
    saveHistory(data.quote);
  } catch (e) {
    console.error("Failed to fetch quote:", e);
  }
}

// Save quote history locally
function saveHistory(q) {
  const hist = JSON.parse(localStorage.getItem('history') || '[]');
  hist.unshift(q);
  localStorage.setItem('history', JSON.stringify(hist));
}

// Load and display history on history page
if (document.getElementById('historyList')) {
  const listEl = document.getElementById('historyList');
  const hist = JSON.parse(localStorage.getItem('history') || '[]');
  hist.forEach(q => {
    const li = document.createElement('li');
    li.innerText = q;
    listEl.appendChild(li);
  });
}

// Text to speech for quote
function speakQuote() {
  const box = document.getElementById('quoteBox');
  if (!box) return;
  const msg = new SpeechSynthesisUtterance(box.innerText);
  window.speechSynthesis.speak(msg);
}

// Theme toggle with persistence
function toggleTheme() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Apply saved theme on page load
window.addEventListener('DOMContentLoaded', function() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
  }
});

// Check if theme was previously set before DOMContentLoaded
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}
