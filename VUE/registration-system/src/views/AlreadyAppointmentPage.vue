<template>
  <div>
    <div>  
      <div id="text">预约信息</div>
      <div id="table">
      <a-table :columns="columns" 
              :dataSource="data"
              :pagination="pagination"
              @change="handleTableChange">
        <template slot="operation" slot-scope="text, record">
          <a-popconfirm
            title="确定取消吗？"
            @confirm="() => cancel(record.rid)">
            <a href="javascript:;">取消预约&nbsp;&nbsp;</a>
          </a-popconfirm>
        </template>
      </a-table>
      </div>
      </div>
  </div>
</template>

<script>
import qs from "qs";
import * as urls from "../js/post_urls.js";
import store from "../store/store.js";
const columns = [{
  title: '姓名',
  dataIndex: 'patient',
},
{
  title: '医生姓名',
  dataIndex: 'doctor',
}, 
// {
//   title: '科室',
//   dataIndex: 'phone',
// }, 
// {
//   title: '第几号',
//   dataIndex: 'gender',
// }, 
// {
//   title: '状态',
//   dataIndex: 'idCard',
// },
// {
//   title: '时间',
//   dataIndex: 'plateNum',
//   scopedSlots: { customRender: 'operation_1' },
// },
{
  title: '操作',
  key: 'operation',
  scopedSlots: { customRender: 'operation' },
},

];



export default {
  name: "AlreadyAppointmentPage",
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
      isViewInfo: false,
      columns,
      keyWord: "",
      post: "",
    };
  },
  components: {
    // viewInfo
  },
  mounted() {
    // 获取列表内容
    this.fetch();
  },
  methods: {
    cancel(rid) {
        
      let postData ={
        rid
      };
      this.$axios.post("/hospital/cancle/registration", qs.stringify(postData))
                .then(response => {
                  let data = response.data;

                  if(data.status == 0) {
                    this.$message.success("取消成功！");
                    this.fetch();
                  } else {
                    this.$message.error("取消失败！"); 
                  }
                })
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
      // this.fetch();
    },

    /**
     * @description 获取列表数据
     */
    fetch() {
      let postData = {
        uid: JSON.parse(sessionStorage.getItem('store')).user_id
      };

      this.$axios
        .get("/hospital/view/registrations", {params: postData})
        .then(response => {
          let data = response.data;

          // 更新列表数据
          this.data = data.regList;
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




