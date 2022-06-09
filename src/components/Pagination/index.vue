<template>
  <div>
    <!-- 简易分页 -->
    <el-pagination
      background
      :page-size="pageSize"
      :total="total"
      layout="total, prev, pager, next, sizes, jumper"
      style="text-align: left; padding: 15px 20px"
      :current-page="currentPage"
      :page-sizes="[1,10, 20, 50,100]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
    name: 'PaginationCommon',
    props: ['type', 'total', 'page'],
    data() {
        return {
            pageSize: 10,
            currentPage: 1
        }
    },
    watch: {
        total(val) {
            this.total = val
        },
        page(val) {
            this.currentPage = 1
            this.callParents()
        }
    },
    methods: {
        handleCurrentChange(val) {
            this.currentPage = val
            this.callParents()
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.currentPage = 1
            this.callParents()
        },
        callParents() {
            this.$emit('getPageData', { pageNum: this.currentPage, pageSize: this.pageSize })
        }
    }
}
</script>
<style lang="scss" scoped>
::v-deep {
  /*带背景的分页按钮背景色begin*/
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #EA5404;
  color: #FFF;
}
.el-pagination.is-background .el-pager li.active {
  color: #fff;
  cursor: default;
}
.el-pagination.is-background .el-pager li:hover {
  color: #EA5404;
}
.el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: #EA5404;
}
.el-pagination.is-background .el-pager li:not(.disabled).active:hover {
  background-color: #EA5404;
  color: #FFF;
}
/*带背景的分页按钮背景色end*/
}

</style>
