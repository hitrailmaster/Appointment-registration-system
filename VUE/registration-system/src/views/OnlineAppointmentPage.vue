
<template>
<div>
  <div> 
    <div id="type1">
        <a-form-item
          label="请选择科室："
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 8 }">
          <a-cascader placeholder="请选择" :options="depCatList" @change="onListChange" />
          <!-- <a-select
            labelInValue
            placeholder="请选择"
            :options="depCatList"
            @change="handleSelectChange1"
            style="width:200px">
          </a-select>
          <a-select
            labelInValue
            placeholder="请选择"
            :options="deptList"
            @change="handleSelectChange2"
            style="width:200px">
          </a-select> -->
        </a-form-item>
      </div>
    <!-- <div id="type2">
      <a-input placeholder="请输入" v-model="keyWord"/>
    </div> -->
    <div id="button1">
          <a-button type="primary" @click="fetch">检索</a-button>
      </div> 
    <div id="type3">
     <span>日期：</span>
     <a-date-picker @change="onChange" :format="dateFormat"/>
    </div>
    <div id="type4">
      <a-form-item
          label="要预约的患者："
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 8 }">
          <a-select
            labelInValue
            placeholder="请选择"
            :options="patList"
            @change="handleSelectChange"
            style="width:200px">
          </a-select>
        </a-form-item>
    </div>

    <div id="table">
    <a-table  :columns="columns" 
              :dataSource="data" 
              :pagination="pagination"
              @change="handleTableChange">
      <template slot="operation" slot-scope="text, record">
        <a-popconfirm
          title="确定预约吗？"
          @confirm="() => appointment(record.did, 'am')">
          <a href="javascript:;" v-show="record.on_duty.am">预约上午&nbsp;&nbsp;</a>
        </a-popconfirm>
        <a-popconfirm
          title="确定预约吗？"
          @confirm="() => appointment(record.did, 'pm')">
          <a href="javascript:;" v-show="record.on_duty.pm">预约下午&nbsp;&nbsp;</a>
        </a-popconfirm>
        <!-- <a href="javascript:;" @click="modify(record.brandId)">修改</a> -->
      </template>
      <template slot="operation_1" slot-scope="text, record">
        <a href="javascript:;">{{record.on_duty|formatTime}}</a>
      </template>
    </a-table>
  </div>
  </div>
</div>
</template>

<script>
import qs from "qs";
import * as urls from "../js/post_urls.js";
import * as paths from "../js/router_paths.js";
import store from "../store/store.js";
const columns = [{
  title: '姓名',
  dataIndex: 'name',
  // scopedSlots: { customRender: 'name' },
}, {
  title: '职级',
  dataIndex: 'title',
  // scopedSlots: { customRender: 'name' },
}, {
  title: '坐诊时间',
  key: 'operation_1',
  scopedSlots: { customRender: 'operation_1' },
},
//  {
//   title: '是否有号',
//   dataIndex: 'isHotBrand',
// },
{
  title: '价格',
  dataIndex: 'fee',
},
{
  title: '操作',
  key: 'operation',
  scopedSlots: { customRender: 'operation' },
},
];

export default {
  name: "OnlineAppointmentPage",
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

      depCatList: [],
      patList: [],
      dept: [],
      keyWord: "",
      selectPart: [],
      date: "",
      pid: "",

    };
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
    this.getPatient();
    // this.fetch();
  },
  methods: {
    appointment(did, time) {
      if(this.pid == "") {
        this.$message.error("请选择要预约的患者！");
        return;
      }
      let postData = {
        pid: this.pid,
        did,
        time,
        date: this.date
      };
      this.$axios.post("/hospital/make/registration", qs.stringify(postData))
              .then(response => {
               let data = response.data; 

               if(data.status == 0) {
                 alert("预约成功！您是第"+data.seq+"号。单号为"+data.rid);
               } else {
                 this.$message.error("预约失败");
               }
              })
    },
    onChange(value) {
      this.date = value.format('YYYY-MM-DD');
    },
    onListChange(value) {
      this.selectPart = value;
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
    handleSelectChange(value) {
      this.pid = value.key;
    },

    handleTableChange(pagination = {}, filters = {}, sorter = {}) {
      this.pagination.pageSize = pagination.pageSize;
      this.pagination.current = pagination.current;
    },

    getPatient() {
      let postData = {
        uid: JSON.parse(sessionStorage.getItem('store')).user_id
      };

      this.$axios
        .get("/hospital/view/patients", {params: postData})
        .then(response => {
          let data = response.data;

          // 更新列表数据
          for(let i=0;i<data.pat_list.length;i++) {
            this.patList.push({
              key: data.pat_list[i].pid,
              label:data.pat_list[i].name});
          }
        })
    },
    fetch() {
      let postData = {
        date: this.date,
        dept: this.selectPart[1],
        dept_cat: this.selectPart[0],
        title: '',
        fee: 0,
        page: 1
      };
      this.$axios.get("/hospital/viewdoctors", {params: postData})
            .then(response => {
              let data = response.data;

              // console.log(data)
              this.data = data.doc_list;
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


