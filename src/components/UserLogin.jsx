import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// ตั้งค่า Axios ให้ baseURL เป็น /api (เหมือน admin)
axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;  // ถ้าใช้ session ในอนาคต

export default function UserLogin() {
  const [phone, setPhone] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // แก้ตรงนี้: ตัด /api ออก เพราะ baseURL มี /api อยู่แล้ว
      const res = await axios.post('/user/login', { phone, passcode });
      
      if (res.data.success) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        alert('เข้าสู่ระบบสำเร็จ! ยินดีต้อนรับ ' + (res.data.user.fullname || 'ผู้ใช้'));
        navigate('/user/dashboard');
      } else {
        setError(res.data.message || 'เข้าสู่ระบบล้มเหลว');
      }
    } catch (err) {
      console.error('Login error:', err.response || err);
      setError(err.response?.data?.message || 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ หรือข้อมูลไม่ถูกต้อง');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h3>เข้าสู่ระบบผู้ใช้ตู้เก็บของ</h3>
        <p style={{textAlign:'center', color:'#777', marginBottom:'2rem'}}>
          กรุณากรอกเบอร์โทรและรหัสผ่าน
        </p>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>เบอร์โทรศัพท์</label>
            <input
              type="text"
              placeholder="เช่น 0863841265"
              value={phone}
              onChange={(e) => setPhone(e.target.value.trim())}  // ตัดช่องว่างอัตโนมัติ
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label>รหัสผ่าน (Passcode)</label>
            <input
              type="password"
              placeholder="เช่น 1234"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
          >
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>
        </form>
        <p style={{textAlign:'center', marginTop:'1.5rem', color:'#777'}}>
          ลืมรหัสผ่าน? ติดต่อ Admin
        </p>
        <p style={{textAlign:'center', marginTop:'1rem', color:'#555', fontSize:'0.9rem'}}>
          <strong>ทดสอบ:</strong><br/>
          เบอร์: 0863841265 / รหัส: 1234<br/>
          หรือ เบอร์: 0812345678 / รหัส: 5678
        </p>
      </div>
    </div>
  );
}