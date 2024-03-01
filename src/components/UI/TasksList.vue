<template>
  <div class="container__tasks-list">
    <transition-group name="items-list">
      <tasks-item
        v-for="task in tasks"
        :tasks="tasks"
        :task="task"
        :key="task.id"
        @click="goToEditTaskPage(task.id)"
      ></tasks-item>
    </transition-group>
  </div>
</template>

<script>
import TasksItem from "./TasksItem.vue";
export default {
  name: "TasksList",
  components: { TasksItem },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  methods: {
    goToEditTaskPage(id) {
      this.$router.push(`/EditTaskPage/${id}`);
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.items-list-enter-active,
.items-list-leave-active {
  transition: all 0.6s ease;
}
.items-list-enter-from,
.items-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.items-list-move {
  transition: transform 0.6s ease;
}
.container__tasks-list {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  margin-top: 1.25rem;
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
