import { GetterTree, MutationTree, ActionTree } from "vuex";
import dayjs from "dayjs";

interface Task {
  id: number;
  name: string;
  description: string;
  date: string;
  lvl: string;
}

interface State {
  tasks: Task[];
}

const state: State = {
  tasks: [],
};

const mutations: MutationTree<State> = {
  addTask(state, task: Task) {
    state.tasks.push(task);
  },
  updateTask(state, { index, task }) {
    state.tasks.splice(index, 1, task);
  },
  deleteTask(state, taskId) {
    state.tasks = state.tasks.filter((task) => task.id !== taskId);
  },
};

const actions: ActionTree<State, State> = {
  addTaskAction({ commit }, { name, description, lvl }) {
    const newTask = {
      id: Math.floor(Math.random() * 1000),
      name,
      description,
      date: dayjs().format("D MMMM"),
      lvl,
    };
    commit("addTask", newTask);
  },
  editTaskAction({ commit, state }, { id, name, description, lvl }) {
    const taskIndex = state.tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      const updatedTask = {
        ...state.tasks[taskIndex],
        name,
        description,
        lvl,
      };
      commit("updateTask", { index: taskIndex, task: updatedTask });
    }
  },
  deleteTaskAction({ commit, state }, taskId) {
    const taskIndex = state.tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      commit("deleteTask", taskId);
    }
  },
};

const getters: GetterTree<State, State> = {
  tasks: (state) => state.tasks,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
