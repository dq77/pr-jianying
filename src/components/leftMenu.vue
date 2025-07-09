<script setup>
import { ref } from 'vue'
import { loadFile, calculateScaledSize } from '../utils'
import { useWebavStore } from '../stores/webav'
import { AudioClip, ImgClip, MP4Clip, VisibleSprite, renderTxt2ImgBitmap } from '@webav/av-cliper';

const webavStore = useWebavStore()
const actvType = ref(1)
const changeType = (newType) => {
  actvType.value = newType
}
const uploadVideo = async () => {
  const file = await loadFile({ 'video/*': ['.mp4', '.mov'] })
  const stream = file.stream()
  const clip = new MP4Clip(stream);
  const videoMeta = await clip.ready
  const { w, h, x, y } = calculateScaledSize(videoMeta)
  const spr = new VisibleSprite(clip);
  spr.rect.x=x
  spr.rect.y=y
  spr.rect.w=w
  spr.rect.h=h
  await webavStore.avCvs.value.addSprite(spr);
}

</script>
<template>
  <div class="left-menu">
    <div class="total-type">
      <div :class="`total-type-item video ac${actvType}`" @click="changeType(1)">
        视频
      </div>
      <div :class="`total-type-item audio ac${actvType}`" @click="changeType(2)">
        音频
      </div>
      <div :class="`total-type-item pic ac${actvType}`" @click="changeType(3)">
        图片
      </div>
      <div :class="`total-type-item text ac${actvType}`" @click="changeType(4)">
        文字
      </div>
    </div>
    <div class="detail-type-panel">
      <button v-if="actvType === 1" class="upload-btn" @click="uploadVideo">上传视频</button>
      <button v-if="actvType === 2" class="upload-btn">上传音频</button>
      <button v-if="actvType === 3" class="upload-btn">上传图片</button>
      <button v-if="actvType === 4" class="upload-btn">上传文字</button>
    </div>
  </div>
</template>
<style lang="scss">
.left-menu{
  width: 400px;
  border-right: 1px solid #000;
  display: flex;
  .total-type{
    width: 80px;
    border-right: 1px solid #000;
    .total-type-item{
      height: 80px;
      line-height: 80px;
      text-align: center;
      color: #aaa;
      cursor: pointer;
      &:hover,&.video.ac1,&.audio.ac2,&.pic.ac3,&.text.ac4{
        color: rgb(228, 228, 231);
      }
    }
  }
  .detail-type-panel{
    flex: 1;
    padding: 10px;
    .upload-btn{
      width: 100%;
      padding: 10px;
      background-color: rgb(228, 228, 231);
      border: 1px solid rgb(228, 228, 231);
      border-radius: 4px;
    }
  }
}
</style>
