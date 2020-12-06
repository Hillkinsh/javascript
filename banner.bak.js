define([
  "window",
  "jquery",
  "Cookies",
  "lib/domReady",
  "st",
  "util/query",
  "util/UserManage",
  "util/storage",
], (window, $, Cookies, domReady, stOrig, query, UserManage, storage) => {
  if (!window.TYC_UI) {
    window.TYC_UI = {};
  }
/* eslint-disable */
  let { BANNER } = window.TYC_UI;
  if (!BANNER) {
    BANNER = window.TYC_UI.BANNER = {};
  }
  BANNER.jumpUrl = `${window.serverDomain}/claim/entry`;

  const bottomBannerHtml = [];
  bottomBannerHtml.push(
    '<div id="tyc_banner_bottom" tyc-event-click tyc-event-ch="shouye.Dibubanner.zhankai" class="banner-bottom">'
  );
  bottomBannerHtml.push("<div class='content' id='js-banner-click'>");
  bottomBannerHtml.push(
    "<div class='main banner-3d-filp-up' id='js-banner-main'><div class='fix-img'></div></div>"
  );
  bottomBannerHtml.push("<div class='code'>");
  bottomBannerHtml.push("</div>");
  bottomBannerHtml.push("</div>");
  bottomBannerHtml.push(
    "<div id='tyc_banner_close' tyc-event-click tyc-event-ch=\"shouye.Dibubanner.close\" class='close' >" +
      "<div class='inner'></div></div>"
  );
  bottomBannerHtml.push("</div>");

  const closeFooterBanner = function () {
    changeBannerState(true);
  };
  const bannerCookieOptions = {
    path: "/",
    domain: window.cookieServerSuffix.split(":")[0],
  };
  function changeBannerState (state) {
    if (String(state) === "true") {
      $(".banner-bottom").removeClass("-show");
      setTimeout(() => {
        $(".banner-left").removeClass("-leave");
      }, 300);
    } else {
      $(".banner-left").addClass("-leave");
      setTimeout(() => {
        $(".banner-bottom").addClass("-show");
      }, 300);
    }
  };
  let hasBannerCookie = Cookies.get("bannerFlag", bannerCookieOptions) || false;
  let isHomePage = window.location.pathname === "/";
  console.log(window.location)

  $.banner = function (options) {
    options = options || {};
    const bannerHtml = "<div class='bottom-banner'></div>";
    if ($("#banner_web")[0]) {
      $("#banner_web").append($(bannerHtml));

      query.home_getBottomBanner().then((res) => {
        const { data } = res;
        const banner_style =
        `.bottom-banner {
          width: 100%;
          position: fixed;
          bottom: 0px;
          display: flex;
          z-index: 9999;
        }
        .bottom-banner .banner-left {
          position: fixed;
          left: -20px;
          bottom: 48px;
          cursor: pointer;
          z-index: 200;
          width: 80px;
          transition: left .3s cubic-bezier(.14,.68,.46,1);
        }
        .bottom-banner .banner-left:hover {
          left: 0;
        }
        .bottom-banner .banner-left.-leave {
          left: -90px;
        }
        .bottom-banner .banner-bottom {
          position: fixed;
          text-align: center;
          width: 100%;
          height: 72px;
          z-index: 20000;
          cursor: pointer;
          transition: left .3s cubic-bezier(.14,.68,.46,1);
          background-image: url('${data.imageUrl2}');
          background-size: auto 72px;
          background-repeat: no-repeat;
          background-position: center;
          left: -100%;
          bottom: 0;
        }
        .bottom-banner .banner-bottom.-show {
          left: 0;
          opacity: 1;
        }
        .bottom-banner .banner-bottom .content {
          text-align: center;
          height: 72px;
          z-index: 20000;
          cursor: pointer;
          width: 1000px;
          display: flex;
          left: 0;
          right: 0;
          margin: auto;
          justify-content: space-between;
        }
        .bottom-banner .close {
          width: 72px;
          height: 72px;
          position: absolute;
          z-index: 20001;
          right: 0;
          top: 0;
          opacity: 0.6;
        }
        .bottom-banner .close:hover {
          opacity: 1;
        }
        .bottom-banner .close .inner {
          background: url(https://cdn.tianyancha.com/web-require-js/public/images/banner/dyr/banner_dyr_close.png) no-repeat center;
          width: 72px;
          height: 72px;
          background-size: 72px;
        }
        .bottom-banner .banner-bottom .code {
          width: 160px;
          height: 154px;
          position: relative;
          top: -82px;
          background-size: 100%;
          background-image: url(https://cdn.tianyancha.com/web-require-js/public/images/banner/dyr/banner-web-qrcode-0320.png);
        }
        @media (min-width: 1128px) and (max-width: 1186px) {
          .bottom-banner .banner-bottom {
            display: flex;
            justify-content: flex-end;
          }
          .bottom-banner .banner-bottom .content {
            margin: 0 88px 0 0;
          }
        }
        @media (min-width: 1028px) and (max-width: 1128px) {
          .bottom-banner .banner-bottom .content{
            margin-right:88px;
            min-width: 900px;
            width: 0;
          }
        }
        @media (max-width: 1028px) {
          .bottom-banner .banner-bottom {
            min-width: 1028px;
          }
          .bottom-banner .banner-bottom .content {
            margin: 0 88px 0 40px;
            width: 900px;
          }
          .bottom-banner .banner-bottom .close {
            right: 10px;
          }
        }`
        window.createStyle(banner_style);
        const leftBannerHtml = [];
        leftBannerHtml.push(
          `<img id='tyc_banner_left' tyc-event-click tyc-event-ch="shouye.Dibubanner.open" class='banner-left' alt='企业认证' src='${data.imageUrl}'>`
        );
        $(".bottom-banner")[0].innerHTML = leftBannerHtml.join("") + bottomBannerHtml.join("");

        // banner 初始化部分。
        // false 展示底部
        // true 隐藏底部
        // 首页且没cookie才展示底部
        const isHideBottomBanner = !isHomePage || hasBannerCookie;
        changeBannerState(isHideBottomBanner);
        Cookies.set('bannerFlag', true,  bannerCookieOptions)
        $("#tyc_banner_left").on("click", () => {
          changeBannerState(false);
        });
        BANNER.jumpUrl = data.redirectUrl || `${window.serverDomain}/claim/entry`;
      });

      $("#banner_web").on(
        "click.js-banner-click",
        "#tyc_banner_bottom",
        (event) => {
          const evt = event.srcElement ? event.srcElement : event.target;
          if ($(evt).hasClass("close") || $(evt).hasClass("inner")) {
            closeFooterBanner();
            return;
          }
          window.open(BANNER.jumpUrl, "_blank");
          return;
        }
      );
    }
  };
  $(() => {
    $.banner();
  });
});