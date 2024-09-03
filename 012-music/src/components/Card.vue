<script setup>
import { defineProps } from 'vue'

defineProps({
  info: {
    require: true
  }
})
</script>

<template>
  <div class="card">
    <img class="card-image" src="https://placekitten.com/300/200" alt="Card Image" />
    <div class="card-content">
      <h2 class="text-black card-title">{{ info.title }}</h2>
      <p class="card-text">{{ info.desc }}</p>
    </div>
  </div>
</template>
<style scoped>
/* 定义卡片样式 */
.card {
  max-width: 300px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease-in-out;

  /* 鼠标悬停时添加阴影效果 */
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
}

.card-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.card-content {
  padding: 16px;
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 8px;
}

.card-text {
  font-size: 1rem;
  color: #4a5568;
}
</style>
