<template>
  <div>
    <header class="home-header">
      <ph-card id="brand-card" plain>
        <div
          slot="media"
          class="brand-motto"
          :style="{ backgroundImage: `url(${imgs.motto})` }"
        >
          <span class="brand-motto-slogan text-gray0-shadow-b4">
            Better late than never
          </span>
        </div>
        <div class="meta bg-gray0">
          <div class="avatar">
            <img :src="imgs.avatar">
          </div>
          <span class="ml3 f2 fw6">Phoenine</span>
        </div>
      </ph-card>
      <ph-card id="logo-card" plain>
        <div class="logo" slot="media">
          <img :src="imgs.logo">
        </div>
        <div class="meta bg-gray0">
          <span class="f2 fw6">Phoenine's Blog</span>
        </div>
      </ph-card>
    </header>
    <RepositoryIntro v-bind="repoDatabase" :showAmount="4"></RepositoryIntro>
    <ArticleIntro v-bind="articleDatabase" :showAmount="4"></ArticleIntro>
  </div>
</template>

<script>
import RepositoryIntro from '../intro/repository'
import ArticleIntro from '../intro/article'

export default {
  name: 'Home',

  computed: {
    imgs() {
      let config = this.getGlobalConfig()
      let imgPaths = config.imgPaths
      return {
        avatar: imgPaths.avatar,
        logo: imgPaths.logo,
        motto: imgPaths.motto,
      }
    },

    repoDatabase() {
      return this.getRepoDatabase()
    },

    articleDatabase() {
      return this.getArticleDatabase()
    },
  },

  components: {
    RepositoryIntro,
    ArticleIntro,
  },
}
</script>

<style lang="scss" scoped>
$column-breakpoint: 670px;

header {
  display: flex;

  @media screen and (max-width: $column-breakpoint) {
    flex-direction: column;
  }
}

#brand-card, #logo-card {
  min-height: 25pc;

  @media screen and (max-width: 768px) {
    & {
      min-height: 22pc;
    }
  }
}

#brand-card {
  width: 66.7%;

  @media screen and (max-width: $column-breakpoint) {
    width: 100%;
    margin: 0;

    .brand-motto {
      height: 100%;
    }

    .meta {
      display: none;
    }
  }

  .brand-motto-slogan {
    font-size: 1.5rem;
  }
}

#logo-card {
  width: 33.3%;

  @media screen and (max-width: $column-breakpoint) {
    width: 100%;
    margin: 0 0 20px;
  }

  .logo {
    background-color: transparent;

    img {
      height: 10rem;
      margin: auto;
    }
  }
}

.meta {
  min-height: 4rem;
}
</style>
