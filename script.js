// توليد الأعمدة الخاصة بالأيام
function generateDaysHeader() {
  const table = document.getElementById("attendance-table");
  const headerRow = table
    .getElementsByTagName("thead")[0]
    .getElementsByTagName("tr")[0];

  // إضافة الأعمدة للأيام (من 1 إلى 30)
  for (let i = 1; i <= 30; i++) {
    const th = document.createElement("th");
    th.textContent = `يوم ${i}`;
    headerRow.appendChild(th);
  }
}

// إضافة اسم جديد مع خيارات الحضور والغياب
function addName() {
  const table = document
    .getElementById("attendance-table")
    .getElementsByTagName("tbody")[0];
  const row = document.createElement("tr");

  // إضافة خلية الاسم
  const nameCell = document.createElement("td");
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.placeholder = "اسم الطالب";
  nameCell.appendChild(nameInput);
  row.appendChild(nameCell);

  // إضافة خلايا الأيام مع خيارات الحضور والغياب
  for (let i = 1; i <= 30; i++) {
    const dayCell = document.createElement("td");
    const statusSelect = document.createElement("select");

    // إضافة خيارات الحضور والغياب
    const emptyOption = document.createElement("option");
    emptyOption.value = "";
    emptyOption.textContent = "";

    const presentOption = document.createElement("option");
    presentOption.value = "حاضر";
    presentOption.textContent = "حاضر";

    const absentOption = document.createElement("option");
    absentOption.value = "غائب";
    absentOption.textContent = "غائب";

    statusSelect.appendChild(emptyOption);
    statusSelect.appendChild(presentOption);
    statusSelect.appendChild(absentOption);

    // إضافة القائمة المنسدلة إلى الخلية
    dayCell.appendChild(statusSelect);
    row.appendChild(dayCell);
  }

  // إضافة الصف الجديد إلى الجدول
  table.appendChild(row);

  // حفظ التعديلات بعد إضافة اسم جديد
  saveData();
}

// حفظ التعديلات تلقائيًا في localStorage
function saveData() {
  const table = document.getElementById("attendance-table");
  const rows = table
    .getElementsByTagName("tbody")[0]
    .getElementsByTagName("tr");
  const data = [];

  // تخزين البيانات من الجدول
  for (let row of rows) {
    const name = row.cells[0].getElementsByTagName("input")[0].value;
    const attendance = [];

    for (let i = 1; i <= 30; i++) {
      const select = row.cells[i].getElementsByTagName("select")[0];
      attendance.push(select.value);
    }

    data.push({ name, attendance });
  }

  // تخزين البيانات في localStorage
  localStorage.setItem("attendanceData", JSON.stringify(data));
}

// تحميل البيانات المحفوظة
function loadData() {
  const savedData = localStorage.getItem("attendanceData");
  if (savedData) {
    const data = JSON.parse(savedData);
    const table = document
      .getElementById("attendance-table")
      .getElementsByTagName("tbody")[0];

    // إضافة الصفوف المحفوظة
    data.forEach((entry) => {
      const row = document.createElement("tr");

      // إضافة اسم الطالب
      const nameCell = document.createElement("td");
      const nameInput = document.createElement("input");
      nameInput.type = "text";
      nameInput.value = entry.name;
      nameCell.appendChild(nameInput);
      row.appendChild(nameCell);

      // إضافة بيانات الحضور والغياب
      for (let i = 0; i < 30; i++) {
        const dayCell = document.createElement("td");
        const statusSelect = document.createElement("select");

        const options = ["", "حاضر", "غائب"];
        options.forEach((optionText) => {
          const option = document.createElement("option");
          option.textContent = optionText;
          option.value = optionText;
          if (optionText === entry.attendance[i]) {
            option.selected = true;
          }
          statusSelect.appendChild(option);
        });

        dayCell.appendChild(statusSelect);
        row.appendChild(dayCell);
      }

      // إضافة الصف إلى الجدول
      table.appendChild(row);
    });
  }
}

// عند تحميل الصفحة، قم بتحميل البيانات المحفوظة
window.onload = () => {
  loadData();
  generateDaysHeader();
};

// حفظ التعديلات عند تغييرات الجدول
setInterval(saveData, 5000); // حفظ البيانات كل 5 ثوانٍ