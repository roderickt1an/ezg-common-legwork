<template>
  <div class="page">
    <page-content>
      <div style="height: 30%;margin-top: 4.5rem">
        <center>
        <img style="height: 80px" src="../assets/images/form/logo.png"/>
        </center>
      </div>
      <div class="row" style="border-bottom: 1px solid #eaeaea;margin: 17% 3%;margin-top: -3%">
        <div class="col-xs-2" style="padding: 0 0 7px 29px">
          <img src="../assets/images/form/user.png" class="img_add" style="float: none">
        </div>
        <div class="col-xs-6" style="margin: 1% 0 0 3%;">
          <input type="text" placeholder="请输入用户名" id="userName" name="userName" style="background-color:transparent;border: none;height: 30px">
        </div>
      </div>
      <div class="row" style="border-bottom: 1px solid #eaeaea;margin: -11% 3%">
        <div class="col-xs-2" style="padding: 0 0 7px 29px">
          <img src="../assets/images/form/password.png" class="img_add" style="float: none">
        </div>
        <div class="col-xs-6" style="margin: 1% 0 0 3%;">
          <input type="password" placeholder="请输入密码" id="password" name="password" style="background-color:transparent;border: none;height: 30px">
        </div>
      </div>
      <div class="content-padded" style="margin-top: 50%">
          <center>
            <m-button size="Round" @click.native="LoginByPwd()">登录</m-button>
          </center>
      </div>
    </page-content>
  </div>
</template>

<script>
import { SimpleHeader } from '../components/header'
import { Button } from '../components/buttons'
import Content from '../components/content'
import { Form, FormItem } from '../components/form'
import Switcher from '../components/switcher'

export default {
  components: {
    SimpleHeader,
    'page-content': Content,
    'm-button': Button,
    Switcher,
    'form-list': Form,
    FormItem
  },
  data () {
    return {
    }
  },
  methods: {
    first () {
      let _self = this
      let url = ''
      let id = window.location.href
      let name,value;
      let str=location.href; //取得整个地址栏
      let num=str.indexOf("?")
      str=str.substr(num+1); //取得所有参数
      let arr=str.split("&"); //各个参数放到数组里
      for(let i=0;i < arr.length;i++){
        num=arr[i].indexOf("=");
        if(num>0){
          name=arr[i].substring(0,num);
          value=arr[i].substr(num+1);
          this[name]=value;
        }
      }
      let code = arr[0].split('=')[1]
      let agentId = arr[1].split('=')[1]
      if (code != undefined) {
        _self.LoginByWechatCode(code,agentId)
      }
    },
    //根据微信code登陆
    LoginByWechatCode (code,agentId) {
      let _self = this
      this.$http({
        url: '/wq/iWoaMobileLoginController/v2.do?apiLoginByWechatCode&timeStamp=123',
        method: 'post',
        data: {
          code: code,
          agentId: agentId
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
        .then(function (response) {
          console.log(response.data.data)
          if (response.data.msgCode == '50000') {

          } else {
            sessionStorage.setItem('data2', response.data.data)
            _self.checkStatus()
          }
        })
    },
    // 根据账号名和密码登陆
    LoginByPwd () {
      let _self = this
      this.$http({
        url: '/wq/iWoaFieldClockController.do?apiLoginByPwd&timeStamp=123',
        method: 'post',
        data: {
          userName: document.getElementById('userName').value,
          password: document.getElementById('password').value
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
        .then(function (response) {
          console.log(response.data.data)
          if (response.data.msgCode == '50000') {
            alert(response.data.msg)
          } else {
            if (response.data.data != null) {
              sessionStorage.setItem('data2', response.data.data)
              _self.checkStatus()
            }
          }
        })
    },
    checkStatus () {
      this.$http.get('/wq/iWoaFieldClockController.do?apiCheckLoginUserFieldClockStatus&token=1&timeStamp=123')
        .then(function (response) {
          console.log(response)
          if (response.data.msgCode == '50000') {

          } else {
            if (response.data.data == 'unfinished') {
              window.location.href = '/#/leave'
            } else {
              window.location.href = '/#/index'
            }
          }
        })
    }
  },
  mounted () {
    this.first()
  }
}
</script>

<style scoped>
  .img_add{
    height: 30px;
    width: 30px;
    float: right;
    margin-right: 10px;
  }
  .button {
    width: 50%;
    font-size: 15px;
    height: 45px;
    line-height: 45px;
  }
</style>
