<template>
  <div class="iframe-content">
    <iframe
      src="https://p.datadoghq.com/sb/1f4ff3ee-bcb9-11eb-a478-da7ad0900002-cdf8903be7f6f7d0787e3a6d4dfe8807"
      width="80%"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'Metrics'
}
</script>

<style scoped>
iframe {
  display: block;
  border: none;         /* Reset default border */
  height: 100vh;        /* Viewport-relative units */
  width: calc(100% + 17px);
}
.iframe-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
