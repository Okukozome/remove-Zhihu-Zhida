// ==UserScript==
// @name         屏蔽知乎直答标识
// @namespace    https://github.com/Okukozome/fuck-Zhihu-Zhida
// @version      1.0
// @description  替换知乎网页端回答和文章中类似"知乎直答✦"的关键词为普通搜索超链接，并去掉✦角标。关联：关闭知乎直达。
// @author       Okukozome
// @match        *://*.zhihu.com/*
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    const targetClass = "RichContent-EntityWord";

    // 处理并替换链接
    function replaceLinks() {
        const links = document.querySelectorAll(`a.${targetClass}`);
        links.forEach(link => {
            if (link.dataset.modified) return; // 跳过已处理的链接
            let keyword = link.textContent;
            if (keyword) {
                let newUrl = `https://www.zhihu.com/search?type=content&q=${encodeURIComponent(keyword)}`;
                link.href = newUrl;
                link.innerHTML = keyword; // 移除任何图标
                link.dataset.modified = "true"; // 标记为已修改
            }
        });
    }

    // 页面加载时初次调用以替换链接
    replaceLinks();

    // 设置一个MutationObserver监视document.body的变化，处理动态添加的内容
    const observer = new MutationObserver(replaceLinks);
    observer.observe(document.body, { childList: true, subtree: true });
})();
