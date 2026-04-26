import React, { useState, useEffect, useCallback } from 'react';

// Configuration
const CONFIG = {
  APPS_SCRIPT_URL: process.env.REACT_APP_APPS_SCRIPT_URL || 'YOUR_DEPLOYMENT_URL',
  P1_NAME: 'Dheeraj',
  P1_EMAIL: 'dheeraj@example.com',
  P1_INCOME: 42000,
  P2_NAME: 'Srestha',
  P2_EMAIL: 'srestha@example.com',
  P2_INCOME: 32000
};

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

// Styles
const styles = {
  container: {
    maxWidth: '480px',
    margin: '0 auto',
    background: '#f0f2f8',
    minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '0',
    overflowX: 'hidden'
  },
  header: {
    background: '#fff',
    padding: '16px 14px',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  headerTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1a1a2e'
  },
  selectors: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center'
  },
  select: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#6C63FF',
    border: '1.5px solid #e0e0f0',
    borderRadius: '8px',
    padding: '4px 6px',
    background: '#f7f7ff',
    outline: 'none',
    fontFamily: 'inherit',
    cursor: 'pointer'
  },
  tabs: {
    display: 'flex',
    gap: '12px',
    borderBottom: '1px solid #eee',
    padding: '0 14px',
    background: '#fff',
    overflowX: 'auto',
    scrollBehavior: 'smooth'
  },
  tab: {
    padding: '12px 0',
    fontSize: '12px',
    fontWeight: '700',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    color: '#bbb',
    borderBottom: '3px solid transparent',
    whiteSpace: 'nowrap',
    font: 'inherit'
  },
  tabActive: {
    color: '#6C63FF',
    borderBottomColor: '#6C63FF'
  },
  scroll: {
    overflowY: 'auto',
    paddingBottom: '20px',
    WebkitOverflowScrolling: 'touch'
  },
  content: {
    padding: '0 14px',
    paddingTop: '14px'
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '14px',
    marginBottom: '10px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },
  hero: {
    background: '#6C63FF',
    padding: '18px 14px 22px',
    marginBottom: '10px',
    color: '#fff'
  },
  heroLabel: {
    fontSize: '11px',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    marginBottom: '3px'
  },
  heroAmount: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#fff',
    letterSpacing: '-0.5px',
    lineHeight: '1'
  },
  heroSub: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.7)',
    marginTop: '5px'
  },
  section: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#bbb',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    marginBottom: '10px',
    marginTop: '10px'
  },
  progressContainer: {
    marginBottom: '14px'
  },
  progressLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    fontWeight: '700',
    marginBottom: '6px',
    color: '#555'
  },
  progressBar: {
    width: '100%',
    height: '8px',
    background: '#f0f0f0',
    borderRadius: '99px',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    borderRadius: '99px',
    transition: 'width 0.3s'
  },
  input: {
    width: '100%',
    border: '1.5px solid #eee',
    borderRadius: '10px',
    padding: '8px 11px',
    fontSize: '13px',
    fontWeight: '600',
    outline: 'none',
    marginBottom: '10px',
    fontFamily: 'inherit',
    boxSizing: 'border-box'
  },
  button: {
    background: '#6C63FF',
    color: '#fff',
    border: 'none',
    borderRadius: '11px',
    padding: '11px',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
    width: '100%',
    marginTop: '10px',
    fontFamily: 'inherit'
  },
  loading: {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#bbb'
  },
  row: {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px'
  },
  col: {
    flex: 1
  },
  alert: {
    background: '#e8f5e9',
    border: '1px solid #c8e6c9',
    borderRadius: '10px',
    padding: '10px',
    fontSize: '12px',
    color: '#2e7d32',
    marginBottom: '10px'
  },
  text: {
    fontSize: '12px',
    color: '#666',
    marginBottom: '8px',
    lineHeight: '1.6'
  }
};

// Call Apps Script API
async function callAPI(functionName, ...args) {
  try {
    const response = await fetch(CONFIG.APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({ function: functionName, parameters: args })
    });
    const result = await response.text();
    return JSON.parse(result);
  } catch (error) {
    console.error(`API call failed: ${functionName}`, error);
    return { error: error.message };
  }
}

// Main App Component
export default function ProTracker() {
  const now = new Date();
  const currentMonth = MONTHS[now.getMonth()];
  const currentYear = now.getFullYear();

  const [view, setView] = useState('dashboard');
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [monthData, setMonthData] = useState(null);
  const [settlement, setSettlement] = useState(null);
  const [trends, setTrends] = useState(null);
  const [loading, setLoading] = useState(false);
  const [availableMonths, setAvailableMonths] = useState([]);
  const [budgetInput, setBudgetInput] = useState({ needs: '', wants: '', saving: '' });
  const [message, setMessage] = useState('');

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await callAPI('getMonthData', month, year);
      const settle = await callAPI('getSettlement', month, year);
      const trend = await callAPI('getTrends', 3);

      setMonthData(data);
      setSettlement(settle);
      setTrends(trend);

      if (data && data.budget) {
        setBudgetInput({
          needs: data.budget.needs,
          wants: data.budget.wants,
          saving: data.budget.saving
        });
      }
    } catch (error) {
      console.error('Failed to load data', error);
    } finally {
      setLoading(false);
    }
  }, [month, year]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const loadAvailableMonths = async () => {
      try {
        const result = await callAPI('getAvailableMonths');
        if (result && !result.error) {
          setAvailableMonths(result);
        }
      } catch (error) {
        console.error('Failed to load available months', error);
      }
    };
    loadAvailableMonths();
  }, []);

  const saveBudget = async () => {
    if (!budgetInput.needs || !budgetInput.wants || !budgetInput.saving) {
      setMessage('Please fill in all budget fields');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    try {
      const result = await callAPI('saveBudget', month, year, parseInt(budgetInput.needs), parseInt(budgetInput.wants), parseInt(budgetInput.saving));
      if (result.success) {
        setMessage(`Budget saved for ${month}! ✓`);
        setTimeout(() => setMessage(''), 3000);
        loadData();
      }
    } catch (error) {
      setMessage('Failed to save budget');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const renderDashboard = () => {
    if (!monthData) return <div style={styles.loading}>Loading...</div>;

    const spent = monthData.spent || {};
    const budget = monthData.budget || {};

    const totalSpent = spent.needs + spent.wants;

    return (
      <div style={styles.content}>
        <div style={styles.hero}>
          <div style={styles.heroLabel}>Total spent this month</div>
          <div style={styles.heroAmount}>{Math.round(totalSpent).toLocaleString('sv-SE')} kr</div>
          <div style={styles.heroSub}>Budget: {(budget.needs + budget.wants).toLocaleString('sv-SE')} kr</div>
        </div>

        <div style={styles.card}>
          <div style={styles.section}>Spending by Bucket</div>
          <ProgressBar label="Needs" spent={spent.needs} budget={budget.needs} color="#6C63FF" />
          <ProgressBar label="Wants" spent={spent.wants} budget={budget.wants} color="#fc5c7d" />
          <ProgressBar label="Saving" spent={spent.saving} budget={budget.saving} color="#00b894" />
        </div>

        <div style={styles.card}>
          <div style={styles.section}>Category Breakdown</div>
          {monthData.byCategory && Object.keys(monthData.byCategory).length > 0 ? (
            Object.entries(monthData.byCategory)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5)
              .map(([cat, amount]) => (
                <div key={cat} style={{ ...styles.row, marginBottom: '8px' }}>
                  <div style={{ flex: 1, fontSize: '12px', fontWeight: '700' }}>{cat}</div>
                  <div style={{ fontSize: '12px', fontWeight: '700' }}>{Math.round(amount).toLocaleString('sv-SE')} kr</div>
                </div>
              ))
          ) : (
            <div style={styles.text}>No spending yet this month</div>
          )}
        </div>
      </div>
    );
  };

  const renderBudget = () => {
    return (
      <div style={styles.content}>
        {message && <div style={styles.alert}>{message}</div>}

        <div style={styles.card}>
          <div style={styles.section}>Set Budget for {month} {year}</div>
          <label style={styles.section}>Needs (50%)</label>
          <input
            type="number"
            style={styles.input}
            value={budgetInput.needs}
            onChange={(e) => setBudgetInput({ ...budgetInput, needs: e.target.value })}
            placeholder="30000"
          />

          <label style={styles.section}>Wants (30%)</label>
          <input
            type="number"
            style={styles.input}
            value={budgetInput.wants}
            onChange={(e) => setBudgetInput({ ...budgetInput, wants: e.target.value })}
            placeholder="18000"
          />

          <label style={styles.section}>Saving (20%)</label>
          <input
            type="number"
            style={styles.input}
            value={budgetInput.saving}
            onChange={(e) => setBudgetInput({ ...budgetInput, saving: e.target.value })}
            placeholder="12000"
          />

          <button style={styles.button} onClick={saveBudget}>
            Save Budget
          </button>
        </div>
      </div>
    );
  };

  const renderSettlement = () => {
    if (!settlement) return <div style={styles.loading}>Loading...</div>;

    return (
      <div style={styles.content}>
        <div style={{ ...styles.card, background: '#6C63FF', color: '#fff' }}>
          <div style={styles.section}>Settlement — {month} {year}</div>
          <div style={{ ...styles.row, color: '#fff' }}>
            <div style={styles.col}>
              <div style={{ fontSize: '14px', fontWeight: '700' }}>{CONFIG.P1_NAME}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>Paid: {Math.round(settlement.p1Paid).toLocaleString('sv-SE')} kr</div>
            </div>
            <div style={styles.col}>
              <div style={{ fontSize: '14px', fontWeight: '700' }}>{CONFIG.P2_NAME}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>Paid: {Math.round(settlement.p2Paid).toLocaleString('sv-SE')} kr</div>
            </div>
          </div>
          <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', marginBottom: '6px' }}>VERDICT</div>
            <div style={{ fontSize: '14px', fontWeight: '800' }}>{settlement.verdict}</div>
          </div>
        </div>
      </div>
    );
  };

  const monthOptions = availableMonths.length > 0 
    ? availableMonths 
    : MONTHS.map((m, idx) => ({ month: m, year: currentYear, sort: currentYear * 100 + idx }));

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerTitle}>ProTracker</div>
        <div style={styles.selectors}>
          <select style={styles.select} value={month} onChange={(e) => setMonth(e.target.value)}>
            {monthOptions.map(m => (
              <option key={`${m.month}-${m.year}`} value={m.month}>{m.month.substring(0, 3)}</option>
            ))}
          </select>
          <select style={styles.select} value={year} onChange={(e) => setYear(parseInt(e.target.value))}>
            {[currentYear - 1, currentYear, currentYear + 1].map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={styles.tabs}>
        {['dashboard', 'budget', 'settlement'].map(v => (
          <button
            key={v}
            style={{
              ...styles.tab,
              ...(view === v ? styles.tabActive : {})
            }}
            onClick={() => setView(v)}
          >
            {v === 'dashboard' && 'Overview'}
            {v === 'budget' && 'Budget'}
            {v === 'settlement' && 'Settlement'}
          </button>
        ))}
      </div>

      <div style={styles.scroll}>
        {loading && !monthData ? (
          <div style={styles.loading}>Loading...</div>
        ) : (
          <>
            {view === 'dashboard' && renderDashboard()}
            {view === 'budget' && renderBudget()}
            {view === 'settlement' && renderSettlement()}
          </>
        )}
      </div>
    </div>
  );
}

// Progress Bar Component
function ProgressBar({ label, spent, budget, color }) {
  const percent = budget > 0 ? Math.min(100, Math.round((spent / budget) * 100)) : 0;
  const isOver = spent > budget;

  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '12px',
        fontWeight: '700',
        marginBottom: '4px'
      }}>
        <span>{label}</span>
        <span>{Math.round(spent).toLocaleString('sv-SE')} / {Math.round(budget).toLocaleString('sv-SE')} kr</span>
      </div>
      <div style={{
        width: '100%',
        height: '6px',
        background: '#f0f0f0',
        borderRadius: '99px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${percent}%`,
          height: '100%',
          background: isOver ? '#fd9644' : color,
          borderRadius: '99px',
          transition: 'width 0.3s'
        }} />
      </div>
      <div style={{
        fontSize: '10px',
        color: '#bbb',
        marginTop: '2px',
        fontWeight: '600'
      }}>
        {percent}% used {isOver && '⚠️'}
      </div>
    </div>
  );
}
