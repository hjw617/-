<template>
  <el-card class="p20">
    <el-form :inline="true" :model="form">
        <el-form-item label="绩效周期:">
          <el-select
            v-model="form.name"
            placeholder="请选择"
            size="small"
            @change="onSearch"
          >
            <el-option
              v-for="(item, index) in periodList"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="resetData">重置</el-button>
    </el-form>
    <el-table
      v-loading.body="tableLoading"
        ref="singleTable"
        :data="tableData"
        border
        highlight-current-row
        header-cell-class-name="headerCellClass"
        style="width: 100%"
    >
      <el-table-column
        align="center"
        label="序号"
        width="50"
        type="index"
        :index="indexMethod"
      />
      <template v-for="(item, index) in columns">
        <el-table-column
          :key="index"
          v-bind="item"
          show-overflow-tooltip
        />
      </template>
      <el-table-column
        label="操作"
        width="170"
        fixed="right"
      >
        <template #default="scope">
          <el-button
            size="small"
            type="text"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      ref="page"
      :total="total"
      @getPageData="pageQuery"
    />
  </el-card>
</template>
<script>
import { userConfigList } from '@/api/permission'

export default {
    components: {
        Pagination: () => import('@/components/Pagination/index.vue')
    },
    data() {
        return {
            total: 0,
            tableLoading: false,
            periodList: [
                { id: '1', name: '2022Q1' },
                { id: '2', name: '2022Q2' },
                { id: '3', name: '2022Q3' },
                { id: '4', name: '2022Q4' },
                { id: '5', name: '2022年度' }
            ],
            columns: [
                { prop: 'name', label: '用户名称', width: '150' },
                { prop: 'periodName', label: '绩效周期', minWidth: '150' },
                {
                    prop: 'deptCode',
                    label: '部门',
                    width: '150',
                    formatter: ({ cellValue, row, column }) => {
                        return cellValue === '000001' ? '其他部门' : '绩效管理部'
                    }
                },
                { prop: 'mobile', label: '联系电话', width: '150' },
                { prop: 'address', label: '联系地址', width: '150' },
                { prop: 'status', label: '状态', width: '150' },
                { prop: 'currentName', label: '当前处理人', width: '150' }
            ],
            form: {
                pageNum: 1,
                pageSize: 10,
                name: ''
            },
            tableData: []
        }
    },
    created() {
        this.onSearch()
    },
    methods: {
        indexMethod(index) {
            return (this.form.pageNum - 1) * this.form.pageSize + index + 1
        },
        onSearch() {
            userConfigList(this.form.pageNum, this.form.pageSize, 2, 'plan', this.form.name)
                .then(res => {
                    this.tableData = res.list || []
                    this.tableData.forEach((item, index) => {
                        if (item.status === '1') {
                            item.status = '组织填写计划'
                        } else if (item.status === '2') {
                            item.status = '直接主管审核'
                        } else if (item.status === '3') {
                            item.status = '归档'
                        }
                    })
                    this.total = res.total
                })
        },
        // 编辑
        handleEdit(index, row) {
            this.$router.push({
                path: '/org/orgPlanDetails',
                query: {
                    id: row.id
                }
            })
        },
        pageQuery({ pageNum, pageSize }) {
            this.form.pageNum = pageNum
            this.form.pageSize = pageSize
            this.onSearch()
        },
        resetData() {
            this.form.name = ''
            this.onSearch()
        }
    }
}
</script>

<style lang="scss">
.headerCellClass {
  background-color: bisque !important;
}
</style>
