<template>
  <div class="page">
    <page-content>
      <div style="margin: 6% 0 0 9%;font-weight: 700;font-size: 16px">
        <div>
          <span>事项描述：</span><br/>
          <span>{{ sxms }}</span>
        </div>
        <div style="margin-top: 3%">
          <span>解决思路：</span><br/>
          <span>{{ jjsl }}</span>
        </div>
        <div style="margin-top: 3%">
          <span>完成情况：</span><br/>
          <span>{{ wcqk }}</span>
        </div>
        <div style="font-weight: normal;font-size: 14px;margin-top: 3%">
          <span>发起人：</span><span>{{ fqr }}</span><br/>
          <span>提出时间：</span><span>{{ tcsj }}</span><br/>
          <span>解决时间：</span><span>{{ jjsj }}</span>
        </div>
      </div>
      <list>
        <list-item>
          <div class="item-content">
            <center>服务评价</center><br/>
            <div class="item-title-row">
              <div class="item-after">
                <stars :amount="5" :readonly="false" style="color: #f6383a;"></stars>
              </div>
            </div>
          </div>
        </list-item>
        <center>
          <textarea id="pingjia" style="width: 80%;height: 150px;margin-top: 5%"></textarea>
        </center>
      </list>
      <div class='content-padded'>
        <m-button style="margin-top: 50%" @click.native="postData()">评价</m-button>
      </div>
    </page-content>
  </div>
</template>

<script>
  import { List, ListItem } from '../components/list'
  import Content from '../components/content'
  import Stars from '../components/stars'
  import { Button, ButtonGroup } from '../components/buttons'

  export default {
    components: {
      'page-content': Content,
      List,
      ListItem,
      ButtonGroup,
      Stars,
      'm-button': Button
    },
    data () {
      return {
        sxms: '',
        jjsl: '',
        wcqk: '',
        fqr: '',
        tcsj: '',
        jjsj: ''
      }
    },
    methods: {
      getData () {
        var _self = this
        this.$http.get('/api/iWoaMobileTaskController.do?apiQueryTaskList&token=1&timeStamp=123&applyType=in&startIndex=1')
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      postData () {
        this.$http.post('/api/iWoaMobileTaskController.do?apiQueryTaskList&token=1&timeStamp=123&applyType=in&startIndex=1',{
          pingjia: document.getElementById('pingjia').value
        })
          .then(function (reponse) {
            console.log(reponse)
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
</script>
