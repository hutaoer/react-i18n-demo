try {
  (function initI18N() {
    function getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) {
        return unescape(arr[2]);
      } else {
        return null;
      }
    }

    function getParameterByName(name, url = window.location.href) {
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return "";
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    const langList = window.__langList__ || [
      "zh_CN",
      "en_US",
      "in_ID",
      "vi_VN",
      "ru_RU",
    ];

    function getBrowserLang() {
      const candidates = [
        ...navigator.languages,
        navigator.language,
        navigator.userLanguage,
      ]
        .filter(Boolean)
        .map((lang) => lang.replace("-", "_"));
      const candidateLang =
        candidates.find((lang) =>
          langList.some((supLang) => {
            return lang === supLang || supLang.startsWith(lang);
          })
        ) || "zh_CN";
      const targetLang = langList.find(
        (l) => l === candidateLang || l.startsWith(candidateLang)
      );
      return targetLang;
    }
    var langKey = window.__langKey__ || "lang";
    var usesLang = [
      getParameterByName("locale"),
      ,
      getCookie(langKey),
      getBrowserLang(),
    ].filter(Boolean);
    window.__lang__ = usesLang[0] || "zh_CN";
    if (window.__lang__ && langList.indexOf(window.__lang__) === -1) {
      console.log("当前语言不在支持列表中", window.__lang__);
      window.__lang__ =
        usesLang.slice(1).find((lang) => langList.indexOf(lang) !== -1) ||
        "zh_CN";
    }
    var appNames = ["bbmall_buyer", "bbmall_basic"];
    window.__i18nScriptSrc = [];
    if (window.__container_api_dynamic_domain__) {
      appNames = appNames.map((appName) => {
        return (appName += "-" + window.__container_api_dynamic_domain__);
      });
    }
    var insertPosRef = document.getElementById(
      "xy-lang-init-script"
    ).nextSibling;
    for (var i = 0; i < appNames.length; i++) {
      var appName = appNames[i];
      var srcUrl =
        "https://vision.xyb2b.com/" +
        appName +
        "/test/lang/data-" +
        window.__lang__ +
        ".js";
      var timestamp5 = Date.now();
      timestamp5 -= timestamp5 % (5 * 60 * 1000);
      if ("test" !== "prod") {
        srcUrl += "?t=" + timestamp5;
      } else {
        if ("undefined" === "undefined") {
          srcUrl += "?t=" + timestamp5;
        }
      }
      if ("requirejs" === "requirejs") {
        window.__i18nScriptSrc.push(srcUrl);
      } else {
        var i18nScript = document.createElement("script");
        i18nScript.src = srcUrl;
        i18nScript.async = false;
        if (insertPosRef) {
          document.head.insertBefore(i18nScript, insertPosRef);
        } else {
          document.head.appendChild(i18nScript);
        }
      }
    }
  })();
} catch (e) {}
