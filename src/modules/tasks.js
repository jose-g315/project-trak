function createTask(name, description, dueDate, priority, status) {
  return {
    name,
    description,
    dueDate,
    priority,
    status,
  };
}

export { createTask };
