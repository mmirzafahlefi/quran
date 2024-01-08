// Navbar
window.onscroll = function () {
  const header = document.querySelector("header");
  const fixedNav = header.offsetTop;
  const toTop = document.querySelector("#to-top");

  if (window.pageYOffset > fixedNav) {
    header.classList.add("navbar-fixed");
    toTop.classList.remove("hidden");
    toTop.classList.add("flex");
  } else {
    header.classList.remove("navbar-fixed");
    toTop.classList.remove("flex");
    toTop.classList.add("hidden");
  }
};

// hamburger
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#nav-menu");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("hamburger-active");
  navMenu.classList.toggle("hidden");
});

// Klik di luar hamburger
window.addEventListener("click", function (e) {
  if (e.target != hamburger && e.target != navMenu) {
    hamburger.classList.remove("hamburger-active");
    navMenu.classList.add("hidden");
  }
});

// Darkmode toggle
const darkToggle = document.querySelector("#dark-toggle");
const html = document.querySelector("html");

darkToggle.addEventListener("click", function () {
  if (darkToggle.checked) {
    html.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    html.classList.remove("dark");
    localStorage.theme = "light";
  }
});

// pindahkan posisi toggle sesuai mode
if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  darkToggle.checked = true;
} else {
  darkToggle.checked = false;
}

// data surah
$.ajax({
  url: "https://equran.id/api/v2/surat",
  type: "get",
  dataType: "JSON",
  success: function (result) {
    let surah = result.data;

    $.each(surah, function (i, hasil) {
      $("#daftar-surah").append(
        `<a href="../detail.html" class="lg:p-2 w-full lg:w-1/4" onclick="getDetailSurah(${hasil.nomor})">
      <div
        class="overflow-hidden rounded-lg shadow-md mb-5 bg-primary py-3 px-8"
      >
        <div class="w-full mb-2">
          <h1 class="text-light">` +
          hasil.nomor +
          `. ` +
          hasil.namaLatin +
          `</h1>
        </div>
        <div class="w-full text-right">
          <h1 class="text-2xl font-bold text-light dark:text-white">
          ` +
          hasil.nama +
          `
          </h1>
          <p class="text-base font-sm text-light">
          ` +
          hasil.tempatTurun +
          ` - ` +
          hasil.arti +
          `
          </p>
        </div>
      </div>
    </a>`
      );
    });
  },
});

// set nomor surah
const getDetailSurah = function (nomor) {
  window.localStorage.setItem("nomor", String(nomor));
};

// get nomor surah
const getNomor = window.localStorage.getItem("nomor");

// detail surah
$.ajax({
  url: `https://equran.id/api/v2/surat/${getNomor}`,
  type: "get",
  dataType: "JSON",
  success: function (result) {
    let data = result.data;
    let surah = result.data.ayat;

    $("#detail-surah").append(
      `
    <div class="w-full">
      <div
        class="overflow-hidden rounded-lg shadow-md mb-5 bg-primary py-3 px-8"
      >
        <div class="w-full mb-2 flex items-center justify-center">
          <h1 class="text-light dark:text-white text-3xl">
            ` +
        data.nama +
        `
          </h1>
        </div>
        <div class="w-full flex items-center justify-center">
          <p class="text-light dark:text-white">` +
        data.namaLatin +
        ` - ` +
        data.tempatTurun +
        ` - ` +
        data.arti +
        `</p>
        </div>
      </div>
    </div>
    `
    );

    $.each(surah, function (i, hasil) {
      $("#detail-surah").append(
        `<div class="lg:p-2 w-full">
    <div
      class="overflow-hidden rounded-lg shadow-md mb-5 bg-primary py-3 px-8"
    >
      <div class="w-full mb-2">
        <h1 class="text-light">` +
          hasil.nomorAyat +
          `</h1>
      </div>
      <div class="w-full text-right">
        <h1 class="text-2xl font-bold text-light dark:text-white mb-3">
        ` +
          hasil.teksArab +
          `
        </h1>
        <p class="text-base font-sm text-light">
        ` +
          hasil.teksLatin +
          `</p><p class="text-base font-sm text-light"> ` +
          hasil.teksIndonesia +
          `
        </p>
      </div>
    </div>
  </div>`
      );
    });
  },
});
