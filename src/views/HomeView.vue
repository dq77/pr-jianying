<script setup>
import { ref, onMounted } from 'vue'
  import { AVCanvas } from '@webav/av-canvas';
import topBanner from '../components/topBanner.vue'
import leftMenu from '../components/leftMenu.vue'
import contorlPanel from '../components/contorlPanel.vue'
import timeLine from '../components/timeLine.vue'
import { setScreenSize } from '../utils'
import { useWebavStore } from '../stores/webav'

const avCvs = ref(null)
const { setAvCvs } = useWebavStore()

onMounted(() => {
  const cvsElem = document.getElementById('screen')
  setScreenSize(cvsElem)
  avCvs.value = new AVCanvas(cvsElem, {
    bgColor: '#000',
    width: 720,
    height: 1280,
  });
  setAvCvs(avCvs)
})

</script>

<template>
  <topBanner/>
  <div class="main-content flx">
    <leftMenu></leftMenu>
    <div class="fl1 flx fdc">
      <div class="fl1 flx" style="border-bottom: 1px solid #000;">
        <div id="play-area">
          <div id="screen"></div>
        </div>
        <contorlPanel></contorlPanel>
      </div>
      <timeLine></timeLine>
    </div>
  </div>
</template>
<style lang="scss">
.flx{
  display: flex;
}
.fl1{
  flex: 1;
}
.fdc{
  flex-direction: column;
}
.main-content{
  height: calc(100vh - 80px);
  #play-area{
    flex: 1;
    #screen{
      margin: 0 auto;
    }
  }
}
</style>
