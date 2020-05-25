
<template>
<div>
  <div v-show="showM && showMT">  
    <!-- <div id="text">查询品牌</div> -->
    <div id="type1">
        <a-form-item
          label="请选择科室："
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 8 }">
          <a-cascader placeholder="请选择" :options="depCatList" @change="onListChange" />
        </a-form-item>
      </div>
    <div id="type2">
      <a-input placeholder="请输入" v-model="keyWord"/>
    </div>
    <div id="button1">
          <a-button type="primary" @click="fetch">检索</a-button>
      </div> 
    <div id="type3">
     <span>日期：</span>
     <a-date-picker @change="onChange" :format="dateFormat" :defaultValue="moment()"/>
    </div>

    <div id="table">
    <a-table  :columns="columns" 
              :dataSource="data" 
              :pagination="pagination"
              @change="handleTableChange">
      <template slot="operation" slot-scope="text, record">
        <a href="javascript:;" @click="modifyT(record.did)">添加临时安排&nbsp;&nbsp;</a>
        <a href="javascript:;" @click="modify(record.did)">修改安排&nbsp;&nbsp;</a>
      </template>
      <template slot="operation_1" slot-scope="text, record">
        <a href="javascript:;">{{record.onDuty|formatTime}}</a>
      </template>
    </a-table>
  </div>
  </div>
  <modify-arrange :docId="docId" v-show="!showM" @modify="modify"></modify-arrange>
  <add-temporary-arrange-page :docId="docId" v-show="!showMT" @modifyT="modifyT"></add-temporary-arrange-page>
</div>
</template>

<script>
import qs from "qs";
import * as urls from "../js/post_urls.js";
import * as paths from "../js/router_paths.js";
import ModifyArrange from "./ModifyArrange.vue";
import AddTemporaryArrangePage from "./AddTemporaryArrangePage.vue";
import moment from "moment";
const columns = [{
  title: '姓名',
  dataIndex: 'name',
  // scopedSlots: { customRender: 'name' },
}, {
  title: '职级',
  dataIndex: 'title',
  // scopedSlots: { customRender: 'name' },
}, 
{
  title: '一级科室',
  dataIndex: 'deptCat',
  // scopedSlots: { customRender: 'name' },
}, {
  title: '二级科室',
  dataIndex: 'dept',
},
{
  title: '该日安排',
  key: 'operation_1',
  scopedSlots: { customRender: 'operation_1' },
},
{
  title: '操作',
  key: 'operation',
  scopedSlots: { customRender: 'operation' },
},
];

export default {
  name: "ArrangeManagePage",
  data() {
    return {
      dateFormat: 'YYYY-MM-DD',
      data: [{
        name: "11",
        brandName: "22",
        price: 100,
        did: 11
      }],
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
      options: [],
      showM: true,
      showMT: true,
      depCatList: [],

      keyWord: "",
      docId: "",
      dept: "",
      dept_cat: "",
      date: ""

    };
  },
  components: {
    ModifyArrange,
    AddTemporaryArrangePage
  },
  filters: {
    formatTime(duty) {
      let time = "";
      if(duty.am == true) {
        time += "上午 ";
      }
      if(duty.pm == true) {
        time += "下午"
      }
      return time;
    }
  },
  mounted() {
    // 获取列表内容
    this.getList();
    this.date = "2019-6-30"
    // this.date = moment().format(this.dateFormat);
    this.fetch();
  },
  methods: {
    moment,
    onListChange(value) {
      this.deptCat = value[0];
      this.dept = value[1];
    },
    getList() {
      let postData = {

      };
      this.$axios.get("/hospital/admin/view/alldepartment")
                .then(response => {
                  let data = response.data;
              
                    // this.depCatList = data.depCatList;
                    for(let i=0;i<data.allDepList.length;i++) {
                      this.depCatList.push({
                        value: data.allDepList[i].dept_cat_name,
                        label: data.allDepList[i].dept_cat_name,
                        children: []});
                      for(let j=0;j<data.allDepList[i].dept_list.length;j++) {
                        this.depCatList[i].children.push({
                          value: data.allDepList[i].dept_list[j].dept_name,
                          label: data.allDepList[i].dept_list[j].dept_name
                        })
                      }
                    }
                })
    },
    onChange(value) {},
    modify(did) {
      this.showM = !this.showM;
      this.docId = did;
      
    },
    modifyT(did) {
      this.showMT = !this.showMT;
      this.docId = did;
    },
    handleSelectChange() {

    },
    handleTableChange(pagination = {}, filters = {}, sorter = {}) {
      this.pagination.pageSize = pagination.pageSize;
      this.pagination.current = pagination.current;
    },

    fetch() {
      let postData = {
        date: this.date,
        deptCat: this.dept_cat,
        dept: this.dept,
        page: 1
      };
      this.$axios
        .get("/hospital/admin/view/doctor", {
          params: postData
        })
        .then(response => {
          let data = response.data;
          // 更新列表数据
          this.data = data.docList;
          this.pagination.pageSize = data.num;
          this.pagination.pageSize = 5;
        })
        .catch(error => {
          this.$message.error("网络错误！");
        });
    },
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
  // font-weight:bold;
 
}

#type1 {
  border-width:0px;
  position:absolute;
  left:300px;
  top:120px;
  width:700px;
  height:56px;
  font-family:'Microsoft Tai Le';
  
}
#type3 {
  border-width:0px;
  position:absolute;
  left:150px;
  top:220px;
  width:700px;
  height:56px;
  font-family:'Microsoft Tai Le';
  
}
#type2 {
  border-width:0px;
  position:absolute;
  left:700px;
  top:125px;
  width:200px;
  height:56px;
  font-family:'Microsoft Tai Le';
  
}
#type4 {
  border-width:0px;
  position:absolute;
  left:650px;
  top:220px;
  width:400px;
  height:56px;
  font-family:'Microsoft Tai Le';
  
}

#button1 {
  position:absolute;
  left:950px;
  top:125px;
}

#button2 {
  position:absolute;
  left:280px;
  top:120px;
}

#button3 {
  position:absolute;
  left:280px;
  top:180px;
}

#table{
  position:absolute;
 height:500px;
 width:900px;
  top:350px;
  left:350px;
}
.img_view {
  z-index: 100;
  position: absolute;
  top: 300px;
  left: 700px
}
.img_button {
  margin: 30px;
  margin-left: 60px;
  display: block
}


</style>


