<template>
  <section class="swiper-banner_wrapper">
    <van-swipe :autoplay="3000">
      <van-swipe-item
        v-for="(image, idx) in bannerImg"
        :key="idx"
      >
        <img :src="image">
      </van-swipe-item>
      <div class="custom-indicator" slot="indicator"></div>
    </van-swipe>
  </section>
</template>

<script>
import { indexBannerData } from "@/api/common";
export default {
  name: "SwiperBanner",
  data() {
    return {
      // 轮播图数据存放数组。
      bannerImg: []
    }
  },
  methods: {
    // 获取轮播图数据。
    async getIndexBannerData() {
      let res = await indexBannerData();
      this.bannerImg = res.data;
    }
  },
  mounted() {
    this.getIndexBannerData();
  }
}
</script>

<style lang="scss" scoped>
.swiper-banner_wrapper {
  width: 100%;
  height: 170px;
  .van-swipe {
    width: 100%;
    height: 100%;
    .van-swipe-item {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
