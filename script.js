window.voltarMenuTanques = () => {
              esconderTudo();
              document.getElementById('menuTanquesScreen').style.display = 'block';
            };
        window.abrirTanque = (tipo) => {
          esconderTudo();

          if (tipo === 'bloco') {
            document.getElementById('tanquesScreen').style.display = 'block';
          }
          if (tipo === 'paulistinha') {
            document.getElementById('paulistinhaScreen').style.display = 'block';
          }
          if (tipo === 'guppy') {
            document.getElementById('guppyScreen').style.display = 'block';
          }
          if (tipo === 'bandeira') {
            document.getElementById('bandeiraScreen').style.display = 'block';
          }
          if (tipo === 'carpa') {
            document.getElementById('carpaScreen').style.display = 'block';
          }
          if (tipo === 'beta') {
            document.getElementById('betaScreen').style.display = 'block';
          }
        };
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
    import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

    const firebaseConfig = {
      apiKey: "AIzaSyDcu4PdUG5mgngyxKOXfhiQeHMDex-Y76s",
      authDomain: "peixe-do-meu-patrao.firebaseapp.com",
      projectId: "peixe-do-meu-patrao",
      storageBucket: "peixe-do-meu-patrao.firebasestorage.app",
      messagingSenderId: "887740051284",
      appId: "1:887740051284:web:76c65cb0f7bdaeba5222c1"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    let diaAtual = "";

    // ============ NAVEGAÇÃO ============
    function esconderTudo() {
      document.getElementById('loginScreen').style.display = 'none';
      document.querySelectorAll(".screen").forEach(s => s.style.display = "none");
    }

    document.getElementById('btnEntrar').addEventListener('click', () => {
      esconderTudo();
      document.getElementById('menuScreen').style.display = 'block';
    });

    document.getElementById('btnTanques').addEventListener('click', () => {
      esconderTudo();
      document.getElementById('menuTanquesScreen').style.display = 'block';
    });

    document.getElementById('btnCasa').addEventListener('click', () => {
      esconderTudo();
      document.getElementById('casaScreen').style.display = 'block';
    });

    document.getElementById('btnSemana').addEventListener('click', () => {
      esconderTudo();
      document.getElementById('semanaScreen').style.display = 'block';
    });

    window.voltarMenu = () => {
      esconderTudo();
      document.getElementById('menuScreen').style.display = 'block';
    };

    window.abrirDia = async (dia) => {
      diaAtual = dia;
      esconderTudo();
      document.getElementById('diaScreen').style.display = 'block';
      document.getElementById('diaTitulo').innerText = dia.toUpperCase();

      const ref = doc(db, "semana", dia);
      const snap = await getDoc(ref);
      document.getElementById('tarefasDia').value = snap.exists() ? snap.data().tarefas : "";
    };

    window.salvarDia = async () => {
      await setDoc(doc(db, "semana", diaAtual), {
        tarefas: document.getElementById('tarefasDia').value
      });
      document.getElementById('diaSalvo').innerText = "Salvo!";
      setTimeout(() => document.getElementById('diaSalvo').innerText = "", 2000);
    };

    window.voltarSemana = () => {
      esconderTudo();
      document.getElementById('semanaScreen').style.display = 'block';
    };

    // ============ SISTEMA DE TANQUES ============
    const rowsCount = 6;
    const cols = ['A','B','C','D','E'];
    const gridEl = document.getElementById('grid');
    const rowsEl = document.querySelector('.rows');
    const colsEl = document.querySelector('.cols');

    for(let r=1;r<=rowsCount;r++){
      const div = document.createElement('div');
      div.className='row-label';
      div.textContent = r;
      rowsEl.appendChild(div);
    }

    cols.forEach(c=>{
      const d = document.createElement('div'); 
      d.className='col-label'; 
      d.textContent=c; 
      colsEl.appendChild(d);
    });

    let data = {};
    const STORAGE_KEY = 'tanques_6x5_v1';
    const saved = localStorage.getItem(STORAGE_KEY);
    if(saved){ try{ data = JSON.parse(saved); }catch(e){ data = {}; } }
    
    if(!Object.keys(data).length){
      data = {
        '1A': { name: 'Molinésia Gold Black', image: 'fotos-bloco1/molinesia gold black.webp' },
        '2A': { name: 'Platy Pingo de Ouro', image: 'fotos-bloco1/Platy Pingo de Ouro.webp' },
        '3A': { name: 'Espada Abacaxi', image: 'fotos-bloco1/espada abacaxi.webp' },
        '4A': { name: 'Molinésia Prata', image: 'fotos-bloco1/Molinésia Prata.webp' },
        '5A': { name: 'Platy azul', image: 'fotos-bloco1/Platy azul.webp' },
        '6A': { name: 'Molinésia Tangerina', image: 'fotos-bloco1/molinesia-tangerina.jpg' },
        '1B': { name: 'Espada Tricolor', image: 'fotos-bloco1/espada tricolor.jpg' },
        '2B': { name: 'Filhotes' },
        '3B': { name: 'Molinésia Balão Prata', image: 'fotos-bloco1/Molinésia Balão Prata.webp' },
        '4B': { name: 'Platy Rubi', image: 'fotos-bloco1/Platy Rubi.webp' },
        '5B': { name: 'Filhotes' },
        '6B': { name: 'Espada Bicolor Albino', image: 'fotos-bloco1/Espada Bicolor Albino.webp' },
        '1C': { name: 'Molinésia Dálmata', image: 'fotos-bloco1/Molinésia Dálmata.webp' },
        '2C': { name: 'Platy Sunset', image: 'fotos-bloco1/Platy Sunset.webp' },
        '3C': { name: 'Molinésia Balão Dálmata', image: 'fotos-bloco1/Molinésia Balão Dálmata.webp' },
        '4C': { name: 'Espada Sangue' },
        '5C': { name: 'Platy Véu', image: 'fotos-bloco1/Platy Véu.webp' },
        '6C': { name: 'Molinésia Milk', image: 'fotos-bloco1/Molinésia Milk.webp' },
        '1D': { name: 'Espada Lira', image: 'fotos-bloco1/Espada Lira.webp' },
        '2D': { name: 'Livre' },
        '3D': { name: 'Platy Abelhinha', image: 'fotos-bloco1/Platy Abelhinha.webp' },
        '4D': { name: 'Molinesia tigre', image: 'fotos-bloco1/Molinesia tigre.webp' },
        '5D': { name: 'Livre' },
        '6D': { name: 'Platy tricolor', image: 'fotos-bloco1/Platy tricolor.webp' },
        '1E': { name: 'Platy Hawai', image: 'fotos-bloco1/Platy Hawai.webp' },
        '2E': { name: 'Molinésia Negra Lira', image: 'fotos-bloco1/Molinésia Negra Lira.webp' },
        '3E': { name: 'Livre' },
        '4E': { name: 'Livre' },
        '5E': { name: 'Molinesia negra', image: 'fotos-bloco1/Molinesia negra.webp' },
        '6E': { name: 'Livre' }
      };
    }

    for(let r=1;r<=rowsCount;r++){
      for(let ci=0;ci<cols.length;ci++){
        const col = cols[ci];
        const id = `${r}${col}`;
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.id = id;

        const img = document.createElement('img');
        img.alt = `Tanque ${id}`;
        img.src = data[id] && data[id].image ? data[id].image : '';
        if(!img.src) img.style.display='none';

        const title = document.createElement('div'); 
        title.className='title'; 
        title.textContent = `Tanque ${id}`;
        const subtitle = document.createElement('div'); 
        subtitle.className='subtitle'; 
        subtitle.textContent = data[id] && data[id].name ? data[id].name : '— (vazio)';

        cell.appendChild(img);
        cell.appendChild(title);
        cell.appendChild(subtitle);
        cell.addEventListener('click', ()=> openModal(id, subtitle, img));
        gridEl.appendChild(cell);
      }
    }

    // Paulistinha
    const gridPaulistinha = document.getElementById('gridPaulistinha');
    let dataPaulistinha = {};
    const STORAGE_KEY_PAULISTINHA = 'tanques_paulistinha_v1';
    const savedPaulistinha = localStorage.getItem(STORAGE_KEY_PAULISTINHA);
    if(savedPaulistinha){ try{ dataPaulistinha = JSON.parse(savedPaulistinha); }catch(e){ dataPaulistinha = {}; } }

    for(let i=0; i<=10; i++){
      const id = `P${i}`;
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.id = id;

      const img = document.createElement('img');
      img.alt = `Tanque ${i}`;
      img.src = dataPaulistinha[id] && dataPaulistinha[id].image ? dataPaulistinha[id].image : '';
      if(!img.src) img.style.display='none';

      const title = document.createElement('div'); 
      title.className='title'; 
      title.textContent = `Tanque ${i}`;
      const subtitle = document.createElement('div'); 
      subtitle.className='subtitle'; 
      subtitle.textContent = dataPaulistinha[id] && dataPaulistinha[id].name ? dataPaulistinha[id].name : '— (vazio)';

      cell.appendChild(img);
      cell.appendChild(title);
      cell.appendChild(subtitle);
      cell.addEventListener('click', ()=> openModalPaulistinha(id, subtitle, img));
      gridPaulistinha.appendChild(cell);
    }

    // Guppy
    const gridGuppy = document.getElementById('gridGuppy');
    let dataGuppy = {};
    const STORAGE_KEY_GUPPY = 'tanques_guppy_v1';
    const savedGuppy = localStorage.getItem(STORAGE_KEY_GUPPY);
    if(savedGuppy){ try{ dataGuppy = JSON.parse(savedGuppy); }catch(e){ dataGuppy = {}; } }

    const guppyTanks = [11, 12, 13, 14, 15, 16, 17, 18, 'Z', 'Y', 'X', 'W', 'V', 'U'];
    guppyTanks.forEach(tankNum => {
      const id = `G${tankNum}`;
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.id = id;

      const img = document.createElement('img');
      img.alt = `Tanque ${tankNum}`;
      img.src = dataGuppy[id] && dataGuppy[id].image ? dataGuppy[id].image : '';
      if(!img.src) img.style.display='none';

      const title = document.createElement('div'); 
      title.className='title'; 
      title.textContent = `Tanque ${tankNum}`;
      const subtitle = document.createElement('div'); 
      subtitle.className='subtitle'; 
      subtitle.textContent = dataGuppy[id] && dataGuppy[id].name ? dataGuppy[id].name : '— (vazio)';

      cell.appendChild(img);
      cell.appendChild(title);
      cell.appendChild(subtitle);
      cell.addEventListener('click', ()=> openModalGuppy(id, subtitle, img));
      gridGuppy.appendChild(cell);
    });

    // Bandeira
    const gridBandeira = document.getElementById('gridBandeira');
    let dataBandeira = {};
    const STORAGE_KEY_BANDEIRA = 'tanques_bandeira_v1';
    const savedBandeira = localStorage.getItem(STORAGE_KEY_BANDEIRA);
    if(savedBandeira){ try{ dataBandeira = JSON.parse(savedBandeira); }catch(e){ dataBandeira = {}; } }

    const bandeiraLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];
    bandeiraLetters.forEach(letter => {
      const id = `B${letter}`;
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.id = id;

      const img = document.createElement('img');
      img.alt = `Tanque ${letter}`;
      img.src = dataBandeira[id] && dataBandeira[id].image ? dataBandeira[id].image : '';
      if(!img.src) img.style.display='none';

      const title = document.createElement('div'); 
      title.className='title'; 
      title.textContent = `Tanque ${letter}`;
      const subtitle = document.createElement('div'); 
      subtitle.className='subtitle'; 
      subtitle.textContent = dataBandeira[id] && dataBandeira[id].name ? dataBandeira[id].name : '— (vazio)';

      cell.appendChild(img);
      cell.appendChild(title);
      cell.appendChild(subtitle);
      cell.addEventListener('click', ()=> openModalBandeira(id, subtitle, img));
      gridBandeira.appendChild(cell);
    });

    // Carpa
    const gridCarpa = document.getElementById('gridCarpa');
    let dataCarpa = {};
    const STORAGE_KEY_CARPA = 'tanques_carpa_v1';
    const savedCarpa = localStorage.getItem(STORAGE_KEY_CARPA);
    if(savedCarpa){ try{ dataCarpa = JSON.parse(savedCarpa); }catch(e){ dataCarpa = {}; } }

    const carpaLetters = ['N', 'O', 'P', 'Q', 'R', 'S'];
    carpaLetters.forEach(letter => {
      const id = `C${letter}`;
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.id = id;

      const img = document.createElement('img');
      img.alt = `Tanque ${letter}`;
      img.src = dataCarpa[id] && dataCarpa[id].image ? dataCarpa[id].image : '';
      if(!img.src) img.style.display='none';

      const title = document.createElement('div'); 
      title.className='title'; 
      title.textContent = `Tanque ${letter}`;
      const subtitle = document.createElement('div'); 
      subtitle.className='subtitle'; 
      subtitle.textContent = dataCarpa[id] && dataCarpa[id].name ? dataCarpa[id].name : '— (vazio)';

      cell.appendChild(img);
      cell.appendChild(title);
      cell.appendChild(subtitle);
      cell.addEventListener('click', ()=> openModalCarpa(id, subtitle, img));
      gridCarpa.appendChild(cell);
    });

    // Beta
    const gridBeta = document.getElementById('gridBeta');
    let dataBeta = {};
    const STORAGE_KEY_BETA = 'tanques_beta_v1';
    const savedBeta = localStorage.getItem(STORAGE_KEY_BETA);
    if(savedBeta){ try{ dataBeta = JSON.parse(savedBeta); }catch(e){ dataBeta = {}; } }

    const betaRows = {
      'A': ['A1', 'A2', 'A3', 'A4', 'A5', 'A6'],
      'B': ['B1', 'B2', 'B3', 'B4', 'B5'],
      'C': ['C1', 'C2', 'C3', 'C4', 'C5'],
      'D': ['D1', 'D2', 'D3', 'D4', 'D5'],
      'E': ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8']
    };

    Object.keys(betaRows).forEach(rowLetter => {
      const rowDiv = document.createElement('div');
      rowDiv.style.display = 'grid';
      rowDiv.style.gridTemplateColumns = 'repeat(8, minmax(110px,1fr))';
      rowDiv.style.gap = '12px';
      rowDiv.style.marginBottom = '12px';

      betaRows[rowLetter].forEach(tankNum => {
        const id = `BT${tankNum}`;
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.id = id;

        const img = document.createElement('img');
        img.alt = `Tanque ${tankNum}`;
        img.src = dataBeta[id] && dataBeta[id].image ? dataBeta[id].image : '';
        if(!img.src) img.style.display='none';

        const title = document.createElement('div'); 
        title.className='title'; 
        title.textContent = `Tanque ${tankNum}`;
        const subtitle = document.createElement('div'); 
        subtitle.className='subtitle'; 
        subtitle.textContent = dataBeta[id] && dataBeta[id].name ? dataBeta[id].name : '— (vazio)';

        cell.appendChild(img);
        cell.appendChild(title);
        cell.appendChild(subtitle);
        cell.addEventListener('click', ()=> openModalBeta(id, subtitle, img));
        rowDiv.appendChild(cell);
      });

      gridBeta.appendChild(rowDiv);
    });

    // Modal
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const fishName = document.getElementById('fishName');
    const fishImage = document.getElementById('fishImage');
    const imagePreview = document.getElementById('imagePreview');
    const saveBtn = document.getElementById('saveBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    let currentId = null;
    let currentPreviewDataUrl = null;
    let currentDataStore = null;

    function openModal(id){
      currentId = id;
      currentDataStore = data;
      modalTitle.textContent = `Editar ${id}`;
      fishName.value = (data[id] && data[id].name) ? data[id].name : '';
      currentPreviewDataUrl = (data[id] && data[id].image) ? data[id].image : null;
      renderPreview();
      fishImage.value = null;
      modal.classList.add('open');
      setTimeout(()=>fishName.focus(),150);
    }

    function openModalPaulistinha(id){
      currentId = id;
      currentDataStore = dataPaulistinha;
      modalTitle.textContent = `Editar Tanque ${id.replace('P','')}`;
      fishName.value = (dataPaulistinha[id] && dataPaulistinha[id].name) ? dataPaulistinha[id].name : '';
      currentPreviewDataUrl = (dataPaulistinha[id] && dataPaulistinha[id].image) ? dataPaulistinha[id].image : null;
      renderPreview();
      fishImage.value = null;
      modal.classList.add('open');
      setTimeout(()=>fishName.focus(),150);
    }

    function openModalGuppy(id){
      currentId = id;
      currentDataStore = dataGuppy;
      modalTitle.textContent = `Editar Tanque ${id.replace('G','')}`;
      fishName.value = (dataGuppy[id] && dataGuppy[id].name) ? dataGuppy[id].name : '';
      currentPreviewDataUrl = (dataGuppy[id] && dataGuppy[id].image) ? dataGuppy[id].image : null;
      renderPreview();
      fishImage.value = null;
      modal.classList.add('open');
      setTimeout(()=>fishName.focus(),150);
    }

    function openModalBandeira(id){
      currentId = id;
      currentDataStore = dataBandeira;
      modalTitle.textContent = `Editar Tanque ${id.replace('B','')}`;
      fishName.value = (dataBandeira[id] && dataBandeira[id].name) ? dataBandeira[id].name : '';
      currentPreviewDataUrl = (dataBandeira[id] && dataBandeira[id].image) ? dataBandeira[id].image : null;
      renderPreview();
      fishImage.value = null;
      modal.classList.add('open');
      setTimeout(()=>fishName.focus(),150);
    }

    function openModalCarpa(id){
      currentId = id;
      currentDataStore = dataCarpa;
      modalTitle.textContent = `Editar Tanque ${id.replace('C','')}`;
      fishName.value = (dataCarpa[id] && dataCarpa[id].name) ? dataCarpa[id].name : '';
      currentPreviewDataUrl = (dataCarpa[id] && dataCarpa[id].image) ? dataCarpa[id].image : null;
      renderPreview();
      fishImage.value = null;
      modal.classList.add('open');
      setTimeout(()=>fishName.focus(),150);
    }

    function openModalBeta(id){
      currentId = id;
      currentDataStore = dataBeta;
      modalTitle.textContent = `Editar Tanque ${id.replace('BT','')}`;
      fishName.value = (dataBeta[id] && dataBeta[id].name) ? dataBeta[id].name : '';
      currentPreviewDataUrl = (dataBeta[id] && dataBeta[id].image) ? dataBeta[id].image : null;
      renderPreview();
      fishImage.value = null;
      modal.classList.add('open');
      setTimeout(()=>fishName.focus(),150);
    }

    saveBtn.onclick = ()=>{
      const name = fishName.value.trim();
      if(currentPreviewDataUrl){
        currentDataStore[currentId] = { name: name, image: currentPreviewDataUrl };
      } else if(name){
        currentDataStore[currentId] = { name: name };
      } else {
        delete currentDataStore[currentId];
      }
      updateCell(currentId);
      saveData();
      closeModal();
    };

    cancelBtn.onclick = ()=> closeModal();
    modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });

    function closeModal(){ 
      modal.classList.remove('open'); 
      currentId = null; 
      currentPreviewDataUrl = null; 
      fishImage.value = null; 
    }

    fishImage.addEventListener('change', (e)=>{
      const f = e.target.files && e.target.files[0];
      if(!f) return;
      const reader = new FileReader();
      reader.onload = function(ev){ 
        currentPreviewDataUrl = ev.target.result; 
        renderPreview(); 
      };
      reader.readAsDataURL(f);
    });

    function renderPreview(){
      imagePreview.innerHTML = '';
      if(currentPreviewDataUrl){
        const i = document.createElement('img'); 
        i.src = currentPreviewDataUrl; 
        imagePreview.appendChild(i);
      } else {
        imagePreview.textContent = 'Sem imagem';
      }
    }

    function updateCell(id){
      const cell = document.querySelector(`.cell[data-id='${id}']`);
      if(!cell) return;
      const subtitle = cell.querySelector('.subtitle');
      const img = cell.querySelector('img');
      
      const cellData = currentDataStore[id];
      if(cellData && cellData.name) subtitle.textContent = cellData.name; 
      else subtitle.textContent = '— (vazio)';
      
      if(cellData && cellData.image){ 
        img.src = cellData.image; 
        img.style.display='block'; 
      } else { 
        img.src=''; 
        img.style.display='none'; 
      }
    }

    function saveData(){
      try{ 
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); 
        localStorage.setItem(STORAGE_KEY_PAULISTINHA, JSON.stringify(dataPaulistinha)); 
        localStorage.setItem(STORAGE_KEY_GUPPY, JSON.stringify(dataGuppy)); 
        localStorage.setItem(STORAGE_KEY_BANDEIRA, JSON.stringify(dataBandeira)); 
        localStorage.setItem(STORAGE_KEY_CARPA, JSON.stringify(dataCarpa)); 
        localStorage.setItem(STORAGE_KEY_BETA, JSON.stringify(dataBeta)); 
      }catch(e){ 
        alert('Erro ao salvar. Imagem muito grande.'); 
      }
    }

    Object.keys(data).forEach(k=>updateCell(k));
    Object.keys(dataPaulistinha).forEach(k=>updateCell(k));
    Object.keys(dataGuppy).forEach(k=>updateCell(k));
    Object.keys(dataBandeira).forEach(k=>updateCell(k));
    Object.keys(dataCarpa).forEach(k=>updateCell(k));
    Object.keys(dataBeta).forEach(k=>updateCell(k));
    // ============ CASA DOS BETAS (100 AQUÁRIOS) ============

const gridCasaBetas = document.getElementById('gridCasaBetas');
let dataCasaBetas = {};

const STORAGE_KEY_CASA = 'casa_betas_100_v1';
const savedCasa = localStorage.getItem(STORAGE_KEY_CASA);
if(savedCasa){ 
  try{ dataCasaBetas = JSON.parse(savedCasa); }catch(e){ dataCasaBetas = {}; } 
}

// Criar 100 aquários
for(let i = 1; i <= 100; i++){
  const id = `CB${i}`;

  const cell = document.createElement('div');
  cell.className = 'cell';
  cell.dataset.id = id;

  const img = document.createElement('img');
  img.alt = `Aquário ${i}`;
  img.src = dataCasaBetas[id] && dataCasaBetas[id].image ? dataCasaBetas[id].image : '';
  if(!img.src) img.style.display='none';

  const title = document.createElement('div'); 
  title.className='title'; 
  title.textContent = `Aquário ${i}`;

  const subtitle = document.createElement('div'); 
  subtitle.className='subtitle'; 
  subtitle.textContent = dataCasaBetas[id] && dataCasaBetas[id].name ? dataCasaBetas[id].name : '— (vazio)';

  cell.appendChild(img);
  cell.appendChild(title);
  cell.appendChild(subtitle);

  cell.addEventListener('click', ()=> openModalCasaBetas(id, subtitle, img));

  gridCasaBetas.appendChild(cell);
}

function openModalCasaBetas(id, subtitle, img){
  currentId = id;
  currentDataStore = dataCasaBetas;

  modalTitle.textContent = `Editar Aquário ${id.replace('CB','')}`;
  fishName.value = (dataCasaBetas[id] && dataCasaBetas[id].name) ? dataCasaBetas[id].name : '';
  currentPreviewDataUrl = (dataCasaBetas[id] && dataCasaBetas[id].image) ? dataCasaBetas[id].image : null;

  renderPreview();
  fishImage.value = null;
  modal.classList.add('open');
  setTimeout(()=>fishName.focus(),150);
}

// salvar também a casa dos betas
function saveDataCasa(){
  try{
    localStorage.setItem(STORAGE_KEY_CASA, JSON.stringify(dataCasaBetas));
  }catch(e){
    alert('Erro ao salvar. Imagem muito grande.');
  }
}

// atualizar célula
function updateCellCasa(id){
  const cell = document.querySelector(`.cell[data-id='${id}']`);
  if(!cell) return;

  const subtitle = cell.querySelector('.subtitle');
  const img = cell.querySelector('img');

  const cellData = dataCasaBetas[id];
  if(cellData && cellData.name) subtitle.textContent = cellData.name; 
  else subtitle.textContent = '— (vazio)';

  if(cellData && cellData.image){ 
    img.src = cellData.image; 
    img.style.display='block'; 
  } else { 
    img.src=''; 
    img.style.display='none'; 
  }
}

// adaptar botão salvar para funcionar também aqui
const oldSave = saveBtn.onclick;
saveBtn.onclick = ()=>{
  const name = fishName.value.trim();

  if(currentPreviewDataUrl){
    currentDataStore[currentId] = { name: name, image: currentPreviewDataUrl };
  } else if(name){
    currentDataStore[currentId] = { name: name };
  } else {
    delete currentDataStore[currentId];
  }

  updateCell(currentId);
  updateCellCasa(currentId);

  saveData();
  saveDataCasa();

  closeModal();
};