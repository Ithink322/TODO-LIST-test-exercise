<template>
  <div class="container">
    <div class="container__main-flex">
      <div class="container__tasks-to-complete-text-and-amount-of-tasks-flex">
        <span class="container__tasks-to-complete-text"
          >You have got {{ tasksToComplete
          }}<br class="container__tasks-to-complete-text-br-from320px" />
          tasks<br class="container__tasks-to-complete-text-br-from375px" />
          today to complete</span
        >
        <div class="container__amount-of-tasks-back">
          <span class="container__amount-of-tasks-text">{{
            tasksToComplete
          }}</span>
        </div>
      </div>
      <form class="container__search-form">
        <img src="imgs/search-icon.svg" alt="" />
        <input
          type="text"
          placeholder="Search Task Here"
          class="container__search-form-input"
          v-model="searchTask"
        />
      </form>
      <section class="container__progress-section">
        <span class="container__progress-title">Progress</span>
        <div class="container__progress-daily-task-container">
          <span class="container__progress-daily-task-title">Daily Task</span>
          <span class="container__progress-daily-task-task-completed-text"
            >{{ tasksCompleted }}/{{ allTasks }} Task Completed</span
          >
          <div
            class="container__progress-daily-task-progress-bar-text-and-percents-flex"
          >
            <span class="container__progress-daily-task-progress-bar-text">{{
              brogressBarText
            }}</span>
            <span class="container__progress-daily-task-percents"
              >{{ percentage }}%</span
            >
          </div>
          <progress
            class="container__progress-daily-task-progress-bar"
            :value="tasksCompleted"
            :max="allTasks"
          ></progress>
        </div>
      </section>
      <section class="container__tasks-list-section">
        <span class="container__tasks-list-title">Today's Task</span>
        <tasks-list :tasks="searchTasks"></tasks-list>
      </section>
    </div>
    <button @click="goToCreateTaskPage" class="container__add-task-btn">
      <img src="imgs/add-task-btn.svg" alt="" />
    </button>
  </div>
</template>

<script>
import TasksList from "../UI/TasksList.vue";
import { mapGetters } from "vuex";
export default {
  name: "MainPage",
  components: { TasksList },
  data() {
    return {
      searchTask: "",
    };
  },
  computed: {
    ...mapGetters(["tasks"]),
    percentage() {
      if (this.allTasks === 0) {
        return 0;
      } else {
        return Math.round((this.tasksCompleted / this.allTasks) * 100);
      }
    },
    allTasks() {
      return this.tasks.length;
    },
    tasksCompleted() {
      return this.tasks.filter((task) => task.checked).length;
    },
    tasksToComplete() {
      return this.allTasks - this.tasksCompleted;
    },
    brogressBarText() {
      if (this.percentage <= 33) {
        return "Have a good one";
      } else if (this.percentage > 33 && this.percentage <= 66) {
        return "Keep going";
      } else if (this.percentage > 66 && this.percentage < 100) {
        return "You are almost done go ahead";
      } else if (this.percentage === 100) {
        return "You Rock!";
      }
    },
    searchTasks() {
      return this.tasks.filter(
        (task) =>
          task.name &&
          task.name.toLowerCase().includes(this.searchTask.toLowerCase())
      );
    },
  },
  methods: {
    goToCreateTaskPage() {
      this.$router.push("/CreateTaskPage");
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/App.scss";
.container {
  position: relative;
  padding: 4.313rem 1.25rem 6.2rem 1.25rem;
}
.container__main-flex {
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
}
.container__tasks-to-complete-text-and-amount-of-tasks-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.container__tasks-to-complete-text {
  font-family: "Roboto", sans-serif;
  font-size: 1.563rem;
  font-weight: 500;
  color: #ffffff;
}
.container__tasks-to-complete-text-br-from375px {
  display: none;
}
.container__amount-of-tasks-back {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  flex-shrink: 0;
  background: $palePink;
}
.container__amount-of-tasks-text {
  font-family: "Inter", sans-serif;
  font-size: 2rem;
  font-weight: 400;
  color: #fff;
}
.container__search-form {
  display: flex;
  gap: 1rem;
  align-items: center;
  background: #1e1e1e;
  border-radius: 0.5rem;
  padding: 0.813rem 0.5rem;
}
.container__search-form-input {
  @include input;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: #fff;
}
.container__search-form-input::placeholder {
  color: #fff;
}
.container__progress-section {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.container__progress-title {
  font-family: "Roboto", sans-serif;
  font-size: 1.375rem;
  font-weight: 400;
  color: #fff;
}
.container__progress-daily-task-container {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding: 1rem 1.688rem 1.438rem 0.875rem;
  background: $bl;
  border-radius: 0.5rem;
}
.container__progress-daily-task-title {
  font-family: "Inter", sans-serif;
  font-size: 1.125rem;
  font-weight: 500;
  color: #fff;
}
.container__progress-daily-task-task-completed-text {
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: #fff;
}
.container__progress-daily-task-progress-bar-text-and-percents-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.container__progress-daily-task-progress-bar-text {
  font-family: "Inter", sans-serif;
  font-size: 0.875rem;
  font-weight: 200;
  color: #fff;
  opacity: 80%;
}
.container__progress-daily-task-percents {
  font-family: "Inter", sans-serif;
  font-size: 1.125rem;
  font-weight: 400;
  color: #fff;
}
.container__progress-daily-task-progress-bar {
  width: 100%;
  height: 18px;
}
progress[value] {
  appearance: none;
  border: none;
  background-color: #5b426b;
  border-radius: 1.25rem;
}
progress[value]::-webkit-progress-bar {
  background-color: #5b426b;
  border-radius: 1.25rem;
}
progress[value]::-moz-progress-bar {
  background-color: $palePink;
  border-radius: 1.25rem;
}

progress[value]::-webkit-progress-value {
  background-color: $palePink;
  border-radius: 1.25rem;
}
progress[value]::-moz-progress-value {
  background-color: #5b426b;
  border-radius: 1.25rem;
}
.container__tasks-list-title {
  font-family: "Roboto", sans-serif;
  color: #fff;
}
.container__add-task-btn {
  @include btn;
  position: fixed;
  right: 1.25rem;
  bottom: 2.875rem;
  width: 71px;
  height: 71px;
}

/* 375px = 23.438em */
@media (min-width: 23.438em) {
  .container__tasks-to-complete-text-br-from320px {
    display: none;
  }
  .container__tasks-to-complete-text-br-from375px {
    display: block;
  }
}
/* 768px = 48em */
@media (min-width: 48em) {
  .container {
    padding: 4.313rem 2.5rem 6.2rem 2.5rem;
  }
  .container__tasks-to-complete-text-br-from375px {
    display: none;
  }
}
/* 1024px = 64em */
@media (min-width: 64em) {
  .container {
    padding: 4.313rem 7.5rem 6.2rem 7.5rem;
  }
}
/* 1440px = 90em */
@media (min-width: 90em) {
  .container {
    padding: 4.313rem 10rem 6.2rem 10rem;
  }
  .container__add-task-btn {
    right: 4.5rem;
  }
}
/* 1920px = 120em */
@media (min-width: 120em) {
  .container {
    padding: 4.313rem 15.938rem 6.2rem 15.938rem;
  }
  .container__add-task-btn {
    right: 9rem;
  }
}
</style>
