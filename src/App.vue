<template>
  <v-app>
    <!-- Navigation -->
    <v-navigation-drawer app v-model="drawer">
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item
            :to="item.to"
            v-for="(item, index) in navItems"
            :key="`nav-item-${index}`"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- App Bar -->
    <v-app-bar app color="primary" dark dense>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
    </v-app-bar>

    <!-- Main -->
    <v-main>
      <router-view></router-view>
    </v-main>

    <!-- Footer -->
    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    navItems: [
      {
        icon: "mdi-home",
        title: "Home",
        to: "/",
      },
      {
        icon: "mdi-account",
        title: "About",
        to: "/about",
      },
    ],
  }),
};
</script>