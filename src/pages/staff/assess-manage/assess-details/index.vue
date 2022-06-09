<template>
  <div class="m1">
    <div>
      <el-form
          id="selectForm"
          ref="form"
          :model="form"
        >
          <div class="organizationForm-title-t">{{ form.periodName }}员工考核</div>
          <el-form-item
              label="用户名称: "
              prop="loginName"
            >
              <el-input
                disabled
                v-model="form.loginName"
                size="small"
                class = 'formTypeInput'
              />
          </el-form-item>
          <el-form-item
              label="绩效周期: "
              prop="periodName"
            >
              <el-input
                disabled
                v-model="form.periodName"
                size="small"
                class = 'formTypeInput'
              />
          </el-form-item>
          <el-form-item
              label="联系电话: "
              prop="mobile"
            >
              <el-input
                disabled
                v-model="form.mobile"
                size="small"
                class = 'formTypeInput'
              />
          </el-form-item>
          <el-form-item
              label="联系地址: "
              prop="address"
            >
              <el-input
                disabled
                v-model="form.address"
                size="small"
                class = 'formTypeInput'
              />
          </el-form-item>
          <el-form-item
              label="部门: "
              prop="deptName"
            >
              <el-input
                disabled
                v-model="form.deptName"
                size="small"
                class = 'formTypeInput'
              />
          </el-form-item>
      </el-form>

      <el-form ref="elForm" :rules="rules" :model="elForm">
        <el-table
            :data="elForm.listPlan"
            border
            style="width: 100%"
            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        >
            <el-table-column
                type="index"
                label="序号"
                width="60"
                align="center"
                :resizable="false"
            />
            <el-table-column
                prop="kpi"
                label="绩效总结"
                align="center"
                width="230"
                :resizable="false"
            >
                <template #default="scope">
                    <el-form-item :prop="'listPlan.'+scope.$index+'.kpi'" :rules="rules.kpi">
                      <el-input
                        :disabled = "flag"
                        v-model="scope.row.kpi"
                        size="small"
                        type="textarea"
                        autosize
                      />
                    </el-form-item>
                </template>
            </el-table-column>
            <el-table-column
                prop="name"
                label="价值观践行"
                align="center"
                width="230"
                :resizable="false"
            >
                <template #default="scope">
                    <el-form-item :prop="'listPlan.'+scope.$index+'.name'" :rules="rules.name">
                    <el-input
                        :disabled = "flag"
                        v-model="scope.row.name"
                        size="small"
                        type="textarea"
                        autosize
                    />
                    </el-form-item>
                </template>
            </el-table-column>
             <el-table-column
                prop="target"
                label="个人发展期望"
                align="center"
                width="230"
                :resizable="false"
            >
                <template #default="scope">
                    <el-form-item :prop="'listPlan.'+scope.$index+'.target'" :rules="rules.target">
                    <el-input
                        v-model="scope.row.target"
                        :disabled = "flag"
                        size="small"
                        type="textarea"
                        autosize
                    />
                    </el-form-item>
                </template>
            </el-table-column>
             <el-table-column
                prop="plan"
                label="KPI/重点工作"
                align="center"
                width="230"
                :resizable="false"
            >
                <template #default="scope">
                    <el-form-item :prop="'listPlan.'+scope.$index+'.plan'" :rules="rules.plan">
                    <el-input
                        v-model="scope.row.plan"
                        :disabled = "flag"
                        size="small"
                        type="textarea"
                        autosize
                    />
                    </el-form-item>
                </template>
            </el-table-column>
             <el-table-column
                prop="weight"
                label="绩效等级自评"
                align="center"
                width="300"
                :resizable="false"
            >
                <template #default="scope">
                    <el-form-item :prop="'listPlan.'+scope.$index+'.weight'" :rules="rules.weight">
                    <el-radio-group v-model="scope.row.weight" :disabled = "flag">
                      <el-radio :label="'1'">优秀</el-radio>
                      <el-radio :label="'2'">良好</el-radio>
                      <el-radio :label="'3'">较差</el-radio>
                    </el-radio-group>
                    </el-form-item>
                </template>
            </el-table-column>
        </el-table>
      </el-form>
    </div>
     <div v-if="examineFlag || examineFlags" class="m2">
            <table>
              <tr>
                <td>具体说明</td>
                <td colspan="3"><el-input
                  v-model="auditRemark"
                  :disabled= "isEdit"
                  size="small"
                  type="textarea"
                  autosize
                  placeholder="请输入"
                />
                </td>
              </tr>
            </table>
    </div>

    <div class="buttonStyle">
        <el-button
        v-if = "saveCommitFlag"
        @click="save"
        type="primary"
      >保存</el-button>
      <el-button
        v-if = "saveCommitFlag"
        @click="commit"
        type="primary"
      >提交</el-button>
      <el-button
        v-if = "examineFlag"
        @click="backPass('2')"
        type="primary"
      >审核退回</el-button>
     <el-button
        v-if = "examineFlag"
        @click="backPass('1')"
        type="primary"
      >审核通过</el-button>
      <el-button
        @click="cancel"
        type="info"
      >取消</el-button>
    </div>
  </div>
</template>
<script>
import { staffPlanSave, staffPlanCommit, staffPlanUpdateById, staffPlanExamine } from '@/api/permission'

export default {
    data() {
        return {
            saveCommitFlag: false,
            examineFlag: false,
            examineFlags: true,
            flag: true,
            isEdit: true,
            form: {
                loginName: '',
                periodName: '',
                mobile: '',
                address: '',
                deptName: ''
            },
            elForm: {
                listPlan: [{
                    kpi: '',
                    name: '',
                    target: '',
                    plan: '',
                    weight: ''
                }]
            },
            rules: {
                kpi: [{ required: true, message: '请填写', trigger: 'blur' }],
                name: [{ required: true, message: '请填写', trigger: 'blur' }],
                target: [{ required: true, message: '请填写', trigger: 'blur' }],
                plan: [{ required: true, message: '请填写', trigger: 'blur' }],
                weight: [{ required: true, message: '请选择', trigger: 'blur' }]
            },
            listAuditStatus: [
                { id: 1, name: '同意' },
                { id: 2, name: '退回' }
            ],
            auditStatus: '',
            auditRemark: ''
        }
    },
    // 自动加载
    created() {
        this.updateById()
    },
    methods: {
        updateById() {
            const params = {
                id: this.$route.query.id
            }
            staffPlanUpdateById(params)
                .then(res => {
                    this.form = res.userConfig
                    if (res.userConfig.status === '1' && res.loginName === res.userConfig.currentCode) {
                        this.saveCommitFlag = true
                        this.flag = false
                        this.examineFlag = false
                    } else if (res.userConfig.status === '2' && res.loginName === res.userConfig.currentCode) {
                        this.saveCommitFlag = false
                        this.examineFlag = true
                        this.isEdit = false
                    } else {
                        this.saveCommitFlag = false
                        this.examineFlag = false
                        this.isEdit = true
                    }
                    if (res.userConfig.status === '1') {
                        this.examineFlags = false
                    }
                    if (res.listPlan != null && res.listPlan.length > 0) {
                        this.elForm.listPlan = res.listPlan || []
                    }
                    this.auditStatus = res.userConfig.auditStatus
                    this.auditRemark = res.userConfig.auditRemark
                    this.form.deptName = '绩效管理部'
                })
        },
        save () {
            const params = {
                id: this.$route.query.id,
                listPlan: this.elForm.listPlan
            }
            this.$refs.elForm.validate(valid => {
                if (!valid) {
                    this.$message('请填写必填项')
                } else {
                    staffPlanSave(params).then(res => {
                        this.$message({
                            type: 'success',
                            message: '保存成功'
                        })
                        setTimeout(() => {
                            this.cancel()
                        }, 2000)
                    })
                }
            })
        },
        cancel () {
            this.$router.push({
                path: '/staff/assess'
            })
        },
        commit () {
            const params = {
                id: this.$route.query.id,
                listPlan: this.elForm.listPlan
            }
            this.$refs.elForm.validate(valid => {
                if (!valid) {
                    this.$message('请填写必填项')
                } else {
                    staffPlanCommit(params).then(res => {
                        this.$message({
                            type: 'success',
                            message: '提交成功'
                        })
                        setTimeout(() => {
                            this.cancel()
                        }, 2000)
                    })
                }
            })
        },
        backPass (value) {
            const params = {
                id: this.$route.query.id,
                auditStatus: value,
                auditRemark: this.auditRemark
            }
            staffPlanExamine(params).then(res => {
                this.cancel()
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.formTypeInput {
    width: 195px;
    left: -5px;
}
.m1 {
    height: 600px;
    position:relative
}
.m2 {
    padding: 20px 0;
}
.buttonStyle {
    position:absolute;
    right:0;
    bottom:0
}
</style>
