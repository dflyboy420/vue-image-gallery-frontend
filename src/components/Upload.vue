<template>
  <div class="upload">
    <button
      @click.prevent="$refs.fileInput.click()"
      class="btn btn-primary"
      type="button"
    >
      Bild hinzufuegen
    </button>
    <input ref="fileInput" type="file" @change="upload" hidden />

    <div
      ref="carousel"
      class="carousel slide"
      data-bs-ride="carousel"
      v-if="imgNum > 0"
    >
      <div class="carousel-inner">
        <div class="carousel-item" ref="slide" v-for="(u, i) of imgs" :key="i">
          <img :src="u" class="d-block w-100" />
          <!-- TODO #2 show first slide -->
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        v-if="imgNum > 0"
        :data-bs-target="carouselRef"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        v-if="imgNum > 0"
        :data-bs-target="carouselRef"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <div class="modal" ref="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Bild hinzufuegen</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row mw-100">
              <div class="col">
                <img class="img-fluid" ref="image" alt="Cropped Image" />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Schliessen
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click.prevent="cropImage"
            >
              Speichern
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cropper from "cropperjs";
import { Modal } from "bootstrap";
import { mapState } from "vuex";

export default {
  name: "Upload",
  data() {
    return {
      img: "",
      file: null,
      modal: null,
      carousel: null,
      cropper: Cropper.prototype,
    };
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
    const image = this.$refs.image;

    this.cropper = new Cropper(image, {
      aspectRatio: 14 / 9,
      viewMode: 1,
    });
  },
  methods: {
    open() {
      this.modal.show();
    },
    cropImage() {
      const opt = {
        // minWidth: 256,
        minHeight: 256,
        // maxWidth: 1024,
        maxHeight: 1024,
        fillColor: "#fff",
        imageSmoothingEnabled: true,
        imageSmoothingQuality: "high",
      };

      this.cropper.getCroppedCanvas(opt).toBlob((blob) => {
        this.$store.commit("addImage", {
          uri: this.cropper.getCroppedCanvas(opt).toDataURL(this.file.type),
          file: new File([blob], this.file.name, { type: this.file.type }),
        });
        this.modal.hide();
        this.file = null;
      }, this.file.type);
    },
    upload() {
      const file = this.$refs.fileInput.files[0];
      if (!file.type.startsWith("image/")) {
        return;
      }
      const reader = new FileReader();
      reader.onload = (function (obj) {
        return function (e) {
          obj.img = e.target.result;
          obj.cropper.replace(obj.img);
          obj.open();
        };
      })(this);
      reader.readAsDataURL(file);
      this.file = file;
    },
  },
  watch: {
    imgNum: function (value) {
      if (value === 1) {
        this.$nextTick(() => this.$refs.slide[0].classList.add("active"));
      }
      console.log(value, this.$refs);
    },
  },
  computed: {
    ...mapState({
      imgs: (state) => state.images.uris,
      imgNum: (state) => state.images.uris.length,
    }),
    carouselRef() {
      if(!this.$refs.carousel) return "";
      return "[" + this.$refs.carousel.attributes[0].localName + "]";
    }
  },
  beforeDestroy() {
    this.modal.dispose();
    this.cropper.destroy();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
