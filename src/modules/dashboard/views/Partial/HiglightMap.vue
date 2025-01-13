<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { markerData, colorMarker } from "@/constants";

const router = useRouter();

// Mengatur opsi Highcharts untuk peta
const chartOptions = ref<Record<string, any>>({
  chart: {
    map: null,
  },
  legend: {
    enabled: false,
  },
  title: {
    text: "",
  },
  mapNavigation: {
    enabled: true,
    enableDoubleClickZoomTo: true,
    buttonOptions: {
      alignTo: "spacingBox",
    },
  },
  colorAxis: {
    min: 0,
    stops: [
      [0, "#37AFE1"], // Color at minimum value
      [0.5, "#37AFE1"], // Color at mid-range
      [1, "#37AFE1"], // Color at maximum value
    ],
  },
  tooltip: {
    enabled: true,
    useHTML: true, // Menggunakan HTML untuk kustomisasi
    // pointFormat: '<b class="text-md">{point.name}</b>', // Format isi tooltip
    formatter: function () {
      return this.series.name == "Lokasi"
        ? `<strong>${this.point.name}</strong>`
        : false; // Menampilkan nama marker saat di-hover
    },
  },
  series: [
    {
      name: "Wilayah",
      enableMouseTracking: false,
      states: {
        hover: {
          enable: false,
        },
      },
      dataLabels: {
        useHTML: true, // Menggunakan HTML untuk kustom
        enabled: true,
        format: "<b>{point.name}</b>",
        color: "#000000",
      },
      allAreas: true,
      data: [],
      joinBy: "slug",
      point: {
        events: {
          /**
           * Saat region di-klik, maka panggil fungsi `handleClick`
           * dengan mengirimkan event sebagai argumen.
           * @param {object} e - Event yang di-trigger saat region di-klik.
           */
          click: (e) => {
            handleClick(e);
          },
          /**
           * Saat mouse di-hover ke suatu region, maka zoom ke region
           * tersebut dan tambahkan efek tebal dan bayangan.
           */
          mouseOver: function () {
            // Zoom ke region yang di-hover
          },
          mouseOut: function () {
            // Reset zoom saat mouse keluar
          },
        },
      },
    },
    {
      // Seri untuk marker atau poin yang ditambahkan
      type: "mappoint",
      name: "Lokasi",
      dataLabels: {
        enabled: false, // Data label tidak ditampilkan secara default
      },
      data: markerData,
      marker: {
        radius: 6, // Ukuran marker
        symbol: "circle", // Bentuk marker
      },
      point: {
        events: {
          click: function () {
            // Logika ketika marker diklik
            // alert(`Anda mengklik marker: ${this.name}`);
            // Contoh: Navigasi ke halaman atau aksi lain
            // console.log('Marker data:', this);
            router.push(`/priok`);
          },
        },
      },
    },
  ],
});

// Fungsi untuk memuat data peta secara dinamis
async function loadMapData() {
  try {
    const mapData = await fetch("/json/indonesia.json").then((res) =>
      res.json()
    );
    chartOptions.value.chart.map = mapData;

    // Menambahkan data kecamatan setelah peta dimuat
    chartOptions.value.series[0].data = mapData.features.map(
      (item: Record<string, any>) => {
        return {
          slug: item.properties.slug,
          // value: 10,
          color: [
            "Jawa Barat",
            "Aceh",
            "Bali",
            "Jambi",
            "Jawa Timur",
            "Kalimantan Barat",
            "Gorontalo",
            "Maluku",
          ].includes(item.properties.state)
            ? "#0070c0"
            : [
                "Kalimantan Timur",
                "Papua",
                "Maluku Utara",
                "Sulawesi Selatan",
                "Riau",
                "Lampung",
                "Nusa Tenggara Timur",
              ].includes(item.properties.state)
            ? "#00B0F0"
            : "#2AB6C0",
          name: item.properties.state,
        };
      }
    );
  } catch (error) {
    console.error("Error loading map data:", error);
  }
}

const handleClick = (event: any) => {
  console.log("clicked", event.point);
  // router.push(`/priok`);
};

// Memuat data peta ketika komponen dipasang
onMounted(() => {
  loadMapData();
});
</script>

<template>
  <div>
    <div class="map-title">
      <p class="text-center font-extrabold text-lg text-neutral-50">
        UNIT PEMBANGKIT PT PLN INDONESIA POWER
      </p>
    </div>
    <highcharts
      :constructorType="'mapChart'"
      class="hc"
      :options="chartOptions"
      ref="chart"
    ></highcharts>
    <div
      class="absolute z-50 pointer-events-none bottom-10 left-10 text-[#2AB6C0] max-w-[400px]"
    >
      <h1 class="text-2xl font-bold my-3 italic">GENERATE SCOPE</h1>
      <p class="text-justify indent-20">
        Aplikasi ini merupakan aplikasi berbasis web yang digunakan untuk
        membuat scope overhoul berdasarkan kondisi asset pembangkit yang
        dilengkapi dengan fitur visualisasi proses pekerjaan dan data penunjang,
        sehingga memudahkan planner untuk memastikan ketepatan durasi dan
        budgeting.
      </p>
    </div>
    <div class="flex gap-4 absolute right-16">
      <div
        class="flex flex-col items-center"
        v-for="(maker, i) in colorMarker"
        :key="i"
      >
        <div
          class="w-4 h-4 rounded-full border shadow-md"
          :style="{ backgroundColor: maker.hexColor }"
        />
        <span class="text-md text-slate-950">{{ maker.title }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.hc
  width: 100%
  height: 80vh

.map-title
  @apply w-[600px] py-2 bg-[#2AB6C0] opacity-[0.5] mr-[-22px] absolute z-[1] left-[50%] translate-x-[-50%]
  clip-path: polygon(5% 0, 100% 0, 95% 100%, 0% 100%)
</style>
