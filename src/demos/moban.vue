<template>
  <div>
    <simple-header title="选择模板" :back-link="true"></simple-header>
    <page-content>
      <div id="moban">
      </div>
    </page-content>
  </div>
</template>

<script>
  import { SimpleHeader } from '../components/header'
  import Content from '../components/content'
  import { Footer, SecondFooter, FooterItem } from '../components/footer'
  import { Button } from '../components/buttons'
  import $ from 'jquery'

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
      return {

      }
    },
    methods: {
      getData () {
        this.$http.get('/api/iWoaMobileAccountHomeController.do?apiQueryChooseTemplate&token=1&timeStamp=123')
          .then(function (data) {
            console.log(data.data)
            var html = ''
            for (var i = 0; i < data.data.length; i++) {
              html += '<div style=" margin: 3% 3% 3% 3%;border: 1px solid #eaeaea;font-size: 12px"><div style="margin-bottom: 3%"><p style="margin-bottom: 0"><b>业务描述</b></p>' +
                '<div style="margin-left: 6%;font-size: 10px">'+data.data[i].businessDescription+'</div>' +
                '<p style="margin-bottom: 0"><b>解决思路</b></p>' +
                '<div style="margin-left: 6%;font-size: 10px">'+data.data[i].solvingIdeas+'</div><br>' +
                '<span>检查周期：'+data.data[i].searchCycleT+'</span>' +
                '<span style="float: right">检查锚点：'+data.data[i].anchorT+'</span>' +
                '<div class="content-padded" style="margin-top: 4%">' +
                '<center><button class="button22" onclick="choose('+data.data[i].templateId+')">选择</button></center></div></div></div>'
            }
            $('#moban').append(html)
          })
          .catch(function (data) {
            console.log(data)
          })
      },
    },
    mounted () {
      this.getData()
    }
  }
  window.choose = function(a){
    console.log(a)
    sessionStorage.setItem('moban',a)
    window.location.href = '/#/ServiceContents'
  }
</script>

