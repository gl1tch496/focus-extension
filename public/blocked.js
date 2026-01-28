
const quotes = [
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Focus is a matter of deciding what things you're not going to do.", author: "John Carmack" },
  { text: "Concentrate all your thoughts upon the work in hand. The sun's rays do not burn until brought to a focus.", author: "Alexander Graham Bell" },
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
  { text: "The successful warrior is the average man, with laser-like focus.", author: "Bruce Lee" },
  { text: "Lack of direction, not lack of time, is the problem. We all have twenty-four hour days.", author: "Zig Ziglar" },
  { text: "You can't depend on your eyes when your imagination is out of focus.", author: "Mark Twain" },
  { text: "The shorter way to do many things is to only do one thing at a time.", author: "Mozart" },
];


function displayQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  document.querySelector('.quote-text').textContent = `"${quote.text}"`;
  document.querySelector('.quote-author').textContent = `— ${quote.author}`;
}


function displayBlockedUrl() {
  const url = window.location.href;
  const params = new URLSearchParams(window.location.search);
  const blockedUrl = params.get('url') || url;
  document.getElementById('current-url').textContent = blockedUrl;
}


function updateTimer() {
  chrome.storage.local.get(['sessionEndTime'], (result) => {
    if (result.sessionEndTime) {
      const now = Date.now();
      const remaining = Math.max(0, result.sessionEndTime - now);
      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      document.getElementById('timer').textContent = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      
      if (remaining > 0) {
        setTimeout(updateTimer, 1000);
      } else {
        document.getElementById('timer').textContent = 'Session ended';
      }
    } else {
      document.getElementById('time-remaining').style.display = 'none';
    }
  });
}


document.getElementById('end-session').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'endSession' }, () => {
    window.location.reload();
  });
});


displayQuote();
displayBlockedUrl();
updateTimer();