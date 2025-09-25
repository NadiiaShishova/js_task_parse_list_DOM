function parseSalary(salary) {
  if (!salary) {
    return 0;
  }

  return Number(salary.replace(/[^0-9]/g, '')) || 0;
}

function sortList(employeeList) {
  if (!employeeList) {
    return;
  }

  const items = Array.from(employeeList.children);

  items.sort((a, b) => {
    const salaryA = parseSalary(a.dataset.salary);
    const salaryB = parseSalary(b.dataset.salary);

    return salaryA - salaryB;
  });

  items.forEach((item) => employeeList.appendChild(item));
}

function getEmployees(employeeList) {
  if (!employeeList) {
    return [];
  }

  return Array.from(employeeList.children).map((item) => ({
    name: item.dataset.name || '',
    position: item.dataset.position || '',
    salary: parseSalary(item.dataset.salary),
    age: Number(item.dataset.age) || 0,
  }));
}

document.addEventListener('DOMContentLoaded', () => {
  const employeesList = document.getElementById('employees-list');

  if (employeesList) {
    sortList(employeesList);

    const employees = getEmployees(employeesList);

    const output = document.getElementById('employees-output');

    if (output) {
      output.innerHTML = employees
        .map(
          (emp) => `<li>${emp.name} – ${emp.position}, $${emp.salary},
          ${emp.age} лет</li>`,
        )
        .join('');
    }
  }
});
