<template>
  <footer class="footer">
    <div class="social-link">
      <a href="https://github.com/phoeninee">
        <i class="fab fa-github"></i>
      </a>
    </div>
    <div class="copyright">
      Copyright&nbsp;©&nbsp;
      {{ year }}
      &nbsp;Phoenine's Blog
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',

  data() {
    return {
      year: (new Date()).getFullYear(),
    }
  },
}
</script>

<style lang="scss">
.footer {
  padding: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;

  @media screen and (max-width: 768px) {
    & {
      display: block;
      padding: 2rem 0;

      & > * {
        display: block;
        margin: auto;
        text-align: center;
        & + * {
          margin-top: 1.25rem;
        }
      }
    }
  }

  .social-link a {
    line-height: .8;
    font-size: 1.75rem;
    color: #52aac1;
  }

  .copyright {
    font-size: .9rem;
    color: #aaa;
  }
}
</style>
