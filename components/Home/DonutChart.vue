<template lang="pug">
    .chart-container
      canvas(ref="canvasRef" id="bar-chart")
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { Chart } from 'chart.js/auto'
  
  const canvasRef = ref<Chart | null>(null)
  const chart = ref<any>(null)
    const centerTextPlugin = {
  id: 'centerText',
  beforeDraw: (chart:any) => {
    const { ctx, width, height } = chart;
    ctx.restore();
    const fontSize = (height / 350).toFixed(2);
    ctx.font = `${fontSize}em sans-serif`;
    ctx.textBaseline = 'center';
    ctx.fillStyle = 'rgba(12, 164, 56, 1)'; // Cambia el color aquí

const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
const text = new Date().toLocaleDateString('es-ES', options);
    const textX = Math.round((width - ctx.measureText(text).width) / 2);
    const textY = height / 2;

    ctx.fillText(text, textX, textY);
    ctx.save();
  }
};
  onMounted(() => {
    if (canvasRef.value) {
      const ctx = canvasRef.value.getContext('2d')
      chart.value = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Disueltos', 'Activos', 'Exportadores', 'Incubados en parque científico', 'Desistimiento por carta de socios', 'Inscritos en registro mercantil'],
          datasets: [{
            label: 'Total',
            data: [10, 20, 30, 40, 50, 60],
            backgroundColor: ['red','blue','green','yellow','gray', 'purple'],
            borderColor: 'white',
            borderWidth: 2,
            borderRadius: 20,
            hoverBorderWidth: 5,
            hoverBorderColor:['red','blue','green','yellow','gray', 'purple'],
            spacing:15
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
          animateScale: true,
          animateRotate: true,
          duration: 5000
          },
          plugins:{
            legend:{
              position:'bottom'
            }
          }
        },
        plugins:[centerTextPlugin]
        
      })
    }
  })
  </script>
  
  <style scoped>
  .chart-container {
    position: relative;
    width: 100%;
    height: 400px;
  }
  </style>
  