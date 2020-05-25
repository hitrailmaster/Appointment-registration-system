
<template>
<div >
  <div>  
    <div id="text">预约人员名单</div>
 
    <div id="type1" v-show="userType == 3">
      <a-form-item
        label="日期："
        :label-col="{ span: 2 }"
        :wrapper-col="{ span: 6 }">
        <a-date-picker :format="dateFormat" />
      </a-form-item>
    </div>
    
    <a-form-item
      :wrapper-col="{ span: 12, offset: 5 }" >
    <div id="input">
     <a-input placeholder="请输入" v-model="keyWord"/>
    </div>
    <div id="button1">
        <a-button type="primary" @click="search">搜索</a-button>
    </div>    
     <!-- <div id="button2">  
        <a-button @click="clear">重置</a-button>
   </div>    -->
    </a-form-item>

    <div id="table">
    <a-table  :columns="columns" 
              :dataSource="data" 
              :pagination="pagination"
              @change="handleTableChange">
      <template slot="operation_1" slot-scope="text, record">
        <span>{{record.gender|format}}</span>
      </template>
      <!-- <template slot="operation" slot-scope="text, record">
        <a href="javascript:;" @click="modify(record.brandId)">已到</a>&nbsp;&nbsp;
        <a href="javascript:;" @click="viewImg(record.brandIcon)">失约</a>
      </template> -->
    </a-table>
  </div>
  </div>
</div>
</template>

<script>
import qs from "qs";
import store from "../store/store.js";
import * as urls from "../js/post_urls.js";
import * as paths from "../js/router_paths.js";
const columns = [{
  title: '姓名',
  dataIndex: 'name',
  // scopedSlots: { customRender: 'name' },
}, {
  title: '预约日期',
  dataIndex: 'day',
  // scopedSlots: { customRender: 'name' },
}, 
{
  title: '性别',
  dataIndex: 'gender',
  scopedSlots: { customRender: 'operation_1' },
}, 
{
  title: '年龄',
  dataIndex: 'age',
},{
  title: '住址',
  dataIndex: 'addr',
},
// {
//   title: '操作',
//   key: 'operation',
//   scopedSlots: { customRender: 'operation' },
// },
];

export default {
  name: "AppointmentListPage",
  data() {
    return {
      dateFormat: 'YYYY-MM-DD',
      data: [],
      pagination: {
        current: 1,
        total: 0,
        pageSize: 5,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions:["5","10"]
      },
      loading: false,
      columns,
      userType: "",

      keyWord: ""

    };
  },
  // computed: {
  //   ...mapGetters(["userID"])
  // },
  mounted() {
    // 获取列表内容
    this.fetch();
    this.userType = store.userType;
  },
  filters: {
    format(gender) {
      if(gender == 'm') {
        return "男";
      } else {
        return "女";
      }
    }
  },
  methods: {
    handleSelectChange() {

    },
    returnPre() {
      this.isModify = !this.isModify;
    },
    menuChange(value) {
      this.isHotBrand = value.key; 
    },
    handleTableChange(pagination = {}, filters = {}, sorter = {}) {
      this.pagination.pageSize = pagination.pageSize;
      this.pagination.current = pagination.current;
      // this.fetch();
    },

    fetch() {
      let postData = {
        doc_id: JSON.parse(sessionStorage.getItem('store')).user_id
      };
      this.$axios
        .get("/hospital/doctor/view/reversation", {
          params: postData
        })
        .then(response => {
          let data = response.data;
          // 更新列表数据
          if(data.state) {
            this.$message.success("获取成功");
            this.data = data.reversationList;
          }
          else {
            this.$message.error("获取失败");
          }
          // this.pagination.total = data.data.totalCount;

        })
        // .catch(error => {
        //   this.$message.error("网络错误！");
        // });
    },
    search() {
      let postData = {
        doc_id: store.user_id,
        pat_name: this.keyWord
      };

      this.$axios
          .get("/hospital/doctor/search/patient", {
            params: postData
          })
          .then(response => {
          let data = response.data;
          if(data.state) {
            this.$message.success("获取成功");
            this.data = data.reversationList;
          }
          else {
            this.$message.error("获取失败");
          }
          })
    }
  }
};
</script>

<style lang="scss" scoped>
.tab-list {
  padding-left: 50px;
  padding-right: 50px;

  text-align: left;
}
#search-box {
  position: absolute;
  right: 50px;

  width: 250px;
}

.search-part{
  position:relative;
  width:300px;
  top:100px;
  float:left;
}

#text {
   border-width:0px;
  position:absolute;
  left:350px;
  top:120px;
  font-size:20px;
  font-weight:bold;
 
}

#type1 {
  border-width:0px;
  position:absolute;
  left:500px;
  top:180px;
  width:700px;
  height:56px;
  font-family:'Microsoft Tai Le';
  
}

#button1 {
  position:absolute;
  left:200px;
  top:80px;
}

#button2 {
  position:absolute;
  left:280px;
  top:80px;
}

#table{
  position:absolute;
 height:500px;
 width:900px;
  top:300px;
  left:450px;
}

#head_text {
  border-width:0px;
  position:absolute;
  left:600px;
  top:191.0016px;
  width:64.992px;
  height:24px;
  font-family:'PingFang SC Bold', 'PingFang SC';
  font-weight:650;
  font-style:normal;
  font-size:15.9936px;
  color:rgba(0, 0, 0, 0.847058823529412);
  line-height:24px;
}
#input {
 
  position:absolute;
  left:-50px;
  top:80px;
  width:200px;
  height:35.0016px;
  
}
#text_1 {
  color:grey;
  position:absolute;
  left:699.9936px;
  top:550.0032px;
}

#button {
 
  position:absolute;
  left:570.0096px;
  top:600px;
  width:450.0096px;
  height:35.0016px;
  
}
</style>


