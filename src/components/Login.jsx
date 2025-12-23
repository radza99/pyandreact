import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(username, password);
    setLoading(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

 // ... (โค้ดเดิม)
return (
  <div className="login-container">
    <div className="login-card">
      <h3>Admin Login</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ชื่อผู้ใช้</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required disabled={loading} />
        </div>
        <div className="form-group">
          <label>รหัสผ่าน</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading} />
        </div>
        <button type="submit" className="btn btn-primary" style={{width:'100%'}} disabled={loading}>
          {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
        </button>
      </form>
      <p style={{textAlign:'center', marginTop:'1rem', color:'#777'}}>ทดสอบ: admin / admin123</p>
    </div>
  </div>
);
 
}