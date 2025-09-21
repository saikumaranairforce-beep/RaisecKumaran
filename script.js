const questions = [
  { text: "I like to work on cars", category: "R" },
  { text: "I like to do puzzles", category: "I" },
  { text: "I am good at working independently", category: "A" },
  { text: "I like to work in teams", category: "S" },
  { text: "I am an ambitious person, I set goals for myself", category: "E" },
  { text: "I like to organize things (files, desks/offices)", category: "C" },
  { text: "I like to build things", category: "R" },
  { text: "I like to read about art and music", category: "A" },
  { text: "I like to have clear instructions to follow", category: "C" },
  { text: "I like to try to influence or persuade people", category: "E" },
  { text: "I like to do experiments", category: "I" },
  { text: "I like to teach or train people", category: "S" },
  { text: "I like trying to help people solve their problems", category: "S" },
  { text: "I like to take care of animals", category: "R" },
  { text: "I wouldn’t mind working 8 hours per day in an office", category: "C" },
  { text: "I like selling things", category: "E" },
  { text: "I enjoy creative writing", category: "A" },
  { text: "I enjoy science", category: "I" },
  { text: "I am quick to take on new responsibilities", category: "E" },
  { text: "I am interested in healing people", category: "S" },
  { text: "I enjoy trying to figure out how things work", category: "I" },
  { text: "I like putting things together or assembling things", category: "R" },
  { text: "I am a creative person", category: "A" },
  { text: "I pay attention to details", category: "C" },
  { text: "I like to do filing or typing", category: "C" },
  { text: "I like to analyze things (problems/situations)", category: "I" },
  { text: "I like to play instruments or sing", category: "A" },
  { text: "I enjoy learning about other cultures", category: "A" },
  { text: "I would like to start my own business", category: "E" },
  { text: "I like to cook", category: "R" },
  { text: "I like acting in plays", category: "A" },
  { text: "I am a practical person", category: "R" },
  { text: "I like working with numbers or charts", category: "C" },
  { text: "I like to get into discussions about issues", category: "I" },
  { text: "I am good at keeping records of my work", category: "C" },
  { text: "I like to lead", category: "E" },
  { text: "I like working outdoors", category: "R" },
  { text: "I would like to work in an office", category: "C" },
  { text: "I’m good at math", category: "I" },
  { text: "I like helping people", category: "S" },
  { text: "I like to draw", category: "A" },
  { text: "I like to give speeches", category: "E" }
];

let latestResults = "";

window.onload = () => {
  const container = document.getElementById("questions");
  questions.forEach((q, i) => {
    const div = document.createElement("div");
    div.className = "question";
    div.innerHTML = `
      <label>
        <input type="checkbox" name="q${i}" value="${q.category}"> 
        ${q.text}
      </label>`;
    container.appendChild(div);
  });
};

function calculateResults() {
  const form = document.getElementById("riasecForm");
  const data = new FormData(form);

  const scores = { R:0, I:0, A:0, S:0, E:0, C:0 };
  for (let val of data.values()) {
    scores[val]++;
  }

  const sorted = Object.entries(scores).sort((a,b) => b[1]-a[1]);
  const top3 = sorted.slice(0,3).map(item => item[0]);

  document.getElementById("interestCode").textContent = top3.join(" - ");

  // show scores
  const scoreList = document.getElementById("scoreList");
  scoreList.innerHTML = "";
  latestResults = "";
  sorted.forEach(([key,val]) => {
    const li = document.createElement("li");
    li.textContent = key + ": " + val;
    scoreList.appendChild(li);
    latestResults += key + ": " + val + "\n";
  });

  // put results in hidden field for submission
  document.getElementById("riasecResults").value = "RIASEC Results (High to Low):\n" + latestResults +
    "\nTop 3 Interest Code: " + top3.join(" - ");

  document.getElementById("results").classList.remove("hidden");
}