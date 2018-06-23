<template>
  <div class="page">
    <page-content>
      <center>
        <div style="margin-top: 8%;font-size: 22px">
          <b>解决方案确认</b>
        </div>
      </center>
      <div style="margin: 10% 9% 0 9%;font-weight: 700;font-size: 16px">
        <div>
          <span>事项描述：</span><br/>
          &emsp;&emsp;&emsp;&emsp;<span id="sxms">{{ sxms }}</span>
        </div>
        <div style="margin-top: 3%">
          <span>解决方案：</span><br/>
          &emsp;&emsp;&emsp;&emsp;<span id="jjfa">{{ jjfa }}</span>
        </div>
        <div style="font-weight: normal;font-size: 14px;margin-top: 3%">
          <span>相关负责人：<span id="xgfzr">{{ xgfzr }}</span></span><br/>
          <span>服务会计：<span id="fwkj">{{ fwkj }}</span></span><br/>
          <span>会计主管：<span id="kjzg">{{ kjzg }}</span></span><br/>
          <span>会计总监：<span id="kjzj">王海云</span></span><br/>
          <span>提出时间：<span id="tcsj">{{ tcsj }}</span></span>
        </div>
      </div>
    </page-content>
    <page-footer>
      <footer-item>
        <div class="content-block">
          <p>
            <m-button size="small" style="width: 70%" @click.native="agree(1);$refs.t1.open()">同意</m-button>
          </p>
        </div>
      </footer-item>
      <footer-item>
        <div class="content-block">
          <p>
            <m-button size="small" style="width: 70%" @click.native="agree(2);$refs.t1.open()">不同意</m-button>
          </p>
        </div>
      </footer-item>
    </page-footer>
    <toast text="解决方案确认完成" ref="t1"></toast>
  </div>
</template>

<script>
import Content from '../components/content'
import { Button } from '../components/buttons'
import { Footer, SecondFooter, FooterItem } from '../components/footer'
import Toast from '../components/toast'

export default {
  components: {
    'page-content': Content,
    Toast,
    'page-footer': Footer,
    SecondFooter,
    FooterItem,
    'm-button': Button
  },
  data () {
    return {
      sxms: '',
      jjfa: '',
      xgfzr: '',
      fwkj: '',
      kjzg: '',
      tcsj: ''
    }
  },
  methods: {
    getData () {
      var _self = this
      var url = '/api/iWoaMobileAccountHomeController.do?apiQuerySolvingIdeas&token=1&timeStamp=123'
      var id = window.location.href
      var result='&' + id.split('?')[1]
      url = url + result
      this.$http.get(url)
        .then(function (response) {
          _self.sxms = response.data[0].servicedescription
          _self.jjfa = response.data[0].solvingideas
          _self.fwkj = response.data[0].serverAcount
          _self.kjzg = response.data[0].executiveAccount
          _self.xgfzr = response.data[0].customerName
          _self.tcsj = response.data[0].raiseTime
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    agree (s) {
      var _self = this
      var id = window.location.href
      var result= id.split('?professionTrackId=')[1]
      this.$http({
        url: '/api/iWoaMobileAccountHomeController.do?apiProfessionTrack&token=1&timeStamp=123',
        method: 'post',
        data: {
          id: result,
          customeropinion: s,
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
      WeixinJSBridge.invoke('closeWindow',{},function(res){
        //alert(res.err_msg);
      })
      if (typeof WeixinJSBridge === "undefined") {
        document.addEventListener('WeixinJSBridgeReady', readyFunc, false);
      } else {
        readyFunc();
      }
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style scoped>
  .content-block{
    width: 84%;
  }
</style>
