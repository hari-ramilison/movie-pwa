<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="constrain">
        <q-btn flat round dense class="q-mr-sm" to="/" icon="eva-play-circle-outline" size="18px"/>       
        <q-separator class="large-screen-only" vertical spaced />
        <q-toolbar-title align="center">
          My favorite movies
        </q-toolbar-title>
        <q-separator class="large-screen-only" vertical spaced />
        <q-btn flat round dense to="/movie-list" icon="eva-home-outline" size="18px"/>
        <q-btn flat round dense to="/movie-create" icon="eva-plus-outline" size="18px"/> 
      </q-toolbar>
    </q-header>
    <q-footer class="bg-white" bordered>
      <transition
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <div
              v-if="showAppInstallBanner"
              class="banner-container bg-primary"
            >
              <div class="constrain">
                <q-banner
                  class="bg-primary text-white"
                  inline-actions
                  dense
                >
                  <template v-slot:avatar>
                    <q-avatar
                      color="white"
                      icon="eva-play-circle-outline"
                      text-color="grey-10"
                      font-size="22px"
                    />
                  </template>

                  <b>Install Movie App?</b>

                  <template v-slot:action>
                    <q-btn
                      @click="installApp"
                      label="Yes"
                      class="q-px-sm"
                      dense
                      flat
                    />
                    <q-btn
                      @click="showAppInstallBanner = false"
                      label="Later"
                      class="q-px-sm"
                      dense
                      flat
                    />
                    <q-btn
                      @click="neverShowAppInstallBanner"
                      label="Never"
                      class="q-px-sm"
                      dense
                      flat
                    />
                  </template>
                </q-banner>
              </div>
            </div>
          </transition>
      <q-tabs class="text-grey-10  small-screen-only" active-color="primary" indicator-color="transparent"
      >
        <q-route-tab to="/movie-list" name="home" icon="eva-home-outline"  />
        <q-route-tab to="/movie-create" name="movie" icon="eva-plus-outline"  />
      </q-tabs>
    </q-footer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
let deferredPrompt;
export default {
  name: 'MainLayout',
  data () {
    return {
      showAppInstallBanner: false
    }
  },
  methods: {
    installApp() {
      // Hide the app provided install promotion
      this.showAppInstallBanner = false
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
          this.neverShowAppInstallBanner()
        } else {
          console.log('User dismissed the install prompt');
        }
      });
    },
    neverShowAppInstallBanner() {
      this.showAppInstallBanner = false
      this.$q.localStorage.set('neverShowAppInstallBanner', true)
    }
  },
  mounted() {
    let neverShowAppInstallBanner = this.$q.localStorage.getItem('neverShowAppInstallBanner')
    if (!neverShowAppInstallBanner) {
      window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI notify the user they can install the PWA
        setTimeout(() => {
          this.showAppInstallBanner = true
        }, 3000);
      });    
    }
  }  
}
</script>
