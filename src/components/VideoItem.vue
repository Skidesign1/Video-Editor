<template>
  <div class="video-item" :style="{ width: width + 'px' }">

    <div
      class="video-frame"
      :style="{
        backgroundImage: backgroundStyle.image,
        backgroundPosition: backgroundStyle.position,
        height: frameHeight + 'px',
      }"
    ></div>

    <div class="placeholder"></div>
  </div>
</template>

<script setup>
import {
  defineProps,
  computed,
  inject,
  watchEffect,
  ref,
  onRenderTracked,
  onRenderTriggered,
} from "vue";
import Mapping from "@/map";
import Store from "@/store";

const props = defineProps({
  visionTrackMaterial: Object,
  frames: Array,
});

const frameWidth = inject(Store.frameWidth);

const backgroundStyle = ref({ image: "", position: "" });

const frameHeight = Store.VIDEO_FRAME_HEIGHT;

watchEffect(() => {

  if (props.frames) {
    const imageList = [];
    const positionList = [];
    for (let i = 0; i < props.frames.length; i++) {
      const frame = props.frames[i];
      const blobUrl = frame.blobUrl;
      const position = frame.position;

      const image = blobUrl
        ? `url(${blobUrl})`
        : `linear-gradient(#181818, #181818)`;
      imageList.push(image);
      positionList.push(position);
    }

    backgroundStyle.value = {
      image: imageList.join(","),
      position: positionList.join(","),
    };
  }
  // debugger;
});

onRenderTriggered((event) => {
  // debugger;
});

const width = computed(() =>
  props.visionTrackMaterial
    ? Mapping.getMaterialWidth(
        props.visionTrackMaterial.timelineIn,
        props.visionTrackMaterial.timelineOut,
        frameWidth.value
      )
    : 0
);
</script>

<style scoped lang="scss">
.video-item {
  background: #000;
  position: relative;
  display: flex;
  overflow: hidden;
  align-items: center;

  .video-frame {
    // flex-shrink: 0;
    // width: 49px;
    width: 100%;
    overflow: hidden;
    background-repeat: no-repeat;
    // background-size: contain;
    // object-fit: cover;
  }

  .placeholder {
    position: absolute;
    right: 0;
    width: 2px;
    background: #202020;
    height: 100%;
    top: 0;
    bottom: 0;
  }
}
</style>