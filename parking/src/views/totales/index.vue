<template>
  <div class = "anchoPantalla ">
    <!-- <div class="row border-botton"> -->
    <div class="row aireBottom border-botton">
      <el-row>
        <el-col :span="2">
          <img :src="logoTitulo" class="logoTitulo" />
        </el-col>
        <el-col :span="19" class="aireLeft" >
                <p class="textoCabeceraPrincipal">{{ dataStore.name }} </p>
        </el-col>
      </el-row>
    </div>
       <p class="textoLabel aireBottom">Criterios de Búsqueda:</p>
       <div class="borde">
       <el-form label-position="top" :model="form" :rules="rules" ref="form" class="marginFormulario" size="small">
        <el-row type="flex" class="row-bg textoLabel aireTop" justify="center">
            <el-col :span="6">
                <el-form-item label="Fecha de Inicio" prop="fechaInicio" class="textoLabel">
                    <el-date-picker
                      v-model="form.fechaInicio"
                      type="date"
                      format="dd-MM-yyyy"
                      :picker-options="pickerOptions"
                      placeholder="Seleccione una fecha"
                      class="extender">
                    </el-date-picker>
                </el-form-item>
            </el-col>
             <!--
               resta 26 años
               :default-value="new Date(new Date().setFullYear(new Date().getFullYear() - 26))"-->
            <el-col :span="6" :offset="2">
                <el-form-item label="Fecha de Fin" prop="fechaFin" class="textoLabel">
                    <el-date-picker
                      v-model="form.fechaFin"
                      type="date"
                      format="dd-MM-yyyy"
                      :picker-options="deshabilitarFecha"
                      placeholder="Seleccione una fecha"
                      :disabled="true"
                      class="extender">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="2">
                <el-button type="primary" class="extender" icon="el-icon-search" @click="buscar(form)">Buscar</el-button>
            </el-col>
        </el-row>
        <el-row>
           <el-col :span="4">
                <p class="camposObligatorios">* Campos obligatorios</p>
          </el-col>
        </el-row>
        </el-form>
    </div>
    <!-- Pinta tabla resultados-->
    <div v-if="totParking && totParking.length > 0" class="aireTop centrarTabla">
         <pintar-Tabla :totales = "totParking"> </pintar-Tabla>
        <!-- <c001-tabla-totales :totales = "totParking"></c001-tabla-totales> -->
    </div>
  </div>
</template>

<script>
import logoTitulo from "@/assets/ico/Parking.svg";
import { totalesParking } from "@/api/totalesParking";
import c001TablaTotales from "@/components/c001TablaTotales";
import store from "@/store";

import { mapState, mapGetters, mapMutations } from "vuex";
// con this.$store es lo mismo que hacer este import
//import store from '@/store/index'

export default {
  name: "totales",
  data() {
    return {
      store,
      logoTitulo: logoTitulo,
      totParking: "",
      datosParking: {},
      id: "",
      name: "",
      datosFormulario: "",
      pickerOptions: {
        disabledDate(time) {
          // obtenemos los ultimos 15 dias (15 dias atras mas el de hoy = 16) para poder señalar fechas en el calendario
          let curDate = new Date().getTime();
          let quince = 16 * 24 * 3600 * 1000;
          let quinceDias = curDate - quince;
          return time.getTime() > Date.now() || time.getTime() < quinceDias;
        },
        firstDayOfWeek: 1
      },
      deshabilitarFecha: {
        disabledDate(time) {
          return time;
        }
      },
      form: {
        fechaInicio: "",
        fechaFin: new Date()
      },
      rules: {
        fechaInicio: [
          {
            required: true,
            message: "Introduzca la fecha inicio",
            trigger: "blur"
          }
        ],
        fechaFin: [
          {
            required: true,
            message: "Introduzca la fecha fin",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: mapState({
    dataStore: state => state.datosParking.datosP
  }),
  created() {
    // this.buscar()
    debugger;
    if (this.$route.params.datosParametros) {
      let data = {
        id: this.$route.params.datosParametros.id,
        name: this.$route.params.datosParametros.name
      };
      this.$store.dispatch("ActionsDatosParking", data);
    } else {
      this.$store.dispatch("ObtenerDatosParking");
    }
  },
  methods: {
    buscar(form) {
      debugger;
      this.$refs.form.validate(valid => {
        debugger;
        if (valid) {
          this.datosFormulario = this.$refs.form;
          var dto_in = {
            idParking: this.id,
            fechaInicio: this.datosFormulario.fechaInicio,
            fechaFin: this.datosFormulario.fechaFin
          };
          //llamamos al servicio para recuperar datos
          const loading = this.$loading({
            lock: true,
            text: "Cargando",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          totalesParking(dto_in).then(response => {
            debugger;
            this.totParking = response.data;
            loading.close();
          });
        } else {
          this.$notify.error({
            title: "Error en Datos Formulario ",
            message: ""
          });
        }
      });
    }
  },
  components: {
    pintarTabla: c001TablaTotales
    //c001TablaTotales
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/general.scss";

.border-botton {
  border-bottom: 1px solid grey;
}

.aireBottom {
  margin-bottom: 0.5em;
}

.el-button--medium {
  margin-top: 1em;
}

.aireLeft {
  margin-left: 1em;
}

.el-table th {
  color: white;
  background-color: #409eff;
}

.el-table,
.el-table__header-wrapper {
  width: auto !important;
}

.centrarTabla {
  margin-left: auto;
  margin-right: auto;
}

.el-table_1_column_1 {
  width: 15% !important;
}

.el-table_1_column_2 {
  width: 25% !important;
}

.el-table_1_column_3 {
  width: 35% !important;
}

.el-table_1_column_4 {
  width: 15% !important;
}

.el-table_1_column_5 {
  width: 10% !important;
}
</style>
