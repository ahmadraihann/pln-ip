import { getRandomColorFromSpecific } from "@/helpers";


interface ColorMarker {
    title: string;
    hexColor: string;
}
export const colorMarker: ColorMarker[] = [
    {
        title: 'PLTG/U',
        hexColor: '#D84040',
    },
    {
        title: 'PLTU',
        hexColor: '#000000',
    },
    {
        title: 'PLTA',
        hexColor: '#EB5A3C',
    },
    {
        title: 'PLTP',
        hexColor: '#7E5CAD',
    },
    {
        title: 'PLTD/G',
        hexColor: '#ECE852',
    },
    {
        title: 'PLTMG',
        hexColor: '#FFFFFF',
    }
];

export const markerData = [
    {
        name: 'PRIOK',
        lat: -6.139100,   // Koordinat Latitude
        lon: 106.866802,  // Koordinat Longitude,
        color: colorMarker[0].hexColor
    },
    {
        name: 'CILEGON',
        lat: -6.001673,   // Koordinat Latitude
        lon: 106.021838,  // Koordinat Longitude,
        color: colorMarker[0].hexColor
    },
    {
        name: 'SALAK',
        lat: -8.153170,   // Koordinat Latitude
        lon: 111.968737,  // Koordinat Longitude,
        color: colorMarker[3].hexColor
    },
    {
        name: 'DARAJAT',
        lat: -7.216796,   // Koordinat Latitude
        lon: 107.743996,  // Koordinat Longitude,
        color: colorMarker[3].hexColor
    },
    {
        name: 'KAMOJANG',
        lat: -7.124574,   // Koordinat Latitude
        lon: 107.798970,  // Koordinat Longitude,
        color: colorMarker[3].hexColor
    },
    {
        name: 'SEMARANG',
        lat: -6.989965,  // Koordinat Latitude
        lon: 110.440408,  // Koordinat Longitude,
        color: colorMarker[0].hexColor
    },
    {
        name: 'GRATI',
        lat: -7.733880,  // Koordinat Latitude
        lon: 113.003815, // Koordinat Longitude,
        color: colorMarker[0].hexColor
    },
    {
        name: 'BALI',
        lat: -8.275988,  // Koordinat Latitude
        lon: 114.846300, // Koordinat Longitude,
        color: colorMarker[4].hexColor
    },
    {
        name: 'JERANJANG',
        lat: -8.658602, // Koordinat Latitude
        lon: 116.072923,  // Koordinat Longitude,
        color: colorMarker[1].hexColor
    },
    {
        name: 'ULUMBU',
        lat: -8.725420,    // Koordinat Latitude
        lon: 120.435970,  // Koordinat Longitude,
        color: colorMarker[5].hexColor
    },
    {
        name: 'SLAYAR',
        lat: -6.056195,   // Koordinat Latitude
        lon: 120.483340,  // Koordinat Longitude,
        color: colorMarker[5].hexColor
    },
    {
        name: 'MERAUKE',
        lat: -8.489533,   // Koordinat Latitude
        lon: 140.400288,  // Koordinat Longitude,
        color: colorMarker[5].hexColor
    },
    { name: 'HOLTEKAMP', lat: -2.6016, lon: 140.7491, color: colorMarker[1].hexColor },    // Approximate coordinates
    { name: 'MERAUKE', lat: -8.4942, lon: 140.4017, color: colorMarker[5].hexColor },
    { name: 'TIMIKA', lat: -4.5283, lon: 136.8881, color: colorMarker[5].hexColor },
    { name: 'BIAK', lat: -1.1911, lon: 136.0855, color: colorMarker[5].hexColor },
    { name: 'NABIRE', lat: -3.3556, lon: 135.5044, color: colorMarker[5].hexColor },
    { name: 'MANOKWARI', lat: -0.8615, lon: 134.0626, color: colorMarker[5].hexColor },
    { name: 'SORONG', lat: -0.8762, lon: 131.2556, color: colorMarker[5].hexColor },
    { name: 'LAHENDONG', lat: 1.3150, lon: 124.8390, color: colorMarker[3].hexColor },     // Sulawesi coordinates
    { name: 'BARRU', lat: -4.4058, lon: 119.6820, color: colorMarker[5].hexColor },
    { name: 'BERAU', lat: 2.1667, lon: 117.4167, color: colorMarker[1].hexColor },
    { name: 'MUARAJAWA', lat: -3.9933, lon: 122.5195, color: colorMarker[1].hexColor },    // Southeast Sulawesi region
    { name: 'ASAM ASAM', lat: -3.9809, lon: 115.2896, color: colorMarker[1].hexColor },    // Kalimantan region
    { name: 'SINTANG', lat: 0.0654, lon: 111.4936, color: colorMarker[1].hexColor },
    { name: 'SANGGAU', lat: 0.1180, lon: 110.5957, color: colorMarker[1].hexColor },
    { name: 'BENGKAYANG', lat: 0.8319, lon: 109.5779, color: colorMarker[1].hexColor },
    { name: 'PANGKALAN SUSU', lat: 4.1386, lon: 98.2895, color: colorMarker[1].hexColor },
    { name: 'LABUHAN ANGIN', lat: 3.0059, lon: 99.1064, color: colorMarker[1].hexColor },
    { name: 'UPDK KEPRI', lat: 1.0597, lon: 104.0530, color: colorMarker[1].hexColor },    // Batam area approximation
    { name: 'BUKIT TINGGI', lat: -0.3056, lon: 100.3691, color: colorMarker[2].hexColor },
    { name: 'OMBILIN', lat: -0.6029, lon: 100.7532, color: colorMarker[1].hexColor },
    { name: 'TELUK SIRIH', lat: -1.4163, lon: 116.7339, color: colorMarker[1].hexColor },  // Borneo region
    { name: 'JAMBI', lat: -1.6101, lon: 103.6131, color: colorMarker[0].hexColor },
    { name: 'KERAMASAN', lat: -3.1731, lon: 104.8243, color: colorMarker[5].hexColor },    // South Sumatra
    { name: 'BENGKULU', lat: -3.7928, lon: 102.2604, color: colorMarker[2].hexColor },
    { name: 'SURALAYA', lat: -5.9113, lon: 106.0186, color: colorMarker[1].hexColor },     // Near Merak, Banten
    { name: 'LONTAR', lat: -6.4054, lon: 106.0564, color: colorMarker[1].hexColor },
    { name: 'LABUHAN', lat: -6.7554, lon: 106.5163, color: colorMarker[1].hexColor },
    { name: 'PELABUHAN RATU', lat: -6.9819, lon: 106.5493, color: colorMarker[1].hexColor },
    { name: 'ADIPALA', lat: -7.7219, lon: 109.1834, color: colorMarker[1].hexColor },
    { name: 'SAGULING', lat: -6.917686, lon: 107.406212, color: colorMarker[2].hexColor },
    { name: 'MRICA', lat: -7.384139, lon: 109.617167, color: colorMarker[2].hexColor },
    { name: 'SELAYAR', lat: -6.575, lon: 121.025, color: colorMarker[4].hexColor },
    { name: 'MAHAKAM', lat: -0.200, lon: 117.800, color: colorMarker[4].hexColor }
];