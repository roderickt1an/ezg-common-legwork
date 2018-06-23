<template>
  <div>
    <simple-header title="会计到家服务进度" :back-link="true"></simple-header>
    <page-content>
      <div class="htmleaf-container">
        <div class="container">
          <div id="timeline"></div>
        </div>
      </div>
    </page-content>
  </div>
</template>

<script>
  import { SimpleHeader } from '../components/header'
  import Content from '../components/content'

  export default {
    components: {
      SimpleHeader,
      'page-content': Content,
    },
    data () {
      return {}
    },
    methods: {
      b () {
        //获取展开全文的a标签
        var show = document.getElementsByClassName('show')
        //遍历a
        for (var i = 0; i < show.length; i++) {
          show[i].onclick = function () {
            //找到a的父级
            var father = this.parentNode.parentNode.childNodes[6]
            console.log(this.parentNode.parentNode.childNodes)
            //设置显示或隐藏
            if (this.parentNode.childNodes[1].innerHTML == '展开▼') {
              father.style.display = 'block'
              this.parentNode.childNodes[1].innerHTML = '收起▲'
            } else {
              this.parentNode.childNodes[1].innerHTML = '展开▼'
              father.style.display = 'none'
            }
          }
        }
      },
      a () {
        var _self = this
        var url = '/api/iWoaMobileAccountHomeController.do?apiQueryServiceProgress&timeStamp=123&token=1'
        var id = window.location.href
        var result='&' + id.split('?')[1]
        url = url + result
        this.$http.get(url)
          .then(function (response) {
            console.log(response.data)
            var fw = response.data.ServerAcount
            for (var i = 0; i < fw.length; i++) {
              if (fw[i].financialAccountingAfter == undefined) {
                fw[i].financialAccountingAfter = ''
              }
              if (fw[i].financialManageAfter == undefined) {
                fw[i].financialManageAfter = ''
              }
              if (fw[i].taxAdviceAfter == undefined) {
                fw[i].taxAdviceAfter = ''
              }
              if (fw[i].taxationTrainingAfter == undefined) {
                fw[i].taxationTrainingAfter = ''
              }
              $('#timeline').append('<div class="timeline-item"><div class="timeline-icon"><p style="color: white;font-size: 3px;margin-top: 16px;margin-left: 1px">服务会计</p></div>' +
                '<div class="timeline-content"><h3>拜访时间：'+fw[i].thetime+'<a style="color: #726f77" class="btn show">展开▼</a></h3>' +
                '<p>本次服务时长：'+fw[i].serverDuration+'小时</p>' +
                '<p>服务事项：'+fw[i].financialAccountingAfter+'</p><p>'+fw[i].financialManageAfter+
                '</p><p>'+fw[i].taxAdviceAfter+'</p><p>'+fw[i].taxationTrainingAfter+'</p>' +
                '<div style="display: none"><p>总结：'+fw[i].serviceSummary+'</p></div></div></div>')
            }
            var zg = response.data.ExecutiveAccount
            for (var i = 0; i < zg.length; i++) {
              $('#timeline').append('<div class="timeline-item"><div class="timeline-icon2"><p style="color: white;font-size: 3px;margin-top: 16px;margin-left: 1px">主管会计</p></div>' +
                '<div class="timeline-content2"><h3>回访时间：'+zg[i].thetime+'<a style="color: #726f77" class="btn show">展开▼</a></h3>' +
                '<p>本次服务时长：'+zg[i].serverDuration+'小时</p>' +
                '<br>事项描述：'+zg[i].serviceDescription+'</p>' +
                '<div style="display: none"><p>解决思路：'+zg[i].solvingIdeas+'</p></div></div></div>')
            }
            _self.b()
          })
      }
    },
    mounted () {
      this.a()
    }
  }
</script>

<style scoped>
 @import '/static/style.css';
</style>
