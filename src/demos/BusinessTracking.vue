<template>
  <div class="my-page">
    <page-header>
      <header-title>业务跟踪问题总结</header-title>
    </page-header>
    <page-content>
    <div style="padding-top: 18%;height: 50%;padding-right: 19%;">
      <center style="height: 100%">
        <table style="width: 100%">
          <tr>
            <td style="font-size: 16px;font-weight: bolder;float: right;">事项描述</td>
            <td><textarea id="sxms" style="width: 117%;height: 190px"></textarea></td>
          </tr>
        </table>
      </center>
    </div>
      <div style="height: 50%;padding-right: 19%;">
        <center style="height: 100%">
          <table style="width: 100%">
            <tr>
              <td style="font-size: 16px;font-weight: bolder;float: right;">解决思路</td>
              <td><textarea id="jjsl" style="width: 117%;height: 190px"></textarea></td>
            </tr>
          </table>
        </center>
      </div>
    </page-content>
    <page-footer>
      <footer-item>
        <div style="width: 100%">
          <p>
            <m-button size="small" style="width: 45%" @click.native="pd()">确认离开</m-button>
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
    methods: {
      pd () {
        var _self = this
        if (document.getElementById('sxms').value != '' && document.getElementById('jjsl').value != null) {
          _self.leave()
        } else {
          alert('事项描述和解决思路都不能为空')
        }
      },
      leave () {
        this.$http({
          ///api/iWoaMobileAccountHomeController.do?apiFieldPunchCardLeaveSave&timeStamp=123&token=1
          url: '/api/iWoaMobileAccountHomeController.do?apiFieldPunchCardLeaveSave&timeStamp=123&token=1',
          method: 'post',
          async: false,
          data: {
            fieldPunchCardId: localStorage.getItem('fieldPunchCardId'),
            leavetime: localStorage.getItem('leavetime2'),
            servicedescription: document.getElementById('sxms').value,
            solvingideas: document.getElementById('jjsl').value
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
        alert('离开打卡成功')
        console.log('清除缓存成功')
        localStorage.clear()
        window.location.href = '/#/index'
      }
    }
  }
</script>
