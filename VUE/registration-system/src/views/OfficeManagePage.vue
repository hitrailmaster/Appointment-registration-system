
<template>
<div >
  <div v-show="!isShow">  
    <div id="text">科室管理</div>
 
    <div id="type1">
    <a-form-item
      label="一级科室"
      :label-col="{ span: 2 }"
      :wrapper-col="{ span: 4 }">
      <a-select defaultValue="全部" @change="handleSelectChange">
        <a-select-option v-for="(item,index) in deptCatList" 
                            :value="item.key"
                            :key="index">{{item.label}}</a-select-option>
      </a-select>
    </a-form-item>
    </div>
    
    <a-form-item
      :wrapper-col="{ span: 12, offset: 5 }" >
    <div id="input">
     <a-input placeholder="请输入" v-model="keyWord"/>
    </div>
    <div id="button1">
        <a-button type="primary" @click="fetch">搜索</a-button>
    </div>    
     <div id="button2">  
        <a-button @click="addOffice('add')">添加科室</a-button>
   </div>   
    </a-form-item>

    <div id="table">
    <a-table  :columns="columns" 
              :dataSource="options" 
              :pagination="pagination"
              @change="handleTableChange">
      <template slot="operation" slot-scope="text, record">
        <a href="javascript:;" @click="addOffice(record.dept_id)">修改</a>
      </template>
    </a-table>
  </div>
  </div>
  <add-office-page :post="post" :list="deptCatList" v-show="isShow" @returnPre="returnPre"></add-office-page>
</div>
</template>

<script>
import qs from "qs";
import AddOfficePage from "./AddOfficePage.vue";
import store from "../store/store.js";
import * as urls from "../js/post_urls.js";
import * as paths from "../js/router_paths.js";
const columns = [{
  title: '一级科室',
  dataIndex: 'dept_cat_name',
}, {
  title: '二级科室',
  dataIndex: 'dept_name',
  // scopedSlots: { customRender: 'name' },
}, 
{
  title: '挂号数量限制',
  dataIndex: 'limit',
}, 
{
  title: '操作',
  key: 'operation',
  scopedSlots: { customRender: 'operation' },
},
];

export default {
  name: "OfficeManagePage",
  data() {
    return {
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

      deptCatList: [],
      keyWord: "",
      options: [],


      isShow: false,
      post: ""

    };
  },
  components: {
    AddOfficePage
  },
  mounted() {
    // 获取列表内容
    this.getList();
    //this.fetch();
  },
  methods: {
    returnPre() {
      this.isShow = !this.isShow;
    },
    addOffice(type) {
      this.post = type;
      store.deptCatList = this.deptCatList;
      this.isShow = !this.isShow;
      console.log(store.deptCatList)
    },
    getList() {
      this.$axios.get("/hospital/admin/view/alldepartment")
                .then(response => {
                  let data = response.data;
              
                    // this.depCatList = data.depCatList;
                    // this.data = data.allDepList;
                    this.deptCatList.push({
                        key: 'all',
                        label: "全部",
                      });
                    for(let i=0;i<data.allDepList.length;i++) {
                      this.deptCatList.push({
                        key: data.allDepList[i].dept_cat_id,
                        label: data.allDepList[i].dept_cat_name,
                      });
                    }
                    // console.log(this.deptCatList)

                    //规范化,使其在表格中显示
                    for(let i=0;i<data.allDepList.length;i++) {
                      for(let j=0;j<data.allDepList[i].dept_list.length;j++) {
                        this.data.push({
                          dept_cat_id: data.allDepList[i].dept_cat_id,
                          dept_cat_name: data.allDepList[i].dept_cat_name,
                          dept_id: data.allDepList[i].dept_list[j].dept_id,
                          dept_name: data.allDepList[i].dept_list[j].dept_name,
                          limit: data.allDepList[i].dept_list[j].limit
                        })
                      }
                    }
                    this.options = this.data;
                })
    },
    handleSelectChange(value) {
      console.log(value)
      if(value.key == "all") {
        this.options = this.data;
        return;
      }
      this.options = [];
      for(let i=0;i<this.data.length;i++) {
        if(this.data[i].dept_cat_id == value) {
          this.options.push(this.data[i]);
        }
      }

    },
    
    clear() {
      this.brandName = "";
    },
    handleTableChange(pagination = {}, filters = {}, sorter = {}) {
      this.pagination.pageSize = pagination.pageSize;
      this.pagination.current = pagination.current;
      // this.fetch();
    },

    fetch() {
      let postData = {
        brandName: this.brandName,
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize
      };
      this.$axios
        .get("/hospital/admin/view/department/doctor", {
          params: postData
        })
        .then(response => {
          let data = response.data;
          // 更新列表数据
          this.data = data.data.resultList;
          for(let i = 0;i< this.data.length;i++) {
            if(this.data[i].isHotBrand == 1) {
              this.data[i].isHotBrand = "是"
            } else {
              this.data[i].isHotBrand = "否"
            }
          }
          this.pagination.total = data.data.totalCount;

        })
        .catch(error => {
          this.$message.error("网络错误！");
        });
    },
    deleteSingle (key) {
      let postData = {
        brandId: key
      };
      this.$axios
        .post("/smart-car/pc/car/deleteCarBrand",qs.stringify(postData))
        .then(response => {
          let data = response.data;
          this.fetch()
        })
        .catch(error => {
          // this.$message.error("网络错误！");
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


