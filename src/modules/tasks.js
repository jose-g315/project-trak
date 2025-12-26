function createTask({
  name,
  description,
  dueDate,
  priority,
  status = 'pending',
}) {
  return {
    id: crypto.randomUUID(),
    name: name,
    description: description,
    dueDate: dueDate,
    priority: priority,
    status,
  };
}

export { createTask };
