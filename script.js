const progressBar = document.getElementById("progressBar");
const revealTargets = document.querySelectorAll(".reveal");
const counterTargets = document.querySelectorAll("[data-counter]");
const tiltTarget = document.querySelector("[data-tilt]");
const orbs = document.querySelectorAll(".bg-orb");
const prefMapRoot = document.getElementById("prefectureMap");
const prefTitle = document.getElementById("prefTitle");
const prefCount = document.getElementById("prefCount");
const prefMunicipalityList = document.getElementById("prefMunicipalityList");
const challengeBarChartCanvas = document.getElementById("challengeBarChart");
const challengeLineChartCanvas = document.getElementById("challengeLineChart");
const parallaxItems = document.querySelectorAll(".parallax-item");

const PREFECTURE_TO_ID = {
  北海道: "hokkaido",
  青森県: "aomori",
  岩手県: "iwate",
  宮城県: "miyagi",
  秋田県: "akita",
  山形県: "yamagata",
  福島県: "fukushima",
  茨城県: "ibaraki",
  栃木県: "tochigi",
  群馬県: "gunma",
  埼玉県: "saitama",
  千葉県: "chiba",
  東京都: "tokyo",
  神奈川県: "kanagawa",
  新潟県: "niigata",
  富山県: "toyama",
  石川県: "ishikawa",
  福井県: "fukui",
  山梨県: "yamanashi",
  長野県: "nagano",
  岐阜県: "gifu",
  静岡県: "shizuoka",
  愛知県: "aichi",
  三重県: "mie",
  滋賀県: "shiga",
  京都府: "kyoto",
  大阪府: "osaka",
  兵庫県: "hyogo",
  奈良県: "nara",
  和歌山県: "wakayama",
  鳥取県: "tottori",
  島根県: "shimane",
  岡山県: "okayama",
  広島県: "hiroshima",
  山口県: "yamaguchi",
  徳島県: "tokushima",
  香川県: "kagawa",
  愛媛県: "ehime",
  高知県: "kochi",
  福岡県: "fukuoka",
  佐賀県: "saga",
  長崎県: "nagasaki",
  熊本県: "kumamoto",
  大分県: "oita",
  宮崎県: "miyazaki",
  鹿児島県: "kagoshima",
  沖縄県: "okinawa",
};

const ID_TO_PREFECTURE = Object.fromEntries(
  Object.entries(PREFECTURE_TO_ID).map(([prefecture, id]) => [id, prefecture])
);

const SPECIAL_PREFECTURE_HINTS = {
  京都府自治会館管理組合: "京都府",
  八戸圏域水道企業団: "青森県",
  越前三国ボートレース企業団: "福井県",
  南予地方水道水質検査協議会: "愛媛県",
  北海道町村会: "北海道",
  尼崎市職員厚生会: "兵庫県",
  中東遠総合医療センター: "静岡県",
  宇和島市病院局: "愛媛県",
};

const updateProgress = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = `${Math.min(progress, 100)}%`;
};

const setupCharts = () => {
  if (!window.Chart) return;
  const measuredYears = ["2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"];
  const measuredRetirements = [5727, 6043, 6374, 6459, 7123, 8322, 9196, 8532, 10500, 12501];
  const measuredYoY = measuredRetirements.map((value, idx, arr) => {
    if (idx === 0) return null;
    const prev = arr[idx - 1];
    return Number((((value - prev) / prev) * 100).toFixed(1));
  });

  if (challengeBarChartCanvas) {
    new Chart(challengeBarChartCanvas, {
      type: "bar",
      data: {
        labels: measuredYears,
        datasets: [
          {
            label: "普通退職者数（人）",
            data: measuredRetirements,
            borderColor: "#0f8f5f",
            backgroundColor: "rgba(15, 143, 95, 0.78)",
            borderRadius: 10,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: "#355847", font: { weight: "600" } },
          },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const v = Number(ctx.raw).toLocaleString("ja-JP");
                return ` ${v} 人`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: { color: "rgba(46, 128, 90, 0.08)" },
            ticks: { color: "#4f6f61" },
          },
          y: {
            position: "left",
            grid: { color: "rgba(46, 128, 90, 0.08)" },
            ticks: { color: "#4f6f61" },
          },
        },
      },
    });
  }

  if (challengeLineChartCanvas) {
    new Chart(challengeLineChartCanvas, {
      type: "line",
      data: {
        labels: measuredYears,
        datasets: [
          {
            label: "前年比増減率（%）",
            data: measuredYoY,
            borderColor: "#0f8f5f",
            backgroundColor: "rgba(15, 143, 95, 0.14)",
            fill: true,
            borderWidth: 3,
            tension: 0.35,
            spanGaps: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: "#355847", boxWidth: 16, padding: 12 },
          },
        },
        scales: {
          x: {
            grid: { color: "rgba(46, 128, 90, 0.08)" },
            ticks: { color: "#4f6f61" },
          },
          y: {
            grid: { color: "rgba(46, 128, 90, 0.08)" },
            ticks: { color: "#4f6f61" },
          },
        },
      },
    });
  }
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  }
);

revealTargets.forEach((item) => revealObserver.observe(item));
revealTargets.forEach((item, idx) => {
  item.style.transitionDelay = `${Math.min(idx * 28, 460)}ms`;
});

const runCounter = (node) => {
  const target = Number(node.dataset.counter || 0);
  const duration = 1400;
  const start = performance.now();

  const update = (now) => {
    const elapsed = now - start;
    const ratio = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - ratio, 3);
    node.textContent = Math.floor(target * eased).toLocaleString("ja-JP");
    if (ratio < 1) requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

counterTargets.forEach((item) => counterObserver.observe(item));

if (tiltTarget) {
  tiltTarget.addEventListener("mousemove", (event) => {
    const bounds = tiltTarget.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width;
    const py = (event.clientY - bounds.top) / bounds.height;
    const rotateX = (0.5 - py) * 10;
    const rotateY = (px - 0.5) * 10;
    tiltTarget.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
  });

  tiltTarget.addEventListener("mouseleave", () => {
    tiltTarget.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
}

window.addEventListener("mousemove", (event) => {
  const xPercent = event.clientX / window.innerWidth;
  const yPercent = event.clientY / window.innerHeight;

  orbs.forEach((orb, idx) => {
    const intensity = (idx + 1) * 8;
    const x = (xPercent - 0.5) * intensity;
    const y = (yPercent - 0.5) * intensity;
    orb.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
  });
});

window.addEventListener("scroll", updateProgress);
updateProgress();
setupCharts();

const runParallax = () => {
  const viewportHeight = window.innerHeight;
  parallaxItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const offset = ((rect.top + rect.height * 0.5) - viewportHeight * 0.5) / viewportHeight;
    item.style.transform = `translateY(${offset * -12}px)`;
  });
};

window.addEventListener("scroll", runParallax);
runParallax();

const animatedCards = document.querySelectorAll(".card, .bento, .job-card, .timeline-item, .pdf-card");
animatedCards.forEach((card, idx) => {
  if (idx % 2 === 0) {
    card.classList.add("floaty");
    card.style.animationDelay = `${idx * 0.18}s`;
  }
});

const normalizeMunicipalityName = (name) => {
  return name
    .replace(/\s+/g, "")
    .replace(/（.*?）/g, "")
    .replace(
      /(市役所|町役場|村役場|区役所|県庁|府庁|都庁|道庁|病院局|医療センター|職員厚生会|自治会館管理組合|圏域水道企業団|地方水道水質検査協議会|町村会|企業団)$/g,
      ""
    );
};

const hexToRgb = (hex) => {
  const normalized = hex.replace("#", "");
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
};

const lerpColor = (fromHex, toHex, ratio) => {
  const from = hexToRgb(fromHex);
  const to = hexToRgb(toHex);
  const r = Math.round(from.r + (to.r - from.r) * ratio);
  const g = Math.round(from.g + (to.g - from.g) * ratio);
  const b = Math.round(from.b + (to.b - from.b) * ratio);
  return `rgb(${r}, ${g}, ${b})`;
};

const renderPrefecturePanel = (id, municipalitiesByPrefecture, countsByPrefecture) => {
  const prefecture = ID_TO_PREFECTURE[id];
  if (!prefecture) return;
  const names = municipalitiesByPrefecture[id] || [];
  prefTitle.textContent = prefecture;
  prefCount.textContent = `導入団体数: ${countsByPrefecture[id] || 0}`;
  prefMunicipalityList.innerHTML = "";

  names.slice(0, 80).forEach((name) => {
    const li = document.createElement("li");
    li.textContent = name;
    prefMunicipalityList.appendChild(li);
  });

  if (names.length > 80) {
    const li = document.createElement("li");
    li.textContent = `...ほか ${names.length - 80} 団体`;
    prefMunicipalityList.appendChild(li);
  }
};

const buildInteractiveMap = async () => {
  if (!prefMapRoot) return;

  const [japanMapModule, municipalityTextResponse, localgovResponse] = await Promise.all([
    import("https://unpkg.com/@svg-maps/japan@2.0.0/index.js"),
    fetch("./assets/municipalities.txt"),
    fetch("https://code4fukui.github.io/localgovjp/localgovjp.json"),
  ]);

  const mapData = japanMapModule.default;
  const municipalityText = await municipalityTextResponse.text();
  const localgov = await localgovResponse.json();

  const municipalities = [...new Set(
    municipalityText
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean)
  )];

  const cityToPrefectureCandidates = new Map();
  localgov.forEach((item) => {
    if (!item.city || !item.pref) return;
    const city = String(item.city).trim();
    if (!cityToPrefectureCandidates.has(city)) {
      cityToPrefectureCandidates.set(city, new Set());
    }
    cityToPrefectureCandidates.get(city).add(String(item.pref).trim());
  });

  const uniqueCityNames = [...cityToPrefectureCandidates.keys()].sort((a, b) => b.length - a.length);

  const detectPrefecture = (rawName) => {
    if (SPECIAL_PREFECTURE_HINTS[rawName]) {
      return SPECIAL_PREFECTURE_HINTS[rawName];
    }

    const directPrefecture = Object.keys(PREFECTURE_TO_ID).find((pref) => rawName.includes(pref));
    if (directPrefecture) return directPrefecture;

    const normalized = normalizeMunicipalityName(rawName);
    const direct = cityToPrefectureCandidates.get(normalized);
    if (direct && direct.size === 1) return [...direct][0];

    for (const suffix of ["市", "町", "村", "区"]) {
      const candidate = cityToPrefectureCandidates.get(`${normalized}${suffix}`);
      if (candidate && candidate.size === 1) return [...candidate][0];
    }

    const fuzzy = uniqueCityNames.filter((city) => rawName.includes(city));
    if (!fuzzy.length) return null;
    const best = fuzzy[0];
    const prefCandidates = cityToPrefectureCandidates.get(best);
    if (prefCandidates && prefCandidates.size === 1) return [...prefCandidates][0];
    return null;
  };

  const countsByPrefecture = {};
  const municipalitiesByPrefecture = {};
  const unmatchedMunicipalities = [];

  municipalities.forEach((name) => {
    const prefecture = detectPrefecture(name);
    if (!prefecture || !PREFECTURE_TO_ID[prefecture]) {
      unmatchedMunicipalities.push(name);
      return;
    }
    const prefId = PREFECTURE_TO_ID[prefecture];
    countsByPrefecture[prefId] = (countsByPrefecture[prefId] || 0) + 1;
    if (!municipalitiesByPrefecture[prefId]) {
      municipalitiesByPrefecture[prefId] = [];
    }
    municipalitiesByPrefecture[prefId].push(name);
  });

  Object.keys(municipalitiesByPrefecture).forEach((key) => {
    municipalitiesByPrefecture[key].sort((a, b) => a.localeCompare(b, "ja"));
  });

  const maxCount = Math.max(...Object.values(countsByPrefecture), 1);
  const svgNs = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNs, "svg");
  svg.setAttribute("viewBox", mapData.viewBox);
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", "都道府県別導入自治体ヒートマップ");

  mapData.locations.forEach((location) => {
    const path = document.createElementNS(svgNs, "path");
    const value = countsByPrefecture[location.id] || 0;
    const intensity = value / maxCount;

    path.setAttribute("d", location.path);
    path.setAttribute("data-id", location.id);
    path.setAttribute("data-name", location.name);
    path.setAttribute("class", "jp-pref-path");
    path.style.fill = value
      ? lerpColor("#d9f6e8", "#16b274", Math.max(0.2, intensity))
      : "rgba(33, 132, 91, 0.12)";
    path.style.stroke = "rgba(33, 132, 91, 0.32)";
    path.style.strokeWidth = "0.7";

    if (value > 0) {
      path.classList.add("active");
      path.style.animationDuration = `${2.8 - Math.min(1.8, intensity * 1.6)}s`;
    }

    path.addEventListener("mouseenter", () => {
      renderPrefecturePanel(location.id, municipalitiesByPrefecture, countsByPrefecture);
      path.style.stroke = "#bffef2";
      path.style.strokeWidth = "1.3";
    });

    path.addEventListener("mouseleave", () => {
      path.style.stroke = "rgba(255,255,255,0.28)";
      path.style.strokeWidth = "0.7";
    });

    svg.appendChild(path);
  });

  prefMapRoot.innerHTML = "";
  prefMapRoot.appendChild(svg);

  const topPrefectureEntry = Object.entries(countsByPrefecture).sort((a, b) => b[1] - a[1])[0];
  if (topPrefectureEntry) {
    renderPrefecturePanel(topPrefectureEntry[0], municipalitiesByPrefecture, countsByPrefecture);
  }

  if (unmatchedMunicipalities.length) {
    const note = document.createElement("p");
    note.className = "unmatched-note";
    note.textContent = `都道府県未判定: ${unmatchedMunicipalities.length} 団体`;
    prefMapRoot.appendChild(note);
  }
};

buildInteractiveMap().catch((error) => {
  if (!prefTitle) return;
  prefTitle.textContent = "導入マップの読み込みに失敗しました";
  prefCount.textContent = "ネットワーク接続をご確認ください。";
  prefMunicipalityList.innerHTML = "";
  // eslint-disable-next-line no-console
  console.error(error);
});
