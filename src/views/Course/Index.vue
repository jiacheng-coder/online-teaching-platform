<template>
  <ga-page>
    <template v-slot:headerLeft>
      <div style="font-size:1.8em; color:var(--el-text-color-primary);">
        我教的课
      </div>
    </template>
    <template v-slot:headerRight>
      <div style="font-size:1.2em;" class="ga-color-gray">
        左侧功能
      </div>
    </template>
    <template v-slot:body>
      <el-row :gutter="20">
        <el-col :span="8" v-for="course in courses" :key="course.id">
          <el-card shadow="hover" class="course-card" :style="{ backgroundColor: course.backgroundColor }">
            <div slot="header" class="card-header">
              <span>{{ course.name }}</span>
              <el-dropdown>
                <el-button class="button" type="primary"
                  :style="{ backgroundColor: course.backgroundColor, border: 'none' }">
                  ...
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>Action 1</el-dropdown-item>
                    <el-dropdown-item>Action 2</el-dropdown-item>
                    <el-dropdown-item>Action 3</el-dropdown-item>
                    <el-dropdown-item>Action 4</el-dropdown-item>
                    <el-dropdown-item>Action 5</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <div slot="footer" class="card-content">
              <p>{{ course.teacher }}</p>
              <p>{{ course.semester }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </template>
  </ga-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';
onMounted(() => {
  let config = {
    method: 'get',
    url: '/api/test',
  };
  axios(config).then((response) => {
    console.log("Here:", response);
  }).catch((error) => {
    console.log(error.data);
  });
});
const courses = ref([
  { id: 1, name: '课程1', teacher: '老师1', backgroundColor: '#6AD0A9', semester: '2023年秋' },
  { id: 2, name: '课程2', teacher: '老师2', backgroundColor: '#A27AF5', semester: '2023年秋' },
  { id: 3, name: '课程3', teacher: '老师3', backgroundColor: '#EF8689', semester: '2023年秋' },
  { id: 4, name: '课程4', teacher: '老师3', backgroundColor: '#EF8689', semester: '2023年秋' },
  { id: 5, name: '课程5', teacher: '老师3', backgroundColor: '#EF8689', semester: '2023年秋' },
])
</script>

<style scoped lang="scss">
.course-card {
  border-radius: 10px;
  color: #ffffff;
  /* box-shadow: "0 0 0 20px transparent"; */
  /* padding: '10px' */
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  font-size: 23px;
  font-weight: 500;

  .button {
    font-size: 23px;
    font-weight: 700;
    padding: 15px 10px;
  }
}

.card-content {
  display: flex;
  justify-content: space-between;
  text-align: left;
}
</style>

