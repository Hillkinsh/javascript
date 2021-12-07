// 项目文件备份




function stopPageScroll() {
  if ($("html").css("position") == "fixed") return;
  const top = -(
      window.scrollY ||
      window.pageYOffset ||
      (document.documentElement.scrollTop === 0
          ? document.body.scrollTop
          : document.documentElement.scrollTop)
  );
  $("html").css({
      position: "fixed",
      top: `${top}px`,
      width: "100%",
      left: 0,
  });
}
function recoverPageScroll() {
  const top = -parseInt($("html").css("top").replace("px", ""));
  $("html").css({
      position: "static",
  });
  $(window).scrollTop(top);
}
function openAppRights() {
  $('.mask').removeClass('hidden');
  stopPageScroll()
}
function closeModal(){
  $('.mask').addClass('hidden');
  recoverPageScroll()
}
function closeGoAppDialog (e) {
  $('.js_go_app').addClass('hidden');
  recoverPageScroll()
}
function showGoAppDialog () {
  window.sensors.ObserveIntersection("#module_show")
  $('.js_go_app').removeClass('hidden');
  stopPageScroll()
}

// window.onload = function () {
//     var element = document.getElementById("testlogic");
  
//     window.sensors = window['sensorsDataAnalytic201505']
//     if(window.sensors) {
//         const query = $("#query").val();
//         const tycid = $("#tycid").val();
//         window.sensors.track("page_show", {
//             page: "百度投放落地页",
//             query:query,
//             tycid:tycid
//         });
//     }
  
//     if (window.location.href.indexOf('ad/launch') == -1) {
//         $(window).scroll(function(){
//             var top = $('.button').offset().top + $('.button').height();
//             if($(window).scrollTop()>=top){
//                 $('.bottom-btn').removeClass('hidden');
//             }else{
//                 $('.bottom-btn').addClass('hidden');
//             }
//         })
//     }
  
  
//     function getAppVersion(){
//         var appVersion = Cookies.get('version');
//         var isQiFu = $(".isQiFu").val() == 1;
//         var url = "/app/version_v2";
//         if(isQiFu){
//             url = "/app/tyqf/version_v2";
//         }
//         if(!appVersion){
//             // 请求底部版本号
//             $.ajax({
//                 url:url,
//                 type:"GET",
//                 success:function(result){
//                     var res = result.split(";");
//                     $('.app-version').text(res[0]);
//                     $('.update-time').text(res[1]);
//                     if(isQiFu){
//                         Cookies.set('version', result, { 'expires': 7, 'path': '/', 'domain':'.tianyanqifu.com' });
//                     }else{
//                         Cookies.set('version', result, { 'expires': 7, 'path': '/', 'domain':'.tianyancha.com' });
//                     }
//                 }
//             });
//         }else{
//             var version = appVersion.split(";")
//             $('.app-version').text(version[0]);
//             $('.update-time').text(version[1]);
//         }
//     }
//     getAppVersion();


//     function getQueryString(name) {
//         var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
//         var r = window.location.search.substr(1).match(reg);
//         if (r != null) {
//           return decodeURIComponent(r[2]);
//         }
//         return null;
//     }
//     var data = {};
//     var channelCode = getQueryString('channelCode');
  
//     // 微信扫码优惠活动
//     if(channelCode && channelCode.indexOf('boss') > -1 && (channelCode !== 'bossActivity')){
//         data['appPageName'] = 'scanDiscounts';
//         data['param1'] = channelCode;
//     }else {
//       data['appPageName'] = getQueryString('from') || '';
//       if (data['appPageName'] == 'TYCWebView') {
//           data['param1'] = 'https://m.tianyancha.com/claimapply' + (getQueryString('calinCode') ? '/' + getQueryString('calinCode') : '');
//           data['param2'] = encodeURIComponent('认证企业');
//           data['param3'] = encodeURIComponent('分享认证企业');
//           data['param4'] = 'https://m.tianyancha.com/claimapply';
//       } else {
//           data['param1'] = getQueryString('param1') || '';
//           data['param2'] = getQueryString('param2') ? encodeURIComponent(getQueryString('param2')) : '';
//           data['param3'] = getQueryString('param3') ? encodeURIComponent(getQueryString('param3')) : '';
//       }
//       data['channelCode'] = getQueryString('channelCode') || '';
//       if (data['channelCode'] == 'SC-12') {
//           $('body').addClass('gt-wapper')
//       }
//     }
  
//     var UA = navigator.userAgent;
//     if (/bangjob/i.test(UA)) {
//       var tempStr = '<div id="_modal_container" modal-render="true" tabindex="-1" role="dialog" class="modal fade ng-isolate-scope in"  modal-in-class="in" size="lg" index="0" animate="animate" modal-animation="true" style="z-index: 1050; display: block;overflow: hidden;overflow-y: auto"> <div class="modal-dialog " ><div class="modal-content" ></div></div> </div>';
//       var openModalStr = function (str) {
//         if (typeof str != 'string')
//           return false;
//         var temp = $(tempStr);
//         var size = 'modal-appSuccBox';
//         temp.find('.modal-dialog').addClass(size);
//         temp.find('.modal-content').append(str);
//         $('body').append(temp);
//         $('body').off('touchstart.unModal');
//         $('body').on('touchstart.unModal', '#_modal_container', function (event) {
//           var $eTarget = $(event.target);
//           if (!$('.modal-dialog').has($eTarget).length) {
//             $('#_modal_container').remove();
//             $('body').removeClass('modal-open')
//             if (!event) event = window.event;
//             if (event) {
//               if (event.preventDefault) {
//                 event.stopPropagation(); // non-IE browsers
//               } else {
//                 event.cancelBubble = true; // IE browsers
//               }
//             }
//           }
//         });
//       }
//       var bodyClickModal = function (event) {
//         var $eTarget = $(event.target);
//         if ($('#_modal_container').has($eTarget).length) {
//           return
//         }
//         if (!$('#_modal_container').length) {
//           var modalStr = $('.hide-box').html();
//           openModalStr(modalStr);
//           $('.copy-input').val(window.location.href);
//           $('body').addClass('modal-open')
//         }
//       }
//       $('body').on('touchstart.openModal', bodyClickModal);

//       return
//     }
//     if (element) {element.innerHTML = JSON.stringify(window.OpenInstall);}
//     var m = new OpenInstall({
//       /*appKey必选参数，openinstall为每个应用分配的ID*/
//       appKey: 'sc1wip'
//     }, data);
//     if (element) {element.innerHTML = 'onload inner click' + OpenInstall;}
//     m.schemeWakeup();










//     if (element) {element.innerHTML = 'onload inner click';}
//     $("#down_load2").click(function (e) {
//         e && e.preventDefault&&e.preventDefault();
//         e && e.stopPropagation && e.stopPropagation();
//         var UA = navigator.userAgent;

//         if (UA.indexOf(" MicroMessenger/") > -1 && channelCode && channelCode.indexOf('boss')>-1) {
//             //微信中显示遮罩提示在浏览器中打开或进入应用宝
//             var div = document.createElement("div");
//             div.innerHTML = "<div class='wx-share-bg'><img class='wx-share-img' src='https://cdn.tianyancha.com/m-require-js/public/images/wx_open_in_browser.png' /></div>";
//             document.body.appendChild(div);
//             return
//         }
//         if (element) {element.innerHTML = 'onload inner click';}

//         // m.wakeupOrInstall();
//         // td_click();
//       })
//     if (element) {
//         element.innerHTML = 'onload inner'
//     }
  
// }
$(document).ready(function () {
  window.sensors = window['sensorsDataAnalytic201505']
  if(window.sensors){
      const query = $("#query").val();
      const tycid = $("#tycid").val();
      window.sensors.track("page_show", {
          page: "百度投放落地页",
          query:query,
          tycid:tycid
      });
  }
  if (window.location.href.indexOf('ad/launch') == -1) {
      $(window).scroll(function(){
          var top = $('.button').offset().top + $('.button').height();
          if($(window).scrollTop()>=top){
              $('.bottom-btn').removeClass('hidden');
          }else{
              $('.bottom-btn').addClass('hidden');
          }
      })
  }
  
  function getAppVersion(){
      var appVersion = Cookies.get('version');
      var isQiFu = $(".isQiFu").val() == 1;
      var url = "/app/version_v2";
      if(isQiFu){
          url = "/app/tyqf/version_v2";
      }
      if(!appVersion){
          // 请求底部版本号
          $.ajax({
              url:url,
              type:"GET",
              success:function(result){
                  var res = result.split(";");
                  $('.app-version').text(res[0]);
                  $('.update-time').text(res[1]);
                  if(isQiFu){
                      Cookies.set('version', result, { 'expires': 7, 'path': '/', 'domain':'.tianyanqifu.com' });
                  }else{
                      Cookies.set('version', result, { 'expires': 7, 'path': '/', 'domain':'.tianyancha.com' });
                  }
              }
          });
      }else{
          var version = appVersion.split(";")
          $('.app-version').text(version[0]);
          $('.update-time').text(version[1]);
      }
  }
  getAppVersion();
})

var _hmt = _hmt || [];
(function () {
var hm = document.createElement("script");
hm.src = "https://hm.baidu.com/hm.js?085063e093e717baffc8f88cc452cd62";
var s = document.getElementsByTagName("script")[0];
s.parentNode.insertBefore(hm, s);
})();