const { judgeAppVersion } = require("../../methods/public_method");
getUserInfo
const TESTAPPID = "wx022231ad19f6f2d9"; // 给环境http://m.test.s.tianyancha.cn/配置的appid。
const ONLINEAPPID = "wxf52eec8aa7e300cb"; // 线上的appid。
const TESTREDICTURL = "http://m.test.s.tianyancha.cn/vip_package"; // 测试环境跳转url
const ONLINEREDICTURL = "https://m.tianyancha.com/vip_package"; // 线上环境跳转url

let obj = {
  mobile: 15771910973,
  state: 7,
  vipManager: true,
  newUser: false,
  vip: true
}

// 当前请求的是不是测试环境
function isTestContext(ctx = {}) {
  return (
    ctx &&
    ctx.request &&
    ctx.request.header &&
    ctx.request.header.host !== "m.test.s.tianyancha.cn"
  );
}
module.exports = (app) => {
  class VipIntroController extends app.Controller {
    async index() {
      const discountTime = await this.service.h5.getDiscountTime();
      let vipPrice = await this.ctx.service.h5.getVipRenewPrice("0");
      if (vipPrice.state === "ok") {
        vipPrice = vipPrice.data;
      }
      let vipPriceList = [];
      if (vipPrice.vipPrice) {
        vipPrice.vipPrice.sort((a, b) =>
          parseInt(a.time) > parseInt(b.time) ? -1 : 1
        );
        vipPriceList = vipPrice.vipPrice;
      }

      await this.ctx.renderH5("h5/vipintro/index.ejs", {
        dataMain: "app_route/vipintro",
        cssMain: "vipintro",
        discountTime,
        vipPriceList,
        needLogin: false,
        vipText: "成为VIP",
      });
    }

    async renew() {
      const userInfo = await this.service.user.getAppUserInfo();
      // const userInfo = await this.ctx.service.user.getUserInfo(this.ctx.getMobile());
      let vipPrice = await this.ctx.service.h5.getVipRenewPrice("0");
      if (vipPrice.state === "ok") {
        vipPrice = vipPrice.data;
      }
      let vipPriceList = [];
      let countdown = null;
      if (vipPrice.vipPrice) {
        vipPrice.vipPrice.sort((a, b) =>
          parseInt(a.time) > parseInt(b.time) ? -1 : 1
        );
        vipPriceList = vipPrice.vipPrice;
      }
      let needLogin = false;
      let vipText = "成为VIP";
      if (userInfo.state === "ok" && userInfo.data) {
        if (
          parseInt(userInfo.data.state) >= 3 ||
          parseInt(userInfo.state) === 1 ||
          parseInt(userInfo.isExpired) > 0
        ) {
          vipText = "续费VIP";
          countdown = await this.service.h5.getDiscountTimeV4();
        }
        if (userInfo.data.renewal === "1") {
          const useReport = await this.ctx.service.user.getUseReport();
          let title = "续费VIP";
          if (
            useReport.state === "ok" &&
            useReport.data &&
            useReport.data.summaryList &&
            useReport.data.summaryList.length
          ) {
            title = "VIP使用报告";
          }
          await this.ctx.renderH5("h5/vipintro/renew.ejs", {
            userInfo,
            useReport,
            dataMain: "app_route/viprenew",
            cssMain: "vipintro  viprenew",
            vipPriceList,
            discountTime: "",
            seo: {
              title,
              description: "VIP使用报告",
            },
            vipText,
            countdown,
          });
          return;
        }
      } else {
        needLogin = true;
      }

      // const discountTime = await this.service.h5.getDiscountTime();
      const discountTime = await this.service.h5.getDiscountTimeNew();
      await this.ctx.renderH5("h5/vipintro/index.ejs", {
        dataMain: "app_route/vipintro",
        cssMain: "",
        discountTime,
        vipPriceList,
        needLogin,
        seo: {
          title: "VIP会员",
          description: "VIP会员",
        },
        vipText,
      });
    }

    async newrenew() {
      const userInfo = await this.service.user.getAppUserInfo();
      let vipPrice = await this.ctx.service.h5.getVipRenewPricePersonal("0");
      if (vipPrice.state === "ok") {
        vipPrice = vipPrice.data;
      }
      let vipPriceList = [];
      let countdown = null;
      if (vipPrice.vipPrice) {
        vipPrice.vipPrice.sort((a, b) =>
          parseInt(a.time) > parseInt(b.time) ? -1 : 1
        );
        vipPriceList = vipPrice.vipPrice;
      }
      let needLogin = false;
      let vipText = "成为VIP";
      let limitTimeInfo = null;
      if (userInfo.state === "ok" && userInfo.data) {
        limitTimeInfo = await this.service.h5.getLimitedTimeRPGetAward();
        if (
          parseInt(userInfo.data.state) >= 3 ||
          parseInt(userInfo.state) === 1 ||
          parseInt(userInfo.isExpired) > 0
        ) {
          vipText = "续费VIP";
          countdown = await this.service.h5.getDiscountTimeV4();
        }
        if (userInfo.data.renewal === "1") {
          const useReport = await this.ctx.service.user.getUseReport();
          let title = "续费VIP";
          if (
            useReport.state === "ok" &&
            useReport.data &&
            useReport.data.summaryList &&
            useReport.data.summaryList.length
          ) {
            title = "VIP使用报告";
          }
          await this.ctx.renderH5("h5/vipintro/renew.ejs", {
            userInfo,
            useReport,
            dataMain: "app_route/viprenew",
            cssMain: "vipintro  viprenew",
            vipPriceList,
            discountTime: "",
            seo: {
              title,
              description: "VIP使用报告",
            },
            vipText,
          });
          return;
        }
      } else {
        needLogin = true;
      }
      // const discountTime = await this.service.h5.getDiscountTime();
      const discountTime = await this.service.h5.getDiscountTimeNew();
      await this.ctx.renderH5("h5/vipintro/vipindex.ejs", {
        dataMain: "app_route/newvipIntro",
        cssMain: "newvipintro",
        discountTime,
        vipPriceList,
        needLogin,
        limitTimeInfo,
        seo: {
          title: "VIP会员",
          description: "VIP会员",
        },
        vipText,
        countdown,
      });
    }

    async getDiscount() {
      const res = await this.service.faster.getDiscountTime();
      if (res.state === "ok") {
        this.ctx.res_ok(res.data);
      } else {
        this.ctx.res_warn(res.message);
      }
    }

    async popup() {
      const useReport = await this.ctx.service.user.getUseReport();

      await this.ctx.renderH5("h5/vipintro/popup.ejs", {
        useReport,
        dataMain: "route/common",
        cssMain: "viprenew",
      });
    }

    async sms() {
      if (!this.ctx.isTYCClient()) {
        await this.ctx.setThirdPartMagic(["openinstall"]);
      }
      await this.ctx.renderH5("h5/vipintro/sms.ejs", {
        dataMain: "app_route/vipsms",
        cssMain: "vipintro",
      });
    }

    async company_package() {
      await this.ctx.renderH5("h5/vipintro/company_package.ejs", {
        dataMain: "app_route/company_package",
        cssMain: "",
        seo: {
          title: "企业批量采购",
          description: "企业批量采购",
        },
      });
    }

    async checkAppVersion(version) {
      if (version) {
        version = version.toLowerCase().trim();
        const appversion = version.replace("ios", "").replace("android", "");
        const spVersion = appversion.split(".");
        const v0 = parseInt(spVersion[0]);
        const v1 = parseInt(spVersion[1]);
        if (v0 < 12) {
          return false;
        }
        if (v0 === 12 && v1 < 7) {
          return false;
        }
        return true;
      }
      return true;
    }

    async checkDisplayOfPayWay() {
      const { appChannel = "" } = this.ctx.query;
      if (appChannel && (appChannel == "SO_MIUI" || appChannel == "SO_OPPO")) {
        return {
          isShowPayWay: false,
        };
      }

      return {
        isShowPayWay: true,
      };
    }

    // 新版 vip 购买页
    async vipBranch() {
      const userInfo = await this.service.user.getAppUserInfo();
      let vipPriceInfo = await this.service.h5.getVipPriceListV2();
      if (vipPriceInfo.state === "ok") {
        vipPriceInfo = vipPriceInfo.data;
      }

      let vipPriceList = [];
      let countdown = null;
      if (vipPriceInfo.vipPrice) {
        vipPriceInfo.vipPrice.sort((a, b) =>
          parseInt(a.year) > parseInt(b.year) ? 1 : -1
        );
        vipPriceList = vipPriceInfo.vipPrice;
      }

      let system = "";
      try {
        system = this.ctx.header.version.split(" ")[0].toLowerCase();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }

      let needLogin = false;
      let vipText = "开通VIP";

      if (userInfo.state === "ok" && userInfo.data) {
        if (
          parseInt(userInfo.data.state) >= 3 ||
          parseInt(userInfo.state) === 1 ||
          parseInt(userInfo.isExpired) > 0
        ) {
          vipText = "续费VIP";
          countdown = await this.service.h5.getDiscountTimeV4();
        }

        // 续费VIP 买一送一活动 很久不上了 保留逻辑 以防后期又上线了
        if (userInfo.data.renewal === "1") {
          const useReport = await this.ctx.service.user.getUseReport();
          let title = "续费VIP";
          if (
            useReport.state === "ok" &&
            useReport.data &&
            useReport.data.summaryList &&
            useReport.data.summaryList.length
          ) {
            title = "VIP使用报告";
          }
          await this.ctx.renderH5("h5/vipintro/renew.ejs", {
            userInfo,
            useReport,
            dataMain: "app_route/viprenew",
            cssMain: "vipintro  viprenew",
            vipPriceList,
            discountTime: "",
            seo: {
              title,
              description: "VIP使用报告",
            },
            vipText,
          });
          return;
        }
      } else {
        needLogin = true;
      }
      // const discountTime = await this.service.h5.getDiscountTimeNew();
      await this.ctx.renderH5("h5/vipintro/buy_vip_branch.ejs", {
        dataMain: "app_route/buy_vip_branch",
        // discountTime,
        vipPriceInfo,
        vipPriceList,
        needLogin,
        seo: {
          title: "个人会员",
          description: "个人会员",
        },
        system,
        vipText,
        countdown,
        ...(await this.checkDisplayOfPayWay()),
      });
    }

    // 服务号 vip 购买页
    async vipBranchService() {
      const { code } = this.ctx.query;

      const userInfo = await this.service.user.getAllUserInfo();
      let vipText = "成为VIP";
      if (
        userInfo &&
        userInfo.state &&
        userInfo.state === "ok" &&
        userInfo.data
      ) {
        if (
          parseInt(userInfo.data.state) >= 3 ||
          parseInt(userInfo.state) === 1 ||
          parseInt(userInfo.isExpired) > 0
        ) {
          vipText = "续费VIP";
        }
      }

      let vipPriceInfo = await this.service.h5.getVipPriceListV2();
      if (vipPriceInfo.state === "ok") {
        vipPriceInfo = vipPriceInfo.data;
      }
      let vipPriceList = [];
      if (vipPriceInfo.vipPrice) {
        vipPriceInfo.vipPrice.sort((a, b) =>
          parseInt(a.year) > parseInt(b.year) ? -1 : 1
        );
        vipPriceList = vipPriceInfo.vipPrice;
      }

      // 获取openID
      let openId = 0;
      try {
        const res = await this.ctx.service.h5.getServiceOpenId(code);
        openId = res.data;
      } catch (e) {
        this.ctx.logger.info(`code is : ${code}, error: ${e}`);
      }

      await this.ctx.renderH5("h5/vipintro/service_vip_branch.ejs", {
        dataMain: "app_route/service_vip_branch",
        vipPriceInfo,
        vipPriceList,
        vipText,
        seo: {
          title: "VIP会员开通",
          description: "VIP会员开通",
        },
        openId,
      });
    }

    // 服务号购买VIP成功回调页
    async serviceSuccess() {
      await this.ctx.setThirdPartMagic(["openinstall"]);
      await this.ctx.renderH5("h5/vipintro/service_vip_success.ejs", {
        dataMain: "app_route/service_vip_success",
        seo: {
          title: "提交成功",
          description: "提交成功",
        },
      });
    }

    // 验证企业vip业务码是否有效
    async vipVerifyEnterpriseServerCode() {
      const { inviteCode, num, type } = this.ctx.query;
      this.ctx.body = await this.ctx.service.h5.vipPriceEnterprise({
        inviteCode,
        num,
        type,
      });
    }

    // 创建企业套餐订单
    async vipEnterpriseCreateOrder() {
      const { inviteCode, num, type } = this.ctx.query;
      this.ctx.body = await this.ctx.service.h5.vipCreateEnterpriseOrder({
        inviteCode,
        num,
        type,
      });
    }

    // 创建企业套餐续费订单
    async renewalsVipBussinessOrder() {
      const { inviteCode, mealIds, type } = this.ctx.query;
      this.ctx.body = await this.ctx.service.h5.renewalsVipBussinessOrder({
        inviteCode,
        mealIds,
        type,
      });
    }

    // 验证vip业务码是否有效
    async vipVerifyServerCode() {
      const { code, couponCode } = this.ctx.query;
      this.ctx.body = await this.ctx.service.h5.getVipPriceListV2({
        inviteCode: code,
        couponCode,
      });
    }

    // 验证vip业务码是否有效 20210124
    async verifyVipServerCode() {
      const { code, couponCode } = this.ctx.query;
      this.ctx.body = await this.ctx.service.h5.getVipPriceListV2({
        inviteCode: code,
        couponCode,
      });
    }

    // 验证vip业务码是否有效
    async vipCreateOrder() {
      const {
        state,
        inviteCode,
        targetMobile,
        favour,
        couponCode,
        priceType,
      } = this.ctx.query;
      this.ctx.body = await this.ctx.service.h5.vipCreateOrder(
        state,
        inviteCode,
        targetMobile,
        favour,
        couponCode,
        priceType
      );
    }

    // 新版企业认证套餐
    async companyPackageBranch() {
      let { version } = this.ctx.headers;
      // vip会员页权益是否显示27项权益
      let isUseNew = false;
      if (version) {
        // 12.17 以后版本显示27项权益
        version = version
          .toLowerCase()
          .replace("ios", "")
          .replace("android", "")
          .trim();
        const vNum = version.split(".");
        if (vNum[0] * 1 > 12 || (vNum[0] * 1 == 12 && vNum[1] * 1 > 17)) {
          isUseNew = true;
        }
      }
      const userInfo = await this.service.user.getAppUserInfo();
      let isLogin;
      let minUserAction = 10;
      if (userInfo.state === "ok" && userInfo.data) {
        isLogin = true;
        // 判断是否是续费VIP
        if (String(userInfo.data.vipManager) === "1") {
          minUserAction = 5;
        }
      }
      const vipBusinessPriceObj = await this.ctx.service.user.getBusinessVipPrice();
      const vipBusinessPrice = vipBusinessPriceObj.unitPrice / 100;
      const vipOrignalPrice = vipBusinessPriceObj.orignalPrice / 100;
      const vipBusinessDiscount = vipOrignalPrice - vipBusinessPrice;
      const bussinessuseraction = minUserAction;

      // console.log(userInfo, 'userinfo');
      await this.ctx.renderH5("h5/vipintro/company_package_branch.ejs", {
        dataMain: "app_route/company_package_branch",
        cssMain: "",
        isLogin,
        bussinessuseraction,
        minUserAction,
        vipBusinessPrice,
        vipBusinessDiscount,
        isUseNew,
        seo: {
          title: "企业批量采购",
          description: "企业批量采购",
        },
      });
    }

    // 12.7.0 以后的新版企业套餐
    async getNewCompanyPackage(userInfo) {
      let isLogin;
      let minUserAction = 10;
      let vipMealList = [];
      const selectVipMealList = [];
      if (userInfo.state === "ok" && userInfo.data) {
        isLogin = true;
        // 判断是否是续费VIP
        if (String(userInfo.data.vipManager) === "1") {
          minUserAction = 5;
        }
      }
      // 现价
      let vipBusinessPrice = 0;
      // 原价
      let vipOrignalPrice = 0;
      // 节省价钱
      let vipBusinessDiscount = 0;
      // 套餐类型
      let vipBusinessType = "";
      // 套餐最少人数
      const bussinessuseraction = minUserAction;

      try {
        vipMealList = await this.ctx.service.user.getVipMeal();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }

      if (vipMealList && vipMealList.length) {
        vipMealList.forEach((item) => {
          if (item.select) {
            selectVipMealList.push(item);
          }
        });
      }
      if (selectVipMealList && selectVipMealList.length) {
        const obj = selectVipMealList[0];
        vipBusinessPrice = obj.price / 100;
        vipOrignalPrice = obj.originalPrice / 100;
        vipBusinessDiscount = vipOrignalPrice - vipBusinessPrice;
        vipBusinessType = obj.type;
      }

      return {
        isLogin,
        bussinessuseraction,
        minUserAction,
        vipBusinessPrice,
        vipBusinessDiscount,
        vipOrignalPrice,
        vipMealList,
        vipBusinessType,
      };
    }

    async newCompanyPackage() {
      // 从app个人中心点击企业套餐续费进来的参数
      const { mealId, allCount } = this.ctx.query;
      const userInfo = await this.service.user.getAppUserInfo();
      const vipObj = await this.getNewCompanyPackage(userInfo);
      let { version } = this.ctx.headers;
      // vip会员页权益是否显示27项权益
      let isUseNew = false;
      if (version) {
        // 12.17 以后版本显示27项权益
        version = version
          .toLowerCase()
          .replace("ios", "")
          .replace("android", "")
          .trim();
        const vNum = version.split(".");
        if (vNum[0] * 1 > 12 || (vNum[0] * 1 == 12 && vNum[1] * 1 > 17)) {
          isUseNew = true;
        }
      }
      await this.ctx.renderH5("h5/vipintro/new_company_package.ejs", {
        dataMain: "app_route/new_company_package",
        cssMain: "",
        isLogin: vipObj.isLogin,
        bussinessuseraction: vipObj.bussinessuseraction,
        minUserAction: vipObj.minUserAction,
        vipBusinessPrice: vipObj.vipBusinessPrice,
        vipBusinessDiscount: vipObj.vipBusinessDiscount,
        vipOrignalPrice: vipObj.vipOrignalPrice,
        vipMealList: vipObj.vipMealList,
        vipBusinessType: vipObj.vipBusinessType,
        allCount: allCount || "",
        mealId: mealId || "",
        isUseNew,
        seo: {
          title: "企业批量采购",
          description: "企业批量采购",
        },
      });
    }

    // 服务号 获取支付参数
    async getServicePayPackage() {
      const { orderId, openId } = this.ctx.query;
      const res = await this.service.h5.getServicePayPackage(orderId, openId);
      if (res.state === "ok") {
        this.ctx.res_ok(res.data);
      } else {
        this.ctx.res_warn(res.message);
      }
    }

    // 1101版VIP会员页&企业套餐页
    async vipNewBranch() {
      // app传过来的痒点
      const { payEventId, couponCode, source = "" } = this.ctx.query;
      let { statusBarHeight = 20 } = this.ctx.query;
      const { url } = this.ctx.request;
      let { version } = this.ctx.headers;
      let vNum;
      let isNew = false; // 是否为新版交互
      if (version) {
        version = version.toLowerCase();
        vNum = version.replace("ios", "").replace("android", "").trim();
        const vArr = vNum.split(".");
        if (
          parseInt(vArr[0]) > 12 ||
          (parseInt(vArr[0]) === 12 && parseInt(vArr[1]) > 23)
        ) {
          isNew = true;
        }
      }
      // TODO: 之后去掉
      isNew = true;
      const apiRes = {
        selfInfo: this.ctx.service.h5.getUserInfo(),
        userInfo: this.service.user.getAppUserInfo(),
      };
      let jsFile = "app_route/buy_vip_new_branch";
      // apiRes.vipPriceInfo = this.service.h5.getVipPriceListV2({ couponCode });
      apiRes.vipPriceInfo = this.service.h5.getVipPriceListV2({ couponCode });
      await this.ctx.yieldAll(apiRes);
      const { selfInfo } = apiRes;
      const { userInfo } = apiRes;
      let { vipPriceInfo } = apiRes;
      // 从app个人中心点击企业套餐续费进来的参数
      const { mealId, allCount, from } = this.ctx.query;
      // console.log(userInfo);
      const vipObj = await this.getNewCompanyPackage(userInfo);
      let isVip = false;
      if (selfInfo && selfInfo.state == "ok" && selfInfo.data) {
        isVip = selfInfo.data.isVip;
      }
      if (vipPriceInfo.state === "ok") {
        vipPriceInfo = vipPriceInfo.data;
      }

      let vipPriceList = [];
      if (vipPriceInfo.vipPrice) {
        vipPriceList = vipPriceInfo.vipPrice;
      }
      let needLogin = false;
      let vipText = "开通VIP";
      if (userInfo.state === "ok" && userInfo.data) {
        if (this.ctx.locals.usermanage.isVip(userInfo.data)) {
          vipText = "续费VIP";
        }
      } else {
        needLogin = true;
      }

      let view = "h5/vipintro/vip_new_branch.ejs";
      let cssFile = "vip_new_branch.css";
      if (url.indexOf("/app/h5/vip_package") > -1) {
        view = "h5/vipintro/vip_package.ejs";
        cssFile = "vip_package.css";
      }

      // const countDownInfo = await this.service.h5.getCountDown();
      let activityCountDown = 0;
      // if (countDownInfo.state === "ok" && countDownInfo.data) {
      //   const { countdownSeconds = 0, countdownType } = countDownInfo.data;
      //   if (countdownSeconds && countdownType === 3) {
      //     activityCountDown = countdownSeconds * 1000;
      //   }
      // }
      // 判断从非个人中心、首页顶部跳转进来的，处理其头部
      if (source) {
        statusBarHeight = 19;
      }
      // 618 年中活动期间, 用活动页面
      const { activityDiscountInfo = {} } = vipPriceInfo;
      let showSvga = false;
      if (
        activityDiscountInfo &&
        activityDiscountInfo.countdown &&
        url.indexOf("/app/h5/vip_package") > -1
      ) {
        activityCountDown = activityDiscountInfo.countdown;
        view = "h5/mid_year/start.ejs";
        cssFile = "mid_year.css";
        jsFile = "app_route/mid_year";
        showSvga = true;

        const isTYCClient = this.ctx.isTYCClient();
        const isMobile = this.ctx.isMobile();

        let isPC = false;
        if (!isTYCClient && !isMobile) {
          isPC = true;
        }
        // 跳转至PC活动页
        if (isPC) {
          return this.ctx.redirect(
            `${this.app.config.pcServerDomain}/activity/mid-year${
              source ? `?source=${source}` : ""
            }`
          );
        }
        if (!isTYCClient) {
          return this.ctx.redirect(
            `/vip_package${source ? `?source=${source}` : ""}`
          );
        }
      }
      const appVersion = this.ctx.headers.version;
      let isRenameVersion = false;
      if (judgeAppVersion(appVersion, "12.38.0")) {
        isRenameVersion = true;
      }
      await this.ctx.renderH5(
        view,
        {
          dataMain: jsFile,
          css_main: cssFile,
          layoutMode: "rem",
          vipPriceList,
          vipText,
          // countdown,
          vipPriceInfo,
          needLogin,
          isVip,
          from,
          statusBarHeight,
          self: selfInfo.data,
          showSvga,
          isRenameVersion,
          seo: {
            title: "会员中心",
            description: "会员中心",
          },
          isLogin: vipObj.isLogin,
          bussinessuseraction: vipObj.bussinessuseraction,
          minUserAction: vipObj.minUserAction,
          vipBusinessPrice: vipObj.vipBusinessPrice,
          vipBusinessDiscount: vipObj.vipBusinessDiscount,
          vipOrignalPrice: vipObj.vipOrignalPrice,
          vipMealList: vipObj.vipMealList,
          vipBusinessType: vipObj.vipBusinessType,
          allCount: allCount || "",
          mealId: mealId || "",
          ipFlag: payEventId,
          couponCode,
          isNew,
          activityCountDown,
        },
        { view: true, layout: "h5.pure" }
      );
    }

    // 1101版VIP会员页&企业套餐页
    async vipNewBranchH5() {
      // app传过来的痒点
      const { couponCode, statusBarHeight = 20, source = "" } = this.ctx.query;
      let { code, tyc_source, svcode = "" } = this.ctx.query;
      if (tyc_source) {
        this.ctx.cookies.set("channel_code", tyc_source, {
          maxAge: 24 * 60 * 60 * 1000,
        });
      }
      if (code) {
        this.ctx.cookies.set("wx_code", code, {
          maxAge: 24 * 60 * 60 * 1000,
        });
      }
      if (svcode) {
        this.ctx.cookies.set("svcode", svcode, {
          maxAge: 10 * 60 * 1000,
        });
      }
      const { headers } = this.ctx;
      const ua = headers["user-agent"];
      const isWx = !!ua.match(/MicroMessenger/);
      // const url2 = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
      //     isTestContext(this.ctx) ? TESTAPPID : ONLINEAPPID
      //   }&redirect_uri=${encodeURIComponent(
      //     isTestContext(this.ctx)
      //       ? TESTREDICTURL
      //       : ONLINEREDICTURL
      //   )}&response_type=code&scope=snsapi_base#wechat_redirect`;
      //     console.log(url2, "out url::::url");
      if (isWx && !code) {
        // const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
        //   isTestContext(this.ctx) ? TESTAPPID : ONLINEAPPID
        // }&redirect_uri=${encodeURIComponent(
        //   isTestContext(this.ctx) ? TESTREDICTURL : ONLINEREDICTURL
        // )}&response_type=code&scope=snsapi_base#wechat_redirect`;
        // console.log(url, "::::url");
        // return;
        // const url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx022231ad19f6f2d9&redirect_uri=http://m.test.s.tianyancha.cn/vip_package&response_type=code&scope=snsapi_base#wechat_redirect";
        const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf52eec8aa7e300cb&redirect_uri=http%3A%2F%2Fm.tianyancha.com%2Fvip_package&response_type=code&scope=snsapi_base#wechat_redirect`;

        this.ctx.redirect(url);
        return;
      }

      code = code || this.ctx.cookies.get("wx_code");
      svcode = svcode || this.ctx.cookies.get("svcode");
      tyc_source =
        tyc_source || this.ctx.cookies.get("channel_code") || "undefined";

      // 获取openID

      let openId = 0;
      try {
        const res = await this.ctx.service.h5.getServiceOpenId(code);
        openId = res.data;
      } catch (e) {
        this.ctx.logger.info(`code is : ${code}, error: ${e}`);
      }
      const apiRes = {
        // 登陆信息
        selfInfo: this.ctx.service.h5.getUserInfo(),
        userInfo: this.service.user.getAppUserInfo(),
        vipPriceInfo: this.service.h5.getVipPriceListV2({ couponCode }),
      };
      let jsFile = "app_route/buy_vip_member_h5";
      await this.ctx.setThirdPartMagic(["openinstall"]);
      await this.ctx.yieldAll(apiRes);
      const { selfInfo } = apiRes;
      const { userInfo } = apiRes;
      let { vipPriceInfo } = apiRes;
      // 从app个人中心点击企业套餐续费进来的参数
      const { mealId, allCount, from } = this.ctx.query;
      const vipObj = await this.getNewCompanyPackage(userInfo);
      let isVip = false;
      if (selfInfo && selfInfo.state == "ok" && selfInfo.data) {
        isVip = selfInfo.data.isVip;
      }
      if (vipPriceInfo.state === "ok") {
        vipPriceInfo = vipPriceInfo.data;
      }

      let vipPriceList = [];
      if (vipPriceInfo.vipPrice) {
        vipPriceList = vipPriceInfo.vipPrice;
      }
      let needLogin = false;
      let vipText = "开通VIP";
      if (userInfo.state === "ok" && userInfo.data) {
        if (this.ctx.locals.usermanage.isVip(userInfo.data)) {
          vipText = "续费VIP";
        }
      } else {
        needLogin = true;
      }

      let view = "wap/route/vip_member.ejs";
      let cssFile = "vip_member.css";

      // const countDownInfo = await this.service.h5.getCountDown();
      let activityCountDown = 0;
      // if (countDownInfo.state === "ok" && countDownInfo.data) {
      //   const { countdownSeconds = 0, countdownType } = countDownInfo.data;
      //   if (countdownSeconds && countdownType === 3) {
      //     activityCountDown = countdownSeconds * 1000;
      //   }
      // }
      // 618 年中活动期间, 用活动页面
      // TODO:
      const isTYCClient = this.ctx.isTYCClient();
      const isMobile = this.ctx.isMobile();

      let isPC = false;
      if (!isTYCClient && !isMobile) {
        isPC = true;
      }
      const { url } = this.ctx.request;
      let showSvga = false;
      const weiXin = {
        type: "",
        name: "个人会员",
      };
      const { activityDiscountInfo = {} } = vipPriceInfo;
      // if (
      //   activityDiscountInfo &&
      //   activityDiscountInfo.countdown &&
      //   url.indexOf("/vip_package") > -1
      // ) {
      //   activityCountDown = activityDiscountInfo.countdown;
      //   view = "h5/mid_year/start_h5.ejs";
      //   cssFile = "mid_year_h5.css";
      //   jsFile = "app_route/mid_year_h5";
      //   showSvga = true;
      //   weiXin.type = "midYearVipPackage";
      //   // TODO: 跳转至PC活动页
      //   if (isPC) {
      //     return this.ctx.redirect(`
      //     ${this.app.config.pcServerDomain}/
      //   `);
      //   }
      //   if (isTYCClient) {
      //     return this.ctx.redirect(
      //       `/app/h5/vip_package?needHeader=1${
      //         source ? `&source=${source}` : ""
      //       }`
      //     );
      //   }
      // }
      await this.ctx.renderH5(
        view,
        {
          dataMain: jsFile,
          css_main: cssFile,
          layoutMode: "rem",
          vipPriceList,
          vipText,
          // countdown,
          vipPriceInfo,
          needLogin,
          isVip,
          from,
          showSvga,
          statusBarHeight,
          self: selfInfo.data,
          seo: {
            title: "VIP会员开通",
            description: "VIP会员开通",
          },
          weiXin,
          isLogin: vipObj.isLogin,
          bussinessuseraction: vipObj.bussinessuseraction,
          minUserAction: vipObj.minUserAction,
          vipBusinessPrice: vipObj.vipBusinessPrice,
          vipBusinessDiscount: vipObj.vipBusinessDiscount,
          vipOrignalPrice: vipObj.vipOrignalPrice,
          vipMealList: vipObj.vipMealList,
          vipBusinessType: vipObj.vipBusinessType,
          allCount: allCount || "",
          mealId: mealId || "",
          ipFlag: tyc_source,
          svcode,
          couponCode,
          selfInfo,
          openId,
          activityCountDown,
          isWx,
          userInfo,
        },
        { view: true, layout: "h5.pure" }
      );
    }
  }

  return VipIntroController;
};
