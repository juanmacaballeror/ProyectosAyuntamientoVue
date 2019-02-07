<template>
  <div class="app-wrapper">
    <div class="main-container">
      <el-row>
        <el-col :span="21" class="brand-title">
          Gesti&oacuten de Parking MC
        </el-col>
        <el-col :span="3">
          <img class="logo" :src="logoMadrid" alt="Ayuntamiento de Madrid">
        </el-col>
      </el-row>
      <topbar class="topbar-container"></topbar>
   <!--  <breadcrumbar></breadcrumbar>-->
      <app-main></app-main>
    </div>
    <!-- <div class="foot-container"> -->
  </div>
</template>

<script>
import { Topbar, Breadcrumbar, AppMain } from '@/views/layout/components'
import logoMadrid from '@/assets/logo-madrid.png'

export default {
  name: 'layout',
  components: {
    Topbar,
    Breadcrumbar,
    AppMain
  },
  data() {
    return {
      logoMadrid: logoMadrid
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.logo {
  padding: 0;
  padding-top: 0.5rem;
  height: 40px;
}
.brand-title {
    padding: 0;
    padding-top: 0.5rem;
    padding-left: 0.5rem;
    height: 40px;
    color: #000;
    background-color: #fff;
    font-size: 1.6rem;
}
.breadcrum-container{
  -webkit-box-shadow:none !important;
  box-shadow:none !important;
  border-bottom:none !important;
}
</style>
