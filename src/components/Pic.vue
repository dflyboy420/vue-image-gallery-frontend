<template>
  <picture v-if="fallback && sources">
    <source
      v-for="(srcset, type) of sources"
      :key="type"
      :srcset="srcset"
      :type="type"
    />
    <img :srcset="fallback" alt="" />
  </picture>
</template>

<script>
import axios from "axios";
import * as _ from "lodash";
import * as srcset from "srcset";

export default {
  name: "Pic",
  props: ["fileName"],
  data() {
    return {
      sources: {},
      fallback: "",
    };
  },
  async created() {
    await this.loadSrc();
  },
  methods: {
    async loadSrc() {
      const { data } = await axios.get(
        "//localhost:8088/list/" + this.fileName
      );
      for (let t of data) {
        let parsed = [];
        
        for (let e of _.orderBy(t.sizes, "width", "asc")) {
          parsed.push({
            url: "http://localhost:8088/img/" + e.id,
            width: e.width,
          });
        }
        const stringified = srcset.stringify(parsed);
        console.log(stringified);
        _.set(this.sources, t.type, stringified);
        if (t.type === "image/jpeg") this.fallback = stringified;
      }
    },
  },
};
</script>
