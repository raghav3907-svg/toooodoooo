const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
let data = JSON.parse(localStorage.getItem("weeklyData")) || {};

days.forEach(d => data[d] = data[d] || []);

function addTask() {
  const task = taskInput.value.trim();
  const day = document.getElementById("day").value;
  if (!task) return;

  data[day].push(task);
  taskInput.value = "";
  save(); render();
}

function deleteTask(day, i) {
  data[day].splice(i,1);
  save(); render();
}

function save() {
  localStorage.setItem("weeklyData", JSON.stringify(data));
}

function render() {
  days.forEach(day => {
    const el = document.getElementById(day);
    el.innerHTML = `<h3>${day}</h3>` +
      data[day].map((t,i)=>`
        <div class="task">${t}
          <button onclick="deleteTask('${day}',${i})">✕</button>
        </div>`).join("");
  });
}

render();
