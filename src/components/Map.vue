<template>
  <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" class="custom-map">
    <vl-view :zoom.sync="zoom" :center="[longitude, latitude]" :rotation.sync="rotation"></vl-view>

    <vl-feature id="position-feature">
      <vl-geom-point :coordinates="[longitude, latitude]"></vl-geom-point>
      <vl-style-box>
        <vl-style-icon :src="require('@/assets/mark.svg')" :scale="2" :anchor="[0.5, 1]"></vl-style-icon>
      </vl-style-box>
    </vl-feature>

    <vl-layer-tile id="osm">
      <vl-source-osm></vl-source-osm>
    </vl-layer-tile>
  </vl-map>
</template>

<script>
export default {
  props: {
    latitude: {
      type: Number
    },
    longitude: {
      type: Number
    }
  },

  data () {
    return {
      zoom: 4,
      rotation: 0
    }
  }
}
</script>

<style scoped>
.custom-map {
  height: 400px
}
</style>
