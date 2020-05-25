<template>
  <div>
    <div v-show="!isShowM">   
      <div id="text">已添加人员信息</div>
      <div id="table">
      <a-table :columns="columns" 
              :dataSource="data"
              :pagination="pagination"
              @change="handleTableChange">
        <template slot="operation_1" slot-scope="text, record">
          <span>{{record.gender|format}}</span>
        </template>
        <template slot="operation" slot-scope="text, record">
          <a href="javascript:;" @click="modify(record.pid)">编辑&nbsp;&nbsp;</a>
          <a-popconfirm
            title="确定删除吗？"
            @confirm="() => deletePat(record.pid)">
            <a href="javascript:;">删除&nbsp;&nbsp;</a>
          </a-popconfirm>
        </template>
      </a-table>
      </div>
      </div>
      <add-person-page :post="post" v-show="isShowM" @modify="modify"></add-person-page>
  </div>
</template>

<script>
import qs from "qs";
import * as urls from "../js/post_urls.js";
import store from "../store/store.js";
import AddPersonPage from "./AddPersonPage.vue";
const columns = [{
  title: '姓名',
  dataIndex: 'name',
},{
  title: '性别',
  dataIndex: 'gender',
  scopedSlots: { customRender: 'operation_1' },
}, {
  title: '年龄',
  dataIndex: 'age',
},
{
  title: '住址',
  dataIndex: 'addr',
},
{
  title: '操作',
  key: 'operation',
  scopedSlots: { customRender: 'operation' },
},

];



export default {
  name: "PersonListPage",
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
      isshowM: false,
      columns,
      keyWord: "",
      post: "",
    };
  },
  components: {
    AddPersonPage
  },
  // computed: {
  //   ...mapGetters(["userID"])
  // },
  mounted() {
    // 获取列表内容
    this.fetch();
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
    modify(pid) {
      this.post = pid;
      this.isShowM = !this.isShowM;
    },
    /**
     * @description 点击分页动态更新列表数据
     * @param {Object} pagination 分页对象
     * @param {Object} filters 过滤条件
     * @param {Object} sorter 排序条件
     */
    handleTableChange(pagination = {}, filters = {}, sorter = {}) {
      this.pagination.pageSize = pagination.pageSize;
      this.pagination.current = pagination.current;
      this.fetch();
    },

    /**
     * @description 获取列表数据
     */
    fetch() {
      let postData = {
        uid: store.user_id
      };

      this.$axios
        .get("/hospital/view/patients", {params: postData})
        .then(response => {
          let data = response.data;

          // 更新列表数据
          this.data = data.pat_list;
        })
        // .catch(error => {
        //   this.$message.error("网络错误！");
        // });
    },
    deletePat(pid) {
      let postData = {
        pid
      };
      this.$axios
          .post("/hospital/delete/patients", qs.stringify(postData))
          .then(response => {
            let data = response.data;

            if(data.status == 0) {
              this.$message.success("删除成功！");
              this.fetch();
            } else {
              this.$message.error("删除失败！");
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

#text{
  position:absolute;
  left:300px;
  font-size:20px;
  font-weight:bold
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
  top:150px;
  font-size:20px;
 
}


#button1 {
  position:absolute;
  left:0px;
  top:120px;
}

#button2 {
  position:absolute;
  left:80px;
  top:120px;
}

#table{
  position:absolute;
 height:500px;
 width:900px;
  top:250px;
  left:450px;
}


</style>




