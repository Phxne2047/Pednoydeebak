const orders = [
  { table: 'โต๊ะ 3 - #008', age: '2น. ที่แล้ว', sla: '15:00', status: 'new', items: ['2x ผัดไทย', '1x ปอเปี๊ยะ'] },
  { table: 'โต๊ะ 5 - #009', age: '8น. ที่แล้ว', sla: '04:30', status: 'cooking', tag: '[ผัด]', items: ['1x แกงเขียวหวาน'], note: 'ไม่ใส่ผักชี (แพ้รุนแรง)' },
  { table: 'โต๊ะ 8 - #010', age: '6น. ที่แล้ว', sla: '07:10', status: 'cooking', tag: '[ทอด]', items: ['1x ไก่ทอด', '1x ข้าวเหนียว'] },
  { table: 'โต๊ะ 2 - #011', age: '4น. ที่แล้ว', sla: '10:45', status: 'cooking', tag: '[ต้ม]', items: ['2x ต้มยำกุ้ง'] },
  { table: 'โต๊ะ 7 - #012', age: '12น. ที่แล้ว', sla: '02:20', status: 'cooking', tag: '[ผัด]', items: ['1x กะเพราหมู'], note: 'ไม่ใส่พริก' },
  { table: 'โต๊ะ 1 - #013', age: '15น. ที่แล้ว', sla: 'ตรวจแล้ว', status: 'qc', items: ['1x ข้าวผัดปู'] },
  { table: 'โต๊ะ 4 - #014', age: '17น. ที่แล้ว', sla: 'ตรวจแล้ว', status: 'qc', items: ['2x ผัดซีอิ๊ว'] },
  { table: 'โต๊ะ 6 - #007', age: '22น. ที่แล้ว', sla: 'เสิร์ฟแล้ว', status: 'done', items: ['1x ลาบหมู'] },
  { table: 'โต๊ะ 9 - #006', age: '25น. ที่แล้ว', sla: 'เสิร์ฟแล้ว', status: 'done', items: ['1x ข้าวมันไก่'] }
];

const columns = {
  new: { title: 'ออเดอร์ใหม่', icon: 'inbox', color: 'text-ink' },
  cooking: { title: 'กำลังปรุง', icon: 'soup_kitchen', color: 'text-primaryText' },
  qc: { title: 'พร้อมสำหรับ QC', icon: 'verified_user', color: 'text-warning' },
  done: { title: 'เสิร์ฟแล้ว', icon: 'task_alt', color: 'text-success' }
};

function orderCard(order) {
  const isDone = order.status === 'done';
  const isQc = order.status === 'qc';
  const bar = isDone ? 'bg-success' : isQc ? 'bg-warning' : order.sla.startsWith('0') ? 'bg-danger' : 'bg-primary';
  return `<article class="order-card rounded-lg border border-stroke bg-elevated p-4">
    <div class="flex items-start justify-between gap-2"><b class="font-mono text-sm ${isDone ? 'text-success' : 'text-primaryText'}">${order.table}</b><span class="font-mono text-[10px] text-muted">${order.age}</span></div>
    <div class="mt-3 h-1.5 overflow-hidden rounded-full bg-stroke"><div class="h-full w-3/4 rounded-full ${bar}"></div></div>
    <div class="mt-2 flex justify-between font-mono text-[10px] ${isDone ? 'text-success' : isQc ? 'text-warning' : 'text-muted'}"><span>${isDone ? 'เสิร์ฟแล้ว' : isQc ? 'พร้อมตรวจ' : 'SLA'}</span><span>${order.sla}</span></div>
    <div class="mt-3 space-y-1 border-t border-stroke pt-3 text-sm">${order.items.map(item => `<p>${item}</p>`).join('')}</div>
    ${order.tag ? `<span class="mt-3 inline-block rounded border border-stroke bg-high px-2 py-1 font-mono text-[10px] text-muted">${order.tag}</span>` : ''}
    ${order.note ? `<div class="mt-3 rounded bg-warning px-2 py-2 text-xs font-bold text-black">⚠ ${order.note}</div>` : ''}
    ${isQc ? `<button class="qc-action mt-4 w-full rounded-lg bg-primary px-3 py-2 text-xs font-bold text-white" data-table="${order.table}">AI QC Check</button>` : ''}
  </article>`;
}

function renderBoard() {
  const board = document.getElementById('boardGrid');
  if (!board) return;
  board.innerHTML = Object.entries(columns).map(([key, column]) => {
    const list = orders.filter(order => order.status === key);
    return `<div class="flex min-h-0 flex-col overflow-hidden rounded-xl border border-stroke bg-surface"><div class="flex items-center justify-between border-b border-stroke bg-elevated px-4 py-3"><h3 class="flex items-center gap-2 font-mono text-sm font-bold ${column.color}"><span class="material-symbols-outlined text-base">${column.icon}</span>${column.title}</h3><span class="rounded-full bg-high px-2 py-1 font-mono text-xs">${list.length}</span></div><div class="scrollbar flex-1 space-y-3 overflow-y-auto p-3">${list.map(orderCard).join('')}</div></div>`;
  }).join('');
  document.getElementById('totalMetric').textContent = orders.length;
  document.getElementById('progressMetric').textContent = orders.filter(order => order.status === 'cooking').length;
  document.getElementById('qcMetric').textContent = orders.filter(order => order.status === 'qc').length;
  document.getElementById('servedMetric').textContent = orders.filter(order => order.status === 'done').length;
}

function showToast(message, success = true) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.className = `fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-lg border px-4 py-3 text-sm shadow-xl ${success ? 'border-success/40 bg-elevated text-success' : 'border-danger/40 bg-elevated text-danger'}`;
  setTimeout(() => toast.classList.add('hidden'), 2600);
}

document.addEventListener('DOMContentLoaded', () => {
  renderBoard();
  document.getElementById('menuButton')?.addEventListener('click', () => document.getElementById('mobileNav').classList.toggle('hidden'));
  document.getElementById('refreshButton')?.addEventListener('click', () => { renderBoard(); showToast('อัปเดตข้อมูลเรียบร้อยแล้ว'); });
  document.getElementById('newOrderButton')?.addEventListener('click', () => showToast('ฟอร์มสร้างออเดอร์พร้อมใช้งานในเวอร์ชันถัดไป'));
  document.addEventListener('click', event => {
    const qc = event.target.closest('.qc-action');
    if (qc) { showToast(`เปิดการตรวจสอบ ${qc.dataset.table}`); }
  });
});