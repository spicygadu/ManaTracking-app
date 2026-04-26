import React, { useState, useEffect } from 'react';

const CONFIG = {
  APPS_SCRIPT_URL: process.env.REACT_APP_APPS_SCRIPT_URL || 'YOUR_DEPLOYMENT_URL',
  P1_NAME: 'Dheeraj',
  P1_INCOME: 42000,
  P2_NAME: 'Srestha',
  P2_INCOME: 32000
};

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const styles = {
  container: { maxWidth: '480px', margin: '0 auto', background: '#f0f2f8', minHeight: '100vh', fontFamily: 'system-ui' },
  header: { background: '#fff', padding: '16px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: '18px', fontWeight: '700' },
  select: { fontSize: '12px', padding: '4px 6px', border: '1px solid #ccc', borderRadius: '4px' },
  tabs: { display: 'flex', gap: '12px', borderBottom: '1px solid #eee', padding: '0 16px', background: '#fff' },
  tab: { padding: '12px 0', fontSize: '12px', fontWeight: '700', border: 'none', background: 'transparent', cursor: 'pointer', color: '#bbb' },
  tabActive: { color: '#6C63FF', borderBottom: '3px solid #6C63FF' },
  scroll: { overflowY: 'auto', padding: '20px' },
  card: { background: '#fff', borderRadius: '12px', padding: '16px', marginBottom: '12px' },
  hero: { background: '#6C63FF', color: '#fff', padding: '20px', borderRadius: '12px', marginBottom: '12px' },
  button: { background: '#6C63FF', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', width: '100%', marginTop: '8px' },
  input: { width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px', marginBottom: '8px', boxSizing: 'border-box' },
  loading: { textAlign: 'center', padding: '40px', color: '#999' }
};

async function callAPI(functionName, ...args) {
  try {
    const response = await fetch(CONFIG.APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({ function: functionName, parameters: args })
    });
    const result = await response.text();
    return JSON.parse(result);
  } catch (e) {
    console.error(e);
    return { error: e.message };
  }
}

export default function ProTracker() {
  const now = new Date();
  const [view, setView] = useState('dashboard');
  const [month, setMonth] = useState(MONTHS[now.getMonth()]);
  const [year, setYear] = useState(now.getFullYear());
  const [data, setData] = useState(null);
  const [settlement, setSettlement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [budgetInput, setBudgetInput] = useState({ needs: 30000, wants: 18000, saving: 12000 });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const d = await callAPI('getMonthData', month, year);
      const s = await callAPI('getSettlement', month, year);
      setData(d);
      setSettlement(s);
      setLoading(false);
    };
    load();
  }, [month, year]);

  const saveBudget = async () => {
    const result = await callAPI('saveBudget', month, year, budgetInput.needs, budgetInput.wants, budgetInput.saving);
    if (result.success) {
      setMessage('✓ Saved!');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  if (loading) return <div style={styles.loading}>Loading...</div>;

  const spent = data?.spent || {};
  const budget = data?.budget || {};

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.title}>ProTracker</div>
        <div>
          <select style={styles.select} value={month} onChange={e => setMonth(e.target.value)}>
            {MONTHS.map(m => <option key={m}>{m}</option>)}
          </select>
          <select style={{...styles.select, marginLeft: '8px'}} value={year} onChange={e => setYear(parseInt(e.target.value))}>
            <option>{year - 1}</option>
            <option>{year}</option>
            <option>{year + 1}</option>
          </select>
        </div>
      </div>

      <div style={styles.tabs}>
        <button style={{...styles.tab, ...(view === 'dashboard' ? styles.tabActive : {})}} onClick={() => setView('dashboard')}>Dashboard</button>
        <button style={{...styles.tab, ...(view === 'budget' ? styles.tabActive : {})}} onClick={() => setView('budget')}>Budget</button>
        <button style={{...styles.tab, ...(view === 'settlement' ? styles.tabActive : {})}} onClick={() => setView('settlement')}>Settlement</button>
      </div>

      <div style={styles.scroll}>
        {view === 'dashboard' && (
          <>
            <div style={styles.hero}>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>Total Spent</div>
              <div style={{ fontSize: '32px', fontWeight: '800' }}>{Math.round(spent.needs + spent.wants).toLocaleString('sv-SE')} kr</div>
              <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '8px' }}>Budget: {(budget.needs + budget.wants).toLocaleString('sv-SE')} kr</div>
            </div>

            <div style={styles.card}>
              <h3 style={{ marginBottom: '12px' }}>Spending</h3>
              <ProgressBar label="Needs" spent={spent.needs} budget={budget.needs} />
              <ProgressBar label="Wants" spent={spent.wants} budget={budget.wants} />
              <ProgressBar label="Saving" spent={spent.saving} budget={budget.saving} />
            </div>
          </>
        )}

        {view === 'budget' && (
          <div style={styles.card}>
            {message && <div style={{ background: '#e8f5e9', padding: '8px', borderRadius: '4px', marginBottom: '12px' }}>{message}</div>}
            <h3 style={{ marginBottom: '12px' }}>Budget for {month} {year}</h3>
            <label>Needs</label>
            <input type="number" style={styles.input} value={budgetInput.needs} onChange={e => setBudgetInput({...budgetInput, needs: parseInt(e.target.value)})} />
            <label>Wants</label>
            <input type="number" style={styles.input} value={budgetInput.wants} onChange={e => setBudgetInput({...budgetInput, wants: parseInt(e.target.value)})} />
            <label>Saving</label>
            <input type="number" style={styles.input} value={budgetInput.saving} onChange={e => setBudgetInput({...budgetInput, saving: parseInt(e.target.value)})} />
            <button style={styles.button} onClick={saveBudget}>Save Budget</button>
          </div>
        )}

        {view === 'settlement' && settlement && (
          <div style={{...styles.card, background: '#6C63FF', color: '#fff'}}>
            <h3 style={{ marginBottom: '12px' }}>Settlement</h3>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
              <div style={{ flex: 1 }}>
                <div>{CONFIG.P1_NAME}</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>Paid: {settlement.p1Paid} kr</div>
              </div>
              <div style={{ flex: 1 }}>
                <div>{CONFIG.P2_NAME}</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>Paid: {settlement.p2Paid} kr</div>
              </div>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '12px' }}>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>VERDICT</div>
              <div style={{ fontSize: '16px', fontWeight: '700' }}>{settlement.verdict}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProgressBar({ label, spent, budget }) {
  const percent = budget > 0 ? Math.min(100, Math.round((spent / budget) * 100)) : 0;
  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
        <span>{label}</span>
        <span>{Math.round(spent)} / {Math.round(budget)} kr</span>
      </div>
      <div style={{ width: '100%', height: '6px', background: '#f0f0f0', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ width: `${percent}%`, height: '100%', background: percent > 100 ? '#ff6b6b' : '#6C63FF', transition: 'width 0.3s' }} />
      </div>
    </div>
  );
}
