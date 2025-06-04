// const todoList = require("../todo");
// const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

// describe("todolist Test Suite", () => {
//   test("Should add a new todo", () => {
//     expect(all.length).toBe(0);
//     add({
//       title: "Test todo",
//       completed: false,
//       dueDate: new Date().toISOString().split("T")[0],
//     });
//     expect(all.length).toBe(1);
//   });
//   test("Should mark a todo as complete", () => {
//     expect(all[0].completed).toBe(false);
//     markAsComplete(0);
//     expect(all[0].completed).toBe(true);
//   });

//   test("Should retrieve overdue items", () => {
//     const today = new Date().toISOString().split("T")[0];
//     const yesterday = new Date(Date.now() - 86400000)
//       .toISOString()
//       .split("T")[0];
//     add({ title: "Overdue Todo", completed: false, dueDate: yesterday });
//     const overdueItems = overdue();
//     expect(overdueItems.length).toBeGreaterThanOrEqual(1);
//     expect(overdueItems[0].dueDate).toBe(yesterday);
//     expect(overdueItems[0].completed).toBe(false);
//   });
//   test("Should retrieve overdue items", () => {
//     const tomorrow = new Date(Date.now() + 86400000)
//       .toISOString()
//       .split("T")[0];
//     add({ title: "Future Todo", completed: false, dueDate: tomorrow });
//     const dueLaterItems = dueLater();
//     expect(dueLaterItems[0].dueDate).toBe(tomorrow);
//     expect(dueLaterItems[0].completed).toBe(false);
//   });
//   test("Should retrieve due today items", () => {
//     const today = new Date().toISOString().split("T")[0];
//     const dueTodayItems = dueToday();
//     expect(dueTodayItems.length).toBeGreaterThanOrEqual(1);
//     expect(dueTodayItems[0].dueDate).toBe(today);
//   });
// });
const db = require("../models");

describe("Todolist Test Suite", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  test("Should add new todo", async () => {
    const todoItemsCount = await db.Todo.count();
    await db.Todo.addTask({
      title: "Test todo",
      completed: false,
      dueDate: new Date(),
    });
    const newTodoItemsCount = await db.Todo.count();
    expect(newTodoItemsCount).toBe(todoItemsCount + 1);
  });
});