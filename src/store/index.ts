import { createStore } from "vuex";
import tasks from "./tasks";
import createPersistedState from "vuex-persistedstate";
export default createStore({
  modules: {
    tasks,
  },
  plugins: [createPersistedState()],
});
