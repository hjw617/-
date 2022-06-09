<template>
  <div>
    <div>
      <el-scrollbar>
        <el-form
          id="selectForm"
          ref="form"
          :model="form"
          :rules="rules"
        >
        <el-form-item
              label="绩效类型: "
              prop="type"
            >
              <el-select
                v-model="form.type"
                placeholder="请输入绩效类型"
                class = 'formTypeInput'
                size="small"
              >
                <el-option
                  v-for="(item, index) in listType"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
          </el-form-item>
          <el-form-item
              label="方案类型: "
              prop="bizType"
            >
              <el-select
                v-model="form.bizType"
                placeholder="请输入方案类型"
                class = 'formTypeInput'
                size="small"
              >
                <el-option
                  v-for="(item, index) in listBizType"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
          </el-form-item>
          <el-form-item
              label="绩效周期: "
              prop="periodId"
            >
              <el-select
                v-model="form.periodId"
                placeholder="请输入绩效周期"
                class = 'formTypeInput'
                size="small"
              >
                <el-option
                  v-for="(item, index) in listPeriodId"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
          </el-form-item>
          <el-form-item
              label="方案名称: "
              prop="name"
            >
              <el-input
                v-model="form.name"
                size="small"
                class = 'formTypeInput'
                placeholder="请输入方案名称"
              />
          </el-form-item>
           <el-form-item
            label="方案开始时间-结束时间"
            prop="startEndTime"
          >
            <el-date-picker
              v-model="form.startEndTime"
              type="daterange"
              start-placeholder="开始时间"
              range-separator="-"
              end-placeholder="结束时间"
              size="small"
              class="w300"
            />
          </el-form-item>
          <el-form-item
              label="部门: "
              prop="deptCode"
            >
              <el-select
                v-model="form.deptCode"
                placeholder="请输入部门"
                class = 'formTypeInput'
                size="small"
              >
                <el-option
                  v-for="(item, index) in listDeptCode"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
          </el-form-item>

        </el-form>
      </el-scrollbar>
    </div>
    <div>
       <el-button
        v-if="saveFlag"
        type="primary"
        @click="save"
      >保存</el-button>
      <el-button
        type="info"
        @click="cancel"
      >取消</el-button>
    </div>
  </div>
</template>
<script>
import { programmesave, programmeUpdateById } from '@/api/permission'

export default {
    data() {
        return {
            saveFlag: true,
            form: {
                type: '',
                name: '',
                periodName: '',
                bizType: '',
                startDate: '',
                endDate: '',
                deptCode: '',
                startEndTime: ''
            },
            rules: {},
            listType: [
                { id: 1, name: '员工绩效' },
                { id: 2, name: '组织绩效' }
            ],
            listPeriodId: [
                { id: '1', name: '2022Q1' },
                { id: '2', name: '2022Q2' },
                { id: '3', name: '2022Q3' },
                { id: '4', name: '2022Q4' },
                { id: '5', name: '2022年度' }
            ],
            listBizType: [
                { id: 'plan', name: '绩效计划' },
                { id: 'assess', name: '绩效考核' }
            ],
            listDeptCode: [
                { id: '000001', name: '绩效管理部' },
                { id: '01', name: '杭州业务部' },
                { id: '02', name: '杭州IT部' },
                { id: '03', name: '杭州财政部' },
                { id: '04', name: '南昌业务部' },
                { id: '05', name: '南昌IT部' },
                { id: '06', name: '南昌财政部' },
                { id: '07', name: '总裁办' }
            ]
        }
    },
    // 自动加载
    created() {
        this.updateById()
    },
    methods: {
        updateById() {
            if (this.$route.query.id !== null && this.$route.query.id !== '') {
                this.saveFlag = false
                const params = {
                    id: this.$route.query.id
                }
                programmeUpdateById(params).then(res => {
                    this.form = res
                })
            }
        },
        async save () {
            await programmesave(this.form)
            this.$router.push({
                path: '/sys/scheme'
            })
        },
        cancel() {
            this.$router.push({
                path: '/sys/scheme'
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.formTypeInput {
    width: 144px;
}
</style>
