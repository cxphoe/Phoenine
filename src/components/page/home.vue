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
    <RepositoryIntro :dataset=repositories :showAmount=4></RepositoryIntro>
    <ArticleIntro :dataset=articles :showAmount=4></ArticleIntro>
  </div>
</template>

<script>
import RepositoryIntro from '../intro/repository'
import ArticleIntro from '../intro/article'
import { getAsyncReposIntro } from '../data.js'
import articleDatabase from '../../database/article'
import { imgPaths } from '../../config'

const imgs = {
  avatar: imgPaths.avatar,
  logo: imgPaths.logo,
  motto: imgPaths.motto,
}

export default {
  name: 'Home',
  data: function () {
    return {
      imgs,
      repositories: getAsyncReposIntro(),
      articles: articleDatabase.database,
    }
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
