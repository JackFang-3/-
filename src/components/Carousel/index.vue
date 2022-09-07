<template>
  <div class="swiper-container" id="mySwiper">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="carousel in list"
              :key="carousel.id"
            >
              <img :src="carousel.imgUrl" />
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>

          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
</template>

<script>
import Swiper from "swiper";
export default {
    name:'Carousel',
    props:['list'],
    watch: {
    list: {
      // 上来就监听一次
    //   为什莫监听不到list，因为这个数据从来都没有变化，是父组件传递过来的
      immediate: true,
      handler(newValue, oldValue) {
        //   只能监听到数据已经有了，但是v-for不确定，页面是否完成渲染
        this.$nextTick(()=>{

            var mySwiper = new Swiper(".swiper-container", {
              loop: true, // 循环模式选项
              // 如果需要分页器
              pagination: {
                el: ".swiper-pagination",
                // 小球可以点
                clickable: true,
              },
              // 如果需要前进后退按钮
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
            });
        })
      },
    },
  },
}
</script>

<style>

</style>