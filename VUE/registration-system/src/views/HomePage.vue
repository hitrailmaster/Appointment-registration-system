
<template>
  <div id="home-page">
    <a-layout>
      <!-- 侧边导航栏 -->
      <a-layout-sider :trigger="null"
                      collapsible
                      v-model="collapsed"
                      width="270">
        <!-- logo显示 -->
        <div style="height:70px;background-color: #000066;top:220px">
        <!-- <div class="logo"></div> -->
          <div id="main_title">预约挂号系统</div>
        </div>
        <a-menu :defaultSelectedKeys="['1']"
                :defaultOpenKeys="['sub1','sub2']"
                mode="inline"
                theme="dark"
                :inlineCollapsed="collapsed">
          <a-menu-item key="sub1" v-show="userType == 0 || userType == 1">
              <img src="../assets/images/u37.png" />
              <span class="sub-title">
                <router-link :to="paths.ONLINE_APPOINTMENT_PAGE_PATH" style="color:rgba(255, 255, 255, 0.65)">&nbsp;在线预约</router-link>
              </span> 
          </a-menu-item>
          <a-sub-menu key="sub2" v-show="userType == 1">
            <span slot="title">
              <a-icon type="car" />
              <span class="sub-title">管理个人信息</span>
            </span>
            <a-menu-item key="3">
              <router-link :to="paths.PERSON_LIST_PAGE_PATH">管理已添加人员信息</router-link>
            </a-menu-item>
            <a-menu-item key="4">
              <router-link :to="paths.ADD_PERSON_PAGE_PATH">添加人员信息</router-link>
            </a-menu-item>
            <a-menu-item key="6">
              <router-link :to="paths.ALREADY_APPOINTMENT_PAGE_PATH">已预约信息</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item key="sub3" v-show="userType == 2">           
            <img src="../assets/images/u34.png" /> 
            <span class="sub-title">           
              <router-link :to="paths.APPOINTMENT_LIST_PAGE_PATH" style="color:rgba(255, 255, 255, 0.65)">&nbsp;预约名单</router-link>
            </span>
          </a-menu-item>
          <a-menu-item key="sub7" v-show="userType == 3">           
            <img src="../assets/images/u34.png" /> 
            <span class="sub-title">           
              <router-link :to="paths.APPOINTMENT_ALL_LIST_PAGE_PATH" style="color:rgba(255, 255, 255, 0.65)">&nbsp;预约名单</router-link>
            </span>
          </a-menu-item>
          <a-menu-item key="sub4" v-show="userType == 2">
              <img src="../assets/images/u37.png" />
              <span class="sub-title">
                <router-link :to="paths.ARRANGE_PAGE_PATH" style="color:rgba(255, 255, 255, 0.65)">&nbsp;我的安排</router-link>
              </span> 
          </a-menu-item>
          <a-menu-item key="sub5" v-show="userType == 3">
              <img src="../assets/images/u40.png" />
              <span class="sub-title">
                <router-link :to="paths.ARRANGE_MANAGE_PAGE_PATH" style="color:rgba(255, 255, 255, 0.65)">&nbsp;坐诊安排</router-link>
              </span>
          </a-menu-item>
        
          <a-menu-item key="sub6" v-show="userType == 3">
              <img src="../assets/images/u49.png"/>
              <span class="sub-title"><router-link :to="paths.OFFICE_MANAGE_PAGE_PATH" style="color:rgba(255, 255, 255, 0.65)">&nbsp;科室信息</router-link></span>
          </a-menu-item>
       </a-menu>

      </a-layout-sider>
      <a-layout>
        <a-layout-header class="header">
          <a-row>
            <!-- <a-col :span="5">
              侧边栏隐藏控制
              <a-icon class="trigger"
                      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                      @click="()=> collapsed = !collapsed" />
            </a-col> -->
            <a-col :span="3"
                   :offset="15">
              <span class="logout" @click="logout()">
                退出登录
              </span>
              <!-- <a-icon class="logout"
                      type="logout"
                      @click="logout()" /> -->
            </a-col>
          </a-row>

        </a-layout-header>
        <a-layout-content class="content">
          <!-- 路由主体 -->
          <transition name="fade"
                      enter-active-class="fadeInLeft"
                      leave-active-class="fadeOutRight"
                      mode="out-in">
            <router-view />
          </transition>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>

import * as paths from "../js/router_paths.js";
import store from "../store/store.js"
export default {
  name: "HomePage",
  data() {
    return {
      collapsed: false,

      paths,
      userType: JSON.parse(sessionStorage.getItem('store')).userType
    };
  },
  mounted() {
      this.getStore();
  },
  methods: {
    getStore() {
      store.userType = JSON.parse(sessionStorage.getItem('store')).userType;
      store.user_id = JSON.parse(sessionStorage.getItem('store')).user_id;
    },

    /**
     * @description 退出登录
     */
    logout() {
      const self = this;

      this.$confirm({
        title: "确定退出登录吗？",
        onOk() {
          // 清空cookie
          // self.$cookie.deleteAllCookies();

          // 返回登录页
          self.$router.push(paths.LOGIN_PAGE_PATH);
          location.reload();
        },
        class: "test"
      });
    }
  },
  created() {
    // if (sessionStorage.getItem('store')) {
    //   store = sessionStorage.getItem('store');
    //   console.log(store)
    // }
    // 在页面刷新时将store保存到sessionStorage里
    // window.addEventListener('beforeunload', () => {
    //   sessionStorage.setItem('store', JSON.stringify(store))
    // })
  }
};
</script>

<style lang="scss" scoped>
$red: #f30e5c;
$blue: #1890ff;
$default_size: 14px;
$logo_url: "../assets/images/logo.png";

.logo {
  margin: 30px;
  margin-top: 0px;
  height: 32px;
  width:41px;
  top: 20px;
  position: relative;

  /* logo 图片 */
  background-color: #000066;
  background-image: url($logo_url);
  background-position: 0px;
  background-size: 41px 32px;
}

#main_title {
  color:white;
  font-size: 25px;
  position:absolute;
  top:20px;
  left:40px;


}

.sub-title {
  font-size: $default_size;
  text-align: left;
  left:0px;
  // color:white!important;
  color: rgba(255, 255, 255, 0.65);
}

/* 覆盖 sidebar 样式 */
.ant-menu-submenu-inline {
  padding-left: 15px;
  text-align: left;
}

/* 覆盖 sidebar 样式 */
.ant-menu-item {
  font-size: $default_size !important;
}

.content {
  margin: 20px;
  margin-bottom: 0;
  padding-top: 10px;
  min-height: 685px;

  background: white;
}
.header {
  height: 70px;
  padding: 0;

  line-height: 80px;

  background: white;
}

// .trigger {
//   float: left;
//   padding: 0 24px;

//   line-height: 80px;
//   font-size: 18px;

//   transition: color 0.3s;

//   cursor: pointer;
// }

// .trigger:hover {
//   color: $blue;
// }

.logout {
  float: right;

  // font-size: 20px;
  line-height: 80px;

  transition: color 0.3s;

  cursor: pointer;
}

.logout:hover {
  color: $red;
}
img {
  margin-left: -120px;
}
</style>


