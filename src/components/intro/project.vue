<template>
  <IntroTemplate link=/project>
    <span slot="header">项目 · Project</span>
    <el-col
      v-for="(data, index) in introSet"
      :key=index
      :xs="24"
      :sm="12"
      :md="8"
      :lg="6"
      :gutter=20>
      <ProjectCard
        v-bind=data
      ></ProjectCard>
    </el-col>
  </IntroTemplate>
</template>

<script>
import ProjectCard from '../card/project'
import { generateIntroObj } from './util'
import IntroTemplate from './tmpl'

export default generateIntroObj({
  name: 'HomeProjectIntro',
  components: {
    IntroTemplate,
    ProjectCard,
  },
})
</script>
