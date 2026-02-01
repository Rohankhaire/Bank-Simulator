import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard,
  LogIn,
  UserPlus,
  ArrowRightLeft,
  ArrowUpCircle,
  ArrowDownCircle,
  History,
  Key,
  LogOut,
  Wallet,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import logo from './assets/logo.png';

// --- Components ---

const Header = () => (
  <header className="header animate-fade-in">
    <div className="logo-container">
      <img src={logo} alt="Bank Logo" className="logo-img" />
      <span className="logo-text">ELITE BANK</span>
    </div>
  </header>
);

const Footer = () => (
  <footer className="footer">
    <p>&copy; 2024 Elite ATM Simulator. Secure. Reliable. Premium.</p>
  </footer>
);

// --- Auth Store (Mock) ---
const useStore = () => {
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState(() => {
    const saved = localStorage.getItem('atm_accounts');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('atm_accounts', JSON.stringify(accounts));
  }, [accounts]);

  const login = (cardNo, pin) => {
    const acc = accounts[cardNo];
    if (acc && acc.pin === pin) {
      const userData = { ...acc, cardNo };
      setUser(userData);
      sessionStorage.setItem('atm_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const signup = (name, cardNo, pin) => {
    if (accounts[cardNo]) return false;
    const newAccounts = {
      ...accounts,
      [cardNo]: { name, pin, balance: 0, transactions: [] }
    };
    setAccounts(newAccounts);
    return true;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('atm_user');
  };

  const updateBalance = (cardNo, amount, type) => {
    const acc = accounts[cardNo];
    const newBalance = acc.balance + amount;
    if (newBalance < 0) return false;

    const newTransactions = [
      { date: new Date().toLocaleString(), amount, type, balance: newBalance },
      ...acc.transactions.slice(0, 9)
    ];

    const newAccounts = {
      ...accounts,
      [cardNo]: { ...acc, balance: newBalance, transactions: newTransactions }
    };
    setAccounts(newAccounts);
    setUser({ ...newAccounts[cardNo], cardNo });
    return true;
  };

  return { user, login, signup, logout, updateBalance, accounts };
};

// --- Pages ---

const Landing = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-card text-center"
    style={{ maxWidth: '600px', margin: '4rem auto' }}
  >
    <CreditCard size={64} color="#e2b04c" style={{ marginBottom: '1.5rem' }} />
    <h1 style={{ marginBottom: '1rem', fontSize: '2.5rem' }}>Next-Gen Banking</h1>
    <p style={{ color: '#94a3b8', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
      Experience the future of ATM services. Secure, fast, and elegantly designed for your financial freedom.
    </p>
    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
      <Link to="/login" className="btn btn-primary" style={{ textDecoration: 'none' }}>
        <LogIn size={20} /> Login
      </Link>
      <Link to="/signup" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
        <UserPlus size={20} /> Join Us
      </Link>
    </div>
  </motion.div>
);

const Login = ({ onLogin }) => {
  const [card, setCard] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin(card, pin)) {
      navigate('/dashboard');
    } else {
      setError('Invalid Card Number or PIN');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card"
      style={{ maxWidth: '400px', margin: '4rem auto' }}
    >
      <h2 style={{ marginBottom: '2rem' }}>Welcome Back</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Card Number</label>
          <input
            type="text"
            placeholder="XXXX-XXXX-XXXX-XXXX"
            value={card}
            onChange={(e) => setCard(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Secret PIN</label>
          <input
            type="password"
            placeholder="••••"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          Access Account
        </button>
      </form>
      <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: '#94a3b8' }}>
        New member? <Link to="/signup" style={{ color: '#e2b04c', textDecoration: 'none' }}>Register here</Link>
      </p>
    </motion.div>
  );
};

const Signup = ({ onSignup }) => {
  const [name, setName] = useState('');
  const [card, setCard] = useState('');
  const [pin, setPin] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSignup(name, card, pin)) {
      alert('Account Created Successfully!');
      navigate('/login');
    } else {
      alert('Card Number already exists');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card"
      style={{ maxWidth: '450px', margin: '4rem auto' }}
    >
      <h2 style={{ marginBottom: '2rem' }}>Open Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Full Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Assign Card Number</label>
          <input type="text" value={card} onChange={(e) => setCard(e.target.value)} placeholder="e.g. 123456" required />
        </div>
        <div className="input-group">
          <label>Create Secret PIN (4 digits)</label>
          <input type="password" maxLength={4} value={pin} onChange={(e) => setPin(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          Create My Account
        </button>
      </form>
    </motion.div>
  );
};

const Dashboard = ({ user, onLogout, updateBalance }) => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [msg, setMsg] = useState(null);

  if (!user) {
    useEffect(() => navigate('/login'), []);
    return null;
  }

  const handleTransaction = (type) => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return;

    const change = type === 'DEPOSIT' ? val : -val;
    if (updateBalance(user.cardNo, change, type)) {
      setMsg({ type: 'success', text: `${type} successful!` });
      setAmount('');
    } else {
      setMsg({ type: 'error', text: 'Insufficient balance or invalid operation' });
    }

    setTimeout(() => setMsg(null), 3000);
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Welcome, {user.name}</h2>
        <button onClick={() => { onLogout(); navigate('/'); }} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
          <LogOut size={18} /> Logout
        </button>
      </div>

      <div className="balance-card">
        <p style={{ color: '#94a3b8' }}>Total Balance</p>
        <div className="balance-amount">$ {user.balance.toLocaleString()}</div>
      </div>

      <AnimatePresence>
        {msg && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: msg.type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
              border: `1px solid ${msg.type === 'success' ? '#10b981' : '#ef4444'}`,
              padding: '1rem',
              borderRadius: '12px',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            {msg.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            {msg.text}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Make a Transaction</h3>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="action-grid">
          <button onClick={() => handleTransaction('DEPOSIT')} className="action-button">
            <ArrowUpCircle size={32} color="#10b981" />
            <span>Deposit</span>
          </button>
          <button onClick={() => handleTransaction('WITHDRAWAL')} className="action-button">
            <ArrowDownCircle size={32} color="#ef4444" />
            <span>Withdraw</span>
          </button>
          <button onClick={() => alert('Fast Cash $100 processing...')} className="action-button">
            <Wallet size={32} color="#e2b04c" />
            <span>Fast Cash $100</span>
          </button>
          <button onClick={() => navigate('/history')} className="action-button">
            <History size={32} />
            <span>Mini Statement</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const HistoryPage = ({ user }) => {
  const navigate = useNavigate();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">Back</button>
        <h2>Recent Transactions</h2>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
              <th style={{ padding: '1rem' }}>Date</th>
              <th style={{ padding: '1rem' }}>Type</th>
              <th style={{ padding: '1rem' }}>Amount</th>
              <th style={{ padding: '1rem' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {user?.transactions.map((t, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <td style={{ padding: '1rem', fontSize: '0.9rem' }}>{t.date}</td>
                <td style={{ padding: '1rem' }}>{t.type}</td>
                <td style={{ padding: '1rem', color: t.amount > 0 ? '#10b981' : '#ef4444' }}>
                  {t.amount > 0 ? '+' : ''}{t.amount}
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>Success</span>
                </td>
              </tr>
            ))}
            {(!user?.transactions || user.transactions.length === 0) && (
              <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No transactions found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const store = useStore();

  return (
    <Router basename="/Bank-Simulator">
      <div className="app-container">
        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login onLogin={store.login} />} />
            <Route path="/signup" element={<Signup onSignup={store.signup} />} />
            <Route path="/dashboard" element={<Dashboard user={store.user} onLogout={store.logout} updateBalance={store.updateBalance} />} />
            <Route path="/history" element={<HistoryPage user={store.user} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
