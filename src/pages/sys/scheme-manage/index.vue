<template>
  <el-card>
    <el-form :inline="true" :model="form">
        <el-form-item label="方案名称:">
          <el-input v-model="form.name" placeholder="方案名称" @keyup.enter.native="onSearch"></el-input>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
        <el-button type="primary" @click="resetData">重置</el-button>
    </el-form>
    <div  class="tools-bar">
      <el-button type="success" icon="el-icon-plus"  @click="add">新增</el-button>
    </div>
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
          <el-button
            type="text"
            size="small"
            @click="handleDelete(scope.$index, scope.row.id)"
          >删除</el-button>
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
import { getProgrammeList, deleteProgramme } from '@/api/permission'

export default {
    components: {
        Pagination: () => import('@/components/Pagination/index.vue')
    },
    data() {
        return {
            total: 0,
            tableLoading: false,
            columns: [
                { prop: 'type', label: '方案类型', width: '200' },
                { prop: 'name', label: '方案名称', minWidth: '200' },
                { prop: 'periodName', label: '绩效周期名称', width: '200' },
                { prop: 'startDate', label: '方案开始时间', width: '200' },
                { prop: 'endDate', label: '方案结束时间', width: '200' }
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
            getProgrammeList(this.form.pageNum, this.form.pageSize, this.form.name)
                .then(res => {
                    this.tableData = res.list || []
                    this.tableData.forEach((item, index) => {
                        if (item.type === 1) {
                            item.type = '员工绩效'
                        } else {
                            item.type = '组织绩效'
                        }
                    })
                    this.total = res.total
                })
        },
        handleDelete(index, id) {
            this.$confirm('确认删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteProgramme(id).then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    })
                    this.onSearch()
                })
            })
        },
        handleEdit(index, row) {
            this.$router.push({
                path: '/sys/schemeDetails',
                query: {
                    id: row.id
                }
            })
        },
        add () {
            this.$router.push({
                path: '/sys/schemeDetails',
                query: {
                    id: ''
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
.tools-bar{
  margin-bottom:20px;
}
.headerCellClass {
  background-color: bisque !important;
}
</style>
