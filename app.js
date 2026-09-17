const board = document.querySelector('#board');
const tray = document.querySelector('#tray');
const progress = document.querySelector('#progress');
const celebration = document.querySelector('#celebration');
let source = 'assets/surprise.svg';
let solved = 0;

function makePiece(index) {
  const piece = document.createElement('div');
  piece.className = 'piece';
  piece.draggable = true;
  piece.dataset.piece = index;
  piece.style.backgroundImage = `url("${source}")`;
  piece.style.backgroundSize = '300% 300%';
  piece.style.backgroundPosition = `${(index % 3) * 50}% ${Math.floor(index / 3) * 50}%`;
  piece.addEventListener('dragstart', () => piece.classList.add('dragging'));
  piece.addEventListener('dragend', () => piece.classList.remove('dragging'));
  return piece;
}
function setup() {
  board.innerHTML = ''; tray.innerHTML = ''; solved = 0; progress.textContent = '0 / 9 pièces';
  [...Array(9).keys()].forEach(index => { const slot=document.createElement('div'); slot.className='slot'; slot.dataset.slot=index; board.append(slot); });
  [...Array(9).keys()].sort(() => Math.random() - .5).forEach(index => tray.append(makePiece(index)));
}
board.addEventListener('dragover', e => e.preventDefault());
board.addEventListener('drop', e => {
  e.preventDefault(); const piece = document.querySelector('.piece.dragging'); const slot = e.target.closest('.slot');
  if (!piece || !slot || slot.firstChild || Number(piece.dataset.piece) !== Number(slot.dataset.slot)) return;
  slot.append(piece); slot.classList.add('filled'); solved += 1; progress.textContent = `${solved} / 9 pièces`;
  if (solved === 9) setTimeout(() => { celebration.classList.add('show'); celebration.setAttribute('aria-hidden','false'); }, 450);
});
document.querySelector('#restart').addEventListener('click', setup);
document.querySelector('#close-celebration').addEventListener('click', () => { celebration.classList.remove('show'); celebration.setAttribute('aria-hidden','true'); setup(); });
document.querySelector('#photo-input').addEventListener('change', e => { const [file] = e.target.files; if (!file) return; source = URL.createObjectURL(file); setup(); });
setup();
