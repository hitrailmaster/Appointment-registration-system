<template>
<div>
   <div id="head_text">        
    <p>添加科室</p>
   </div>
   <div id="input1">
    <a-form-item 
        label="科室名"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }">
        <a-input placeholder="请输入" v-model="name"/>
    </a-form-item> 
    <a-form-item 
        label="所属一级科室"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }">
        <a-select :defaultValue="value" @change="handleSelectChange">
        <a-select-option v-for="(item,index) in deptCatList" 
                            :value="item.key"
                            :key="index">{{item.label}}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item 
        label="挂号数量限制"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }">
        <a-input placeholder="请输入" v-model="limit"/>
    </a-form-item> 
    <a-form-item 
        label="科室描述"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }">
        <a-textarea placeholder="请输入" :autosize="{ minRows: 2, maxRows: 6 }" v-model="desc"/>
    </a-form-item> 
  <div id="button">
        <a-button type="primary" @click="addOffice">提交</a-button>
        &nbsp; &nbsp;
      <a-button @click="back">取消</a-button>
  </div>
   </div>
</div>
</template>
<script>
import qs from "qs";
import store from "../store/store.js";
import * as paths from "../js/router_paths.js";
export default {
  name: "AddOfficePage",
  props: ['post'],
  data() {
    return {
      name: "",
      limit: "",
      desc: "",
      value: "请选择",
      dept_cat_id: "",

      loading: false,
      deptCatList: store.deptCatList,
    };
  },
  mounted() {
    // if(this.post != "add") {
    //   this.fetch(this.post)
    // }
    this.getList();
  },
  methods: {
    handleSelectChange(value) {
      this.dept_cat_id = value;
    },
    fetch(dept_id) {
      let postData = {
        dept_id,
      };
      this.$axios.get("")
    },
    back() {
      console.log("in")
      this.$emit("returnPre","");
    },

    addOffice() {
      // 阻止表单默认提交行为
      event.preventDefault();
      let url = "";
      let postData = {};
      if(this.post != "add") {
        url = "/hospital/admin/update/department";
        postData = {
          dept_cat_id: this.dept_cat_id,
          dept_id: this.post,
          name: this.name,
          desc: this.desc,
          limit: this.limit
      }
      } else {
        url = "/hospital/admin/add/department";
        postData = {
          dept_cat_id: this.dept_cat_id,
          name: this.name,
          desc: this.desc,
          limit: this.limit
        }
      }
      const self = this;
          self.loading = true;
          self.$axios
            .post(url, qs.stringify(postData))
            .then(response => {
              let data = response.data;

              if (data.status == 0) {
                self.$message.success("成功！");
                this.back();
              } else {
                self.$message.error("失败！");
                self.loading = false;
              }
            })
    },
    getInfo() {
      let postData = {
        dept_id: this.post
      };
      this.$axios.get("/hospital/admin/get/department/info", {
        params: postData
      })
      .then(response => {
          let data = response.data;

          // 更新列表数据
          this.desc = data.desc;
          this.limit = data.limit;
          this.dept_cat_id = data.dept_cat_id;
          // for(let i=0;i<store.deptCatList;i++) {
          //   if(data.dept_cat_id == store.deptCatList[i].key) {
          //     this.value = store.deptCatList[i].label;
          //   }
          // }
          this.name = data.name;
          // this.pagination.total = data.data.totalCount;
        })
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
                    // for(let i=0;i<this.deptCatList;i++) {
                    //   if(data.dept_cat_id == this.deptCatList[i].key) {
                    //     this.value = this.deptCatList[i].label;
                    //   }
                    // }
                })
    },
  },
  watch: {
    post() {
      console.log('in')
      console.log(this.post)
      if(this.post != "add") {
        document.getElementsByTagName('p')[0].innerHTML = "编辑信息";
        this.getInfo();
    }
  }
  }
}
</script>

<style lang="scss" scoped>
#image-view {
  width:99.9936px;
  height:99.9936px
}
.tab-list {
  padding-left: 49.9968px;
  padding-right: 49.9968px;

  text-align: left;
}

#add-machine-form {
  margin-top: 24.9984px;
}

.commit {
  width: 100%;
}
 
#head_text {
  border-width:0px;
  position:absolute;
  left:600px;
  top:120px;
  width:80px;
  height:24px;
  font-family:'PingFang SC Bold', 'PingFang SC';
  font-weight:650;
  font-style:normal;
  font-size:20px;
  color:rgba(0, 0, 0, 0.847058823529412);
  line-height:24px;
}
#input1 {
 
  position:absolute;
  left:600px;
  top:160px;
  width:450.0096px;
  height:35.0016px;
  
}
#input2 {
 
  position:absolute;
  left:494.9952px;
  top:339.9936px;
  width:450.0096px;
  height:35.0016px;
  
}
#input3 {
 
  position:absolute;
  left:450.0096px;
  top:409.9968px;
  width:450.0096px;
  height:35.0016px;
  
}
#input4 {
 
  position:absolute;
  left:730.0032px;
  top:430.0032px;
  width:450.0096px;
  height:35.0016px;
  
}
#text {
  color:grey;
  position:absolute;
  left:699.9936px;
  top:550.0032px;
}

#button {
 
  position:absolute;
  left:0px;
  top:300px;
  width:450.0096px;
  height:35.0016px;
  
}



</style>
