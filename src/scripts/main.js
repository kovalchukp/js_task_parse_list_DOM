'use strict';

// write code here
// helper: convert salary string like '$162,700' → 162700 safely
function parseSalary(salaryStr) {
  if (!salaryStr) {
    return 0;
  }

  return Number(String(salaryStr).replace(/[$,]/g, '')) || 0;
}

// sort list items in descending order by salary
function sortList(list) {
  if (!list) {
    return;
  }

  const items = Array.from(list.querySelectorAll('li'));

  items.sort((a, b) => {
    const salaryA = parseSalary(a.dataset.salary);
    const salaryB = parseSalary(b.dataset.salary);

    return salaryB - salaryA; // descending order
  });

  // re-append sorted items into the list
  items.forEach((item) => list.appendChild(item));
}

// return array of employees
function getEmployees(list) {
  if (!list) {
    return [];
  }

  return Array.from(list.querySelectorAll('li')).map((item) => {
    // try to get just the name text if wrapped in an element
    const nameEl = item.querySelector('.name');
    const employeeName = nameEl
      ? nameEl.textContent.trim()
      : item.textContent.trim();

    return {
      name: employeeName,
      position: item.dataset.position || '',
      salary: parseSalary(item.dataset.salary),
      age: Number(item.dataset.age) || 0,
    };
  });
}

// run when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const list = document.querySelector('ul');

  sortList(list);

  const employees = getEmployees(list);

  // expose globally for testing/debug
  window.employees = employees;
});
