<template>
  <IntroTemplate link=/project>
    <span slot="header">项目 · Project</span>
    <Loading size="xl" v-if="dataset.length === 0"></Loading>
    <ProjectCard
      slot="mobile"
      class="mr4"
      v-for="(data, index) in introSet"
      :data="data"
      :key="index"
    ></ProjectCard>
    <el-col
      v-for="(data, index) in introSet"
      :xs="24" :sm="12" :md="8" :lg="6"
      :key="index"
    >
      <ProjectCard
        :data="data"
      ></ProjectCard>
    </el-col>
  </IntroTemplate>
</template>

<script>
import ProjectCard from '../card/project/main'
import { generateIntroObj } from './util'
import ErrorPage from '../utils/error_page'

export default generateIntroObj({
  name: 'ProjectIntro',

  components: {
    ProjectCard,
    ErrorPage,
  },
})
</script>
