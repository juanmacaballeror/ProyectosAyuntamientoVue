<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
      class="card-box login-form">
       <img class="logo" :src="logoMadrid" alt="Ayuntamiento de Madrid"/>
      <h2 class="title">Gesti&oacuten de Parkings</h2>
      <h3 class="title">MC</h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          placeholder="password"></el-input>
          <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
      </el-form-item>
      <el-form-item prop="canal">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="tree" />
        </span>
        <el-select v-model="loginForm.canal" placeholder="Canal">
          <el-option v-for="canal in canalesSelect"
            :key="canal.value" :label="canal.label" :value="canal.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin(loginForm)">
          Sign in
        </el-button>
      </el-form-item>
      <div class="tips">
        <span> admin/admin (easy-mock) | Usuarios demo (back):</span>
          <ul><li style="list-style-type: none;" v-for='user in userDemo' :key='user'>{{ user }}</li></ul>
      </div>
    </el-form>
  </div>
</template>

<script>
// import { isvalidUsername } from '@/utils/validate'
import logoMadrid from '@/assets/logo-madrid-blanco.png'

export default {
  name: 'login',
  //props: ['datosEntrada'],
  data() {
    // const validateUsername = (rule, value, callback) => {
    //  if (!isvalidUsername(value)) {
    //    callback(new Error('Please enter the correct user name'))
    //   } else {
    //    callback()
    //  }
    // }
    const validateUsername = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('The username can not be less than 5 digits'))
       } else {
        callback()
      }
    }

    const validatePass = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('The password can not be less than 5 digits'))
      } else {
        callback()
      }
    }
    return {
      logoMadrid: logoMadrid,
      loginForm: {
        username: 'admin',
        password: 'admin',
        canal: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      canalesSelect: [{
          value: '',
          label: ''
        }, {
          value: 'CRM',
          label: 'CRM'
        }, {
          value: '010',
          label: '010'
        }, {
          value: 'canal1',
          label: 'canal1'
        }
      ],
      userDemo: [ 'consultas/user', 'operador/user', 'operador_oac/user', 'funcionario_oac/user',
      'jefe_oac/user', 'gestor/user', 'admin/admin'
      ]
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
    handleLogin(loginForm) {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            //this.$router.push({ path: '/', params: {loginForm} })
            //una vez logado, lo que tendriamos que hacer ahora es llamar al servicio de
              let datosParametros = {
                "id": 1111,
                "name": 'Parking Plaza de España'
              }
              this.$router.push({ name: 'totales', params: {datosParametros} })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    @include relative;
    height: 100vh;
    background-color: $dark_gray;
    //background-image: url("../../assets/loginBackgroud.jpg");
    background-repeat: no-repeat center center fixed;
    background-size: cover;
    background-position: center;
    //background-size: 100% auto;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
    .el-select {
      display: inline-block;
      height: 47px;
      //width: 85%;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
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
    .logo {
      //margin: 20px auto 40px auto;
      display: block;
      margin-left: auto;
      margin-right: auto;
      width: 50%; height: 50%;
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px 10 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      background-color: $bg;
      opacity: 0.8;
      filter: alpha(opacity=50);
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select:none;
    }
    // .thirdparty-button{
    //   position: absolute;
    //   right: 35px;
    //   bottom: 28px;
    // }
  }
</style>
