/**
 * 既存 Nuxt 官公庁ナビ（MEMBER_RECRUITMENT 相当）+ 全体マップ
 * 各 HTML に <html data-emp-page="..."> と本スクリプトを置く
 */
(function () {
  var PAGES = [
    {
      id: 'integration-map',
      file: 'employer-integration-map.html',
      label: '全体マップ',
      kind: 'meta',
      hint: '既存＋US新機能の位置',
    },
    { id: 'mypage', file: 'employer-mypage.html', label: '官公庁情報', kind: 'legacy' },
    { id: 'job-list', file: 'employer-job-list.html', label: '求人管理', kind: 'legacy' },
    { id: 'applicant-list', file: 'employer-applicant-list.html', label: '応募者管理', kind: 'legacy' },
    { id: 'funnel-dashboard', file: 'funnel-dashboard.html', label: '採用分析', kind: 'us' },
    { id: 'applicant-analytics', file: 'applicant-analytics.html', label: '応募者分析', kind: 'us' },
    { id: 'recruitment-simulator', file: 'recruitment-simulator.html', label: '母集団計画', kind: 'us' },
    { id: 'inflow-analysis', file: 'inflow-analysis.html', label: '流入分析', kind: 'us' },
    { id: 'user-behavior-summary', file: 'user-behavior-summary.html', label: '行動集計', kind: 'us' },
    { id: 'measure-comparison', file: 'measure-comparison.html', label: '施策比較', kind: 'us' },
    { id: 'ai-recruiting-producer', file: 'ai-recruiting-producer.html', label: 'AI採用支援', kind: 'us' },
    { id: 'blog-list', file: 'employer-blog-list.html', label: 'ブログ・動画', kind: 'legacy' },
    { id: 'news-list', file: 'employer-news-list.html', label: '採用案内', kind: 'legacy' },
    { id: 'calendar', file: 'employer-calendar.html', label: '予定管理', kind: 'legacy' },
  ];

  function currentFile() {
    var path = window.location.pathname || '';
    var seg = path.split('/').pop();
    return seg || 'index.html';
  }

  function mount() {
    var root = document.getElementById('employer-nav-mount');
    if (!root) return;

    var activeId = document.documentElement.getAttribute('data-emp-page') || '';
    var here = currentFile();

    var html =
      '<div class="emp-chrome">' +
      '<div class="emp-chrome-inner">' +
      '<div class="emp-brand">' +
      '<span class="emp-logo">PUBLIC CONNECT</span>' +
      '<span class="emp-sub">官公庁向けコンソール（UIモック）</span>' +
      '</div>' +
      '<div class="emp-legend">' +
      '<span class="emp-pill emp-pill--legacy">既存開発済</span>' +
      '<span class="emp-pill emp-pill--us">US新機能</span>' +
      '<span class="emp-pill emp-pill--meta">説明</span>' +
      '</div></div>' +
      '<nav class="emp-tabs" aria-label="官公庁メニュー">' +
      PAGES.map(function (p) {
        var isActive =
          activeId === p.id ||
          (p.file === here && !activeId);
        var cls = 'emp-tab';
        if (isActive) cls += ' is-active';
        cls += ' emp-tab--' + p.kind;
        return (
          '<a class="' +
          cls +
          '" href="./' +
          p.file +
          '">' +
          '<span>' +
          p.label +
          '</span>' +
          '</a>'
        );
      }).join('') +
      '</nav></div>';

    root.innerHTML = html;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
