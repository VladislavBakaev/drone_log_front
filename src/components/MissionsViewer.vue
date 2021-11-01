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
                v-for="mission in missions"
                :key="mission.id"
            >
                <tr class="table-hover"
                    @click="$router.push(`/mission/${mission.id}`)"
                >
                    <th>{{ mission.mission_name }}</th>
                    <td>{{ mission.user_info }}</td>
                    <td>{{ mission.at_create }}</td>
                    <td>{{ mission.log_count }}</td>
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
        },
        sortedParam: String,
    },
    data() {
        return{
            sortedDirection: 1, // asc and desc
            headerCol: [
                {name: 'mission_name', title: 'Название миссии', width: '35%'},
                {name: 'author', title: 'Автор', width: '20%'},
                {name: 'create_date', title: 'Дата создания', width: '30%'},
                {name: 'log_count', title: 'Количество лог файлов', width: '15%'},
            ]
        }
    },
    methods: {
        sortBy(parameter) {
            if(parameter == this.sortedParam){
                this.sortedDirection *=-1;
            }
            else{
                this.$emit('update:sortedParam', parameter)
                this.sortedDirection = 1;
            }
            this.$emit('change_direction', this.sortedDirection)
        }
    }
}
</script>

<style scoped>
.mission__viewer{
    width: 70%;
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