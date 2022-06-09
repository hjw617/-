<template>
    <div class="login-container">
        <div class="w1">
        <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
            <h3 class="title">绩效管理系统</h3>
            <el-form-item prop="loginName">
                <span class="svg-container svg-container_login">
                    <svg-icon icon-class="user" />
                </span>
                <el-input name="loginName" type="text" v-model="loginForm.loginName" autoComplete="on" placeholder="loginName" />
            </el-form-item>
            <el-form-item prop="password">
                <span class="svg-container">
                    <svg-icon icon-class="password"></svg-icon>
                </span>
                <el-input name="password" :type="pwdType" @keyup.enter.native="login" v-model="loginForm.password" autoComplete="on"
                placeholder="password"></el-input>
                <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="login">
                登录
                </el-button>
            </el-form-item>
            <div class="tips">用户为admin的时候，能够看到所有的权限列表，其余账号只能看到部分</div>
        </el-form>
        </div>
    </div>
</template>

<script>
import { login } from '@/api/permission'
export default {
    data() {
        const validateLoginName = (rule, value, callback) => {
            if (value.length < 5) {
                callback(new Error('请输入正确的用户名'))
            } else {
                callback()
            }
        }
        const validatePass = (rule, value, callback) => {
            if (value.length < 5) {
                callback(new Error('密码不能小于5位'))
            } else {
                callback()
            }
        }
        return {
            loginForm: {
                loginName: 'admin',
                password: '123456'
            },
            loginRules: {
                loginName: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: validateLoginName
                    }
                ],
                password: [
                    { required: true, trigger: 'blur', validator: validatePass }
                ]
            },
            loading: false,
            pwdType: 'password'
        }
    },
    methods: {
        showPwd() {
            if (this.pwdType === 'password') {
                this.pwdType = ''
            } else {
                this.pwdType = 'password'
            }
        },
        async login() {
            try {
                let data = await login(this.loginForm)
                let token = data.token
                this.$store.commit('LOGIN_IN', token)
                this.$router.replace('/home')
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
    .el-input {
        display: inline-block;
        height: 47px;
        width: 90%;
        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            &:-webkit-autofill {
                -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
                -webkit-text-fill-color: #fff !important;
            }
        }
    }
    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #eee;
$dark_gray: #889aa4;
$light_gray: #eee;
.w1 {
    position: relative;
    z-index: 99999;
}
.login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-image: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.xianjichina.com%2Fediter%2F20211023%2Fimage%2Fb40ab4e9d891f26712dc2f7b0d1534af.gif&refer=http%3A%2F%2Fimg.xianjichina.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652110034&t=daaa04408d7cbec551e4fed4b3513ba6);
    background-size: contain;
    .login-form {
        position: absolute;
        background-color: #2d3a4b;
        left: 0;
        right: 0;
        width: 520px;
        border-radius: 50px;
        padding: 35px 35px 15px 35px;
        margin: 120px auto;
    }
    .tips {
        font-size: 14px;
        color: rgb(217, 240, 14);
        margin-bottom: 10px;
        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }
    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
        &_login {
            font-size: 20px;
        }
    }
    .title {
        font-size: 26px;
        font-weight: 400;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
    }
    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }
    .fontcontainer{
        color:#889aa4;
        padding-left:10px;
    }
}
</style>
