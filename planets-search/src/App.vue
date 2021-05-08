<template>
  <div id="app">
    <div class="search-container">
      <a-input-search placeholder="input search text" enter-button v-model="searchText" @search="onSearch" />
    </div>
    <div class="filter-list-container">
      <div class="filter-list-container-filter">
        <div>
           <div class="filter-heading">
            Color
          </div>
          <a-checkbox-group
            v-model="colorValue"
            name="colorCheckboxgroup"
            :options="colorFilterList"
            @change="onColorChange"
          />
        </div>
        <div class="shapes-filter-container">
          <div class="filter-heading">
            Shape
          </div>
          <a-checkbox-group
            v-model="shapeValue"
            name="shapeCheckboxgroup"
            :options="shapeFilterList"
            @change="onshapeChange"
          />
        </div>
        <div class="shapes-filter-container">
          <div class="filter-heading">
            Size
          </div>
          <a-checkbox-group
            v-model="sizeValue"
            name="sizeCheckboxgroup"
            :options="sizeFilterList"
            @change="onSizeChange"
          />
        </div>
      </div>
      <div class="filter-list-container-list">
        <div v-for="(planet, index) in planetList" :key="index" class="filter-list-container-list-box">
          <div class="filter-list-container-list-box-name">
            {{planet.name}}
          </div>
          <div class="filter-list-container-list-box-desc">
            {{getSubText(planet)}}
          </div>
          <div class="seperator"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      searchText: '',
      colorValue: [],
      colorFilterList: [],
      shapeValue: [],
      shapeFilterList: [],
      sizeValue: [],
      sizeFilterList: []
    }
  },
  mounted () {
    if (this.$route.query.q !== undefined && this.$route.query.q.length) {
      this.searchText = this.$route.query.q
    }
    if (this.$route.query.color !== undefined && this.$route.query.color.length > 0) {
      this.$route.query.color.split('$$').forEach(item => {
        this.colorValue.push(item)
      })
    }
     if (this.$route.query.shape !== undefined && this.$route.query.shape.length > 0) {
      this.$route.query.shape.split('$$').forEach(item => {
        this.shapeValue.push(item)
      })
    }
     if (this.$route.query.size !== undefined && this.$route.query.size.length > 0) {
      this.$route.query.size.split('$$').forEach(item => {
        this.sizeValue.push(item)
      })
    }
    this.callPlanetList()
  },
  computed: {
    ...mapGetters({
      planetList: 'getPlanetList',
      shapesList: 'getShapesList',
      colorsList: 'getColorsList',
      sizesList: 'getSizesList'
    })
  },
  watch: {
    colorsList: function(v) {
      this.colorFilterList = []
      v.forEach((item) => {
        this.colorFilterList.push({
          label: item.name,
          value: item.id
        })
      })
    },
    shapesList: function(v) {
      this.shapeFilterList = []
      v.forEach((item) => {
        this.shapeFilterList.push({
          label: item.name,
          value: item.id
        })
      })
    },
    sizesList: function(v) {
      this.sizeFilterList = []
      v.forEach((item) => {
        this.sizeFilterList.push({
          label: item.name,
          value: item.id
        })
      })
    }
  },
  methods: {
    onSearch () {
      this.$router.replace({
        query: {
          q: this.searchText,
          color: this.colorValue.join('$$'),
          shape: this.shapeValue.join('$$'),
          size: this.sizeValue.join('$$')
        }
      })
      this.callPlanetList()
    },
    getSubText (planet) {
      let selectedShape = ''
      let selectedColor = ''
      this.shapesList.forEach((shape) => {
        if (shape.id === planet.shape) {
          selectedShape = shape.name
        }
      })
      this.colorsList.forEach((color) => {
        if (color.id === planet.color) {
          selectedColor = color.name
        }
      })
      return `${planet.name} have ${selectedColor} color and ${selectedShape} shape`
    },
    onColorChange () {
      this.$router.replace({
        query: {
          q: this.searchText,
          color: this.colorValue.join('$$'),
          shape: this.shapeValue.join('$$'),
          size: this.sizeValue.join('$$')
        }
      })
      this.callPlanetList()
    },
    onshapeChange () {
      console.log('nsjn', this.shapeValue)
      this.$router.replace({
        query: {
          q: this.searchText,
          color: this.colorValue.join('$$'),
          shape: this.shapeValue.join('$$'),
          size: this.sizeValue.join('$$')
        }
      })
      this.callPlanetList()
    },
    onSizeChange () {
      console.log('nsjn', this.sizeValue)
      this.$router.replace({
        query: {
          q: this.searchText,
          color: this.colorValue.join('$$'),
          shape: this.shapeValue.join('$$'),
          size: this.sizeValue.join('$$')
        }
      })
      this.callPlanetList()
    },
    commonApis () {
      this.$store.dispatch('GET_SHAPES')
      this.$store.dispatch('GET_COLORS')
      this.$store.dispatch('GET_SIZES')
    },
    callPlanetList () {
      let params = {}
      if (this.$route.query.q !== undefined && this.$route.query.q.length > 0 ) {
        params.q = this.$route.query.q
      }
      if (this.$route.query.color !== undefined && this.$route.query.color.length > 0) {
        params.color = this.$route.query.color
      }
      if (this.$route.query.shape !== undefined && this.$route.query.shape.length > 0) {
        params.shape = this.$route.query.shape
      }
      if (this.$route.query.size !== undefined && this.$route.query.size.length > 0) {
        params.size = this.$route.query.size
      }
      this.$store.dispatch('GET_PLANETS_LIST', {
        success: this.planetsListSuccess,
        params: params
      })
    },
    planetsListSuccess (response) {
      console.log('success', response)
      this.commonApis()
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-left: 60px;
  margin-right: 60px;
}
.filter-list-container {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  margin-top: 40px;
  &-filter {
    height: 100%;
    width: 15%;
    @media only screen and (max-width: 600px) {
      display: none;
    }
  }
  &-list {
    overflow-y: scroll;
    border-left: 1px solid rgba(118,116,119, 0.4);
    height: calc(100vh - 180px);
    width: 85%;
    @media only screen and (max-width: 600px) {
      width: 100%;
    }
    &-box {
      text-align: left;
      margin-left: 30px;
      padding-left: 10px;
      padding-top: 20px;
      // margin-bottom: 40px;
      border-radius: 8px;
      &:hover {
        background: rgba(233, 233, 233, 0.4);
      }
      &-name {
        font-weight: 600;
      }
      &-desc {
        color: #767477;
      }
    }
  }
}
.seperator {
  height: 1px;
  width: 100%;
  background: #767477;
  opacity: 0.4;
  margin-top: 14px;
}
.ant-checkbox-group {
  text-align: left;
  display: flex !important;
  flex-direction: column !important;
}
.ant-checkbox-group-item {
  font-weight: 600;
  margin-right: 0px !important;
}
.filter-heading {
  text-align: left;
  font-weight: 600;
  font-size: 15px;
}
.shapes-filter-container {
  margin-top: 20px;
}
</style>
