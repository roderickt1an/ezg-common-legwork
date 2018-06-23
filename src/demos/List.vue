<template>
  <div class="page">
    <page-header>
      <header-link :left="true" :edge="true" v-back-link>
        <icon icon="back"></icon>〈 返回
      </header-link>
      <div id="ckls">
      <header-link @click.native="Past()">查看历史</header-link>
      </div>

      <header-title id="biaoti">{{ biaoti }}</header-title>
    </page-header>
    <page-content>
      <div style="margin: 16% 0 24% 0">
        <div class="row" style="border-bottom: 1px solid #eaeaea;margin: 17% 3%;margin-top: -12%">
          <div class="col-xs-2" style="margin: 3% 0 0 6%;">
            <span>公司名称：</span>
          </div>
          <div class="col-xs-6" style="margin: 3% 0 0 3%;">
            <input type="text" id="gsmc" name="gsmc" style="border: none" readonly="readonly">
          </div>
        </div>
        <div class="row" style="border-bottom: 1px solid #eaeaea;margin: 17% 3%;margin-top: -12%">
          <div class="col-xs-2" style="margin: 3% 0 0 6%;">
            <span>交接人：</span>
          </div>
          <div class="col-xs-6" style="margin: 3% 0 0 3%;">
            <input type="text" id="jjr" name="jjr" style="border: none" readonly="readonly">
          </div>
        </div>
        <div class="row" style="border-bottom: 1px solid #eaeaea;margin: 17% 3%;margin-top: -12%">
          <div class="col-xs-2" style="margin: 3% 0 0 6%;">
            <span>接收人：</span>
          </div>
          <div class="col-xs-6" style="margin: 3% 0 0 3%;">
            <input type="text" id="jsr" name="jsr" style="border: none" readonly="readonly">
          </div>
        </div>
        <div class="row" style="border-bottom: 1px solid #eaeaea;margin: 17% 3%;margin-top: -12%">
          <div class="col-xs-2" style="margin: 3% 0 0 6%;">
            <span>负责人：</span>
          </div>
          <div class="col-xs-6" style="margin: 3% 0 0 3%;">
            <input type="text" id="fzr" name="fzr" style="border: none" readonly="readonly">
          </div>
        </div>
        <div class="row" style="border-bottom: 1px solid #eaeaea;margin: 17% 3%;margin-top: -12%">
          <div class="col-xs-2" style="margin: 3% 0 0 6%;">
            <span>交接时间：</span>
          </div>
          <div class="col-xs-6" style="margin: 3% 0 0 3%;">
            <input type="text" style="border: none" id="jjsj" name="jjsj" value="" readonly="readonly">
          </div>
        </div>
        <div class="row" style="margin: 17% 3%;margin-top: -12%">
          <div class="col-xs-2" style="margin: 1% 0 0 6%;">
            <b>交接资料</b>
          </div>
        </div>
        <div class="row" style="margin: 17% 3%;margin-top: -17%;font-size: 14px;">
          <div class="col-xs-2" style="margin: 3% 0 0 6%;">
            <label><input type="checkbox" name="checkbox" value="其他" id="qt" disabled="disabled"/>其他</label>&emsp;&emsp;&emsp;&emsp;
            <label><input type="checkbox" name="checkbox" value="公章" id="gz" disabled="disabled"/>公章</label>&emsp;&emsp;&emsp;&emsp;
            <label><input type="checkbox" name="checkbox" value="财务章" id="cwz" disabled="disabled"/>财务章</label>
          </div>
        </div>
        <div class="row" style="margin: 17% 3%;margin-top: -17%;font-size: 14px;">
          <div class="col-xs-2" style="margin: 3% 0 0 6%;">
            <label><input type="checkbox" name="checkbox" value="法人章" id="frsz" disabled="disabled"/>法人私章</label>&emsp;&emsp;
            <label><input type="checkbox" name="checkbox" value="商标证书" id="sbzs" disabled="disabled"/>商标证书</label>&emsp;&emsp;
            <label><input type="checkbox" name="checkbox" value="法人身份证" id="frsfz" disabled="disabled"/>法人身份证</label>
          </div>
        </div>
        <div class="row" style="margin: 17% 3%;margin-top: -17%;font-size: 14px;">
          <div class="col-xs-2" style="margin: 3% 0 0 6%;">
            <label><input type="checkbox" name="checkbox" value="发票专用章" id="fpzyz" disabled="disabled"/>发票专用章</label>&emsp;
            <label><input type="checkbox" name="checkbox" value="合同专用章" id="htzyz" disabled="disabled"/>合同专用章</label>&emsp;
            <label><input type="checkbox" name="checkbox" value="开户许可证" id="khxkz" disabled="disabled"/>开户许可证</label>
          </div>
        </div>
        <div class="row" style="margin: 17% 3%;margin-top: -17%;font-size: 14px;">
          <div class="col-xs-2" style="margin: 3% 0 0 6%;">
            <label><input type="checkbox" name="checkbox" value="银行鉴定卡" id="yhjdk" disabled="disabled"/>银行鉴定卡</label>&emsp;
            <label><input type="checkbox" name="checkbox" value="变更通知书" id="bgtzs" disabled="disabled"/>变更通知书</label>&emsp;
            <label><input type="checkbox" name="checkbox" value="股东身份证" id="gdsfz" disabled="disabled"/>股东身份证</label>
          </div>
        </div>
        <div class="row" style="margin: 17% 3%;margin-top: -17%;font-size: 14px;">
          <div class="col-xs-2" style="margin: 3% 0 0 6%;">
            <label><input type="checkbox" name="checkbox" value="商标受理回执" id="sbslhz" disabled="disabled"/>商标受理回执</label>
            <label><input type="checkbox" name="checkbox" value="股东个人U盾" id="gdgrUd" disabled="disabled"/>股东个人U盾</label>&nbsp;
            <label><input type="checkbox" name="checkbox" value="公司数字证书" id="gsszzs" disabled="disabled"/>公司数字证书</label>
          </div>
        </div>
        <div class="row" style="margin: 17% 3%;margin-top: -17%;font-size: 14px;">
          <div class="col-xs-2" style="margin: 3% 0 0 6%;">
            <label><input type="checkbox" name="checkbox" value="营业执照正本" id="yyzzzb" disabled="disabled"/>营业执照正本</label>
            <label><input type="checkbox" name="checkbox" value="营业执照副本" id="yyzzfb" disabled="disabled"/>营业执照副本</label>
            <label><input type="checkbox" name="checkbox" value="机构信用代码证" id="jgxydmz" disabled="disabled"/>机构信用代码证</label>
          </div>
        </div>
        <div class="row" style="margin: 17% 3%;margin-top: -17%;font-size: 14px;">
          <div class="col-xs-2" style="margin: 3% 0 0 6%;">
            <b>特别备注</b>
          </div>
        </div>
        <div class="row" style="margin: 17% 3%;margin-top: -17%;font-size: 14px;">
          <div class="col-xs-2" style="margin: 3% 0 0 6%;width: 100%">
            <textarea style="width: 88%;height: 78px" id="beizhu"></textarea>
          </div>
        </div>
      </div>
    </page-content>
    <page-footer id="qrbtn">
      <footer-item>
        <div class="content-block">
          <p>
            <m-button size="small" style="width: 70%" @click.native="getCheck(0);">有异议</m-button>
          </p>
        </div>
      </footer-item>
      <footer-item>
        <div class="content-block">
          <p>
            <m-button size="small" style="width: 70%" @click.native="getCheck(1);">同意</m-button>
          </p>
        </div>
      </footer-item>
    </page-footer>
  </div>
</template>

<script>
  import { Header, HeaderLink, HeaderTitle, SecondHeader } from '../components/header'
import Content from '../components/content'
import { List, ListItem } from '../components/list'
import Switcher from '../components/switcher'
import { Footer, SecondFooter, FooterItem } from '../components/footer'
import $ from 'jquery'
import select2 from 'select2'
import { Button } from '../components/buttons'
import Toast from '../components/toast'

export default {
  components: {
    'page-header': Header,
    SecondHeader,
    HeaderLink,
    HeaderTitle,
    'page-content': Content,
    Toast,
    List,
    ListItem,
    Switcher,
    'page-footer': Footer,
    SecondFooter,
    FooterItem,
    'm-button': Button
  },
  data () {
    return {
      biaoti: '交接表'
    }
  },
  methods: {
    Past () {
      window.location.href = '/#/PastRecords'
    },
    getData () {
      var _self = this
      var url = ''
      var id = window.location.href
      var result= ''
      if (id.split('?id=')[1] != undefined) {
        url = '/api/iWoaIndentMaterialController.do?apiqueryMaterial'
        result = '&' + id.split('?')[1]
      } else {
        url = '/api/iWoaIndentMaterialController.do?apiqueryHistoryRecordList'
        result = '&id=' + id.split('?cid=')[1]
      }
      url = url + result
      this.$http.get(url)
        .then(function (response) {
          console.log(response.data)
          if (id.split('?id=')[1] != undefined) {
            if (response.data.obj.islock == 'Y') {
              $('#qrbtn').hide()
            }
            sessionStorage.setItem('companyId',response.data.obj.companyid)
            $("#zhuangtai").val(response.data.obj.status);
            document.getElementById('gsmc').value = response.data.obj.companyname
            document.getElementById('jjr').value = response.data.obj.deliver
            document.getElementById('jsr').value = response.data.obj.receiver
            document.getElementById('fzr').value = response.data.obj.principal
            document.getElementById('beizhu').value = response.data.obj.remarks
            var date = response.data.obj.deliverDate
            var time = new Date(date);
            var y = time.getFullYear();//年
            var m = time.getMonth() + 1;//月
            var d = time.getDate();//日
            var h = time.getHours();//时
            var mm = time.getMinutes();//分
            var s = time.getSeconds();//秒
            date = y+"-"+m+"-"+d+" "+h+":"+s+":"+mm
            console.log(date)
            document.getElementById('jjsj').value = date
//          document.getElementById('jjsj').value = date
            var selected = response.data.obj.deliverMaterial
            var result=selected.split(",");
            for(var i=0;i<result.length;i++){
              $('#' + result[i] ).attr("checked", true);
              console.log(result[i])
            }
          } else {
            _self.biaoti = '详情'
            document.getElementById('beizhu').setAttribute('readonly','readonly')
            $('#ckls').hide()
            $('#qrbtn').hide()
            $("#zhuangtai").val(response.data[0].status);
            document.getElementById('gsmc').value = response.data[0].companyname
            document.getElementById('jjr').value = response.data[0].deliver
            document.getElementById('jsr').value = response.data[0].receiver
            document.getElementById('fzr').value = response.data[0].principal
            var date = response.data[0].deliverDate
            var time = new Date(date);
            var y = time.getFullYear();//年
            var m = time.getMonth() + 1;//月
            var d = time.getDate();//日
            var h = time.getHours();//时
            var mm = time.getMinutes();//分
            var s = time.getSeconds();//秒
            date = y+"-"+m+"-"+d+" "+h+":"+s+":"+mm
            document.getElementById('jjsj').value = date
            var selected = response.data[0].deliverMaterial
            var result=selected.split(",");
            for(var i=0;i<result.length;i++){
              $('#' + result[i] ).attr("checked", true);
              console.log(result[i])
            }
            document.getElementById('beizhu').value = response.data[0].remarks
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      $('#zhaungtai').change(function () {
        var p = document.getElementById('zhaungtai').value
        localStorage.setItem("selected",p)
      })
    },
    getCheck (num) {
      var _self = this
      var s
      if (num == 0) {
        s = "有异议"
      } else {
        s = "同意"
      }
      var url = '/api/iWoaIndentMaterialController.do?apiupdateMaterial'
      var id = window.location.href
      var result='&' + id.split('?')[1]
      url = url + result
      if ((s == "有异议" && document.getElementById('beizhu').value != '') || s == "同意") {
        this.$http({
          url: url,
          method: 'post',
          data: {
            status: s,
            remarks: document.getElementById('beizhu').value,
            islock: 'Y'
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
        setTimeout(_self.close(),50000)
      } else {
        alert('备注不能为空')
      }
    },
    close () {
      alert('感谢您的确认')
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
/*    $('select').select2({
      placeholder: '请选择',
      minimumResultsForSearch: -1
    })*/
  }
}
</script>

<style scoped>
  .content-block {
    width: 100%;
  }
  input {
    background-color: #f9f9f9;
  }
</style>
