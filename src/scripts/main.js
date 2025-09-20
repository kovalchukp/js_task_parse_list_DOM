'use strict';

// write code here
// helper: convert salary string like '$162,700' → 162700
function parseSalary(salaryStr) {
  return Number(salaryStr.replace(/[$,]/g, ''));
}

// sort list items in descending order by salary
function sortList(list) {
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
  return Array.from(list.querySelectorAll('li')).map((item) => ({
    name: item.textContent.trim(),
    position: item.dataset.position,
    salary: parseSalary(item.dataset.salary),
    age: Number(item.dataset.age),
  }));
}

// run when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const list = document.querySelector('ul');

  sortList(list);

  const employees = getEmployees(list);

  return employees;

  // console.log(employees);
});
