<template>
  <div id="app">
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <span class="navbar-brand mb-0 h1">Gallery</span>
      </div>
    </nav>
    <main>
      <div class="container mt-3">
        <div class="row">
          <div class="col">
            <upload />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import Upload from "@/components/Upload.vue";

export default {
  name: "app",
  components: {
    Upload,
  },
};
</script>

<style lang="scss" scoped>
main.home {
  // background-image: url("/img/home_bg.png");
  // background-size: cover;
}
</style>
