<template>
    <div class="mission__viewer">
        <table class="table">
            <thead class="table-dark">
                <tr>
                    <th v-for="header in headerCol"
                        :key="header.name"
                        class="th_header"
                        @click="sortBy(header.name)"
                        scope='col'
                        :class="[sortedParam==header.name ? (sortedDirection==1 ? 'th__header_asc' : 'th__header_desc') : '','th__header']"
                        :style="{width: header.width}"
                    >
                        {{ header.title }}
                    </th>
                </tr>
            </thead>
            <tbody 
                v-for="mission in sortMission"
                :key="mission.id"
            >
                <tr class="table-hover">
                    <th >{{ mission.mission_name }}</th>
                    <td>{{ mission.user_info }}</td>
                    <td>{{ mission.at_create }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

export default {
    props: {
        missions: {
            type: Array,
            required: true
        }
    },
    data() {
        return{
            sortedParam: 'mission_name',
            sortedDirection: 1, // asc and desc
            headerCol: [
                {name: 'mission_name', title: 'Название миссии', width: '40%'},
                {name: 'author', title: 'Автор', width: '30%'},
                {name: 'create_date', title: 'Дата создания', width: '30%'},
            ]
        }
    },
    methods: {
        sortBy(parameter) {
            if(parameter == this.sortedParam){
                this.sortedDirection *=-1;
            }
            else{
                this.sortedParam = parameter
                this.sortedDirection = 1;
            }
        },
        visualSort(parameter) {
            if(this.sortedDirection == parameter){
                var cl = this.sortedDirection == 1 ? 'th__header_asc':'th__header_desc'
                console.log(cl)
            }
        }
    },
    computed: {
        sortMission() {
            return [...this.missions].sort((mission1 , mission2)=>{
                return mission1[this.sortedParam]>mission2[this.sortedParam] ? 1*this.sortedDirection : -1*this.sortedDirection
            })
        }
    }
}
</script>

<style scoped>
.mission__viewer{
    width: 60%;
    border: 2px solid gray;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
    border-radius: 5px;
    padding: 5px;
}
.table-hover:hover{
    background: rgb(219, 219, 219);
}
.th__header{
    cursor: pointer;
}
.th__header_asc::after {
      display: inline-block;
      content: '▼';
    }
.th__header_desc::after {
      display: inline-block;
      content: '▲';
    }
</style>