<template>
<div>
    <div id="head_text">        
        <p><span>修改安排</span></p>
    </div>
    <div id="content_text">
        <div class="op">
            周一&nbsp;&nbsp;
            <a-checkbox-group id="1" :options="plainOptions" v-model="value[0]" @change="onChange" />
        </div>
        <div class="op">
            周二&nbsp;&nbsp;
            <a-checkbox-group id="2" :options="plainOptions" v-model="value[1]" @change="onChange" />
        </div>
        <div class="op">
            周三&nbsp;&nbsp;
            <a-checkbox-group id="3" :options="plainOptions" v-model="value[2]" @change="onChange" />
        </div>
        <div class="op">
            周四&nbsp;&nbsp;
            <a-checkbox-group id="4" :options="plainOptions" v-model="value[3]" @change="onChange" />
        </div>
        <div class="op">
            周五&nbsp;&nbsp;
            <a-checkbox-group id="5" :options="plainOptions" v-model="value[4]" @change="onChange" />
        </div>
        <div class="op">
            周六&nbsp;&nbsp;
            <a-checkbox-group id="6" :options="plainOptions" v-model="value[5]" @change="onChange" />
        </div>
        <div class="op">
            周日&nbsp;&nbsp;
            <a-checkbox-group id="7" :options="plainOptions" v-model="value[6]" @change="onChange" />
        </div>
        <div id="button">
            <a-button type="primary" class="btn" @click="submit">修改</a-button>
            <a-button type="danger" class="btn" @click="returnPre()">取消</a-button>
        </div>
    </div>
</div>
</template>
<script>
import qs from "qs";
export default {
    name: "ModifyArrange",
    props: ['docId'],
    data() {
        return {
            plainOptions: ['上午','下午'],
            value:[[],[],[],[],[],[],[]],

            s: [],

        }
    },
    methods: {
        onChange(checkedValues) {
        },
        submit() {
            for(let i=0;i<7;i++) {
                switch(this.value[i].length) {
                    case 0:
                    this.s[i] = 0;
                    break;
                    case 1:
                    if(this.value[i][0] == "上午") {
                        this.s[i] = 1;
                    } else {
                        this.s[i] = 2
                    }
                    break;
                    case 2:
                    this.s[i] = 3;
                }
            }
            console.log(this.s)
            let postData = {
                s1: this.s[0],
                s2: this.s[1],
                s3: this.s[2],
                s4: this.s[3],
                s5: this.s[4],
                s6: this.s[5],
                s7: this.s[6],
                doc_id: this.docId
            };
            this.$axios.post("/hospital/admin/update/schedule", qs.stringify(postData))
                    .then(response => {
                        let data = response.data;

                        if(data.status == 0) {
                            this.$message.success("修改成功!");
                            this.$emit("modify",'');
                        } else {
                            this.$message.error("修改失败!");
                        }
                    })
        },
        returnPre() {
            this.$emit("modify","");
        }
    },
    
}
</script>
<style lang="scss" scoped>
#head_text {
  border-width:0px;
  position:absolute;
  left:600px;
  top:191px;
  width:80px;
  height:24px;
  font-family:'PingFang SC Bold', 'PingFang SC';
  font-weight:650;
  font-style:normal;
  font-size:18px;
  color:rgba(0, 0, 0, 0.847058823529412);
  line-height:24px;
}
#content_text {
    font-size:16px;
    position:absolute;
    display: block;
    top: 240px;
    left: 600px;
    .op{
        margin-top: 20px;
    }
}
#button {
    margin-top: 60px;
    .btn {
        margin-left: 60px;
    }
}
</style>

