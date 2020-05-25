<template>
<div>
   <div id="head_text">        
    <p>添加信息</p>
   </div>
   <div id="input1">
    <a-form-item 
        label="姓名"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }">
        <a-input placeholder="请输入" v-model="name"/>
    </a-form-item> 
    <a-form-item 
        label="性别"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }">
        <a-radio-group v-model="gender">
          <a-radio-button value="m">男</a-radio-button>
          <a-radio-button value="f">女</a-radio-button>
        </a-radio-group>
    </a-form-item>
    <a-form-item 
        label="身份证号"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }">
        <a-input placeholder="请输入" v-model="idNum"/>
    </a-form-item> 
    <a-form-item 
        label="家庭住址"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }">
        <a-input placeholder="请输入" v-model="addr"/>
    </a-form-item> 
    <a-form-item 
        label="病史"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }">
        <a-textarea placeholder="请输入" :autosize="{ minRows: 2, maxRows: 6 }" v-model="medHist"/>
    </a-form-item> 
    <a-form-item 
        label="联系电话"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }">
        <a-input placeholder="请输入" v-model="tel"/>
    </a-form-item>
    <a-form-item 
        label="年龄"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }">
         <a-input type="number" v-model="age"/>
    </a-form-item>
  </div>
  <div id="button">
        <a-button type="primary" @click="addPerson">提交</a-button>
        &nbsp; &nbsp;
      <a-button @click="returnPre">取消</a-button>
  </div>
</div>
</template>


<script>
import qs from "qs";
import store from "../store/store.js";
import * as paths from "../js/router_paths.js";
export default {
  name: "AddPersonPage",
  props: ['post'],
  data() {
    return {
      pid: "",
      name: "",
      idNum: "",
      tel: "",
      gender: "",
      age: "",
      addr: "",
      medHist: "",

      loading: false,
    };
  },
 
  methods: {
    returnPre() {
      this.$emit("modify",'');
    },

    addPerson() {
      // 阻止表单默认提交行为
      event.preventDefault();
      let url = "";
      let postData ={};
      if(this.post == undefined) {
        url = "/hospital/add/patient";
        postData = {
          uid: store.user_id,
          name: this.name,
          id_num: this.idNum,
          tel: this.tel,
          gender: this.gender,
          age: this.age,
          addr: this.addr,
          med_hist: this.medHist
        };
      } else {
        url = "/hospital/modify/patient";
        postData = {
          pid: store.user_id,
          name: this.name,
          id_num: this.idNum,
          tel: this.tel,
          gender: this.gender,
          age: this.age,
          addr: this.addr,
          med_hist: this.medHist
        };
      }
      const self = this;
          self.loading = true;
          self.$axios
            .post(url, qs.stringify(postData))
            .then(response => {
              let data = response.data;

              if (data.status == 0) {
                self.$message.success("成功！");
                if(this.post == undefined) {
                  this.$router.push(paths.PERSON_LIST_PAGE_PATH);
                } else {
                  this.$emit("modify","");
                }
              } else {
                self.$message.error("失败！");
                self.loading = false;
              }
            })
    },
    getInfo() {
      let postData = {
        pid: this.post
      };
      this.$axios.get("/hospital/get/patient", {
        params: postData
      })
      .then(response => {
          let data = response.data;

          // 更新列表数据
          this.medHist = data.med_hist;
          this.gender = data.gender;
          this.tel = data.tel;
          this.age = data.age;
          this.addr = data.addr;
          this.name = data.name;
          this.idNum = data.id_num;
          // this.pagination.total = data.data.totalCount;
        })
    }
  },
  watch: {
    post() {
      console.log('in')
      document.getElementsByTagName('p')[0].innerHTML = "编辑信息";
      this.getInfo();
    }
  }
};
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
  left:570px;
  top:640px;
  width:450.0096px;
  height:35.0016px;
  
}



</style>
