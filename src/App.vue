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

          <div class="col-12 mt-3">
            <Pic fileName="76B757B0-1186-4ADF-9796-663C048EF366.JPG" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import Upload from "@/components/Upload.vue";
import Pic from "@/components/Pic.vue";

export default {
  name: "app",
  components: {
    Upload, Pic
  },
};
</script>

<style lang="scss" scoped>
main.home {
  // background-image: url("/img/home_bg.png");
  // background-size: cover;
}
</style>
