<template>
  <div class="container__tasks-list-task-item">
    <div
      class="container__tasks-list-task-lvl"
      :style="{ backgroundColor: task.lvl }"
    ></div>
    <div
      class="container__tasks-list-task-title-and-calendar-and-checkbox-flex"
    >
      <div class="container__tasks-list-task-title-and-calendar-flex">
        <span class="container__tasks-list-task-title">{{ task.name }}</span>
        <div class="container__tasks-list-task-calendar-flex">
          <img src="imgs/calendar-icon.svg" alt="" />
          <span class="container__tasks-list-task-calendar-text">{{
            task.date
          }}</span>
        </div>
      </div>
      <input
        @click.stop
        @change="saveCheckedState(task.id, task.checked)"
        type="checkbox"
        v-model="task.checked"
        class="container__tasks-list-task-checkbox"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TasksItem",
  props: {
    tasks: {
      type: Array,
      required: true,
    },
    task: {
      type: Object,
      required: true,
    },
  },
  created() {
    const checkedTasks = JSON.parse(localStorage.getItem("checkedTasks")) || {};
    this.tasks.forEach((task) => {
      task.checked = checkedTasks[task.id] || false;
    });
  },
  methods: {
    saveCheckedState(taskId, checked) {
      const checkedTasks =
        JSON.parse(localStorage.getItem("checkedTasks")) || {};
      checkedTasks[taskId] = checked;
      localStorage.setItem("checkedTasks", JSON.stringify(checkedTasks));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/App.scss";
.container__tasks-list-task-item {
  position: relative;
  background: #1f1f1f;
  border-radius: 0.469rem 0.5rem 0.5rem 0.469rem;
  cursor: pointer;
}
.container__tasks-list-task-lvl {
  position: absolute;
  height: 100%;
  width: 15px;
  border-radius: 0.469rem 0rem 0rem 0.469rem;
}
.container__tasks-list-task-title-and-calendar-and-checkbox-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 0.688rem 1.25rem 1.813rem;
}
.container__tasks-list-task-title-and-calendar-flex {
  display: flex;
  flex-direction: column;
  gap: 0.313rem;
}
.container__tasks-list-task-title {
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: #fff;
}
.container__tasks-list-task-calendar-flex {
  display: flex;
  gap: 0.438rem;
  align-items: center;
}
.container__tasks-list-task-calendar-text {
  font-family: "Inter", sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  color: #fff;
  opacity: 80%;
}
.container__tasks-list-task-checkbox[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  border: 1px solid $palePink;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
}
.container__tasks-list-task-checkbox:checked {
  background: $palePink;
  border: 1px solid #000;
}
.container__tasks-list-task-checkbox::before {
  content: "";
  position: absolute;
  width: 12px;
  height: 9px;
  background-image: url("/public/imgs/tick.svg");
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0;
}

.container__tasks-list-task-checkbox:checked::before {
  opacity: 1;
}
/* 768px = 48em */
@media (min-width: 48em) {
}
/* 1024px = 64em */
@media (min-width: 64em) {
}
/* 1440px = 90em */
@media (min-width: 90em) {
}
/* 1920px = 120em */
@media (min-width: 120em) {
}
</style>
