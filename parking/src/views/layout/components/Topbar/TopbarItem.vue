<template>
  <el-menu class="el-menu-demo" mode="horizontal" :default-active="$route.path" background-color="#fff" text-color="#000" active-text-color="#409EFF">

    <template v-for="item in routes" v-if="!item.hidden">

<!--       <router-link v-if="item.children.length===1 && !item.children[0].children" :index="item.path+'/'+item.children[0].path" :to="item.path+'/'+item.children[0].path" :key="item.children[0].name">
          <span v-if="item.children[0].meta&&item.children[0].meta.title">11-{{generateTitle(item.children[0].meta.title)}}</span>
      </router-link>
 -->
   <el-submenu  :index="item.path" :to="item.path" :key="item.name">
        <template v-if="item.meta&&item.meta.title" slot="title">
           <router-link :to="item.path" :key="item.name">

              <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
              {{generateTitle(item.meta.title)}}

          </router-link>
        </template>

        <!-- <router-link :to="item.path" :key="item.name"> -->
            <!-- <el-menu-item :index="item.path">
              <span>{{generateTitle(meta.title)}}</span>
            </el-menu-item> -->
          <!-- </router-link> -->

       <!-- <template v-for="child in item.children" v-if="!child.hidden">

          <router-link v-if="child.meta&&!child.children" :to="item.path+'/'+child.path" :key="child.name">
            <el-menu-item :index="item.path+'/'+child.path">
              <span v-if="child.meta&&child.meta.title">{{generateTitle(child.meta.title)}}</span>
            </el-menu-item>
          </router-link>

          <router-link v-if="child.meta&&child.children" :to="item.path+'/'+child.path" :key="child.name">
            <el-submenu :index="item.path+'/'+child.path">
              <span slot="title">{{generateTitle(child.meta.title)}}</span>
                <router-link v-for="grandson in child.children" :to="item.path+'/'+child.path+'/'+grandson.path" :key="grandson.name">
                  <el-menu-item :index="item.path+'/'+child.path+'/'+grandson.path" v-if="grandson.meta&&grandson.meta.title">
                    <svg-icon v-if="grandson.meta&&grandson.meta.icon" :icon-class="grandson.meta.icon"></svg-icon>
                    {{generateTitle(grandson.meta.title)}}
                  </el-menu-item>
                </router-link>
            </el-submenu>
          </router-link>

        </template>-->
      </el-submenu>

    </template>
  </el-menu>
</template>

<script>
import { generateTitle } from '@/utils/i18n'
debugger
export default {
  name: 'TopbarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    generateTitle
  },
  created(){
    console.log("rutasTopBar" + this.routes)
  },
  beforeDestroy(){
     console.log("rutasTopBar" + this.routes)
  }

}
</script>

