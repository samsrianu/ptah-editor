<template>
<section
    v-styler:section="$sectionData.mainStyle"
    :class="[$sectionData.mainStyle.classes, device.type]"
    :style="[$sectionData.mainStyle.styles, $sectionData.objVarsMedia]"
    class="b-gallery-carousel">

  <slot name="menu"/>
  <slot name="video"/>
  <slot name="overlay"/>

  <div class="">
    <sandbox
      container-path="$sectionData.container"
      components-path="$sectionData.components"
      class="b-sandbox">

      <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles" @start="drag('components')" @change="dragStop">
        <div v-for="(component, index) in $sectionData.components" v-if="$sectionData.components.length !== 0" :key="index">
          <component
            v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type, label: component.label }"
            :is="component.name"
            :href="$sectionData.components[index].element.link.href"
            :target="$sectionData.components[index].element.link.target"
            :style="$sectionData.components[index].element.styles"
            :class="[$sectionData.components[index].element.classes, $sectionData.components[index].class]"
            :path="`components[${index}].element`"
          >
            <div v-html="$sectionData.components[index].element.text"></div>
          </component>
        </div>
      </draggable>
    </sandbox>
  </div>

  <div class="b-grid">
    <!-- TODO: need drag&drop here -->
    <div class="b-grid__row" v-if="$sectionData.mainStyle.galleryImages.length < 1">
      <div class="b-empty-carousel">
        Add image in the settings section
      </div>
    </div>
    <div class="b-grid__row">
      <div :class="`b-grid__col-${$sectionData.mainStyle.swiper.frameWidth}`">
        <div
          :data-options="options"
          class="swiper-container b-gallery-carousel-body">

          <div class="swiper-wrapper b-gallery-carousel-body__items">
            <div
              v-for="(item, index) in $sectionData.mainStyle.galleryImages"
              :key="`slide-${index}-${_uid}`"
              :class="{ 'swiper-slide-active': index === 0 }"
              class="swiper-slide b-gallery-carousel-body-item">
              <!--<div :style="`background-image:url(${item.path})`" class="swiper-slide-item"></div>-->
              <img :src="item.path" class="swiper-slide-image" alt="">
            </div>
          </div>

          <!-- Navigation -->
          <div
            :style="{'color': $sectionData.mainStyle.swiper.navColor }"
            v-show="$sectionData.mainStyle.galleryImages.length > 1 && $sectionData.mainStyle.swiper.showNavigation"
            class="swiper-button-next">
            <icon-base name="galleryArrowRight" height="50"></icon-base>
          </div>
          <div
            :style="{'color': $sectionData.mainStyle.swiper.navColor }"
            v-show="$sectionData.mainStyle.galleryImages.length > 1 && $sectionData.mainStyle.swiper.showNavigation"
            class="swiper-button-prev">
            <icon-base name="galleryArrowLeft" height="50"></icon-base>
          </div>

          <!-- Pagination -->
          <v-style>
            .{{paginationClass}} span {
            background-color: {{$sectionData.mainStyle.swiper.paginationColor}};
            width: {{$sectionData.mainStyle.swiper.navSize}};
            height: {{$sectionData.mainStyle.swiper.navSize}};
            }
          </v-style>
          <div
            :class="paginationClass"
            v-show="$sectionData.mainStyle.galleryImages.length > 1 && $sectionData.mainStyle.swiper.showPagination"
            class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets">
            <span
              v-for="(_, index) in $sectionData.mainStyle.galleryImages"
              :key="`bullet-${index}-${_uid}`"
              :class="{ 'swiper-pagination-bullet-inactive': index !== 0 }"
              :aria-label="`Go to slide ${index + 1}`"
              class="swiper-pagination-bullet"
              tabindex="0"
              role="button">
            </span>
          </div>

        </div>
      </div>
    </div><!-- /_b-row -->
  </div><!-- /_b-grid -->

</section>
</template>

<script>
import * as types from '@editor/types'
import { merge } from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

import 'swiper/dist/css/swiper.min.css'
import swiperOptions from '@editor/swiper'

import { randomPoneId } from '../../../editor/util'

const GROUP_NAME = 'Galleries'
const NAME = 'Carousel'

const COMPONENTS = [
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-title',
    label: 'title'
  }
]

const C_CUSTOM = [
  {
    element: {
      text: '<b>Header</b>',
      styles: {
        'font-family': 'Montserrat',
        'font-size': '4.2rem',
        'color': '#ffffff',
        'padding-top': '32px',
        'padding-bottom': '16px'
      },
      media: {
        'is-mobile': {
          'font-size': '3.6rem'
        }
      }
    }
  }
]

const C_IMAGES = [
  {
    name: '1.jpg',
    path: 'https://gn913.cdn.stg.gamenet.ru/0/8dWmn/o_hDJWI.jpg'
  },
  {
    name: '2.jpg',
    path: 'https://gn285.cdn.stg.gamenet.ru/0/8dWne/o_1hyDuA.jpg'
  }
]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': 'url(https://gn870.cdn.stg.gamenet.ru/0/8coGJ/o_u02v0.jpg)',
      'background-position': '50% 50%',
      'background-size': 'cover'
    },
    swiper: {
      autoHeight: true,
      pagination: { el: swiperOptions.pagination },
      navigation: {
        nextEl: swiperOptions.next,
        prevEl: swiperOptions.prev
      },
      frameWidth: 12,
      paginationColor: '#F4BC64',
      navColor: '#F4BC64'
    },
    galleryImages: C_IMAGES
  },
  components: merge([], C_CUSTOM),
  container: {},
  edited: true
}

export default {
  name: NAME,
  group: GROUP_NAME,

  description: 'Fullscreen sliding gallery',

  mixins: [defaults, sectionMedia],

  cover: 'https://gn659.cdn.stg.gamenet.ru/0/8iyZR/o_1jkJaZ.jpg',

  $schema: {
    mainStyle: types.GallerySlider,
    container: types.StyleObject,
    components: COMPONENTS
  },

  inject: ['device'],

  data () {
    return {
      container: null,
      options: '',
      paginationClass: ''
    }
  },

  watch: {
    '$sectionData.mainStyle.swiper': {
      handler () {
        this.options = JSON.stringify(this.$sectionData.mainStyle.swiper)
      },
      deep: true
    }
  },

  methods: {

  },

  created () {
    if (this.$sectionData.edited === undefined) {
      Seeder.seed(merge(this.$sectionData, SCHEMA_CUSTOM))
    }

    this.paginationClass = `custom-bullets-${randomPoneId()}`

    this.options = JSON.stringify(this.$sectionData.mainStyle.swiper)
  }
}
</script>

<style lang="sass" scoped>
@import '../../../assets/sass/section-media.sass'

.swiper-slide-image
  max-width: 100%
.swiper-slide-item
  width: 100%
  height: 100%

  background-size: contain
  background-position: center
  background-repeat: no-repeat

.swiper-pagination
  width: 100%
  bottom: 2.5rem
  padding-left: 2.5rem
  &-bullet
    margin: 0 .4rem

.swiper-pagination-bullet
  opacity: 1
  &-inactive
    opacity: .35 !important
    background: black !important

.swiper-button-next,
.swiper-button-prev
  background-image: none

  svg
    width: 100%
    height: 100%

.b-empty-carousel
  border: 5px dashed rgba(0,0,0, .35)
  color: rgba(0,0,0, .35)
  font-size: 4.8rem
  font-weight: bold
  padding: 5rem 10rem
  width: 60vw
  background: rgba(255,255,255, .2)
</style>
