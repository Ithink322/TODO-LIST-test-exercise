<template>
  <div class="container">
    <div class="container__go-back-btn-and-title-flex">
      <button @click="goToMainPage" class="container__go-back-btn">
        <img src="/imgs/go-back-btn.svg" alt="" />
      </button>
      <span class="container__title">{{ editedName }}</span>
    </div>
    <section class="container__form-section">
      <span class="container__form-title">Schedule</span>
      <input
        v-model="editedName"
        type="text"
        placeholder="Name"
        class="container__form-input"
      />
      <textarea
        v-model="editedDescription"
        type="text"
        placeholder="Description"
        class="container__form-textarea"
      ></textarea>
    </section>
    <section class="container__priority-section">
      <div class="container__priority-title">Priority</div>
      <div class="container__priority-section-btns-flex">
        <button @click="chooseLvl(high)" class="container__priority-high-btn">
          High
        </button>
        <button
          @click="chooseLvl(medium)"
          class="container__priority-medium-btn"
        >
          Medium
        </button>
        <button @click="chooseLvl(low)" class="container__priority-low-btn">
          Low
        </button>
      </div>
    </section>
    <div class="container__edit-task-and-delete-task-btns-flex">
      <button @click="editTask" class="container__edit-task-btn">
        Edit Task
      </button>
      <button
        @click="deleteTask(this.taskId)"
        class="container__delete-task-btn"
      >
        Delete Task
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.css";
export default {
  name: "EditTaskPage",
  props: ["id"],
  data() {
    return {
      high: "high",
      medium: "medium",
      low: "low",
      editedName: "",
      editedDescription: "",
      editedLvl: "",
      taskId: 0,
    };
  },
  computed: {
    ...mapGetters(["tasks"]),
  },
  created() {
    this.taskId = this.$route.params.id;
    const task = this.tasks.find((task) => task.id === Number(this.taskId));
    if (task) {
      this.editedName = task.name;
      this.editedDescription = task.description;
      this.editedLvl = task.lvl;
    }
  },
  methods: {
    goToMainPage() {
      this.$router.push("/");
      window.scrollTo(0, 0);
    },
    chooseLvl(lvl) {
      const highLvlBtn = document.querySelector(
          ".container__priority-high-btn"
        ),
        mediumLvlBtn = document.querySelector(
          ".container__priority-medium-btn"
        ),
        lowLvlBtn = document.querySelector(".container__priority-low-btn");
      if (lvl === this.high) {
        highLvlBtn.classList.add("container__priority-high-btn-active");
        mediumLvlBtn.classList.remove("container__priority-medium-btn-active");
        lowLvlBtn.classList.remove("container__priority-low-btn-active");
        this.editedLvl = "#facbba";
      } else if (lvl === this.medium) {
        highLvlBtn.classList.remove("container__priority-high-btn-active");
        mediumLvlBtn.classList.add("container__priority-medium-btn-active");
        lowLvlBtn.classList.remove("container__priority-low-btn-active");
        this.editedLvl = "#d7f0ff";
      } else if (lvl === this.low) {
        highLvlBtn.classList.remove("container__priority-high-btn-active");
        mediumLvlBtn.classList.remove("container__priority-medium-btn-active");
        lowLvlBtn.classList.add("container__priority-low-btn-active");
        this.editedLvl = "#fad9ff";
      }
    },
    ...mapActions(["editTaskAction"]),
    editTask() {
      iziToast.settings({
        position: "topRight",
      });
      if (this.editedName !== "" && this.editedDescription !== "") {
        this.editTaskAction({
          id: Number(this.taskId),
          name: this.editedName,
          description: this.editedDescription,
          lvl: this.editedLvl,
        });
        iziToast.success({
          title: "Succeed",
          message: "Your task was edited successfully.",
        });
      } else if (this.editedName === "") {
        iziToast.warning({
          title: "Warning",
          message: "Please enter name.",
        });
      } else if (this.editedDescription === "") {
        iziToast.warning({
          title: "Warning",
          message: "Please enter description.",
        });
      }
    },
    ...mapActions(["deleteTaskAction"]),
    deleteTask(taskId) {
      this.deleteTaskAction(Number(taskId));
      iziToast.settings({
        position: "topRight",
      });
      iziToast.success({
        title: "Succeed",
        message: "Your task was deleted successfully.",
      });
      this.$router.push("/");
      window.scrollTo(0, 0);
    },
  },
  mounted() {
    const highLvlBtn = document.querySelector(".container__priority-high-btn"),
      mediumLvlBtn = document.querySelector(".container__priority-medium-btn"),
      lowLvlBtn = document.querySelector(".container__priority-low-btn");
    if (this.editedLvl === "#facbba") {
      highLvlBtn.classList.add("container__priority-high-btn-active");
      mediumLvlBtn.classList.remove("container__priority-medium-btn-active");
      lowLvlBtn.classList.remove("container__priority-low-btn-active");
    } else if (this.editedLvl === "#d7f0ff") {
      highLvlBtn.classList.remove("container__priority-high-btn-active");
      mediumLvlBtn.classList.add("container__priority-medium-btn-active");
      lowLvlBtn.classList.remove("container__priority-low-btn-active");
    } else if (this.editedLvl === "#fad9ff") {
      highLvlBtn.classList.remove("container__priority-high-btn-active");
      mediumLvlBtn.classList.remove("container__priority-medium-btn-active");
      lowLvlBtn.classList.add("container__priority-low-btn-active");
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/App.scss";
.container {
  position: relative;
  padding: 4.313rem 1.25rem 0.938rem 1.25rem;
  height: 100vh;
}
.container__go-back-btn-and-title-flex {
  display: flex;
  align-items: center;
}
.container__go-back-btn {
  @include btn;
  position: absolute;
}
.container__title {
  margin: auto;
  font-family: "Roboto", sans-serif;
  font-size: 1.563rem;
  font-weight: 400;
  color: #ffffff;
}
.container__form-section {
  display: flex;
  flex-direction: column;
  gap: 1.125rem;
  margin-top: 3.75rem;
}
.container__form-title {
  font-family: "Inter", sans-serif;
  font-size: 1.375em;
  font-weight: 400;
  color: #fff;
}
.container__form-input-and-textarea-flex {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.container__form-input {
  @include input;
  background: $bl;
  padding: 1.25rem 0.625rem;
  border-radius: 0.875rem;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: #fff;
}
.container__form-input::placeholder {
  color: #fff;
  font-weight: 200;
}
.container__form-textarea {
  border: none;
  background: $bl;
  padding: 1.25rem 0.625rem;
  border-radius: 0.875rem;
  outline: none;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: #fff;
}
.container__form-textarea::placeholder {
  color: #fff;
  font-weight: 200;
}
.container__priority-section {
  display: flex;
  flex-direction: column;
  gap: 0.438rem;
  margin-top: 1.875rem;
}
.container__priority-title {
  font-family: "Inter", sans-serif;
  font-size: 1.25rem;
  font-weight: 400;
  color: #fff;
}
.container__priority-section-btns-flex {
  display: flex;
  gap: 0.625rem;
}
.container__priority-high-btn,
.container__priority-medium-btn,
.container__priority-low-btn {
  @include btn;
  border-radius: 0.5rem;
  padding: 0.5rem 0rem;
  flex-grow: 1;
  font-family: "Inter", sans-serif;
  font-size: 1.25rem;
  font-weight: 400;
  color: #fff;
}
.container__priority-high-btn {
  border: 1px solid #facbba;
}
.container__priority-medium-btn {
  border: 1px solid #d7f0ff;
}
.container__priority-low-btn {
  border: 1px solid #fad9ff;
}
.container__priority-high-btn-active {
  color: #000;
  background: #facbba;
}
.container__priority-medium-btn-active {
  color: #000;
  background: #d7f0ff;
}
.container__priority-low-btn-active {
  color: #000;
  background: #fad9ff;
}
.container__edit-task-and-delete-task-btns-flex {
  position: absolute;
  display: flex;
  gap: 0.563rem;
  bottom: 0.938rem;
  width: calc(100% - 2.5rem);
}
.container__edit-task-btn {
  @include btn;
  background: linear-gradient(to right, #ba83de, #de83b0);
  border-radius: 0.5rem;
  flex-grow: 1;
  padding: 1rem 0rem;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: #fff;
}
.container__delete-task-btn {
  @include btn;
  background: #4f4f4f;
  border-radius: 0.5rem;
  flex-grow: 1;
  padding: 1rem 0rem;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: #fff;
}
/* 768px = 48em */
@media (min-width: 48em) {
  .container {
    padding: 4.313rem 2.5rem 4rem 2.5rem;
  }
  .container__edit-task-and-delete-task-btns-flex {
    width: calc(100% - 5rem);
    bottom: 4rem;
  }
}
/* 1024px = 64em */
@media (min-width: 64em) {
  .container {
    padding: 4.313rem 7.5rem 4rem 7.5rem;
  }
  .container__edit-task-and-delete-task-btns-flex {
    width: calc(100% - 15rem);
  }
}
/* 1440px = 90em */
@media (min-width: 90em) {
  .container {
    padding: 4.313rem 10rem 4rem 10rem;
  }
  .container__edit-task-and-delete-task-btns-flex {
    width: calc(100% - 20rem);
  }
}
/* 1920px = 120em */
@media (min-width: 120em) {
  .container {
    padding: 4.313rem 15.938rem 4rem 15.938rem;
  }
  .container__edit-task-and-delete-task-btns-flex {
    width: calc(100% - 31.876rem);
  }
}
</style>
