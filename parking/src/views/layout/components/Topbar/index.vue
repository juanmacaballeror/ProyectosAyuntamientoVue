<template>
  <el-row class="topbar-menu">
  <el-col :span="21">
    <topbar-item :routes="permission_routers"></topbar-item>
  </el-col>
        <el-col :span="3" class="userinfo">
          <span>{{name}}</span>
          <el-button type="text" @click="logout">Salir</el-button>
        </el-col>
      </el-row>
</template>

<script>
import { mapGetters } from "vuex";
import TopbarItem from "./TopbarItem";

export default {
  components: { TopbarItem },
  computed: {
    ...mapGetters(["permission_routers", "name", "avatar"])
  },
  methods: {
    logout() {
      //elimina los datos del LocalStorage de los datos del parking(id, name)
      this.$store.dispatch("eliminarDatosParking");
      //elimina el token de la aplicacion
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // vue-router - bug
      });
    }
  }
};
</script>

<<style>
.topbar-menu {
  background-color: #fff;
}
.userinfo {
	text-align: right;
  padding-top: 20px;
	padding-right: 35px;
  background-color: #fff;
	float: right;
}
</style>
