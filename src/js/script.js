// Darkmode toggle
const darkToggle = document.querySelector("#dark-toggle");
const html = document.querySelector("html");

darkToggle.addEventListener("click", function () {
  if (darkToggle.checked) {
    html.classList.add("dark");
    localStorage.theme = "dark";
    $("#mode").removeClass("bx-sun").addClass("bx-moon");
  } else {
    html.classList.remove("dark");
    localStorage.theme = "light";
    $("#mode").removeClass("bx-moon").addClass("bx-sun");
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
          <h1 class="text-2xl font-bold text-white">
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

const setLokasi = $("select#lokasi").change(function () {
  var id = $(this).children("option:selected").val();
  window.localStorage.setItem("lokasi", String(id));
  location.reload();
});

// get nomor surah
const getNomor = window.localStorage.getItem("nomor");
const getSuara = window.localStorage.getItem("suara");
const getLokasi = window.localStorage.getItem("lokasi");

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
          <h1 class="text-white text-3xl">${data.nama} </h1>
        </div>
        <div class="w-full flex items-center justify-center">
          <p class="text-light">${data.namaLatin} - ${data.tempatTurun} - ${data.arti}</p>
        </div>
      </div>
    </div>

    <a href="../tafsir.html" onclick="getDetailSurah(${data.nomor})" class="w-full">
      <div
        class="overflow-hidden rounded-lg shadow-md mb-5 bg-primary py-3 px-8"
      >
        <div class="w-full flex items-center justify-center">
          <p class="text-white text-lg font-bold">Baca Tafsir</p>
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
        <h1 class="text-white text-2xl">
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
        <h1 class="text-2xl font-bold text-white mb-3 text-right">
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
      <a href="../detail.html" onclick="getDetailSurah(${nextSurah.nomor})" class="w-1/2 text-light hover:text-white transition duration-200">
        <div
          class="overflow-hidden rounded-lg shadow-md mb-5 bg-primary py-3 px-8"
        >
          <div class="w-full flex items-center justify-center">
            <p class="text-medium">${nextSurah.namaLatin} </p>
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
            <a href="../detail.html" onclick="getDetailSurah(${prevSurah.nomor})" class="text-light hover:text-white text-medium">${prevSurah.namaLatin} </a>
            <a href="../detail.html" onclick="getDetailSurah(${nextSurah.nomor})" class="text-light hover:text-white text-medium">${nextSurah.namaLatin} </a>
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
          <h1 class="text-white text-3xl">${data.nama} </h1>
        </div>
        <div class="w-full flex items-center justify-center">
          <p class="text-light">${data.namaLatin} - ${data.tempatTurun} - ${data.arti}</p>
        </div>
      </div>
    </div>

    <a href="../detail.html" onclick="getDetailSurah(${data.nomor})" class="w-full">
      <div
        class="overflow-hidden rounded-lg shadow-md mb-5 bg-primary py-3 px-8"
      >
        <div class="w-full flex items-center justify-center">
          <p class="text-white text-lg font-bold">Baca Surah</p>
        </div>
      </div>
    </a>
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
        <h1 class="text-base text-white mb-3">
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
      <a href="../tafsir.html" onclick="getDetailSurah(${nextSurah.nomor})" class="w-1/2 text-light hover:text-white transition duration-200">
        <div
          class="overflow-hidden rounded-lg shadow-md mb-5 bg-primary py-3 px-8"
        >
          <div class="w-full flex items-center justify-center">
            <p class="text-medium">${nextSurah.namaLatin} </p>
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
            <a href="../tafsir.html" onclick="getDetailSurah(${prevSurah.nomor})" class="text-light hover:text-white text-medium">${prevSurah.namaLatin} </a>
            <a href="../tafsir.html" onclick="getDetailSurah(${nextSurah.nomor})" class="text-light hover:text-white text-medium">${nextSurah.namaLatin} </a>
          </div>
        </div>
      </div>
      `
      );
    }
  },
});

// data murotal
$.ajax({
  url: "https://equran.id/api/v2/surat",
  type: "get",
  dataType: "JSON",
  success: function (result) {
    let murotal = result.data;
    let suara = getSuara;
    let currentSongIndex = 0;
    let isPlaying = false;
    // let isMuted = false;
    const playlist = $("#daftar-murotal");
    const selectSuara = $("select#suara");
    const myAudio = $("#my-audio");

    if (selectSuara.val() == suara) {
      selectSuara.attr("selected", "selected");
    }

    $("select#suara").val(suara);

    $.each(murotal, function (i, hasil) {
      playlist.append(
        `<div id="murotal" class="lg:p-2 w-full cursor-pointer lg:w-1/4" data-id="${hasil.nomor}" data-value="${hasil.audioFull[suara]}" data-nama="${hasil.namaLatin}">
      <div
        class="overflow-hidden rounded-lg shadow-md mb-5 bg-gradient-to-r bg-primary py-3 px-8"
      >
        <div class="w-full mb-2">
          <h1 class="text-light">${hasil.nomor}. ${hasil.namaLatin}</h1>
        </div>
        <div class="w-full text-right">
          <h1 class="text-2xl font-bold text-white">
          ${hasil.nama}
          </h1>
          <p class="text-base font-sm text-light">${hasil.tempatTurun} - ${hasil.arti}</p>
        </div>
      </div>
    </div>`
      );
    });

    playlist.on("click", "#murotal", function () {
      currentSongIndex = $(this).data("id");
      $(".player").removeClass("hidden").addClass("block");
      playSong();
    });

    // Tambahkan event click pada tombol prev
    $("#prevBtn").on("click", function () {
      if (currentSongIndex > 0) {
        currentSongIndex--;
        playSong();
      }
    });

    // Tambahkan event click pada tombol next
    $("#nextBtn").on("click", function () {
      if (currentSongIndex < murotal.length - 1) {
        currentSongIndex++;
        playSong();
      }
    });

    // Volume control
    // $("#muteBtn").on("click", function () {
    //   const audioPlayer = myAudio[0];

    //   if (isMuted) {
    //     audioPlayer.muted = false;
    //     $("#muteBtn i")
    //       .removeClass("bx-volume-mute")
    //       .addClass("bx-volume-full");
    //   } else {
    //     audioPlayer.muted = true;
    //     $("#muteBtn i")
    //       .removeClass("bx-volume-full")
    //       .addClass("bx-volume-mute");
    //   }

    //   isMuted = !isMuted;
    // });

    $("#playPauseBtn").on("click", function () {
      const audioPlayer = myAudio[0];

      if (isPlaying) {
        audioPlayer.pause();
        $("#playPauseBtn i").removeClass("bx-play").addClass("bx-pause");
      } else {
        audioPlayer.play();
        $("#playPauseBtn i").removeClass("bx-pause").addClass("bx-play");
      }

      isPlaying = !isPlaying;
    });

    // Update progress bar during audio playback
    myAudio.on("timeupdate", function () {
      const audioPlayer = this;
      const progressBar = $("#progressBar");
      const currentTimeDisplay = $("#currentTime");
      const totalTimeDisplay = $("#totalTime");
      const titleDisplay = $("#judul");

      const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
      progressBar.css("width", progress + "%");

      // Update current time display
      const minutes = Math.floor(audioPlayer.currentTime / 60);
      const seconds = Math.floor(audioPlayer.currentTime % 60);
      const formattedTime = padZero(minutes) + ":" + padZero(seconds);
      currentTimeDisplay.text(formattedTime);

      // Update total duration display
      const totalHours = Math.floor(audioPlayer.duration / 3600);
      const totalMinutes = Math.floor((audioPlayer.duration % 3600) / 60);
      const totalSeconds = Math.floor(audioPlayer.duration % 60);
      const formattedTotalTime =
        padZero(totalHours) +
        ":" +
        padZero(totalMinutes) +
        ":" +
        padZero(totalSeconds);
      totalTimeDisplay.text(formattedTotalTime);

      // Update title display
      titleDisplay.text(murotal[currentSongIndex - 1].namaLatin);
    });

    myAudio.on("ended", function () {
      if (currentSongIndex < murotal.length - 1) {
        currentSongIndex++;
        playSong();
      }
    });

    // Handle click on progress bar to seek
    $(".audio-progress").on("click", function (e) {
      const audioPlayer = $("#audioPlayer")[0];
      const progressBar = $("#progressBar");
      const seekPosition = (e.pageX - $(this).offset().left) / $(this).width();

      audioPlayer.currentTime = audioPlayer.duration * seekPosition;
      progressBar.css("width", seekPosition * 100 + "%");
    });

    function padZero(num) {
      return (num < 10 ? "0" : "") + num;
    }

    function playSong() {
      const srcUrl = murotal[currentSongIndex - 1].audioFull[suara];

      myAudio.attr("src", srcUrl);
      myAudio[0].load();
      myAudio[0].play();
    }
  },
});

// Jadwal Sholat
// menampilkan waktu
$(document).ready(function () {
  var waktuSekarang = new Date();
  // menambahkan waktu
  var jam = waktuSekarang.getHours();
  var menit = waktuSekarang.getMinutes();
  // manambahkan tahun, bulan, tanggal
  var tahun = waktuSekarang.getFullYear();
  var bulan = waktuSekarang.getMonth() + 1; // Perlu ditambah 1 karena indeks bulan dimulai dari 0
  var tanggal = waktuSekarang.getDate();

  // menampilkan waktu
  jam = jam < 10 ? "0" + jam : jam;
  menit = menit < 10 ? "0" + menit : menit;
  $("#waktu").text(jam + " : " + menit);

  // menampiilkan tahun, bulan, tanggal
  bulan = bulan < 10 ? "0" + bulan : bulan;
  tanggal = tanggal < 10 ? "0" + tanggal : tanggal;
  $("#tanggal").text(tanggal + "/" + bulan + "/" + tahun);
});

// manampilkan data kota
$.ajax({
  url: "https://api.myquran.com/v2/sholat/kota/semua",
  type: "get",
  dataType: "JSON",
  success: function (result) {
    let kota = result.data;

    $.each(kota, function (i, hasil) {
      $("select#lokasi").append(
        `<option value="${hasil.id}">${hasil.lokasi}</option>`
      );
    });
  },
});

// menampilkan daerah
$.ajax({
  url: `https://api.myquran.com/v2/sholat/kota/${getLokasi}`,
  type: "get",
  dataType: "JSON",
  success: function (result) {
    let kota = result.data;
    console.log(kota);
    $("#daerah").text(kota.lokasi);
  },
});

// menampilkan jadwal harian
var waktuSekarang = new Date();
var tahun = waktuSekarang.getFullYear();
var bulan = waktuSekarang.getMonth() + 1; // Perlu ditambah 1 karena indeks bulan dimulai dari 0
var tanggal = waktuSekarang.getDate();
bulan = bulan < 10 ? "0" + bulan : bulan;
tanggal = tanggal < 10 ? "0" + tanggal : tanggal;

$.ajax({
  url: `https://api.myquran.com/v2/sholat/jadwal/${getLokasi}/${tahun}/${bulan}/${tanggal}`,
  type: "get",
  dataType: "JSON",
  success: function (result) {
    let jadwal = result.data.jadwal;
    console.log(jadwal);

    $("#jadwal-sholat").append(`<div class="w-full">
    <div
      class="overflow-hidden rounded-lg shadow-md mb-5 bg-primary py-3 px-8 flex items-center justify-between"
    >
      <p class="text-white text-base">Imsak</p>
      <h1 class="text-white text-2xl">${jadwal.imsak}</h1>
    </div>
    <div
      class="overflow-hidden rounded-lg shadow-md mb-5 bg-primary py-3 px-8 flex items-center justify-between"
    >
      <p class="text-white text-base">Subuh</p>
      <h1 class="text-white text-2xl">${jadwal.subuh}</h1>
    </div>
    <div
      class="overflow-hidden rounded-lg shadow-md mb-5 bg-primary py-3 px-8 flex items-center justify-between"
    >
      <p class="text-white text-base">Dzuhur</p>
      <h1 class="text-white text-2xl">${jadwal.dzuhur}</h1>
    </div>
    <div
      class="overflow-hidden rounded-lg shadow-md mb-5 bg-primary py-3 px-8 flex items-center justify-between"
    >
      <p class="text-white text-base">Ashar</p>
      <h1 class="text-white text-2xl">${jadwal.ashar}</h1>
    </div>
    <div
      class="overflow-hidden rounded-lg shadow-md mb-5 bg-primary py-3 px-8 flex items-center justify-between"
    >
      <p class="text-white text-base">Maghrib</p>
      <h1 class="text-white text-2xl">${jadwal.maghrib}</h1>
    </div>
    <div
      class="overflow-hidden rounded-lg shadow-md mb-5 bg-primary py-3 px-8 flex items-center justify-between"
    >
      <p class="text-white text-base">Isya</p>
      <h1 class="text-white text-2xl">${jadwal.isya}</h1>
    </div>
  </div>`);
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
