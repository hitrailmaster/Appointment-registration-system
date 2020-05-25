
<template>
  <div id="login-page">
    <a-layout class="layout">
      <a-layout-content>
        <a-row type="flex"
               justify="center">
          <a-col :span="6">
            <div class="content" v-show="isFindPWD && isRegist">
              <h2 class="title">预约挂号系统</h2>
              <!-- 登录表单 -->
              <a-form :autoFormCreate="(form)=>{this.form = form}">
                <a-form-item fieldDecoratorId="user_id"
                             :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入账户名!' }]}">
                  <a-input placeholder="账户名"
                           v-model="user_id"
                           size="large">
                    <a-icon slot="prefix"
                            type="user" /> 
                  </a-input>
                </a-form-item>
                <a-form-item fieldDecoratorId="password"
                             :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入密码' }]}">
                  <a-input type="password"
                           placeholder="密码"
                           v-model="password"
                           size="large">
                    <a-icon slot="prefix"
                            type="lock" />
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <!-- <a-checkbox class='login-form-remember'>记住我</a-checkbox> -->
                  <a-radio-group @change="onChange">
                    <a-radio-button value="1">用户</a-radio-button>
                    <a-radio-button value="2">医生</a-radio-button>
                    <a-radio-button value="3">管理员</a-radio-button>
                  </a-radio-group>
                  <a class='login-form-forgot'
                     href='javascripy:;' @click="findPWD">忘记密码？</a>
                  <a class='login-form-forgot'
                     href='javascripy:;' @click="showRegiste">注册</a>
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <a class='login-form-visit'
                     href='javascripy:;' @click="visit()">游客登陆</a>
                  <a-button class='login-form-button'
                            type='primary'
                            @click="login"
                            :loading="loading">
                    登录
                  </a-button>
                </a-form-item>
              </a-form>
            </div>
            <div class="content etc" v-show="!isFindPWD">
              <!-- <a-tooltip title="3 done / 3 in progress / 4 to do">
                <a-progress :percent="persent" :successPercent="successPercent" />
              </a-tooltip> -->
                <a-form 
                        :autoFormCreate="(form)=>{this.form = form}"><br/>
                  <a-form-item
                        label="账号"
                        :label-col="{ span: 5 }"
                        :wrapper-col="{ span: 18 }">
                    <a-input placeholder="请输入要找回密码的账号"
                            v-model="fUsername">
                    </a-input><br/>
                    <a-form-item
                        label=""
                        :label-col="{ span: 1 }"
                        :wrapper-col="{ span: 1}">
                      <a-button type="primary" @click="getQuestion">获取密保问题</a-button>
                    </a-form-item>
                  </a-form-item>
                  <a-form-item>
                        <!-- <a-input v-model="question"></a-input> -->
                        <p>{{this.question}}</p>
                  </a-form-item>
                  <a-form-item
                        label="答案"
                        :label-col="{ span: 5 }"
                        :wrapper-col="{ span: 18 }">
                    <a-input placeholder="请输入答案" v-model="fAnswer">
                    </a-input>                       
                  </a-form-item>
                  <a-form-item
                        label="新密码"
                        :label-col="{ span: 5 }"
                        :wrapper-col="{ span: 18 }">
                    <a-input placeholder="" v-model="fPassword">
                    </a-input>                       
                </a-form-item><br/>
                 <a-form-item
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 18 }">
                 </a-form-item>
                  <a-form-item
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 18 }">
                <a-button type="primary" @click="find">找回密码</a-button>
                <a-button type="danger" @click="cancel">取消</a-button>
              </a-form-item>
                </a-form>
            </div>
            <div class="content etc" v-show="!isRegist">
              <a-form-item
                    label="手机号"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 18 }">
                <a-input placeholder="" v-model="rUsername"></a-input>
              </a-form-item>
              <a-form-item
                    label="密码"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 18 }">
                <a-input placeholder="" v-model="rPassword"></a-input>
              </a-form-item>
              <a-form-item
                    label="密保问题"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 18 }">
                <a-input v-model="rQuestion"></a-input>
              </a-form-item>
              <a-form-item
                    label="密保答案"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 18 }">
                <a-input v-model="rAnswer"></a-input>
              </a-form-item><br/>
              <a-form-item
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 18 }">
                <a-button type="primary" @click="registe">注册</a-button>
                <a-button type="danger" @click="cancel">取消</a-button>
              </a-form-item>
            </div>
          </a-col>
        </a-row>
      </a-layout-content>
      <!-- 网站信息 -->
      <a-layout-footer class="footer">
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import store from "../store/store.js";
import qs from "qs";
import * as urls from "../js/post_urls.js";
import * as paths from "../js/router_paths.js";

export default {
  name: "LoginPage",
  data() {
    return {
      user_id: "",
      password: "",

      fUsername: "",//要找回的账号
      fAnswer: "",//密保答案
      fPassword: "",//找回的密码

      rUsername: "",
      rPassword: "",
      rQuestion: "",
      rAnswer: "",

      question: "",
      isRegist: true,
      isFindPWD: true,

      loading: false,
      persent: 50,
      successPercent: 0,

      list: [],

      t: true
    };
  },
  methods: {
    find() {
      if(this.fUsername == ""||this.fAnswer == ''||this.fPassword == '') {
        this.$message.error("信息填写不完整！");
        return;
      } else {
        let postData = {
          uid: this.fUsername,
          answer: this.fAnswer,
          new_pwd: this.fPassword
        };
        this.$axios.post("/hospital/reset/password", qs.stringify(postData))
                  .then(response => {
                    let data = response.data;

                    if(data.status == 0) {
                      this.$message.success("修改成功");
                      this.isFindPWD = true;
                    } else {
                      this.$message.error("修改失败");
                    }
                  })
      }
    },
    cancel() {
      this.isRegist = true;
      this.isFindPWD = true;
    },
    getQuestion() {
      if(this.fUsername == "") {
        this.$message.error("请输入账号");
        return;
      } else {
        console.log(this.fUsername)
        let postData = {
          uid: this.fUsername
        };
        this.$axios.get("/hospital/forget/password",{params: postData})
                .then(response => {
                  let data = response.data;
                  if(data.question != "") {
                    this.$message.success("获取成功!");
                    this.question = data.question;
                  } else {

                  }
                })
      }
    },
    findPWD() {
      this.isFindPWD = !this.isFindPWD;
    },
    showRegiste() {
      this.isRegist = !this.isRegist;
    },
    registe() {
      if(this.rUsername == ''||this.rPassword == ''||this.rQuestion == ''||this.rAnswer == '') {
        this.$message.error("信息填写不完整！");
        return;
      }
      let postData = {
        tel: this.rUsername,
        pwd: this.rPassword,
        question: this.rQuestion,
        answer: this.rAnswer
      };

      this.$axios.post("/hospital/register", qs.stringify(postData))
                .then(response => {
                  let data = response.data

                  if(data.status == 0) {
                    this.$message.success("注册成功！");
                    this.isRegist = !this.isRegist;

                  } else {
                    this.$message.error("注册失败！");
                  }
                })
    },
    onChange(val) {
      store.userType = val.target.value;
    },
    visit() {
      store.userType = 0;
      this.user_id = "";
      // this.password = "";
      // this.login();

      // store.userType = 3;
      // store.user_id = "1";
      // store.user_id = "13840711111";
      this.fetch()
      sessionStorage.setItem('store', JSON.stringify(store));

      this.$router.push(paths.HOME_PAGE_PATH);
    },

    /**
     * @description 登录
     * @param {object} event
     * @returns
     */
    login() {
      // 阻止表单默认提交行为
      // event.preventDefault();
      let postData = {
        user_id: this.user_id,
        pwd: this.password,
        role: store.userType
      };

      this.$axios
        .get("/hospital/login",
        {
          params: postData
        })
        .then(response => {
          let data = response.data;

          console.log(data)
          if (data.state) {
            this.$message.success("登录成功！");
            store.user_id = this.user_id;
            sessionStorage.setItem('store', JSON.stringify(store));
            this.fetch();

            // 跳转到首页
            this.$router.push(paths.HOME_PAGE_PATH);
          } else {
            this.$message.error(data.message);
            this.loading = false;
          }
        })
        .catch(error => {
          this.$message.error("网络错误！");
        });
    },
    fetch() {
      let postData = {
          doc_id: store.user_id
      };
      this.$axios.get("/hospital/doctor/get/schedule", {params: postData})
              .then(response => {
                  let data = response.data;

                  this.list = data.schedule;
                  for(let i=0;i<this.list.length;i++) {
                      switch(this.list[i].state) {
                          case 0:
                          break;
                          case 1:
                          this.list[i].state = "上午";
                          break;
                          case 2:
                          this.list[i].state = "下午";
                          break;
                          case 3:
                          this.list[i].state = "全天";
                      }
                  }
                  store.list = this.list;
                  store.tempschedule = data.tempschedule;
              } )
            sessionStorage.setItem('store', JSON.stringify(store));
        },
  },
};
</script>

<style lang="scss" scoped>
$background_color: #fff;
$background_image_url: "../assets/images/login_background.jpg";

.layout {
  padding-top: 150px;
  height: 940px;

  background: url($background_image_url);

  .content {
    border-radius: 10px;
    padding: 50px;
    height: 420px;

    // background: $background_color;

    .title {
      margin-bottom: 50px;
      font-weight: 700;
      font-size: 32px;
    }

    .login-form-remember {
      float: left;
    }

    .login-form-forgot {
      float: right;
    }
    .login-form-visit {
      float: left;
    }

    .login-form-button {
      width: 100%;
    }
  }
}
.etc {
  button {
    margin-left: 20px;
    // margin-right: 20px;
  }
}
</style>

