$("header").append(`<div class="container">
<div class="relative flex items-center justify-between">
  <div class="px-4 logo">
    <a
      href="/"
      class="block py-6 text-2xl font-bold text-dark dark:text-white"
      >Quranku</a
    >
  </div>
  <div class="flex items-center">
    <nav
      id="nav-menu"
      class="fixed bottom-0 left-0 w-full shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] dark:bg-dark rounded-lg bg-white py-2 lg:static lg:block lg:max-w-full lg:rounded-none lg:bg-transparent lg:shadow-none lg:dark:bg-transparent"
    >
      <ul class="flex items-center justify-center lg:flex">
        <li class="group">
          <a
            href="/"
            class="mx-14 flex py-2 text-base font-semibold text-dark group-hover:text-secondary dark:text-white"
            ><i class="bx bx-book-open text-3xl lg:hidden"></i>
            <span class="hidden lg:block">Surah</span></a
          >
        </li>
        <li class="group">
          <a
            href="/murotal.html"
            class="mx-14 flex py-2 text-base font-semibold text-dark group-hover:text-secondary dark:text-white"
            ><i class="bx bxs-playlist text-3xl lg:hidden"></i>
            <span class="hidden lg:block">Murotal</span></a
          >
        </li>
        <li class="group">
          <a
            href="/jadwal.html"
            class="mx-14 flex py-2 text-base font-semibold text-dark group-hover:text-secondary dark:text-white"
            ><i class="bx bx-book-content text-3xl lg:hidden"></i>
            <span class="hidden lg:block">Jadwal Sholat</span></a
          >
        </li>
      </ul>
    </nav>
  </div>
  <div class="flex items-center mx-6 lg:mt-2">
    <div class="flex">
      <input type="checkbox" class="hidden" id="dark-toggle" />
      <label for="dark-toggle">
        <i
          class="bx bx-sun cursor-pointer text-2xl text-dark dark:text-white transition duration-300"
          id="mode"
        ></i>
      </label>
    </div>
  </div>
</div>
</div>`);
