import axios from '@/config/httpConfig'

export function fetchPermission() {
    return axios.get('/user/info')
}

// 获取用户列表
export function getUserList(page, pageSize, loginName) {
    return axios.get(`/user/list?page=${page}&pageSize=${pageSize}&loginName=${loginName}`)
}
// 获取角色列表
export function getRoleList(page, pageSize, roleName) {
    return axios.get(`/role/list?page=${page}&pageSize=${pageSize}&roleName=${roleName}`)
}
// 获取所有权限
export function getAllPermissiion() {
    return axios.get('/permission/all')
}
// 获取一级权限列表
export function getFirstLevel() {
    return axios.get('/permission/resource')
}
// 获取次级权限列表
export function getNextLevel(id) {
    return axios.get(`/permission/level?id=${id}`)
}
export function login(data) {
    return axios.post('/user/login', data)
}

// 用户保存
export function usersave(data) {
    return axios.post('/user/save', data)
}

// 角色保存
export function rolesave(data) {
    return axios.post('/role/save', data)
}

// 方案列表分页显示
export function getProgrammeList(page, pageSize, name) {
    return axios.get(`/programme/list?page=${page}&pageSize=${pageSize}&name=${name}`)
}

// 方案保存
export function programmesave(data) {
    return axios.post('/programme/save', data)
}

// 根据方案id查询
export function programmeUpdateById(data) {
    return axios.post('/programme/updateById', data)
}

// 方案删除
export function deleteProgramme(id) {
    return axios.get(`/programme/delete?id=${id}`)
}

// 员工组织列表分页显示
export function userConfigList(page, pageSize, type, bizType, periodId) {
    return axios.get(`/userConfig/list?page=${page}&pageSize=${pageSize}&type=${type}&bizType=${bizType}&periodId=${periodId}`)
}

// 员工计划保存
export function staffPlanSave(data) {
    return axios.post('/staffPlan/save', data)
}

// 员工计划根据id查询
export function staffPlanUpdateById(data) {
    return axios.post('/staffPlan/updateById', data)
}

// 员工计划提交
export function staffPlanCommit(data) {
    return axios.post('/staffPlan/commit', data)
}

// 员工计划审核通过退回
export function staffPlanExamine(data) {
    return axios.post('/staffPlan/examine', data)
}
