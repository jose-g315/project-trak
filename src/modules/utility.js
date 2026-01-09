function fillForm(task) {
  document.querySelector('#name').value = task.name;
  document.querySelector('#description').value = task.description;
  document.querySelector('#dueDate').value = task.dueDate;
  document.querySelectorAll('input[name="priority"]').forEach((radio) => {
    radio.checked = radio.value === task.priority;
  });
}

export { fillForm };
