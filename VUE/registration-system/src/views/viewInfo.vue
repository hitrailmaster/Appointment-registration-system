<template>
    <div class="common">
      <div id="u554" >
        <div id="u555">
            <div id="u556">
                <p><span>车主姓名：</span></p>
            </div>
            <div id="u557">
                <p><span>{{data.name}}</span></p>
            </div>
        </div>
        <div id="u559">
        <div id="u560">
            <p><span>手机号：</span></p>
        </div>
          <div id="u561">
              <p><span>{{data.phone}}</span></p>
          </div>
        </div>
        <div id="u563" >
          <div id="u564">
              <p><span>身份证号：</span></p>
          </div>
          <div id="u565">
              <p><span>{{data.idCard}}</span></p>
          </div>
        </div>
        <div id="u567">
          <div id="u568">
              <p><span>性别：</span></p>
          </div>
          <div id="u569">
              <p><span>{{data.gender}}</span></p>
          </div>
        </div>
      </div>
    <div id="u571">
      <div id="u572">
        <div id="u573"  >
            <p><span>车牌号：</span></p>
        </div>
        <div id="u574">
            <p><span>{{data.plateNum}}</span></p>
        </div>
      </div>
      <div id="u576" >
        <div id="u577">
            <p><span>牌号类型：</span></p>
        </div>
        <div id="u578">
            <p><span>{{data.plateType}}</span></p>
        </div>
      </div>
      <div id="u580">
        <div id="u581">
            <p><span>品牌：</span></p>
        </div>
        <div id="u582">
            <p><span>{{data.brand}}</span></p>
        </div>
      </div>
      <div id="u584" >
        <div id="u585">
            <p><span>车系：</span></p>
        </div>
        <div id="u586">
            <p><span>{{data.type}}</span></p>
        </div>
      </div>
      <div id="u588" >
        <div id="u589">
            <p><span>发动机号：</span></p>
        </div>
        <div id="u590">
            <p><span>{{data.engineNum}}</span></p>
        </div>
      </div>
      <div id="u592" >
        <div id="u593">
            <p><span>车架号（VIN码）：</span></p>
        </div>
        <div id="u594">
            <p><span>{{data.vin}}</span></p>
        </div>
      </div>
      <div id="u596">
        <div id="u597">
            <p><span>用油类型：</span></p>
        </div>
        <div id="u598" >
            <p><span>{{data.oilType}}</span></p>
        </div>
        <div id="u600">
            <a-button type="primary" @click="returnList">确定</a-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name: "viewInfo",
    props: ['post'],
    data() {
        return {
            data: []
        }
    },
    mounted() {
        this.fetch();
    },
    methods: {
        fetch() {
            let postData = {
                ownerId: this.post
            };
            this.$axios
                .get("/smart-car/pc/owner/getOwnerAndCarDetail",{
                    params: postData
                })
                .then(response => {
                    let data = response.data;
                    if(data.success) {
                        this.data = data.data.ownerAndCar;
                    } else {
                        // self.$message.error("获取失败！");
                    }
                })
        },
        returnList() {
            this.$emit('show',"");
            console.log("in")
        }
    },
    watch: {
        post(val) {
            this.fetch();
        } 
    }
}
</script>
<style lang="scss" scoped>
@import "../css/common.css";

</style>


