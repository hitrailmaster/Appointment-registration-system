<template>
<div>
    <div id="head_text">        
        <p><span>添加临时安排</span></p>
    </div>
    <div id="content_text">
        <a-form-item 
        label="日期"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 20 }">
        <a-date-picker @change="onDateChange" :format="dateFormat" />
        </a-form-item> 
        <a-form-item 
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 20 }">
            <a-radio-group :options="plainOptions" @change="onChange1" />
            <a-checkbox-group :options="plainOptions1" 
                              v-model="value" 
                              @change="onChange" />
        </a-form-item>
        <a-form-item 
            label="原因"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 20 }">
            <a-textarea placeholder="请输入" :autosize="{ minRows: 2, maxRows: 6 }" v-model="desc"/>
        </a-form-item> 
        <div id="button">
            <a-button type="primary" class="btn" @click="submit">添加</a-button>
            <a-button type="danger" class="btn" @click="returnPre">取消</a-button>
        </div>
    </div>
</div>
</template>
<script>
import qs from "qs";
export default {
    name: "AddTemporaryArrangePage",
    props: ['docId'],
    data() {
        return {
            dateFormat: 'YYYY-MM-DD',
            plainOptions: ['代班','请假'],
            plainOptions1: ['上午','下午'],
            value: "",
            value1: [],
            date: "",
            is_absent: "",
            desc: "",
            time_seg: 0

        }
    },
    methods: {
        onChange1(value) {
            if(value.target.value == "代班") {
                this.is_absent = 0;
            } else {
                this.is_absent = 1;
            }
        },
        onChange (checkedValues) {
            if(checkedValues.length == 0) {
                this.time_seg =0;
            } else if(checkedValues.length == 2) {
                this.time_seg =3;
            } else {
                if(checkedValues[0] == "上午") {
                    this.time_seg = 1;
                } else {
                    this.time_seg = 2;
                }
            }
        },
        onDateChange(value) {
            this.date = value.format(this.dateFormat);
        },
        submit() {
            if(this.date == "") {
                this.$message.error("请选择日期!");
                retuen;
            }
            let postData = {
                doc_id: this.docId,
                date: this.date,
                is_absent: this.is_absent,
                desc: this.desc,
                time_seg: this.time_seg
            };
            this.$axios.post("/hospital/admin/add/tempschedule", qs.stringify(postData))
                .then(response => {
                    let data = response.data;

                    if(data.status == 0) {
                        this.$message.success("添加成功!");
                        this.$emit("modifyT",'');
                    } else {
                        this.$message.error("添加失败!");
                    }
                })
        },
        returnPre() {
            this.$emit('modifyT',"");
        },
    }
    
}
</script>
<style lang="scss" scoped>
#head_text {
  border-width:0px;
  position:absolute;
  left:600px;
  top:191px;
  width:120px;
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
}
#button {
    margin-left: -80px;
    margin-top: 60px;
    .btn {
        margin-left: 60px;
    }
}
</style>

