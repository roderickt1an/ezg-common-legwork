<template>
  <div class="my-page">
    <page-header>
      <header-title>{{ title }}</header-title>
    </page-header>
    <page-content>
      <div style="padding-top: 18%;height: 50%;padding-right: 19%;">
        <center style="height: 100%">
          <table style="width: 100%">
            <tr>
              <td style="font-size: 16px;font-weight: bolder;float: right;">工作总结</td>
              <td><textarea id="gzzj" style="width: 117%;height: 190px"></textarea></td>
            </tr>
          </table>
        </center>
      </div>
    </page-content>
    <page-footer>
      <footer-item>
        <div style="width: 100%">
          <p>
            <m-button size="small" style="width: 45%" @click.native="B()">确认离开</m-button>
          </p>
        </div>
      </footer-item>
    </page-footer>
  </div>
</template>
<script>
  import { Header, HeaderLink, HeaderTitle } from '../components/header'
  import Grid from '../components/grid'
  import Content from '../components/content'
  import { Button, ButtonGroup } from '../components/buttons'
  import { Prompt } from '../components/modal'
  import { Footer, SecondFooter, FooterItem } from '../components/footer'

  export default {
    components: {
      'page-header': Header,
      HeaderLink,
      HeaderTitle,
      'page-content': Content,
      Grid,
      ButtonGroup,
      Prompt,
      'page-footer': Footer,
      SecondFooter,
      FooterItem,
      'm-button': Button
    },
    data () {
      return {
        title: ''
      }
    },
    methods: {
      A () {
        var _self = this
        var id = window.location.href
        var result = id.split('?')[1]
        console.log(result)
        if (result == 'k') {
          _self.title = '服务内容问题总结'
        } else {
          _self.title = '请填写本次服务的工作总结'
        }
      },
      B () {
        var _self = this
        var id = window.location.href
        var result = id.split('?')[1]
        if (document.getElementById('gzzj').value != '' && document.getElementById('gzzj').value != null) {
          if (result == 'k') {
            _self.leave()
          } else {
            _self.C()
          }
        } else {
          alert('请填写工作总结')
        }
      },
      C () {
        this.$http({
          ///api/iWoaMobileAccountHomeController.do?apiFieldPunchCardLeaveSave&timeStamp=123&token=1
          url: '/api/iWoaMobileAccountHomeController.do?apiFieldPunchCardLeaveSave&timeStamp=123&token=1',
          method: 'post',
          async: false,
          data: {
            fieldPunchCardId: localStorage.getItem('fieldPunchCardId'),
            leavetime: localStorage.getItem('leavetime2'),
            servicesummary: document.getElementById('gzzj').value
          },
          transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        console.log('清除缓存成功')
        alert('离开打卡成功')
        localStorage.clear()
        window.location.href = '/#/index'
      },
      leave () {
        this.$http({
          ///api/iWoaMobileAccountHomeController.do?apiFieldPunchCardLeaveSave&timeStamp=123&token=1
          url: '/api/iWoaMobileAccountHomeController.do?apiFieldPunchCardLeaveSave&timeStamp=123&token=1',
          method: 'post',
          async: false,
          data: {
            financialaccountingafter: sessionStorage.getItem('s'),
            taxtreatmentafter: sessionStorage.getItem('s2'),
            financialmanageafter: sessionStorage.getItem('s3'),
            taxationtrainingafter: sessionStorage.getItem('s4'),
            taxadviceafter: sessionStorage.getItem('s5'),
            fieldPunchCardId: localStorage.getItem('fieldPunchCardId'),
            leavetime: localStorage.getItem('leavetime2'),
            servicesummary: document.getElementById('gzzj').value
          },
          transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        console.log('清除缓存成功')
        alert('离开打卡成功')
        localStorage.clear()
        window.location.href = '/#/index'
      }
    },
    mounted () {
      this.A()
    }
  }
</script>
