<template>
  <div class="page">
    <page-content>
      <div style="margin-top: 42%">
        <center>
        <img src="../assets/images/确认.png" style="width: 48px"/>
        </center>
      </div>
      <div style="margin-top: 10%">
        <center>
        <b>已打卡成功</b>
        <p id="shijian"></p>
        </center>
      </div>
      <div class='content-padded' style="margin-top: 58%">
        <center>
        <m-button style="margin-top: 50%;width: 60%;" @click.native="goClose()">关闭</m-button>
        </center>
      </div>
    </page-content>
  </div>
</template>

<script>
  import { List, ListItem } from '../components/list'
  import Content from '../components/content'
  import Stars from '../components/stars'
  import { Button, ButtonGroup } from '../components/buttons'
  import { Actions, ActionButton, ActionGroup } from '../components/actions'

  export default {
    components: {
      'page-content': Content,
      List,
      ListItem,
      ButtonGroup,
      Stars,
      'm-button': Button,
      Actions,
      ActionButton,
      ActionGroup
    },
    data () {
      return {
      }
    },
    methods: {
      goClose () {
        localStorage.clear()
        sessionStorage.clear()
        WeixinJSBridge.invoke('closeWindow',{},function(res){
          //alert(res.err_msg);
        })
        if (typeof WeixinJSBridge === "undefined") {
          document.addEventListener('WeixinJSBridgeReady', readyFunc, false);
        } else {
          readyFunc();
        }
      },
    },
    mounted () {
      document.getElementById('shijian').textContent = '本次外勤时间为' + localStorage.getItem('shijian')
    }
  }
</script>

<style>
  .button {
    width: 50%;
    font-size: 15px;
    height: 45px;
    line-height: 45px;
  }
</style>
