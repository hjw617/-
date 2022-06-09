<template lang="html">
  <el-card>
    <el-form :inline="true" :model="form">
        <el-form-item label="登录名称:">
          <el-input v-model="form.name" placeholder="登录名称" @keyup.enter.native="onSearch"></el-input>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
        <el-button type="primary" @click="resetData">重置</el-button>
    </el-form>
    <div  class="tools-bar">
      <el-button type="success" icon="el-icon-plus"  @click="add">新增用户</el-button>
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
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      ref="page"
      :total="total"
      @getPageData="pageQuery"
    />
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" @close="onDialogClose()">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" label-width="80px">
        <el-form-item label="登录名" prop="loginName">
          <template v-if="dialogTitle=='修改用户信息'">{{dataForm.loginName}}</template>
          <el-input v-else v-model="dataForm.loginName" placeholder="登录名"></el-input>
        </el-form-item>
          <el-form-item label="密码" prop="password">
              <el-input v-model="dataForm.password" placeholder="密码"></el-input>
            </el-form-item>
        <el-form-item label="真实姓名" prop="name">
              <el-input v-model="dataForm.name" placeholder="真实姓名"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="mobile">
              <el-input v-model="dataForm.mobile" placeholder="联系电话"></el-input>
            </el-form-item>
            <el-form-item label="联系地址" prop="address">
              <el-input v-model="dataForm.address" placeholder="联系地址"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱" prop="email">
              <el-input v-model="dataForm.email" placeholder="电子邮箱"></el-input>
            </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="info" @click="onDialogSubmit" v-if="dialogTitle=='修改用户信息'">保存</el-button>
        <el-button type="primary" @click="onDialogSubmit" v-else>立即创建</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
import { getUserList, usersave } from '@/api/permission'

export default {
    components: {
        Pagination: () => import('@/components/Pagination/index.vue')
    },
    data() {
        return {
            total: 0,
            tableLoading: false,
            dialogVisible: false,
            dialogTitle: '新增用户',
            columns: [
                { prop: 'loginName', label: '登录名', width: '200' },
                { prop: 'name', label: '真实姓名', minWidth: '200' },
                { prop: 'deptName', label: '部门名称', width: '200' },
                { prop: 'mobile', label: '联系电话', width: '200' },
                { prop: 'address', label: '联系地址', width: '200' },
                { prop: 'email', label: '电子邮箱', width: '200' }
            ],
            rules: {
                loginName: [
                    {
                        required: true,
                        message: '登录名不能为空',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 50,
                        message: '登录名长度在 1 到 50 个字符',
                        trigger: 'blur'
                    }
                ],
                name: [
                    {
                        required: true,
                        message: '真实姓名不能为空',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 20,
                        message: '真实姓名长度在 1 到 20 个字符',
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '密码不能为空',
                        trigger: 'blur'
                    }
                ],
                mobile: [
                    {
                        required: true,
                        message: '联系电话不能为空',
                        trigger: 'blur'
                    },
                    {
                        pattern: /^(13|15|18|14|17)[0-9]{9}$/,
                        message: '手机号码格式不正确',
                        trigger: 'blur'
                    }
                ],
                email: [
                    {
                        required: true,
                        message: '请输入邮箱地址',
                        trigger: 'blur'
                    },
                    {
                        type: 'email',
                        message: '邮箱格式不正确',
                        trigger: 'blur, change'
                    }
                ]
            },
            form: {
                pageNum: 1,
                pageSize: 10,
                name: ''
            },
            dataForm: {
                id: '',
                loginName: '',
                password: '',
                tempRoleIds: [],
                roleIds: '',
                name: '',
                mobile: '',
                address: '',
                email: ''
            },
            tableData: []
        }
    },
    created() {
        this.onSearch()
    },
    methods: {
        add() {
            this.dialogVisible = true
        },
        onDialogClose() {
            this.dataForm.tempRoleIds = []
            this.$refs.dataForm.resetFields()
        },
        onSearch() {
            getUserList(this.form.pageNum, this.form.pageSize, this.form.name)
                .then(res => {
                    this.tableData = res.list || []
                    this.total = res.total
                })
        },
        handleResetPwd(index, row) {
            this.$confirm('确认重置该用户的登录密码？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {})
        },
        handleEdit(index, row) {
            this.dialogVisible = true
            this.dialogTitle = '修改用户信息'
            this.dataForm.tempRoleIds = []
            for (let x of Object.keys(this.dataForm)) {
                if (
                    x === 'tempRoleIds' &&
                    typeof row.roleList === 'object' &&
                    row.roleList.length > 0
                ) {
                    for (let item of row.roleList) {
                        this.dataForm.tempRoleIds.push(item.id)
                    }
                } else {
                    this.dataForm[x] = row[x]
                }
            }
        },
        async onDialogSubmit() {
            if (
                !this.dataForm.loginName ||
                !this.dataForm.password
            ) {
                this.$message.error('请填充信息后再提交!')
                return
            }
            if (this.rules) {
                await usersave(this.dataForm)
                this.dialogVisible = false
                this.onSearch()
            }
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
.fr{
    float:right;
}
.fl{
    float:left;
}
.search-bar{
    overflow: hidden;
}
</style>

<style>
.tools-bar{
  margin-bottom:20px;
}
</style>
