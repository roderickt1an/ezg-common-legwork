<template>
  <div>
    <simple-header title="会计到家服务详情" :back-link="true"></simple-header>
    <page-content>
      <div style="margin: 3% 0 0 16%">
        <p>上门时间：</p>
        <p>离开时间：</p>
        <p>服务会计：</p>
        <p>服务时长：</p>
      </div>
    </page-content>
    <page-footer style="height: 48px">
      <m-button size="small" style="width: 100%;height: 100%" @click.native="next()">
      <footer-item style="height: 48px">
        <div class="content-block">
          <p style="color: white">
            服务评价
          </p>
        </div>
      </footer-item>
      </m-button>
    </page-footer>
  </div>
</template>

<script>
  import { SimpleHeader } from '../components/header'
  import Content from '../components/content'
  import { Footer, SecondFooter, FooterItem } from '../components/footer'
  import { Button } from '../components/buttons'

  export default {
    components: {
      SimpleHeader,
      'page-content': Content,
      'page-footer': Footer,
      SecondFooter,
      FooterItem,
      'm-button': Button
    },
    data () {
      return {}
    },
    methods: {

    },
    mounted () {

    }
  }
</script>
