<template>
 <!-- Peticion =  localhost:8080/#/intranet?user=jose&password=1234 -->

<!--
    $route.path is equal to the absolute path; e.g. /people
    $route.params contains the key/value pairs of your dynamic sections; e.g. { personId: 5 }
    $route.query contains the key/value pairs of your query string; e.g. /people?sortBy=names would return { sortBy : lastName }
    $route.router returns the vue-router instance
    $route.matched returns route configuration objects for every matched segment in the current route
    $route.name returns the name, if it has one, of the current route
-->

  <div>
    <p>Peticion: localhost:8080/#/intranet/people?user=1</p>
    <p>Path(absolute): {{this.$route.path }}</p>
    <p>Param: {{this.$route.params.id }}</p>
    <p>Query: {{$route.query}}</p>
    <p>Name: {{$route.name}}</p>
    <p>Router: {{$route.router}}</p>
  </div>
</template>

<script>
export default {
  name: 'AuthIntranet',

  data () {
    queryItems:this.$route.query
    return {
      loginParam: {
        username: 'admin',
        password: 'admin',
        canal: ''
      },
       crmIN:[
      'NOMBRE',
      'APELLIDO_1',
      'APELLIDO_2',
      'DOCUMENTO',
      'TIPO',
      'CORREO',
      'TLF'
       ]
    }
  },
  methods: {
    handleLogin(parametros) {
        let self = this;
        console.log('handlelogin-intranet')
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginParam).then(() => {
            this.loading = false
           // this.$router.push({ path: '/gestion/autorizacion', component: 'p001BusquedaAutorizaciones' })
           self.$router.push({ name: 'totales', params: parametros })
          }).catch(() => {
            this.loading = false
          })
    }
  },
  created: function() {
        let dtoIn = new Object()
        var self = this
        Object.getOwnPropertyNames(this.$route.query).forEach(function(val, idx, array) {
          //de los datos que me llegan como parametro los paso a un objeto para que el router se los pase a la pantalla
          // en este caso a la pantalla de totales que es nuestra pagina inicial
           if(self.crmIN.indexOf(val) != -1){
             dtoIn[val] = self.$route.query[val]
           }
        })
        this.handleLogin(dtoIn)
    }
}
</script>
