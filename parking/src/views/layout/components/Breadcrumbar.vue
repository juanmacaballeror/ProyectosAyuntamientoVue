<template>
  <div class="breadcrum-container">
      <el-row>
        <el-col :span="24">
          <breadcrumb></breadcrumb>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'

export default {
  components: {
    Breadcrumb
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$dark_gray:#889aa4;

.breadcrum-container {
  background: #fff;
  height: 34px;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
}
.avatar-container {
  height: 34px;
  display: inline-block;
  position: absolute;
  right: 35px;
  .avatar-wrapper {
    cursor: pointer;
    margin-top: 5px;
    position: relative;
    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 10px;
    }
    .el-icon-caret-bottom {
      position: absolute;
      top: 13px;
      font-size: 16px;
    }
  }
}

.svg-container {
      //padding: 4px 5px 4px 10px;
      color: $dark_gray;
      vertical-align: middle;
      display: inline-block;
      &_login {
        font-size: 16px;
      }
}
</style>
