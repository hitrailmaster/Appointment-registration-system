<template>
<a-calendar @panelChange="onPanelChange">
    <ul class="events" slot="dateCellRender" slot-scope="value">
      <li v-for="item in getListData(value)" :key="item.content">
        <a-badge :status="item.type" :text="item.content" />
      </li>
    </ul>
    <template slot="monthCellRender" slot-scope="value">
      <div v-if="getMonthData(value)" class="notes-month">
        <section>{{getMonthData(value)}}</section>
        <span>Backlog number</span>
      </div>
    </template>
</a-calendar>
</template>
<script>
import store from "../store/store.js";
export default {
    name: "ArrangePage",
    data() {
        return {
            dateFormat: 'YYYY-MM-DD',
            tempschedule: [],
            schedule: []

        }
    },
    mounted() {
        // this.fetch();
    },
    methods: {
        fetch() {
            let postData = {
                doc_id: JSON.parse(sessionStorage.getItem('store')).user_id
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
                        console.log(this.list)
                        this.tempschedule = data.tempschedule;
                    } )
        },
        onPanelChange(value) {},
        getListData(value) {
            this.list = store.list;
            this.tempschedule = store.tempschedule;
        let listData;
        // console.log(value.day())
        switch (value.day()) {
            case 0: //周日
            if(this.list[6].state != 0) {
                listData = [{
                    type: 'warning', content: this.list[6].state
                }];
            }
            break;
            case 1: //周一
            if(this.list[0].state != 0) {
                listData = [{
                    type: 'warning', content: this.list[1].state
                }];
            }
            break;
            case 2:
            if(this.list[1].state != 0) {
                listData = [{
                    type: 'warning', content: this.list[1].state
                }];
            }
            break;
            case 3:
            if(this.list[2].state != 0) {
                listData = [{
                    type: 'warning', content: this.list[2].state
                }];
            }
            break;
            case 4:
            if(this.list[3].state != 0) {
                listData = [{
                    type: 'warning', content: this.list[3].state
                }];
            }
            break;
            case 5:
            if(this.list[4].state != 0) {
                listData = [{
                    type: 'warning', content: this.list[4].state
                }];
            }
            break;
            case 6:
            if(this.list[5].state != 0) {
                listData = [{
                    type: 'warning', content: this.list[5].state
                }];
            }
            break;
        }
        let thisDate = value.format(this.dateFormat);
        for(let i = 0;i<this.tempschedule.length;i++) {
            if(thisDate == this.tempschedule[i].date) {
                if(this.tempschedule[i].is_absent == 1) {
                    if(listData[0].content == "上午" && this.tempschedule[i].time == 2 || listData[0].content == "下午" && this.tempschedule[i].time == 1) {
                        listData[0].content = "全天";
                    } else {
                        if(this.tempschedule[i].time == 2) {
                            listData[0].content = "下午";
                        } else {
                            listData[0].content = "上午";
                        }
                    }
                } else {
                    if(this.tempschedule[i].is_absent == 0) {
                        if(listData[0].content == "上午" && this.tempschedule[i].time == 1 || listData[0].content == "下午" && this.tempschedule[i].time == 2) {
                            listData[0].content= "";
                        } else {
                            if(listData[0].content == "全天" && this.tempschedule[i].time == 1) {
                                listData[0].content = "下午";
                            } else if(listData[0].content == "全天" && this.tempschedule[i].time == 2) {
                                listData[0].content = "上午";
                            }
                        }
                    }
                }
            }
        }
        return listData || [];
        },
        getMonthData(value) {
            if (value.month() === 8) {
                return 1394;
            }
        },
    }
}
</script>
<style>
</style>
