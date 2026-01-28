document.addEventListener("DOMContentLoaded", () => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  const taskInput = document.getElementById("taskInput");
  const daySelect = document.getElementById("day");

  let data = JSON.parse(localStorage.getItem("weeklyData")) || {};

  // ensure structure exists
  days.forEach(day => {
    if (!data[day]) data[day] = [];
  });

  window.addTask = function () {
    const task = taskInput.value.trim();
    const day = daySelect.value;

    if (task === "") return;

    data[day].push(task);
    taskInput.value = "";

    save();
    render();
  };

  window.deleteTask = function (day, index) {
    data[day].splice(index, 1);
    save();
    render();
  };

  function save() {
    localStorage.setItem("weeklyData", JSON.stringify(data));
  }

  function render() {
    days.forEach(day => {
      const el = document.getElementById(day);

      el.innerHTML = `<h3>${day}</h3>` +
        data[day]
          .map(
            (task, i) => `
            <div class="task">
              ${task}
              <button onclick="deleteTask('${day}', ${i})">✕</button>
            </div>
          `
          )
          .join("");
    });
  }

  render();
});
