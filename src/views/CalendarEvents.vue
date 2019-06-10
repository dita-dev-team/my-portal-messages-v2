<template>
  <el-row>
    <el-col :span="12" :offset="6">
      <el-card shadow="always" class="grid-content">
        <div slot="header" class="clearfix">
          <span>Calendar of Events</span>
        </div>
        <el-row>
          <el-col :span="24" :offset="6">
            <el-table
              class="el-table--fit"
              :data="tableData"
              style="width: 100%"
            >
              <el-table-column fixed prop="date" label="Date" width="150">
              </el-table-column>
              <el-table-column prop="name" label="Name" width="120">
              </el-table-column>
              <el-table-column label="Operations" width="120">
                <!-- eslint-disable-next-line -->
                <template slot-scope="scope">
                  <el-button @click="handleClick" type="text" size="small"
                    >Detail</el-button
                  >
                  <el-button type="text" size="small">Edit</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import { Row, Col, Card, Table, TableColumn, Button } from "element-ui";

export default {
  name: "calendar-events",
  components: {
    [Row.name]: Row,
    [Button.name]: Button,
    [Col.name]: Col,
    [Card.name]: Card,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
          tag: "Home"
        }
      ]
    };
  },
  methods: {
    handleClick() {
      //console.log('click');
    }
  },
  async mounted() {
    //  await this.$store.dispatch('fetchCalendarEvents');
  }
};
</script>
