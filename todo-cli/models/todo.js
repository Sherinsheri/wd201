'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      const overdueItems = await Todo.overdue();
      overdueItems.forEach((item) => console.log(item.displayableString()));
      console.log("\n");

      console.log("Due Today");
      const dueTodayItems = await Todo.dueToday();
      dueTodayItems.forEach((item) => console.log(item.displayableString()));
      console.log("\n");

      console.log("Due Later");
      const dueLaterItems = await Todo.dueLater();
      dueLaterItems.forEach((item) => console.log(item.displayableString()));
    }

    static async overdue() {
      const today = new Date().toISOString().split("T")[0];
      const allTodos = await Todo.findAll({ order: [["id", "ASC"]] });
      return allTodos.filter(todo => todo.dueDate < today);
    }

    static async dueToday() {
      const today = new Date().toISOString().split("T")[0];
      const allTodos = await Todo.findAll({ order: [["id", "ASC"]] });
      return allTodos.filter(todo => todo.dueDate === today);
    }

    static async dueLater() {
      const today = new Date().toISOString().split("T")[0];
      const allTodos = await Todo.findAll({ order: [["id", "ASC"]] });
      return allTodos.filter(todo => todo.dueDate > today);
    }

    static async markAsComplete(id) {
      const todo = await Todo.findByPk(id);
      if (todo) {
        todo.completed = true;
        await todo.save();
      }
    }
    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      const today = new Date().toISOString().split("T")[0];
      this.dueDate = this.dueDate === today ? "" : ` ${this.dueDate}`;
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
  }
  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};
