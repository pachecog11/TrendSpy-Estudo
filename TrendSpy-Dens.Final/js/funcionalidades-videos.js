// Dados de exemplo para popular a tabela
const videos = [
  {
    titulo: 'Raramente pode ser um aspirador sem fio...',
    visualizacoes: '1,2M',
    engajamento: 'up',
    curtidas: '82,6K',
    comentarios: '13,5K',
    data: 'Apr 12 2024'
  },
  {
    titulo: 'Véu de vestido branco brilha sob luz negra!',
    visualizacoes: '706,4K',
    engajamento: 'up',
    curtidas: '40,7K',
    comentarios: '3,9K',
    data: 'Apr 12 2024'
  },
  {
    titulo: 'Esta é a maneira mais fácil de usar fita adesiva...',
    visualizacoes: '434,6K',
    engajamento: 'up',
    curtidas: '30,7K',
    comentarios: '3,8K',
    data: 'Apr 12 2024'
  },
  {
    titulo: 'Cadê a culpa?',
    visualizacoes: '420,1K',
    engajamento: 'up',
    curtidas: '27,3K',
    comentarios: '3,1K',
    data: 'Apr 11 2024'
  },
  {
    titulo: 'Esta é a melhor escova de dente elétrica...',
    visualizacoes: '405,9K',
    engajamento: 'up',
    curtidas: '34,6K',
    comentarios: '8,5K',
    data: 'Apr 11 2024'
  },
  {
    titulo: 'Uma construção de PC',
    visualizacoes: '387,3K',
    engajamento: 'up',
    curtidas: '28,4K',
    comentarios: '13,5K',
    data: 'Abr 11 2024'
  },
  {
    titulo: 'Uma construção de PC mini refrigerada a...',
    visualizacoes: '387,1K',
    engajamento: 'up',
    curtidas: '11,9K',
    comentarios: '47,6%',
    data: 'Abr 11 2024'
  }
];

function renderVideos(lista) {
  const tbody = document.getElementById('videos-lista');
  tbody.innerHTML = '';
  lista.forEach(video => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${video.titulo}</td>
      <td>${video.visualizacoes}</td>
      <td><span class="mini-grafico">${video.engajamento === 'up' ? '<svg width="40" height="16"><polyline points="0,16 10,10 20,12 30,6 40,2" style="fill:none;stroke:#3b82f6;stroke-width:2" /></svg>' : video.engajamento}</span></td>
      <td>${video.curtidas}</td>
      <td>${video.comentarios}</td>
      <td>${video.data}</td>
    `;
    tbody.appendChild(tr);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderVideos(videos);

  // Mostrar inputs de data personalizada
  const radiosData = document.querySelectorAll('input[name="data"]');
  radiosData.forEach(radio => {
    radio.addEventListener('change', () => {
      const isCustom = radio.value === 'custom';
      document.querySelectorAll('.input-data').forEach(input => {
        input.style.display = isCustom ? 'block' : 'none';
      });
    });
  });

  // Botão Limpar
  document.querySelector('.btn.limpar').addEventListener('click', () => {
    document.getElementById('filtros-form').reset();
    document.querySelectorAll('.input-data').forEach(input => {
      input.style.display = 'none';
    });
  });

  // Animação suave ao aplicar filtros
  document.getElementById('filtros-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const tabela = document.querySelector('.tabela-videos-wrapper');
    tabela.style.opacity = '0.5';
    setTimeout(() => {
      tabela.style.opacity = '1';
      // Aqui você pode filtrar os vídeos conforme os filtros selecionados
      renderVideos(videos); // Exemplo: sempre renderiza todos
    }, 250);
  });
}); 