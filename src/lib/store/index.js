import { writable } from "svelte/store";

export const state = writable({
  datasets: [],
  dataset: "",
  dnoregion: "",
  generationmix: [],
  generationmixLabels: [],
  generationmixValues: [],
  generationmixChartData: {},
  intensity: null,
  regionid: "",
  shortname: "",
  sourceregion: [],
  sourceregionLabels: [],
  sourceregionValues: [],
  sourceregionChartData: {},
  // Chart
  chartColors: [
    "rgba(255, 99, 132, 0.75)",
    "rgba(54, 162, 235, 0.75)",
    "rgba(255, 206, 86, 0.75)",
    "rgba(75, 192, 192, 0.75)",
    "rgba(153, 102, 255, 0.75)",
    "rgba(255, 159, 64, 0.75)",
    "rgba(111, 159, 64, 0.75)",
  ],
  chartBorderWidth: 1,
})

