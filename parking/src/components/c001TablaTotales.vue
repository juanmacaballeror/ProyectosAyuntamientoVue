<template>
   <div>
     <el-table :key='tableKey' border fit highlight-current-row
        :data.sync="dataTable"
        :default-sort = "{prop: 'fechaAcceso', order: 'descending'}" ref="table">
        <el-table-column
            prop="fechaAcceso"
            label="Fecha Acceso"
            sortable
            :width="campo1">
          <template slot-scope="scope">
                <span>{{ scope.row.fechaAcceso }}</span>
            </template>
        </el-table-column>
        <el-table-column
          prop="matriculasNacionales"
          label="Matrículas nacionales"
          sortable
          :width="campo2">
          <template slot-scope="scope">
                <span>{{ scope.row.matriculasNacionales }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="matriculasExtranjeras"
          label="Matrículas Extranjeras / Especiales"
          sortable
          :width="campo3">
          <template slot-scope="scope">
              <span>{{ scope.row.matriculasExtranjeras }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="cargadasExito"
          label="Cargadas con Exito"
          sortable
          :width="campo4">
          <template slot-scope="scope">
              <span>{{ scope.row.cargadasExito }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="errores"
          label="Errores"
          sortable
          :width="campo5">
          <template slot-scope="scope">
              <span>{{ scope.row.errores }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="totales.length > 10" class="alinearBloqueDerecha">
        <el-row type="flex" class="row-bg textoLabel aireTop">
            <el-col :span="3">
                  <img :src="logoExcel" class="alinearDerecha anadirPointer" @click="exportar"/>
            </el-col>
            <el-col :span="15">
                <el-pagination background
                @current-change="handleCurrentChange"
                :current-page.sync="listQuery.page"
                :page-sizes="[10,20,30, 50]"
                :page-size="listQuery.limit"
                layout="prev, pager, next, jumper, total"
                :total="totales.length"
                class="paginacion">
                </el-pagination>
          </el-col>
        </el-row>
       </div>
       <div class="espacioEntreFilas">
            <el-row type="flex" class="row-bg textoLabel" justify="center">
                    <el-col :span="3">
                        <el-button class="extender verde"  icon="el-icon-menu" @click="irActividad">Actividad</el-button>
                    </el-col>
                    <el-col :span="3" :offset="1">
                        <el-button class="extender verde" icon="el-icon-upload2" @click="subirFichero">Subir fichero</el-button>
                    </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import logoExcel from '@/assets/ico/Excel.svg'
import CsvExportor from 'csv-exportor'

export default {
  name: 'c001TablaTotales',
  props:['totales'],
  data() {
    return {
       logoExcel,
       tableKey: 0,
       dataTable:[],
       campo1:'',
       campo2:'',
       campo3:'',
       campo4:'',
       campo5:'',
       listQuery: {
            page: 1,
            limit: 10,
            title: undefined,
            type: undefined
       }
    }
  },
  mounted() {
    this.pintarColumnas(this.$refs.table.$el.clientWidth)
    //se activa evento para escuchar cambios en el tamaño de la pantalla para redimensionar la tabla
    window.addEventListener('resize', this.handleResize)
  },
  created(){
      this.pintarPantalla(this.listQuery.page)
  },
  methods:{
     handleResize(event){
       //le pasa el tamaño de la pantalla
        this.pintarColumnas(document.documentElement.clientWidth)
     },
     pintarColumnas(anchoPantalla){
        this.campo1 = Math.round((15 / 100)*(anchoPantalla))
        this.campo2 = Math.round((20 / 100)*(anchoPantalla))
        this.campo3 = Math.round((30 / 100)*(anchoPantalla))
        this.campo4 = Math.round((20 / 100)*(anchoPantalla))
        this.campo5 = Math.round((15 / 100)*(anchoPantalla))
     },
     handleCurrentChange(val) {
              this.dataTable=[]
              this.listQuery.page = val
              this.pintarPantalla(this.listQuery.page)
     },
     pintarPantalla(pagina){
           this.dataTable=[]
           var paginaAVisualizar = (pagina - 1) * this.listQuery.limit
           var limiteBucle =  paginaAVisualizar +  this.listQuery.limit
          var i = 0
          for (const value of  this.totales) {
             if(i >= paginaAVisualizar && i < limiteBucle){
                this.dataTable.push(value)
             }
             i++
          }
     },
     exportar(){
         let header = ['FechaAcceso', 'MatriculasNacionales', 'MatriculasExtranjeras/Especiales', 'CargadasExito', 'Errores']
         CsvExportor.downloadCsv(
            this.dataTable,
            { header: header },
            'totales.csv'
         )
     },
     irActividad(){
       this.$router.push({ name:'actividad'});
       //router.push({ name: 'user', params: { userId: 123 }})
     },
     subirFichero(){
       this.$router.push({ name:'transferenciaFicheros'});
     }


  },
  beforeDestroy: function () {
    window.removeEventListener('resize')
  }

}

</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/general.scss";

.alinearDerecha{
     text-align: right;
}

.paginacion{
     padding-top: .5em;
     text-align: left;
     margin-right: 1.5em;
}

.el-table--scrollable-x .el-table__body-wrapper {
    overflow-x: hidden !important;
}

.alinearBloqueDerecha{
    float: right;
}

.anadirPointer{
    cursor: pointer;
}

.verde{
    background-color: #00CC99;
    color:white;
    margin-bottom:1em;
}

.espacioEntreFilas{
    margin-top:5em;
}

</style>
