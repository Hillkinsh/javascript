<template>
  <div
    v-if='loadComplete'
    class="mod-hc"
  >
    <back-ground
      :shareObj='shareMsg'
      ref='background'
      :imgs='backgroundImgs'
    >
      <div>
        <page-info :coursePackageDetail='coursePackageDetail' />
        <div class="embedChoosebox">
          <pick-box
            :title='"点击按钮 选择年级"'
            :list='gradeData&&gradeData.classLevel'
            :select='gradeSelect'
            track='grade'
            :key="0"
            @choose='afterClickGradeBtn'
          />
        </div>
        <div>
          <content-box
            v-if='showContentBox'
            v-fixed
            @close='closeChoose'
          >
            <div class="bg">
              <pick-box
                :title='"点击按钮 选择年级"'
                :list='gradeData&&gradeData.classLevel'
                :select='gradeSelect'
                track='grade'
                :key="1"
                @choose='afterClickGradeBtn'
              />
              <pick-box
                :title='"请选择上课时间"'
                :list='showCourse'
                :select='select'
                track='course'
                type='2'
                :key="2"
                @choose='chooseCourse'
              />
              <div class="bottom-buybox">
                <button
                  @click="confirmFn"
                  v-if='select'
                  class="buyBtn"
                >立即报名</button>
                <button
                  v-else
                  class="disable"
                >立即报名</button>
              </div>
            </div>
          </content-box>
        </div>
      </div>
    </back-ground>
    <div class="buyBox">
      <buy-button
        :priceObj='priceObj'
        @showmodal='showModal'
      />
    </div>
  </div>
</template>
<script>
import BackGround from '@/components/common/Background.vue'
import BuyButton from '@/components/common/BuyButton.vue'
import PageInfo from '@/components/common/PageInfo.vue'
import PickBox from '@/components/common/PickBox/index.vue'
import ContentBox from '@/components/common/contentBox/index.vue'
import directives from '@/util/directives.js'
import * as api from '@/util/api.js'
import Chain from '@/util/dutyChain.js'
import wuliao from '@/views/packageDetails/configPage/Spuconfig.js' // 大包基本配置
import Track from '@beexiao/module-snippet/util/Track'
import tools from './tool.js'
import { experimentPromise } from '@/ABtest'
import { query } from '@beexiao/bee-util/wiget/router'
import {
  isActivityOver,
  hasBuyCourse,
  isCurrentcourseSelloutFn,
  getPrice,
  isExpose,
  handleTimes,
  isValidDifficult,
  selectFirst,
  toSuccesspage,
  clearCookieADparams,
  cookieADparams,
  handleOrderRes
} from '@/util/common-tools.js'
let tClick = Track.click('bees');
let tTrigger = Track.trigger('bees');

const handleState = { // 更改data值
  setContentBoxState (booltype) {
    this.showContentBox = Boolean(booltype)
  }
}
export default {
  data () {
    return {
      urlparams: {},
      scrollTop: 0,
      maxScroll: 0,
      startTime: 0,
      showContentBox: false,
      loadComplete: false,
      shareMsg: '',
      gradeData: {},
      gradeSelect: '',
      difficulty: '',
      backgroundImgs: null,
      courseArr: '',
      showCourse: '',
      select: '',
      adam: '',
      coursePackageId: this.getCoursePackageId(),
      coursePackageDetail: '',
      resourceUrl: '',
      courseId: '',
      bottomText: '', // 内嵌购买框的展示字段
      priceObj: {
        origin: 98,
        real: 9.8
      },
      userc: '',
      orderList: '',
      merlin_id: ''
    }
  },
  components: {
    BackGround,
    BuyButton,
    PageInfo,
    PickBox,
    ContentBox
  },
  directives,
  methods: {
    ...handleState,
    scrollFn () {
      this.scrollTop = document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      this.maxScroll = this.maxScroll > this.scrollTop
        ? this.maxScroll
        : this.scrollTop;
    },
    setLoadState (booltype) {
      this.loadComplete = booltype
    },
    closeChoose () {
      this.setContentBoxState(false)
    },
    getTagid (classLevel, gradeNum) {
      if (!classLevel) return ''
      let result = ''
      classLevel.some(item => {
        if (+item.id === +gradeNum) {
          result = item.tagId
          return true
        }
      })
      return result
    },
    afterClickGradeBtn (gradeNum) {
      if (!gradeNum) { // 没有年级信息，直接返回
        return
      }
      // 选中当前年级按钮
      let gradeTagid = this.getTagid(this.gradeData.classLevel, gradeNum)
      this.gradeSelect = gradeNum
      // 筛选寒假展示小包
      this.showCourse = this.courseArr.filter(item => {
        return item.grade == gradeTagid
      })
      // 选中第一个小包
      this.select = selectFirst(this.showCourse)
      // 唤起弹窗
      this.setContentBoxState(true)
    },
    chooseCourse (data) {
      this.select = data
    },
    getCoursePackageId () {
      return this.$route.path.replace(/^.*details?\/(\d+).*$/ig, '$1')
    },
    getResourceUrl () {
      // adam后台配置相关的图片等属性规则为:
      // toufang/bundle{bundleId}/version_number
      // i.e. toufang/bundle100225/1
      let base = `toufang/single${this.coursePackageId}/`;
      let version = location.pathname.split(`/details/${this.coursePackageId}/`)[1];
      this.resourceUrl = base + version;
    },
    getAdam () {
      this.getResourceUrl()
      return api.getAdam(this.resourceUrl)
        .then(res => {
          res = res.data
          let key = this.resourceUrl.split('/').join(':')
          this.adam = res[key]
          this.gradeData.classLevel = tools.handleList(this.adam.classLevel, 'grade')
          this.handleImgsAndABtest(this.adam)
          this.setUserc(this.adam.defaultUserc)
          this.difficulty = this.adam.difficulty || ''
          this.shareMsg = { ...this.adam.shareObj }
          return 'next'
        }).catch(err => {
          this.$Toast({ text: err.message })
        })
    },
    gradeSaleout () { // 根据默认年级返回默认选择
      let classLevel = this.gradeData.classLevel
      let result = []
      classLevel.forEach(item => {
        let isout = isCurrentcourseSelloutFn(this.courseArr, item)
        result.push({ ...item, isSellout: isout })
      })
      this.gradeData.classLevel = result

      // 售罄后，按照一定顺序选中年级
      this.selectGrade()
    },
    selectGrade () { // 选年级
      let classLevel = this.gradeData.classLevel
      let currentState
      for (let i = 1; i <= classLevel.length; i++) {
        currentState = isCurrentGradeout.call(this, classLevel, i)
        if (currentState) { // 当前售罄，找下一个
          continue
        } else { // 选中年级，跳出循环
          break;
        }
      }

      function isCurrentGradeout (classLevel, order) { // 当前顺序的已售罄
        let result = false
        classLevel.forEach(item => {
          if (item.order === order) {
            if (item.isSellout) {
              result = true
            } else {
              this.gradeSelect = item.id
            }
          }
        })
        return result
      }
    },

    getCoursePackage () {
      // 获取所有大包信息，处理相关逻辑
      // 如果有大包售罄，那么页面跳走

      return api.getSpuDetail(this.coursePackageId, false)
        .then(res => {
          // 是否下架
          isActivityOver([res])
          // 整理小包数据
          this.courseArr = this.createCourseData(res);
          // 售罄逻辑
          this.gradeSaleout();
          // 设置加载完成状态
          this.setLoadState(true)
          // 价格更新
          this.priceObj.origin = getPrice([res]).origin
          this.priceObj.real = getPrice([res]).real
          // 是否已购买
          let buyIdArr = hasBuyCourse([res])
          if (buyIdArr.length) {
            return 'next';
          }
        })
        .catch(err => this.$Toast({ text: err.message }))
    },
    createCourseData (res) { // 整理小包数据
      let result = []
      if (!res || !res.data) return result
      let times = res.data.data.times
      // 筛选曝光
      times = times.filter(item => isExpose(item))
      // 筛选难度
      if (this.difficulty) {
        times = times.filter(item => isValidDifficult(item, this.difficulty))
      }
      // 做数据的重构
      result = handleTimes(times)
      return result
    },
    getOrder () {
      return Promise.all([
        api.getOrder({ coursePackageId: this.coursePackageId, payStatus: 1 })
      ]).then(res => {
        let result = handleOrderRes(res);
        if (result && result.length) { // 有结果
          this.$Toast({ text: '您已购买该课程' });
          setTimeout(() => {
            toSuccesspage(result, this.successPath);
          }, 2000);
        }
      });
    },
    showModal () {
      this.afterClickGradeBtn(this.gradeSelect)
    },
    confirmFn () {
      tClick('to_settlement_page', '', _ => {
        // 如果有merlin_id则认为是需要abtest，
        // 没有则认为没有abtest，就不传该字段。
        return this.merlin_id
          ? { merlin_id: this.merlin_id }
          : {}
      })
      let skuId = [this.select]
      let grade = this.gradeSelect
      this.toBuyPage({ skuId, grade })
    },
    abtest (bPages, experimentId) {
      if (!bPages || !bPages.length) {
        throw Error('没有配置实验图片')
      }
      if (!experimentId) {
        throw Error('没有配置实验ID')
      }
      experimentPromise(experimentId)
        .then(res => {
          if (res.result !== 'Control') { // 走测试换图逻辑
            this.backgroundImgs = [...bPages]
          }
          // 拿cookieID: 实验ID + '_' + cookieId
          this.merlin_id = res['cookie_id']
          // 在实验确定AB之后，做一个trigger打点，为了便于后台统计
          tTrigger('page_ab', '', _ => {
            return { merlin_id: this.merlin_id }
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleImgsAndABtest (adam) {
      this.backgroundImgs = adam.backgroundUrls
      // AB实验
      // 由于本项目事实上只用在了投放英语100195和投放数学项目100200。
      // 因此，删除大包id的判断，刚好能满足所有的实验判断
      // 逻辑是从判断后台adam是否配置了bPages字段，
      // 如果没配置，则认为不做AB实验
      // 如果配置，则做ABtest
      if (adam.bPages && adam.experimentId) {
        this.abtest(adam.bPages || [], adam.experimentId)
      }
    },
    setUserc (defaultUserc) {
      this.userc = this.urlparams.userc || defaultUserc || ''
    },
    toBuyPage (obj) {
      let skuList = (obj && obj.skuId)
      let grade = obj && obj.grade
      let paramsStr = ''
      let query = {
        userc: this.userc,
        coursePackageId: this.coursePackageId, // 大包ID
        skuList: skuList, // 小包ID
        clickid: this.urlparams.clickid || '',
        'W-APP-ID': this.urlparams['W-APP-ID'] || '',
        'gdt_vid': this.urlparams['gdt_vid'] || this.urlparams['wx_traceid'] || ''
      }
      if (this.urlparams.usercc) {
        query.usercc = this.urlparams.usercc
      }
      if (grade) {
        query.grade = grade
      }
      for (let i in query) {
        if (query[i]) {
          paramsStr += '&' + i + '=' + query[i]
        }
      }
      this.$router.push('/settlebundle2' + '?' + paramsStr.slice(1))
    },
    listenLeavePage () {
      let endTime = new Date();
      let that = this;
      // 用户离开了当前页面
      if (document.visibilityState === 'hidden') {
        tTrigger('pageStay', '', _ => {
          return {
            scroll_top: that.scrollTop,
            max_scroll: that.maxScroll,
            page_interval: endTime - that.startTime
          };
        });
      }
    },
    init () {
      let chainGetAdam = new Chain(this.getAdam)
      let chainGetCoursePackage = new Chain(this.getCoursePackage) // 查大包
      let chainGetOrder = new Chain(this.getOrder) // 查订单

      chainGetAdam.setNextSuccessor(chainGetCoursePackage)
      chainGetCoursePackage.setNextSuccessor(chainGetOrder)
      chainGetAdam.passRequest()
    },
    handleParams (fullPath) {
      let url = decodeURIComponent(fullPath);
      let result = {};
      let paramsStr = url.split('?')[1];
      if (!paramsStr) return result;
      let paramsList = paramsStr.split('&');
      if (paramsList) {
        paramsList.forEach(item => {
          let [key, value] = item.split('=');
          if (value) {
            key = key.indexOf('amp;') !== -1 ? key.split('amp;')[1] : key;
            result[key] = value;
          }
        });
      }
      return result;
    },
    handleADparams () {
      let hasADparams = this.urlparams['clickid'] ||
        this.urlparams['W-APP-ID'] ||
        this.urlparams['gdt_vid']
      if (hasADparams) {
        cookieADparams(this.urlparams || {})
      } else {
        clearCookieADparams()
      }
    }
  },
  computed: {
    successPath () { // 页面配置跳转地址
      let result = '/market/addaddress'
      let coursePackageId = this.coursePackageId
      if (coursePackageId) {
        result = wuliao.data[coursePackageId].successPath || result
      }
      return result
    }
  },
  created () {
    this.startTime = new Date(); // 进入页面的时刻
    this.urlparams = this.handleParams(location.href); // 参数解析
    this.handleADparams()
    this.init()
  },
  mounted () {
    window.addEventListener('scroll', this.scrollFn);
    document.addEventListener('visibilitychange', this.listenLeavePage)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.scrollFn);
    document.removeEventListener('visibilitychange', this.listenLeavePage);
  }

}

http://localhost:8080/mobile/coursedetail/mathdetail100183
? coursePackageId = 100183 & amp % 3Buserc = sxlx_dx0809 & amp % 3Busercc = cjd & amp % 3Bfrom = singlemessage & amp % 3Bisappinstalled = 0 & amp % 3BcourseId = 1020
</script>
<style lang="less" scoped>
.bg {
  background: #fff;
}
.mod-hc {
  position: relative;
  background: #ffd981;
}
.bottom-buybox {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 110px;
  background: #fff;
  box-sizing: border-box;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: center;
  align-items: center;
  box-shadow: 0px -4px 12px 0px rgba(0, 0, 0, 0.08);
  z-index: 3;
  .buyBtn {
    width: 692px;
    height: 80px;
    background: linear-gradient(
      270deg,
      rgba(255, 142, 0, 1) 0%,
      rgba(255, 80, 0, 1) 100%
    );
    border-radius: 44px;
    font-size: 30px;
    font-weight: 400;
    color: #fff;
  }
  .disable {
    width: 692px;
    height: 80px;
    border-radius: 40px;
    font-size: 30px;
    color: #fff;
    background: #d8d1b5;
    font-size: 30px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 50px;
    box-shadow: 0px -4px 12px 0px rgba(0, 0, 0, 0.08);
  }
}
.embedChoosebox {
  position: absolute;
  top: 768px;
  /deep/ .pick_box {
    width: 710px;
    margin: 0 20px;
    padding: 1px 0;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 6px 24px 0px rgba(246, 119, 9, 0.36);
    border-radius: 24px;
    .title {
      position: relative;
      text-align: center;
      z-index: 1;
      font-size: 36px;
      font-weight: 600;
      color: rgba(70, 68, 71, 1);
      line-height: 50px;
      margin: 22px auto;
      &::before {
        position: absolute;
        box-sizing: border-box;
        width: 380px;
        z-index: -1;
        bottom: 0;
        left: 165px;
        content: "";
        height: 17px;
        background: rgba(255, 224, 203, 1);
      }
    }
    .list {
      padding: 0 26px;
      box-sizing: border-box;
      display: flex;
      -webkit-flex-wrap: wrap;
      flex-wrap: wrap;
      -webkit-justify-content: space-between;
      justify-content: space-between;
      display: -webkit-flex;
      .classitem {
        width: 206px;
        height: 72px;
        background: rgba(255, 246, 238, 1);
        border: 2px solid rgba(255, 102, 0, 1);
        border-radius: 8px;
        font-size: 26px;
        font-weight: 600;
        color: rgba(255, 102, 0, 1);
        line-height: 72px;
        margin: 0 0 24px 0;
        text-align: center;
        box-sizing: border-box;
      }
      .chooseStyle {
        width: 206px;
        height: 72px;
        background: linear-gradient(
          270deg,
          rgba(252, 137, 52, 1) 0%,
          rgba(255, 97, 38, 1) 100%
        );
        border: 2px solid
          linear-gradient(
            270deg,
            rgba(252, 137, 52, 1) 0%,
            rgba(255, 97, 38, 1) 100%
          );
        border-radius: 8px;
        font-size: 26px;
        font-weight: 600;
        color: #fff;
        line-height: 72px;
        margin: 0 0 24px 0;
        box-sizing: border-box;
      }
      .saleoutGradeStyle {
        background: rgba(238, 238, 238, 1);
        color: rgba(164, 164, 163, 1);
        line-height: 33px;
        padding-top: 8px;
        box-sizing: border-box;
        border: 0;
      }
    }
  }
}

.buyBox {
  /deep/ .summer-buycon {
    height: 110px;
    position: fixed;
    z-index: 1;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    box-sizing: border-box;
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: space-around;
    justify-content: space-around;
    -webkit-align-items: center;
    align-items: center;
    box-shadow: 0px -3px 10px 0px rgba(0, 0, 0, 0.08);
    padding: 0 30px;
    box-sizing: border-box;
    .left {
      .number {
        font-size: 66px;
        font-weight: 600;
        color: rgba(255, 102, 0, 1);
        line-height: 79px;
        margin: 0 10px 0 0;
        .dola {
          font-size: 45px;
          font-weight: 600;
          color: rgba(255, 102, 0, 1);
          line-height: 63px;
          // color: green;
        }
      }
    }
    .buyBtn {
      width: 260px;
      height: 80px;
      background: linear-gradient(
        270deg,
        rgba(255, 142, 0, 1) 0%,
        rgba(255, 80, 0, 1) 100%
      );
      border-radius: 44px;
      font-size: 30px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 80px;
    }
  }
}
</style>
