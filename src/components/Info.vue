<template>
    <el-container style="height:100%">
        <el-header>
            <span class="title">爱宠邦后台管理系统</span>
            <span class="user-info">
                {{this.reg.userName}}
                <a href="#" @click="(e) => {
                        e.preventDefault()
                        exit()
                    }">退出</a>
            </span>
        </el-header>
        <el-container>
            <el-aside width="200px" style="height:650px;">
                <el-row class="tac">
                    <el-col >
                        <el-menu
                        router
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                        style="height:650px"
                        class="el-menu-vertical-demo">
                        <el-menu-item index="user" v-if="this.use.use==='admin'" >
                            <i class="el-icon-menu"></i>
                            <span slot="title">用户管理</span>
                        </el-menu-item>
                        <el-menu-item index="master" >
                            <i class="el-icon-setting"></i>
                            <span slot="title">宠主管理</span>
                        </el-menu-item>
                        <el-menu-item index="stores"  >
                            <i class="el-icon-setting"></i>
                            <span slot="title">门店管理</span>
                        </el-menu-item>
                        <el-menu-item index="service" >
                            <i class="el-icon-setting"></i>
                            <span slot="title">服务管理</span>
                        </el-menu-item>
                        <el-menu-item index="goods">
                            <i class="el-icon-setting"></i>
                            <span slot="title">商品管理</span>
                        </el-menu-item>
                        <el-menu-item index="order">
                            <i class="el-icon-setting"></i>
                            <span slot="title">订单管理</span>
                        </el-menu-item>
                        </el-menu>
                    </el-col>
                    </el-row>
            </el-aside>
            <el-main>
                <div class="mws-sidebar-stitch"></div>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import { mapState } from "vuex"
export default {
    created(){
        this.use = this.getStorage("users")
    },
  data() {
    return {
      use: ""
    };
  },
  computed:{
      ...mapState('Reg',["reg"])
  },
  methods:{
       getStorage(key) {
      if (!localStorage[key]) {
        return [];
      }
      return JSON.parse(localStorage[key]);
    },
      exit(){
          this.$router.push("/")
      }
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: #c5d52b;
  margin-left: 10px;
}
a:hover {
  color: white;
}
.el-header {
  color: white;
  line-height: 60px;
  border-bottom: 5px solid #c5d52b;
  background: url("../../public/images/mws-header-bg.png") repeat-x;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.user-info {
  margin-right: 20px;
  background: url("../../public/images/mws-inset.png");
  display: block;
  width: 200px;
  height: 40px;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.15),
    inset 0 1px 2px rgba(0, 0, 0, 0.5);
  font-size: 14px;
  text-align: center;
  line-height: 40px;
  border-radius: 4px;
  position: relative;
}
.el-main {
  background: url("../../public/images/mws-body-bg.png");
  position: relative;
}
.mws-sidebar-stitch {
  width: 17px;
  height: 100%;
  position: absolute;
  top: 0;
  left: -10px;
  z-index: 99;
  background: url("../../public/images/mws-sidebar-stitch.png") repeat-y;
}
</style>