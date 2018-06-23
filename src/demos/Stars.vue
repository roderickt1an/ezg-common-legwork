<template>
  <div class="page">
    <page-content>
      <div style="margin: 20% 0 0 0;font-size: x-large;">
<!--        <div style="font-weight: 700;font-size: 18px;">
          <span>本次服务时间：</span>
          <span style="float: right;padding-right: 18%">{{ fwxs }}小时{{ fwfen }}分</span>
          <br>
        </div>-->
<!--        <div style="margin-top: 3%;">
          <span>会计到家剩余服务账期：</span>
          <span style="float: right;padding-right: 18%">{{ kjdj }}个月</span>
          <br>
          <span>本次已到访次数：</span>
          <span style="float: right;padding-right: 18%">{{ cishu }}次</span>
          <br>
          <span>本月剩余服务时长：</span>
          <span style="float: right;padding-right: 18%">{{ fwsc }}小时</span>
          <br>
        </div>-->
<!--        <div style="margin-top: 3%">
        <span>本次服务总结：</span><br>
        <p id="fwzj"></p><br>
        </div>-->
        <center>请您为本次服务进行评价</center>
      </div>
      <br/>
      <list>
        <list-item>
          <div class="item-content">
            <div class="item-title-row">
                <div class="item-after">
                  <br/><br/>
                  <stars :amount="5" :readonly="false" style="color: #f6383a;" @change="starsChange"></stars>
                </div>
            </div>
          </div>
        </list-item>
        <br/>
        <center>
          <textarea style="width: 80%;height: 221px;margin-top: 5%" id="pingjia"></textarea>
        </center>
      </list>
    </page-content>
    <page-footer>
      <footer-item>
        <div style="width: 100%">
          <p>
            <m-button size="small" style="width: 70%" @click.native="postValue()">评价</m-button>
          </p>
        </div>
      </footer-item>
    </page-footer>
  </div>
</template>

<script>
import { List, ListItem } from '../components/list'
import Content from '../components/content'
import Stars from '../components/stars'
import { Button, ButtonGroup } from '../components/buttons'
import { Footer, SecondFooter, FooterItem } from '../components/footer'


export default {
  components: {
    'page-content': Content,
    List,
    ListItem,
    ButtonGroup,
    Stars,
    'page-footer': Footer,
    SecondFooter,
    FooterItem,
    'm-button': Button
  },
  data () {
    return {
      amount: '5',
      fwxs: '',
      fwfen: '',
      kjdj: '',
      cishu: '',
      fwzj: '',
      fwsc: ''
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
    starsChange (i) {
      console.log(i)
      var _self = this
      _self.amount = i
    },
    postData () {
      var _self = this
      var url = '/api/iWoaMobileAccountHomeController.do?apiQueryServiceSummary&token=1&timeStamp=123'
      var id = window.location.href
      var result='&' + id.split('?')[1]
      url = url + result
      this.$http.get(url)
        .then(function (response) {
          _self.kjdj = response.data[0].serviceMonthTime
          _self.cishu = response.data[0].visitsnum
          _self.fwsc = response.data[0].remainingTime
          _self.fwzj = response.data[0].serviceSummary
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    postValue () {
      var _self = this
      var id = window.location.href
      var result= id.split('?fieldPunchCardId=')[1]
      this.$http({
        url: '/api/iWoaMobileAccountHomeController.do?apicustomerEvaluate&token=1&timeStamp=123',
        method: 'post',
        data: {
          fieldpunchcardId: result,
          grade: _self.amount,
          evaluatecontent: document.getElementById('pingjia').value
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
      window.location.href = '/#/actions'
    }
  },
  mounted () {
    this.postData ()
  }
}
</script>
