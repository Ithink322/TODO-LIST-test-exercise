<template>
  <div class="app">
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style lang="scss">
html {
  box-sizing: border-box;
}
*,
*::after,
*::before {
  box-sizing: inherit;
  /* outline: solid 1px red; */
}
body {
  min-width: 20em;
  background-color: #020206;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0rem;
  margin-bottom: 0rem;
  font-family: "Inter", sans-serif;
  font-family: "Roboto", sans-serif;
}
</style>
