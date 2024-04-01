import { taskTodoType } from "../Components/app/App";
import { TaskPriorities, TaskStatus, TaskType } from "../api/todolists-api";
import { tasksActions, tasksReducer } from "./tasksReducer";
import { TodolistsDomainType, todolistActions } from "./todolistsReducer";

let startState: taskTodoType;

beforeEach(() => {
   startState = {
      todolistId1: [
         {
            id: "1",
            title: "CSS",
            description: "",
            todoListId: "todolistId1",
            status: TaskStatus.New,
            order: 0,
            priority: TaskPriorities.Low,
            startDate: "",
            deadline: "",
            addedDate: "",
         },
         {
            id: "2",
            title: "JS",
            description: "",
            todoListId: "todolistId1",
            status: TaskStatus.Completed,
            order: 0,
            priority: TaskPriorities.Low,
            startDate: "",
            deadline: "",
            addedDate: "",
         },
         {
            id: "3",
            title: "React",
            description: "",
            todoListId: "todolistId1",
            status: TaskStatus.New,
            order: 0,
            priority: TaskPriorities.Low,
            startDate: "",
            deadline: "",
            addedDate: "",
         },
      ],
      todolistId2: [
         {
            id: "1",
            title: "bread",
            description: "",
            todoListId: "todolistId2",
            status: TaskStatus.New,
            order: 0,
            priority: TaskPriorities.Low,
            startDate: "",
            deadline: "",
            addedDate: "",
         },
         {
            id: "2",
            title: "milk",
            description: "",
            todoListId: "todolistId2",
            status: TaskStatus.Completed,
            order: 0,
            priority: TaskPriorities.Low,
            startDate: "",
            deadline: "",
            addedDate: "",
         },
         {
            id: "3",
            title: "tea",
            description: "",
            todoListId: "todolistId2",
            status: TaskStatus.New,
            order: 0,
            priority: TaskPriorities.Low,
            startDate: "",
            deadline: "",
            addedDate: "",
         },
      ],
   };
});

test("correct task should be deleted from correct array", () => {
   const action = tasksActions.removeTask({ todolistID: "todolistId2", taskId: "2" });

   const endState = tasksReducer(startState, action);

   expect(endState).toEqual({
      todolistId1: [
         {
            id: "1",
            title: "CSS",
            description: "",
            todoListId: "todolistId1",
            status: TaskStatus.New,
            order: 0,
            priority: TaskPriorities.Low,
            startDate: "",
            deadline: "",
            addedDate: "",
         },
         {
            id: "2",
            title: "JS",
            description: "",
            todoListId: "todolistId1",
            status: TaskStatus.Completed,
            order: 0,
            priority: TaskPriorities.Low,
            startDate: "",
            deadline: "",
            addedDate: "",
         },
         {
            id: "3",
            title: "React",
            description: "",
            todoListId: "todolistId1",
            status: TaskStatus.New,
            order: 0,
            priority: TaskPriorities.Low,
            startDate: "",
            deadline: "",
            addedDate: "",
         },
      ],
      todolistId2: [
         {
            id: "1",
            title: "bread",
            description: "",
            todoListId: "todolistId2",
            status: TaskStatus.New,
            order: 0,
            priority: TaskPriorities.Low,
            startDate: "",
            deadline: "",
            addedDate: "",
         },
         {
            id: "3",
            title: "tea",
            description: "",
            todoListId: "todolistId2",
            status: TaskStatus.New,
            order: 0,
            priority: TaskPriorities.Low,
            startDate: "",
            deadline: "",
            addedDate: "",
         },
      ],
   });
});

test("correct task should be added to correct array", () => {
   let newTask: TaskType = {
      id: "1",
      title: "juce",
      description: "",
      todoListId: "todolistId2",
      status: TaskStatus.New,
      order: 0,
      priority: 0,
      startDate: "",
      deadline: "",
      addedDate: "",
   };
   const action = tasksActions.addTask({ newTask });

   const endState = tasksReducer(startState, action);

   expect(endState["todolistId1"].length).toBe(3);
   expect(endState["todolistId2"].length).toBe(4);
   expect(endState["todolistId2"][0].id).toBeDefined();
   expect(endState["todolistId2"][0].title).toBe("juce");
   expect(endState["todolistId2"][0].status).toBe(TaskStatus.New);
});

test("status of specified task should be changed", () => {
   const action = tasksActions.updateTask({
      todolistID: "todolistId2",
      model: { status: TaskStatus.New },
      taskId: "2",
   });

   const endState = tasksReducer(startState, action);

   expect(startState["todolistId2"][1].status).toBe(TaskStatus.Completed);
   expect(endState["todolistId2"][1].status).toBe(TaskStatus.New);
});

test("title of specified task should be changed", () => {
   const action = tasksActions.updateTask({ todolistID: "todolistId2", model: { title: "add" }, taskId: "1" });

   const endState = tasksReducer(startState, action);

   expect(startState["todolistId2"][0].title).toBe("bread");
   expect(endState["todolistId2"][0].title).toBe("add");
});

test("new array should be added when new todolist is added", () => {
   const newTodo: TodolistsDomainType = {
      id: "1",
      title: "111",
      addedDate: "",
      order: 0,
      filter: "all",
      entityStatus: "idle",
   };

   const action = todolistActions.addTodolist({ todo: newTodo });

   const endState = tasksReducer(startState, action);

   const keys = Object.keys(endState);
   const newKey = keys.find((k) => k != "todolistId1" && k != "todolistId2");
   if (!newKey) {
      throw Error("new key should be added");
   }

   expect(keys.length).toBe(3);
   expect(endState[newKey]).toEqual([]);
});

test("property with todolistId should be deleted", () => {
   const action = todolistActions.removeTodolist({ todolistID: "todolistId2" });

   const endState = tasksReducer(startState, action);

   const keys = Object.keys(endState);

   expect(keys.length).toBe(1);
   expect(endState["todolistId2"]).not.toBeDefined();
});

test("tasks should be added for todolist", () => {
   const action = tasksActions.setTasks({ todolistID: "todolistId2", tasks: startState["todolistId2"] });

   const endState = tasksReducer(
      {
         todolistId2: [],
         todolistId1: [],
      },
      action,
   );

   const keys = Object.keys(endState);

   expect(endState["todolistId2"].length).toBe(3);
   expect(endState["todolistId1"].length).toBe(0);
});
