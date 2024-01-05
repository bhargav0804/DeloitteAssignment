
<template>
  <div>
    <nav
      id="navview"
      class="navbar navBar navbar-expand-lg navbar-light bg-light sticky-top"
    >
      <a class="navbar-brand text-white ml-5" href="#">Logo</a>

      <div class="collapse navbar-collapse"></div>
      <div class="float-right">
        <div class="row fontawesome-size">
          <i class="fas fa-bell fa-1x"></i>
          <i class="fas fa-cog fa-1x ml-4"></i>
          <i class="fas fa-language fa-1x ml-4"></i>
          <i class="fas fa-user-circle fa-1x ml-4 mr-3"></i>
        </div>
      </div>
    </nav>
    <div id="app">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      title: "Home",
      menu: [
        {
          href: "/",
          title: "Home",
        },
      ],
    };
  },
  methods: {},
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
.v-sidebar-menu {
  width: 200px !important;
  margin-top: 55px;
}
.navBar {
  background-color: #3971af !important;
  color: white !important;
}
#view {
  padding-left: 205px;
}

#view.collapsed {
  padding-left: 50px;
}

.sidebar.v-sidebar-menu .vsm-arrow:after {
  content: "\f105";
  font-family: "FontAwesome";
}
.sidebar.v-sidebar-menu .collapse-btn:after {
  content: "\f07e";
  font-family: "FontAwesome";
}
.v-sidebar-menu .collapse-btn {
  display: none !important;
}
.fontawesome-size {
  font-size: 1.26rem !important;
}
.v-sidebar-menu {
  background-color: #3971af !important;
}
.v-sidebar-menu .vsm-icon {
  background-color: transparent !important;
}
</style>