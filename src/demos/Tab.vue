<template>
  <div class="page">
    <simple-header title="交接表" :back-link="true"></simple-header>
    <page-content>
      <div style="margin: 4% 0 24% 0">
        <!--<div class="row" style="border-bottom: 1px solid #eaeaea;margin: 17% 3%;margin-top: -12%">-->
<!--          <div class="col-xs-2" style="margin: 3% 0 0 6%;">
            <span>公司名称：</span>
          </div>-->
          <!--<div class="col-xs-6" style="margin: 3% 0 0 3%;">-->
        <center>
            <div class="nice-select">
              <input id="customerId" type="text"/>
              <ul id="gongsi">
              </ul>
            </div>
        </center>
          <!--</div>-->
        <!--</div>-->
        <div class="row" style="border-bottom: 1px solid #eaeaea;margin: 17% 3%;margin-top: 3%">
          <div class="col-xs-2" style="margin: 3% 0 0 6%;">
            <span>交接人：</span>
          </div>
          <div class="col-xs-6" style="margin: 3% 0 0 3%;">
            <input type="text" placeholder="请输入交接人" id="jjr" name="jjr" style="border: none">
          </div>
        </div>
        <div class="row" style="border-bottom: 1px solid #eaeaea;margin: 17% 3%;margin-top: -12%">
          <div class="col-xs-2" style="margin: 3% 0 0 6%;">
            <span>接收人：</span>
          </div>
          <div class="col-xs-6" style="margin: 3% 0 0 3%;">
            <input type="text" placeholder="请输入接收人" id="jsr" name="jsr" style="border: none">
          </div>
        </div>
        <div class="row" style="border-bottom: 1px solid #eaeaea;margin: 17% 3%;margin-top: -12%">
          <div class="col-xs-2" style="margin: 3% 0 0 6%;">
            <span>负责人：</span>
          </div>
          <div class="col-xs-6" style="margin: 3% 0 0 3%;">
            <input type="text" placeholder="请输入负责人" id="fzr" name="fzr" style="border: none">
          </div>
        </div>
        <div class="row" style="border-bottom: 1px solid #eaeaea;margin: 17% 3%;margin-top: -12%">
          <div class="col-xs-2" style="margin: 3% 0 0 6%;">
            <span>交接时间：</span>
          </div>
          <div class="col-xs-6" style="margin: 3% 0 0 3%;">
            <input style="border: none" id="jjsj" name="jjsj" value="" onclick="SetDate(this,'yyyy-MM-dd hh:mm:ss')" readonly="readonly">
          </div>
        </div>
        <div class="row" style="border-bottom: 1px solid #eaeaea;margin: 17% 3%;margin-top: -12%">
          <div class="col-xs-2" style="margin: 3% 0 0 6%;">
            <span>状态：</span>
          </div>
          <div class="col-xs-6" style="margin: 1% 0 0 3%;width: 36%">
            <select style="width: 70%;height: 30px;" id="zhuangtai" name="zhuangtai">
              <option value="待审批" id="1" name="1">待审批</option>
              <option value="同意" id="2" name="2">同意</option>
              <option value="有异议" id="3" name="3">有异议</option>
            </select>
          </div>
        </div>
        <div class="row" style="margin: 17% 3%;margin-top: -12%">
          <div class="col-xs-2" style="margin: 1% 0 0 6%;">
            <b>交接资料</b>
          </div>
        </div>
        <div class="row" style="margin: 17% 3%;margin-top: -17%;font-size: 14px;">
          <div class="col-xs-2" style="margin: 3% 0 0 6%;">
            <label><input type="checkbox" name="checkbox" value="其他" id="qt"/>其他</label>&emsp;&emsp;&emsp;&emsp;
            <label><input type="checkbox" name="checkbox" value="公章" id="gz"/>公章</label>&emsp;&emsp;&emsp;&emsp;
            <label><input type="checkbox" name="checkbox" value="财务章" id="cwz"/>财务章</label>
          </div>
        </div>
        <div class="row" style="margin: 17% 3%;margin-top: -17%;font-size: 14px;">
          <div class="col-xs-2" style="margin: 3% 0 0 6%;">
            <label><input type="checkbox" name="checkbox" value="法人章" id="frsz"/>法人私章</label>&emsp;&emsp;
            <label><input type="checkbox" name="checkbox" value="商标证书" id="sbzs"/>商标证书</label>&emsp;&emsp;
            <label><input type="checkbox" name="checkbox" value="法人身份证" id="frsfz"/>法人身份证</label>
          </div>
        </div>
        <div class="row" style="margin: 17% 3%;margin-top: -17%;font-size: 14px;">
          <div class="col-xs-2" style="margin: 3% 0 0 6%;">
            <label><input type="checkbox" name="checkbox" value="发票专用章" id="fpzyz"/>发票专用章</label>&emsp;
            <label><input type="checkbox" name="checkbox" value="合同专用章" id="htzyz"/>合同专用章</label>&emsp;
            <label><input type="checkbox" name="checkbox" value="开户许可证" id="khxkz"/>开户许可证</label>
          </div>
        </div>
        <div class="row" style="margin: 17% 3%;margin-top: -17%;font-size: 14px;">
          <div class="col-xs-2" style="margin: 3% 0 0 6%;">
            <label><input type="checkbox" name="checkbox" value="银行鉴定卡" id="yhjdk"/>银行鉴定卡</label>&emsp;
            <label><input type="checkbox" name="checkbox" value="变更通知书" id="bgtzs"/>变更通知书</label>&emsp;
            <label><input type="checkbox" name="checkbox" value="股东身份证" id="gdsfz"/>股东身份证</label>
          </div>
        </div>
        <div class="row" style="margin: 17% 3%;margin-top: -17%;font-size: 14px;">
          <div class="col-xs-2" style="margin: 3% 0 0 6%;">
            <label><input type="checkbox" name="checkbox" value="商标受理回执" id="sbslhz"/>商标受理回执</label>
            <label><input type="checkbox" name="checkbox" value="股东个人U盾" id="gdgrUd"/>股东个人U盾</label>&nbsp;
            <label><input type="checkbox" name="checkbox" value="公司数字证书" id="gsszzs"/>公司数字证书</label>
          </div>
        </div>
        <div class="row" style="margin: 17% 3%;margin-top: -17%;font-size: 14px;">
          <div class="col-xs-2" style="margin: 3% 0 0 6%;">
            <label><input type="checkbox" name="checkbox" value="营业执照正本" id="yyzzzb"/>营业执照正本</label>
            <label><input type="checkbox" name="checkbox" value="营业执照副本" id="yyzzfb"/>营业执照副本</label>
            <label><input type="checkbox" name="checkbox" value="机构信用代码证" id="jgxydmz"/>机构信用代码证</label>
          </div>
        </div>
        <div class="row" style="margin: 17% 3%;margin-top: -17%;font-size: 14px;">
          <div class="col-xs-2" style="margin: 3% 0 0 6%;">
            <b>特别备注</b>
          </div>
        </div>
        <div class="row" style="margin: 17% 3%;margin-top: -17%;font-size: 14px;">
          <div class="col-xs-2" style="margin: 3% 0 0 6%;width: 100%">
            <textarea placeholder="填写说明公司内容和公司地址" style="width: 88%;height: 78px" id="beizhu"></textarea>
          </div>
        </div>
      </div>
    </page-content>
    <page-footer >
      <footer-item>
        <div class="content-block">
          <p>
            <m-button size="small" style="width: 70%" @click.native="close()">取消</m-button>
          </p>
        </div>
      </footer-item>
      <footer-item>
        <div class="content-block">
          <p>
            <m-button size="small" style="width: 70%" @click.native="getData()">保存</m-button>
          </p>
        </div>
      </footer-item>
    </page-footer>
  </div>
</template>

<script>
  import { SimpleHeader } from '../components/header'
  import Content from '../components/content'
  import { List, ListItem } from '../components/list'
  import Switcher from '../components/switcher'
  import { Footer, SecondFooter, FooterItem } from '../components/footer'
  import $ from 'jquery'
  import select2 from 'select2'
  import { Button } from '../components/buttons'

  export default {
    components: {
      SimpleHeader,
      'page-content': Content,
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
        gongsi: ''
      }
    },
    methods: {
      getData () {
        var _self = this
        var obj=document.getElementsByName('checkbox')
        var s='';
        for(var i=0; i<obj.length; i++){
          if(obj[i].checked)
            s+=obj[i].id+',';
        }
        if (_self.gongsi != '' && document.getElementById('jjr').value != '' && document.getElementById('jsr').value != '' && document.getElementById('fzr').value != '' && document.getElementById('jjsj').value != '' && $("#zhuangtai").val() != '' && s != '') {
          this.$http({
            url: '/api/iWoaIndentMaterialController.do?apisaveMaterial',
            method: 'post',
            data: {
              companyid: _self.gongsi,
              deliver: document.getElementById('jjr').value,
              receiver: document.getElementById('jsr').value,
              principal: document.getElementById('fzr').value,
              remarks: document.getElementById('beizhu').value,
              deliverDate: document.getElementById('jjsj').value,
              status: $("#zhuangtai").val(),
              deliverMaterial: s,
              islock: 'N'
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
          alert('提交成功~')
          WeixinJSBridge.invoke('closeWindow',{},function(res){
            //alert(res.err_msg);
          })
          if (typeof WeixinJSBridge === "undefined") {
            document.addEventListener('WeixinJSBridgeReady', readyFunc, false);
          } else {
            readyFunc();
          }
        } else {
          alert('除备注外都不允许为空，请重新填写')
        }
      },
      test () {
        var _self = this
          ///api/iWoaIndentMaterialController.do?apiSelectCompanyByCode
        this.$http.get('/api/iWoaIndentMaterialController.do?apiSelectCompanyByCode')
          .then(function (response) {
            console.log(response.data)
            var html = ''
            for (var j = 0; j < response.data.length; j++) {
              html += '<li value='+response.data[j].id+' style="height: 30px;\n' +
                '    line-height: 2em;\n' +
                '    overflow: hidden;\n' +
                '    padding: 0 10px;\n' +
                '    cursor: pointer;\n' +
                '    border-top: 1px solid #d5d5d5;">'+response.data[j].companyname+'</li>'
            }
            $('#gongsi').html(html)

            $(".nice-select ul li").hover(function(e){
              $(this).toggleClass("on");
              e.stopPropagation();
            });
            $(".nice-select ul li").click(function(e){
              var val = $(this).text();
              _self.gongsi = $(this).val()
              console.log($(this).val())
              $(".nice-select").find("input")[0].value = val;
              $(".nice-select").find("ul").hide();
              e.stopPropagation();
            });
            $(document).click(function(){
              $(".nice-select").find("ul").hide();
            });
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      close () {
        WeixinJSBridge.invoke('closeWindow',{},function(res){
          //alert(res.err_msg);
        })
        if (typeof WeixinJSBridge === "undefined") {
          document.addEventListener('WeixinJSBridgeReady', readyFunc, false);
        } else {
          readyFunc();ng
        }
      },
      BB () {
        $(".nice-select").click(function(e){
          $(this).find("ul").show();
          e.stopPropagation();
        });

        $(".nice-select ul li").hover(function(e){
          $(this).toggleClass("on");
          e.stopPropagation();
        });
        $(".nice-select ul li").click(function(e){
          var val = $(this).text();
          val = val.substring(0, val.indexOf('--'));
          $(".nice-select input").text = val;
          $(".nice-select").find("ul").hide();
          e.stopPropagation();
        });

        $(document).click(function(){
          $(".nice-select").find("ul").hide();
        });
      }
    },
    mounted () {
      this.test()

      document.getElementById("customerId").oninput = function() {searchList(document.getElementById('customerId').value)};

      function searchList(strValue) {
        var count = 0;
        if (strValue != "") {
          $(".nice-select ul li").each(function(i) {
            var contentValue = $(this).text();
            if (contentValue.toLowerCase().indexOf(strValue.toLowerCase()) < 0) {
              $(this).hide();
              count++;
            } else {
              $(this).show();
            }
            if (count == (i + 1)) {
              $(".nice-select").find("ul").hide();
            } else {
              $(".nice-select").find("ul").show();
            }
          });
        } else {
          $(".nice-select ul li").each(function(i) {
            $(this).show();
          });
        }
      }

      this.BB()
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


<style scoped>
  body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, form, fieldset, input, textarea, p, blockquote, th, td {
    margin: 0;
    padding: 0;
  }

  .nice-select input {
    outline: none;
    cursor: pointer;
    width: 100%;
    height: 1.8em;
    font-size: 1em;
    border: 1px solid #000;
    background: url(../../static/icon.png) no-repeat scroll right center transparent;
    background-position: 96% 50%;
    padding: 0 10px;
    -webkit-border-radius: .3em;
    -moz-border-radius: .3em;
    border-radius: .3em;
    line-height: 1.8em;
  }

  ul {
    list-style: none;
  }

  .nice-select {
    position: relative;
    width: 73%;
    -webkit-border-radius: .3em;
    -moz-border-radius: .3em;
    border-radius: .3em;
  }

  .nice-select ul {
    display: none;
    border: 1px solid #d5d5d5;
    width: 100%;
    position: absolute;
    top: 1.8em;
    overflow: hidden;
    background-color: #fff;
    max-height: 150px;
    overflow-y: auto;
    border-top: 0;
    z-index: 10001;
  }

  .nice-select ul li {
    height: 30px;
    line-height: 2em;
    overflow: hidden;
    padding: 0 10px;
    cursor: pointer;
    border-top: 1px solid #d5d5d5;
  }

  .nice-select ul li.on {
    background-color: #e0e0e0;
  }

</style>
