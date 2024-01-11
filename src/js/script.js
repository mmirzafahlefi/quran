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
        `<a href="../detail.html" id="surah" class="lg:p-2 w-full lg:w-1/4" onclick="getDetailSurah(${hasil.nomor})" data-search="${hasil.namaLatin}">
      <div
        class="overflow-hidden rounded-lg shadow-md mb-5 bg-primary py-3 px-8"
      >
        <div class="w-full mb-2">
          <h1 class="text-light">${hasil.nomor}. ${hasil.namaLatin}</h1>
        </div>
        <div class="w-full text-right">
          <h1 class="text-2xl font-bold text-light dark:text-white">
          ${hasil.nama}
          </h1>
          <p class="text-base font-sm text-light">${hasil.tempatTurun} - ${hasil.arti}</p>
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

const getNomorSuara = $("select#suara").change(function () {
  var Suara = $(this).children("option:selected").val();
  window.localStorage.setItem("suara", String(Suara));
  location.reload();
});

// get nomor surah
const getNomor = window.localStorage.getItem("nomor");
const getSuara = window.localStorage.getItem("suara");

// detail surah
$.ajax({
  url: `https://equran.id/api/v2/surat/${getNomor}`,
  type: "get",
  dataType: "JSON",
  success: function (result) {
    let data = result.data;
    let surah = result.data.ayat;
    let nextSurah = result.data.suratSelanjutnya;
    let prevSurah = result.data.suratSebelumnya;

    $("#detail-surah").append(
      `
    <div class="w-full">
      <div
        class="overflow-hidden rounded-lg shadow-md mb-5 bg-primary py-3 px-8"
      >
        <div class="w-full mb-2 flex items-center justify-center">
          <h1 class="text-light dark:text-white text-3xl">${data.nama} </h1>
        </div>
        <div class="w-full flex items-center justify-center">
          <p class="text-light dark:text-white">${data.namaLatin} - ${data.tempatTurun} - ${data.arti}</p>
        </div>
      </div>
    </div>

    <a href="../tafsir.html" onclick="getDetailSurah(${data.nomor})" class="w-full">
      <div
        class="overflow-hidden rounded-lg shadow-md mb-5 bg-primary py-3 px-8"
      >
        <div class="w-full flex items-center justify-center">
          <p class="text-light dark:text-white text-lg font-bold">Baca Tafsir</p>
        </div>
      </div>
    </a>
    `
    );

    if (getNomor == "1") {
    } else if (getNomor == "9") {
    } else {
      $("#detail-surah").append(`<div class="w-full">
      <div
        class="overflow-hidden rounded-lg shadow-md mb-5 bg-primary py-3 px-8 flex items-center justify-center"
      >
        <h1 class="text-light dark:text-white text-2xl">
          بِسْمِ اللّهِ الرَّحْمَنِ الرَّحِيْ
        </h1>
      </div>
    </div>`);
    }

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
      <div class="w-full">
        <h1 class="text-2xl font-bold text-light dark:text-white mb-3 text-right">
        ` +
          hasil.teksArab +
          `
        </h1>
        <p class="text-base font-sm text-light mb-2">
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

    if (getNomor == "1") {
      $("#detail-surah").append(
        `
      <a href="../detail.html" onclick="getDetailSurah(${nextSurah.nomor})" class="w-1/2">
        <div
          class="overflow-hidden rounded-lg shadow-md mb-5 bg-primary py-3 px-8"
        >
          <div class="w-full flex items-center justify-center">
            <p class="text-light dark:text-white text-medium">${nextSurah.namaLatin} </p>
          </div>
        </div>
      </a>
      `
      );
    } else if (getNomor == "114") {
    } else {
      $("#detail-surah").append(
        `
      <div class="w-full">
        <div
          class="overflow-hidden rounded-lg shadow-md mb-5 bg-primary py-3 px-8"
        >
          <div class="w-full flex items-center justify-between">
            <a href="../detail.html" onclick="getDetailSurah(${prevSurah.nomor})" class="text-light dark:text-white text-medium">${prevSurah.namaLatin} </a>
            <a href="../detail.html" onclick="getDetailSurah(${nextSurah.nomor})" class="text-light dark:text-white text-medium">${nextSurah.namaLatin} </a>
          </div>
        </div>
      </div>
      `
      );
    }
  },
});

// detail tafsir
$.ajax({
  url: `https://equran.id/api/v2/tafsir/${getNomor}`,
  type: "get",
  dataType: "JSON",
  success: function (result) {
    let data = result.data;
    let tafsir = result.data.tafsir;
    let nextSurah = result.data.suratSelanjutnya;
    let prevSurah = result.data.suratSebelumnya;

    $("#detail-tafsir").append(
      `
    <div class="w-full">
      <div
        class="overflow-hidden rounded-lg shadow-md mb-5 bg-primary py-3 px-8"
      >
        <div class="w-full mb-2 flex items-center justify-center">
          <h1 class="text-light dark:text-white text-3xl">${data.nama} </h1>
        </div>
        <div class="w-full flex items-center justify-center">
          <p class="text-light dark:text-white">${data.namaLatin} - ${data.tempatTurun} - ${data.arti}</p>
        </div>
      </div>
    </div>

    <div class="w-full">
      <div
        class="overflow-hidden rounded-lg shadow-md mb-5 bg-primary py-3 px-8"
      >
        <div class="w-full flex items-center justify-center">
          <a href="../detail.html" onclick="getDetailSurah(${data.nomor})" class="text-light dark:text-white text-lg font-bold">Baca Surah</a>
        </div>
      </div>
    </div>
    `
    );

    $.each(tafsir, function (i, hasil) {
      $("#detail-tafsir").append(
        `<div class="lg:p-2 w-full">
    <div
      class="overflow-hidden rounded-lg shadow-md mb-5 bg-primary py-3 px-8"
    >
      <div class="w-full mb-2">
        <h1 class="text-light text-2xl font-bold">` +
          hasil.ayat +
          `</h1>
      </div>
      <div class="w-full">
        <h1 class="text-base text-light dark:text-white mb-3">
        ` +
          hasil.teks +
          `
        </h1>
      </div>
    </div>
  </div>`
      );
    });

    if (getNomor == "1") {
      $("#detail-tafsir").append(
        `
      <a href="../tafsir.html" onclick="getDetailSurah(${nextSurah.nomor})" class="w-1/2">
        <div
          class="overflow-hidden rounded-lg shadow-md mb-5 bg-primary py-3 px-8"
        >
          <div class="w-full flex items-center justify-center">
            <p class="text-light dark:text-white text-medium">${nextSurah.namaLatin} </p>
          </div>
        </div>
      </a>
      `
      );
    } else if (getNomor == "114") {
    } else {
      $("#detail-tafsir").append(
        `
      <div class="w-full">
        <div
          class="overflow-hidden rounded-lg shadow-md mb-5 bg-primary py-3 px-8"
        >
          <div class="w-full flex items-center justify-between">
            <a href="../tafsir.html" onclick="getDetailSurah(${prevSurah.nomor})" class="text-light dark:text-white text-medium">${prevSurah.namaLatin} </a>
            <a href="../tafsir.html" onclick="getDetailSurah(${nextSurah.nomor})" class="text-light dark:text-white text-medium">${nextSurah.namaLatin} </a>
          </div>
        </div>
      </div>
      `
      );
    }
  },
});

// data murotal
// function player() {
//   $(".player").append(`<div style="width: 50px; height: 50px"></div>
//     <div class="audio-player">
//       <div class="timeline">
//         <div class="progress"></div>
//       </div>
//       <div class="controls">
//         <div class="play-container">
//           <div class="toggle-play play"></div>
//         </div>
//         <div class="time">
//           <div class="current">0:00</div>
//           <div class="divider">/</div>
//           <div class="length"></div>
//         </div>
//         <div class="name">Music Song</div>
//         <!--     credit for icon to https://saeedalipoor.github.io/icono/ -->
//         <div class="volume-container">
//           <div class="volume-button">
//             <div class="volume icono-volumeMedium"></div>
//           </div>

//           <div class="volume-slider">
//             <div class="volume-percentage"></div>
//           </div>
//         </div>
//       </div>
//     </div>`);
// }
// player();

$("#daftar-murotal").on("click", `#${getNomor}`, function () {
  var value = $(this).data("value");
  audioPlayer = new oyoPlayer();
  $(".player").append(audioPlayer);
  audioPlayer.addToPlaylist(value, "play");
  audioPlayer.setSourceIndex(1);
  audioPlayer.setNotification("Push Play to start");
  // $(".player #my-audio").on("canplay", function () {
  //   console.log(this.duration);
  // });
});

// const getMurotal = function (link) {
//   const value = $(`#${getNomor}`).data("value");
//   console.log(value);
//   window.localStorage.setItem("link", link);
// };

$.ajax({
  url: "https://equran.id/api/v2/surat",
  type: "get",
  dataType: "JSON",
  success: function (result) {
    let murotal = result.data;
    let suara = getSuara;

    $.each(murotal, function (i, hasil) {
      $("#daftar-murotal").append(
        `<div id="${hasil.nomor}" class="lg:p-2 w-full cursor-pointer lg:w-1/4" onclick="getDetailSurah(${hasil.nomor})" data-search="${hasil.namaLatin}" data-value="${hasil.audioFull[suara]}">
      <div
        class="overflow-hidden rounded-lg shadow-md mb-5 bg-primary py-3 px-8"
      >
        <div class="w-full mb-2">
          <h1 class="text-light">${hasil.nomor}. ${hasil.namaLatin}</h1>
        </div>
        <div class="w-full text-right">
          <h1 class="text-2xl font-bold text-light dark:text-white">
          ${hasil.nama}
          </h1>
          <p class="text-base font-sm text-light">${hasil.tempatTurun} - ${hasil.arti}</p>
        </div>
      </div>
    </div>`
      );
    });
  },
});

// Cari surah
$(document).ready(function ($) {
  $("#search-input").keyup(function (event) {
    var filter = $(this).val(),
      count = 0;
    $("#daftar-surah #surah").each(function () {
      if ($(this).text().search(filter, "i") < 0) {
        $(this).fadeOut();
      } else {
        $(this).show();
        count++;
      }
    });
  });
});

$(document).ready(function ($) {
  $("#search-input").keyup(function (event) {
    var filter = $(this).val(),
      count = 0;
    $("#daftar-murotal #murotal").each(function () {
      if ($(this).text().search(filter, "i") < 0) {
        $(this).fadeOut();
      } else {
        $(this).show();
        count++;
      }
    });
  });
});
