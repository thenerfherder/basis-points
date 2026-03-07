import { ETFS } from './data.js';

// ================================================================
// GENERIC MODAL
// ================================================================
export function openModal(ticker, name, tip, stats) {
  document.getElementById('modal-ticker').textContent = ticker;
  document.getElementById('modal-name').textContent   = name;
  document.getElementById('modal-desc').textContent   = tip;
  document.getElementById('modal-stats').innerHTML = stats
    .map(s => `<div class="modal-stat"><div class="modal-stat-val">${s.val}</div><div class="modal-stat-lbl">${s.lbl}</div></div>`)
    .join('');
  document.getElementById('etf-modal-backdrop').classList.add('open');
}

export function closeEtfModal() {
  document.getElementById('etf-modal-backdrop').classList.remove('open');
}

export function openParamsModal() {
  document.getElementById('params-modal-backdrop').classList.add('open');
}

export function closeParamsModal() {
  document.getElementById('params-modal-backdrop').classList.remove('open');
}

// ================================================================
// ETF DETAIL MODAL
// ================================================================
export function openEtfModal(tk) {
  const etf     = ETFS[tk];
  const isFixed = etf.assetClass === 'fixed';
  openModal(tk, etf.name, etf.tip, [
    isFixed ? { val: etf.bondYield.toFixed(2) + '%', lbl: 'SEC Yield'   }
            : { val: etf.pe.toFixed(1) + 'x',        lbl: 'P/E Ratio'   },
    isFixed ? { val: '—',                             lbl: 'P/B Ratio'   }
            : { val: etf.pb.toFixed(2) + 'x',        lbl: 'P/B Ratio'   },
    isFixed ? { val: '—',                             lbl: 'Earn. Yield' }
            : { val: (100 / etf.pe).toFixed(2) + '%', lbl: 'Earn. Yield' },
    { val: etf.smb.toFixed(2),      lbl: 'SMB'        },
    { val: etf.hml.toFixed(2),      lbl: 'HML'        },
    { val: etf.intlPct + '%',       lbl: "Int'l %"    },
    { val: etf.er.toFixed(3) + '%', lbl: 'Exp. Ratio' },
  ]);
}
