<template>
  <div>
    <page-header>
      <header-link :left="true" :edge="true" v-back-link>
        <icon icon="back"></icon>〈 返回
      </header-link>
      <header-title>详情</header-title>
    </page-header>
    <div style="margin-top: 20%">
      <center>
      <table style="text-align: center;width: 80%" id="List">
        <tr>
          <td>交接人</td>
          <td>交接时间</td>
          <td></td>
        </tr>
        <div style="margin-top: 15%"></div>
      </table>
      </center>
    </div>
  </div>
</template>

<script>
  import { Header, HeaderLink, HeaderTitle, SecondHeader } from '../components/header'

  export default {
    components: {
      'page-header': Header,
      SecondHeader,
      HeaderLink,
      HeaderTitle,
    },
    methods: {
      getList () {
        var _self = this
        var url = '/api/iWoaIndentMaterialController.do?apiqueryHistoryRecord'
        var company = '&companyid=' + sessionStorage.getItem('companyId')
        url = url + company
        this.$http.get(url)
          .then(function (response) {
            console.log(response.data)
            var html = ''
            for (var i = 0; i < response.data.length; i++) {
              var date = response.data[i].deliverDate
              var time = new Date(date);
              var y = time.getFullYear();//年
              var m = time.getMonth() + 1;//月
              var d = time.getDate();//日
              var h = time.getHours();//时
              var mm = time.getMinutes();//分
              var s = time.getSeconds();//秒
              date = y+"-"+m+"-"+d+" "+h+":"+s+":"+mm
              html += '<tr><td>'+response.data[i].deliver+'</td><td>'+date+'</td><td><button><a href="/#/List?cid='+response.data[i].id+'">查看明细</a></button></td></tr><div style="margin-top: 15%"></div>'
            }
            $('#List').append(html)
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    mounted () {
      this.getList()
    }
  }
</script>
