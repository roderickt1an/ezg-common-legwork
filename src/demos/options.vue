<template>
  <div class="page">
    <simple-header title="会计服务内容" :back-link="true"></simple-header>
    <page-content>
      <center>
        <div style="margin-top: 3%"></div>
        <div class="nice-select">
          <input id="customerId" type="text"/>
          <ul id="gongsi">
          </ul>
        </div>
      </center>
      <div style="height: 150%">
      <div style="border-bottom: 1px solid #eaeaea;padding: 3% 0 3% 0;display: none" id="kuaijihesuan">
        <div style="margin-top: 3%"></div>
        <span style="font-size: 20px;font-weight: 700;padding-left: 3%">会计核算</span><label style="margin-left: 8%" class="FinancialAccounting"><input type="checkbox" name="FinancialAccounting">全选</label>
        <div class="row" style="font-size: 14px;">
          <div class="col-xs-2" style="margin: 3% 0 0 5%;" id="kuaijihs">
        </div>
      </div>
      </div>

      <div style="border-bottom: 1px solid #eaeaea;padding: 3% 0 3% 0;display: none" id="shuiwuchuli">
        <span style="font-size: 20px;font-weight: 700;padding-left: 3%">税务处理</span><label style="margin-left: 8%" class="TaxTreatment"><input type="checkbox" name="TaxTreatment"/>全选</label>
        <div class="row" style="font-size: 14px;">
          <div class="col-xs-2" style="margin: 3% 0 0 5%;" id="shuiwucl">
          </div>
        </div>
      </div>

      <div style="border-bottom: 1px solid #eaeaea;padding: 3% 0 3% 0;display: none" id="caiwuguanli">
        <span style="font-size: 20px;font-weight: 700;padding-left: 3%">财务管理</span><label style="margin-left: 8%" class="FinancialManage"><input type="checkbox" name="FinancialManage"/>全选</label><br/>
        <br><b><span style="font-size: 16px;padding-left: 3%;display: none" id="cwzd">财务制度管理：</span></b>
        <div class="row" style="font-size: 14px;">
          <div class="col-xs-2" style="margin: 1% 0 0 5%;" id="caiwuzd">
          </div>
        </div>
        <br><b><span style="font-size: 16px;padding-left: 3%;display: none" id="cwrjld">财务软件落地：</span></b>
        <div class="row" style="font-size: 14px;">
          <div class="col-xs-2" style="margin: 1% 0 0 5%;" id="cawurjld">
          </div>
        </div>
        <br><b><span style="font-size: 16px;padding-left: 3%;display: none" id="cwglbg">财务管理表格：</span></b>
        <div class="row" style="font-size: 14px;">
          <div class="col-xs-2" style="margin: 1% 0 0 5%;" id="caiwuglbg">
          </div>
        </div>
      </div>

      <div style="border-bottom: 1px solid #eaeaea;padding: 3% 0 3% 0;display: none" id="caishuipeixun">
        <span style="font-size: 20px;font-weight: 700;padding-left: 3%">财税培训</span><label style="margin-left: 8%" class="TaxAtionTraining"><input type="checkbox" name="TaxAtionTraining"/>全选</label><br/>
        <br><b><span style="font-size: 16px;padding-left: 3%;display: none" id="cn">出纳及类出纳人员：</span></b>
        <div class="row" style="font-size: 14px;">
          <div class="col-xs-2" style="margin: 1% 0 0 5%;" id="chuna">
          </div>
        </div>
        <br><b><span style="font-size: 16px;padding-left: 3%;display: none" id="ygbxpx">员工报销培训：</span></b>
        <div class="row" style="font-size: 14px;">
          <div class="col-xs-2" style="margin: 1% 0 0 5%;" id="yuangongbx">
          </div>
        </div>
      </div>

      <div style="border-bottom: 1px solid #eaeaea;padding-top: 3%;margin-bottom: 30%;display: none" id="caishuizixun">
        <span style="font-size: 20px;font-weight: 700;padding-left: 3%">财税咨询</span><label style="margin-left: 8%" class="TaxAdvice"><input type="checkbox" name="TaxAdvice"/>全选</label><br/>
        <div class="row" style="font-size: 14px;">
          <div class="col-xs-2" style="margin: 3% 0 0 5%;" id="caishuizx">
          </div>
        </div>
      </div>

        <div style="border-bottom: 1px solid #eaeaea;padding-top: 3%;margin-bottom: 30%;display: none" id="kejizhuanxiang">
          <span style="font-size: 20px;font-weight: 700;padding-left: 3%">科技项目专账指导（科技企业适用）</span><br/>
          <div class="row" style="font-size: 14px;">
            <div class="col-xs-2" style="margin: 3% 0 0 5%;" id="kjzx">
            </div>
          </div>
        </div>

        <div style="border-bottom: 1px solid #eaeaea;padding-top: 3%;margin-bottom: 30%;display: none" id="putong">
          <span style="font-size: 20px;font-weight: 700;padding-left: 3%">普通外勤</span><br/>
          <div class="row" style="font-size: 14px;">
            <div class="col-xs-2" style="margin: 3% 0 0 5%;" id="ptwq">
            </div>
          </div>
        </div>
      </div>
    </page-content>
    <page-footer>
      <footer-item>
        <div class="content-block" style="width: 73%">
          <p>
            <m-button size="small" style="width: 70%" @click.native="next()">下一步</m-button>
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
  import { Button } from '../components/buttons'
  import Toast from '../components/toast'

  export default {
    components: {
      SimpleHeader,
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
        Companyname: '',
        companyid: '',
        leavetime: '',
        punchCardtime: '',
        remainingtime: '',
        serviceHourstd: '',
        serviceMonthtime: '',
        visitsNum: ''
      }
    },
    methods: {
      checkboxClick () {
        $(".FinancialAccounting").click(function(){
          $("input[name='FinancialAccounting']").each(function(){
            if($(this).attr("checked"))
            {
              $(this).removeAttr("checked");
            }
            else
            {
              $(this).attr("checked","true");
            }
          })
        })
        $(".TaxAdvice").click(function(){
          $("input[name='TaxAdvice']").each(function(){
            if($(this).attr("checked"))
            {
              $(this).removeAttr("checked");
            }
            else
            {
              $(this).attr("checked","true");
            }
          })
        })
        $(".TaxTreatment").click(function(){
          $("input[name='TaxTreatment']").each(function(){
            if($(this).attr("checked"))
            {
              $(this).removeAttr("checked");
            }
            else
            {
              $(this).attr("checked","true");
            }
          })
        })
        $(".FinancialManage").click(function(){
          $("input[name='FinancialManage']").each(function(){
            if($(this).attr("checked"))
            {
              $(this).removeAttr("checked");
            }
            else
            {
              $(this).attr("checked","true");
            }
          })
        })
        $(".TaxAtionTraining").click(function(){
          $("input[name='TaxAtionTraining']").each(function(){
            if($(this).attr("checked"))
            {
              $(this).removeAttr("checked");
            }
            else
            {
              $(this).attr("checked","true");
            }
          })
        })
      },
      next () {
        var _self = this
        var id = window.location.href
        var result = id.split('?')[1]
        var obj=document.getElementsByName('FinancialAccounting')
        var s = [];
        var ss = [];
        for(var i=0; i<obj.length; i++){
          if(obj[i].checked)
          {
            s.push(obj[i].id);
            ss.push(obj[i].value)
          }
        }
        var obj2=document.getElementsByName('TaxTreatment')
        var ss2 = [];
        for(var i2=0; i2<obj2.length; i2++){
          if(obj2[i2].checked)
          {
            s.push(obj2[i2].id);
            ss2.push(obj2[i2].value)
          }
        }
        var obj3=document.getElementsByName('FinancialManage')
        var ss3 = [];
        for(var i3=0; i3<obj3.length; i3++){
          if(obj3[i3].checked)
          {
            s.push(obj3[i3].id);
            ss3.push(obj3[i3].value)
          }
        }
        var obj4=document.getElementsByName('TaxAtionTraining')
        var ss4 = [];
        for(var i4=0; i4<obj4.length; i4++){
          if(obj4[i4].checked)
          {
            s.push(obj4[i4].id);
            ss4.push(obj4[i4].value)
          }
        }
        var obj5=document.getElementsByName('TaxAdvice')
        var ss5 = [];
        for(var i5=0; i5<obj5.length; i5++){
          if(obj5[i5].checked)
          {
            s.push(obj5[i5].id);
            ss5.push(obj5[i5].value)
          }
        }
        /****************test begin****************/
        sessionStorage.setItem('s',s)
        console.log(s.join())
        sessionStorage.setItem('ss2',ss2)
        sessionStorage.setItem('ss3',ss3)
        sessionStorage.setItem('ss4',ss4)
        sessionStorage.setItem('ss5',ss5)
        // 存储用户为服务会计还是主管会计
        sessionStorage.setItem('accountant','fuwu')
        sessionStorage.setItem('Companyname',_self.Companyname)
        sessionStorage.setItem('companyid',_self.companyid)
/*        sessionStorage.setItem('serviceMonthtime',_self.serviceMonthtime)
        sessionStorage.setItem('visitsNum',_self.visitsNum)
        sessionStorage.setItem('remainingtime',_self.remainingtime)*/
        window.location.href = '/#/index'
        /****************test end****************/
        /*sessionStorage.setItem('s',s)
        sessionStorage.setItem('s2',s2)
        sessionStorage.setItem('s3',s3)
        sessionStorage.setItem('s4',s4)
        sessionStorage.setItem('s5',s5)
        if (result == 'dropIn') {
          this.$http({
            ///api/iWoaMobileAccountHomeController.do?apiFieldPunchCardSave&timeStamp=123&token=1
            url: '/api/iWoaMobileAccountHomeController.do?apiFieldPunchCardSave&timeStamp=123&token=1',
            method: 'post',
            async: false,
            data: {
              financialaccountingbefore: s.join(),
              taxtreatmentbefore: s2.join(),
              financialmanagebefore: s3.join(),
              taxationtrainingbefore: s4.join(),
              taxadvicebefore: s5.join(),
              serviceHoursId: localStorage.getItem('serviceHoursid'),
              punchcardtime: localStorage.getItem('punchcardtime'),
              fieldtype: localStorage.getItem('waiqin'),
              address: localStorage.getItem('weizhi'),
              remark: localStorage.getItem('weizhi'),
              companyId: localStorage.getItem('selected')
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
          window.location.href = '/#/index?f'
          history.go(0)
        } else {
          window.location.href = '/#/summarize?k'
        }*/
      },
      y (n) {
        var  _self = this
        var url = '/api/iWoaMobileAccountHomeController.do?apiQueryServiceItem&token=1&timeStamp=123'
        url = url + '&companyId=' + n
        this.$http.get(url)
          .then(function (response) {
            console.log(response.data)
            $('#kuaijihesuan').hide()
            $('#shuiwuchuli').hide()
            $('#cwzd').hide()
            $('#cwrjld').hide()
            $('#cwglbg').hide()
            $('#caiwuguanli').hide()
            $('#cn').hide()
            $('#ygbxpx').hide()
            $('#caishuipeixun').hide()
            $('#caishuizixun').hide()
            $('#kejizhuanxiang').hide()
            $('#putong').hide()
            var kjhs = ''
            var swcl = ''
            var cwzd = ''
            var cwrjld = ''
            var cwglbg = ''
            var chuna = ''
            var yuangong = ''
            var cszx = ''
            var kjzx = ''
            var pt = ''
            for (var i = 0; i < response.data.length; i++) {
              var ls = response.data[i]

              if (ls.parentservicename == '会计核算' && ls.serviceitemname != '订单项') {
                $('#kuaijihesuan').show()
                kjhs += '<label><input type="checkbox" name="FinancialAccounting" id='+ls.serviceitemId+' value='+ls.serviceitemname+'>'+ls.serviceitemname+'</label><br>'
              }
              if (ls.parentservicename == '税务处理') {
                $('#shuiwuchuli').show()
                swcl += '<label><input type="checkbox" name="TaxTreatment" id='+ls.serviceitemId+' value='+ls.serviceitemname+'>'+ls.serviceitemname+'</label><br>'
              }
              if (ls.grandName == '财务管理') {
                if (ls.parentservicename == '财务制度管理') {
                  $('#cwzd').show()
                  cwzd += '<label><input type="checkbox" name="FinancialManage" id='+ls.serviceitemId+' value='+ls.serviceitemname+'>'+ls.serviceitemname+'</label><br>'
                }
                if (ls.parentservicename == '财务软件落地') {
                  $('#cwrjld').show()
                  cwrjld += '<label><input type="checkbox" name="FinancialManage" id='+ls.serviceitemId+' value='+ls.serviceitemname+'>'+ls.serviceitemname+'</label><br>'
                }
                if (ls.parentservicename == '财务管理表格') {
                  $('#cwglbg').show()
                  cwglbg += '<label><input type="checkbox" name="FinancialManage" id='+ls.serviceitemId+' value='+ls.serviceitemname+'>'+ls.serviceitemname+'</label><br>'
                }
                $('#caiwuguanli').show()
              }
              if (ls.grandName == '财税培训') {
                if (ls.parentservicename == '出纳及类出纳人员') {
                  $('#cn').show()
                  chuna += '<label><input type="checkbox" name="TaxAtionTraining" id='+ls.serviceitemId+' value='+ls.serviceitemname+'>'+ls.serviceitemname+'</label><br>'
                }
                if (ls.parentservicename == '员工报销培训') {
                  $('#ygbxpx').show()
                  yuangong += '<label><input type="checkbox" name="TaxAtionTraining" id='+ls.serviceitemId+' value='+ls.serviceitemname+'>'+ls.serviceitemname+'</label><br>'
                }
                $('#caishuipeixun').show()
              }
              if (ls.parentservicename == '财税咨询') {
                $('#caishuizixun').show()
                cszx += '<label><input type="checkbox" name="TaxAdvice" id='+ls.serviceitemId+' value='+ls.serviceitemname+'>'+ls.serviceitemname+'</label><br>'
              }
              if (ls.parentservicename == '科技项目专账指导（科技企业适用）') {
                $('#kejizhuanxiang').show()
                kjzx += '<label><input type="checkbox" name="TaxAdvice" id='+ls.serviceitemId+' value='+ls.serviceitemname+'>'+ls.serviceitemname+'</label><br>'
              }
              if (ls.parentservicename == '普通外勤') {
                $('#putong').show()
                pt += '<label><input type="checkbox" name="TaxAdvice" id='+ls.serviceitemId+' value='+ls.serviceitemname+'>'+ls.serviceitemname+'</label><br>'
              }
            }
            $('#kuaijihs').html(kjhs)
            $('#shuiwucl').html(swcl)
            $('#caiwuzd').html(cwzd)
            $('#cawurjld').html(cwrjld)
            $('#caiwuglbg').html(cwglbg)
            $('#chuna').html(chuna)
            $('#yuangongbx').html(yuangong)
            $('#caishuizx').html(cszx)
            $('#kjzx').html(kjzx)
            $('#ptwq').html(pt)
          })
      },
      //获取公司填充下拉列表
      A (n) {
        var _self = this
        var url = '/api/iWoaMobileAccountHomeController.do?apiQueryAccountHomeCompany&token=1&timeStamp=123'
        console.log('selected=' + localStorage.getItem('selected'))
        this.$http.get(url)
          .then(function (response) {
            console.log(response.data)
            var html = ''
            for (var j = 0; j < response.data.length; j++) {
              html += '<li value='+response.data[j].companyId+' style="height: 30px;\n' +
                '    line-height: 2em;\n' +
                '    overflow: hidden;\n' +
                '    padding: 0 10px;\n' +
                '    cursor: pointer;\n' +
                '    border-top: 1px solid #d5d5d5;">'+response.data[j].CompanyName+'</li>'
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
              for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].companyId == $(this).val()) {
                  _self.Companyname = response.data[i].CompanyName
                  _self.companyid = response.data[i].companyId
                }
              }
              _self.y($(this).val())
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
      this.A()
      this.checkboxClick()
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
  body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, form, fieldset, input, textarea, p, blockquote, th, td {
    margin: 0;
    padding: 0;
  }
  .col-xs-2 {
    width: 100%;
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
