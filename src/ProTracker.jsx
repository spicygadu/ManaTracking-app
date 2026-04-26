import React, { useState, useEffect } from 'react';

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
  inputFocus: {
    borderColor: '#6C63FF'
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
  buttonDisabled: {
    opacity: '0.5',
    cursor: 'not-allowed'
  },
  loading: {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#bbb'
  },
  spinner: {
    display: 'inline-block',
    width: '30px',
    height: '30px',
    border: '3px solid #eee',
    borderTop: '3px solid #6C63FF',
    borderRadius: '50%',
    animation: 'spin 0.7s linear infinite',
    marginBottom: '10px'
  },
  row: {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px'
  },
  col: {
    flex: 1
  },
  stat: {
    background: '#fff',
    borderRadius: '14px',
    padding: '12px',
    textAlign: 'center'
  },
  statValue: {
    fontSize: '18px',
    fontWeight: '800'
  },
  statLabel: {
    fontSize: '10px',
    color: '#bbb',
    marginTop: '2px',
    fontWeight: '700'
  },
  alert: {
    background: '#fff3e0',
    border: '1px solid #ffe0b2',
    borderRadius: '10px',
    padding: '10px',
    fontSize: '12px',
    color: '#e65100',
    marginBottom: '10px'
  },
  successAlert: {
    background: '#e8f5e9',
    border: '1px solid #c8e6c9',
    color: '#2e7d32'
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
    const url = `${CONFIG.APPS_SCRIPT_URL}?function=${functionName}`;
    const params = {
      method: 'POST',
      payload: JSON.stringify(args)
    };
    
    const response = await fetch(url, params);
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

  // Load data on mount and when month changes
  useEffect(() => {
    loadData();
    loadAvailableMonths();
  }, []);

  useEffect(() => {
    loadData();
  }, [month, year]);

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

  const loadData = async () => {
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
  };

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
    const p1Income = CONFIG.P1_INCOME;
    const p2Income = CONFIG.P2_INCOME;
    const p1Ratio = p1Income / (p1Income + p2Income);

    const p1ShareNeeds = Math.round(budget.needs * p1Ratio);
    const p1ShareWants = Math.round(budget.wants * p1Ratio);
    const p2ShareNeeds = Math.round(budget.needs - p1ShareNeeds);
    const p2ShareWants = Math.round(budget.wants - p1ShareWants);

    const p1PersonalSpent = monthData.transactions
      .filter(t => t.paidBy === CONFIG.P1_NAME && t.amount < 0)
      .reduce((a, t) => a + Math.abs(t.amount), 0);

    const p2PersonalSpent = monthData.transactions
      .filter(t => t.paidBy === CONFIG.P2_NAME && t.amount < 0)
      .reduce((a, t) => a + Math.abs(t.amount), 0);

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

  const renderMyMoney = () => {
    if (!monthData) return <div style={styles.loading}>Loading...</div>;

    const p1Income = CONFIG.P1_INCOME;
    const p2Income = CONFIG.P2_INCOME;
    const p1Ratio = p1Income / (p1Income + p2Income);

    const budget = monthData.budget || {};
    const p1ShareNeeds = Math.round(budget.needs * p1Ratio);
    const p1ShareWants = Math.round(budget.wants * p1Ratio);

    const p1SharedSpent = monthData.transactions
      .filter(t => t.paidBy === CONFIG.P1_NAME && t.amount < 0)
      .reduce((a, t) => a + Math.abs(t.amount), 0);

    const p1PersonalSpent = monthData.transactions
      .filter(t => t.paidBy === CONFIG.P1_NAME && t.amount < 0 && t.bucket === 'Personal')
      .reduce((a, t) => a + Math.abs(t.amount), 0);

    return (
      <div style={styles.content}>
        <div style={styles.card}>
          <div style={styles.section}>{CONFIG.P1_NAME}'s Share</div>
          <div style={styles.text}>Income: {CONFIG.P1_INCOME.toLocaleString('sv-SE')} kr ({(p1Ratio * 100).toFixed(1)}%)</div>
          <ProgressBar label="Needs (Shared)" spent={Math.round(p1ShareNeeds * 0.8)} budget={p1ShareNeeds} color="#6C63FF" />
          <ProgressBar label="Wants (Shared)" spent={Math.round(p1ShareWants * 0.8)} budget={p1ShareWants} color="#fc5c7d" />
          <div style={{ ...styles.progressContainer, marginTop: '14px' }}>
            <div style={styles.progressLabel}>
              <span>Personal Spending</span>
              <span>{Math.round(p1PersonalSpent).toLocaleString('sv-SE')} kr</span>
            </div>
            <div style={styles.text}>Money you've spent on your own items</div>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.section}>{CONFIG.P2_NAME}'s Share</div>
          <div style={styles.text}>Income: {CONFIG.P2_INCOME.toLocaleString('sv-SE')} kr ({((1-p1Ratio) * 100).toFixed(1)}%)</div>
          <div style={styles.text}>Your partner's allocation and spending</div>
        </div>
      </div>
    );
  };

  const renderBudget = () => {
    return (
      <div style={styles.content}>
        {message && (
          <div style={{
            ...styles.alert,
            ...(message.includes('✓') ? styles.successAlert : {})
          }}>
            {message}
          </div>
        )}

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

        <div style={styles.card}>
          <div style={styles.section}>Quick Presets</div>
          <button
            style={{ ...styles.button, marginTop: '6px' }}
            onClick={() => {
              const income = CONFIG.P1_INCOME + CONFIG.P2_INCOME;
              setBudgetInput({
                needs: Math.round(income * 0.5),
                wants: Math.round(income * 0.3),
                saving: Math.round(income * 0.2)
              });
            }}
          >
            50/30/20 (Default)
          </button>
          <button
            style={{ ...styles.button, marginTop: '6px' }}
            onClick={() => {
              const income = CONFIG.P1_INCOME + CONFIG.P2_INCOME;
              setBudgetInput({
                needs: Math.round(income * 0.4),
                wants: Math.round(income * 0.3),
                saving: Math.round(income * 0.3)
              });
            }}
          >
            40/30/30 (More Savings)
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
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>Income: {settlement.p1Ratio}%</div>
            </div>
            <div style={styles.col}>
              <div style={{ fontSize: '14px', fontWeight: '700' }}>{CONFIG.P2_NAME}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>Paid: {Math.round(settlement.p2Paid).toLocaleString('sv-SE')} kr</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>Income: {settlement.p2Ratio}%</div>
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

  const renderTrends = () => {
    if (!trends || trends.length === 0) return <div style={styles.loading}>No data yet</div>;

    return (
      <div style={styles.content}>
        <div style={styles.card}>
          <div style={styles.section}>Last 3 Months</div>
          {trends.map((t, idx) => (
            <div key={idx} style={{ marginBottom: '16px', paddingBottom: '12px', borderBottom: idx < trends.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', marginBottom: '8px' }}>{t.month} {t.year}</div>
              <ProgressBar label="Needs" spent={t.spent.needs} budget={t.budget.needs} color="#6C63FF" />
              <ProgressBar label="Wants" spent={t.spent.wants} budget={t.budget.wants} color="#fc5c7d" />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const monthOptions = availableMonths.length > 0 
    ? availableMonths 
    : MONTHS.map((m, idx) => ({ month: m, year: currentYear, sort: currentYear * 100 + idx }));

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerTitle}>ProTracker</div>
        <div style={styles.selectors}>
          <select
            style={styles.select}
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            {monthOptions.map(m => (
              <option key={`${m.month}-${m.year}`} value={m.month}>{m.month.substring(0, 3)}</option>
            ))}
          </select>
          <select
            style={styles.select}
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
          >
            {[currentYear - 1, currentYear, currentYear + 1].map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        {['dashboard', 'myMoney', 'budget', 'settlement', 'trends'].map(v => (
          <button
            key={v}
            style={{
              ...styles.tab,
              ...(view === v ? styles.tabActive : {})
            }}
            onClick={() => setView(v)}
          >
            {v === 'dashboard' && 'Overview'}
            {v === 'myMoney' && 'My Money'}
            {v === 'budget' && 'Budget'}
            {v === 'settlement' && 'Settlement'}
            {v === 'trends' && 'Trends'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={styles.scroll}>
        {loading && !monthData ? (
          <div style={styles.loading}>
            <div style={styles.spinner}></div>
            <div>Loading...</div>
          </div>
        ) : (
          <>
            {view === 'dashboard' && renderDashboard()}
            {view === 'myMoney' && renderMyMoney()}
            {view === 'budget' && renderBudget()}
            {view === 'settlement' && renderSettlement()}
            {view === 'trends' && renderTrends()}
          </>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
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
