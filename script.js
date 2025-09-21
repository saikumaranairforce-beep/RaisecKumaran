const questions = [
  { text: "I like to work on cars", category: "R" },
  { text: "I like to do puzzles", category: "I" },
  { text: "I am good at working independently", category: "A" },
  { text: "I like to work in teams", category: "S" },
  { text: "I am an ambitious person, I set goals for myself", category: "E" },
  { text: "I like to organize things (files, desks/offices)", category: "C" },
  // 👉 You can continue adding all 42 questions here
];

const careers = {
  R: ["Agriculture", "Engineering", "Mechanic/Machinist", "Construction"],
  I: ["Medicine", "Chemistry", "Marine Biology", "Psychology"],
  A: ["Fine Arts", "Photography", "Architecture", "Interior Design"],
  S: ["Counseling", "Nursing", "Education", "Public Relations"],
  E: ["Marketing/Sales", "Law", "Banking/Finance", "Political Science"],
  C: ["Accounting", "Insurance", "Administration", "Data Processing"]
};

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

  // Sort and pick top 3
  const sorted = Object.entries(scores).sort((a,b) => b[1]-a[1]);
  const top3 = sorted.slice(0,3).map(item => item[0]);

  document.getElementById("interestCode").textContent = top3.join(" - ");

  // Show related careers
  const careerList = document.getElementById("careerList");
  careerList.innerHTML = "";
  top3.forEach(code => {
    careers[code].forEach(c => {
      const li = document.createElement("li");
      li.textContent = `${code}: ${c}`;
      careerList.appendChild(li);
    });
  });

  document.getElementById("results").classList.remove("hidden");
}
