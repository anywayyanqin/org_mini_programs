import React, { useState } from 'react';
import { ShieldCheck, X, ArrowLeft, Mail, Edit3, CheckCircle2, Circle, LockKeyhole, RefreshCw, Puzzle } from 'lucide-react';

interface LoginModalProps {
  onLogin: () => void;
  onClose: () => void;
}

export default function LoginModal({ onLogin, onClose }: LoginModalProps) {
  const defaultPhone = '13812348888';
  const [phone, setPhone] = useState(defaultPhone);
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'phone' | 'password' | 'code' | 'email_entry' | 'email_password' | 'email_code' | 'email_reset'>('phone');
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailPasswordMode, setEmailPasswordMode] = useState<'password' | 'initial'>('password');
  const [captchaOpen, setCaptchaOpen] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(0);
  const [captchaStatus, setCaptchaStatus] = useState<'idle' | 'success' | 'failed' | 'loadingFailed'>('idle');
  const [captchaScene, setCaptchaScene] = useState(0);
  const [passwordErrorCount, setPasswordErrorCount] = useState(0);
  const [passwordFeedback, setPasswordFeedback] = useState<'error' | 'locked' | null>(null);
  const [lockedUntil, setLockedUntil] = useState('');
  
  const isDefaultPhone = phone === defaultPhone && !isEditingPhone;
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2000);
  };

  const isValidPassword = (value: string) => {
    if (value.length < 8 || value.length > 16) return false;
    if (!/[0-9]/.test(value) || !/[a-zA-Z]/.test(value)) return false;
    if (!/^[0-9a-zA-Z!@#$%^&*()\-_=+\[\]{};:'",.<>/?\\|`~]+$/.test(value)) return false;

    for (let i = 0; i <= value.length - 7; i += 1) {
      const chunk = value.slice(i, i + 7);
      if (/^(.)\1{6}$/.test(chunk)) return false;
      const codes = chunk.split('').map((char) => char.charCodeAt(0));
      const asc = codes.every((code, index) => index === 0 || code === codes[index - 1] + 1);
      const desc = codes.every((code, index) => index === 0 || code === codes[index - 1] - 1);
      if (asc || desc) return false;
    }

    return true;
  };

  const handleNext = () => {
    if (!agreed) {
      showToast("请先阅读并同意用户协议与隐私政策");
      return;
    }
    
    if (isDefaultPhone) {
      onLogin();
    } else {
      if (phone.length >= 11) {
        // 原型中将手动输入的账号模拟为初次登录账号；实际由后台 U/UA 配置返回。
        setEmailPasswordMode('initial');
        setPassword('');
        setStep('password');
      }
    }
  };

  const handleEmailNext = () => {
    if (!agreed) {
      showToast("请先阅读并同意用户协议与隐私政策");
      return;
    }
    if (!email.trim()) {
      showToast('请输入机构邮箱');
      return;
    }

    // Default to password login as the main email flow; users can switch to code login from there.
    setEmailPasswordMode('password');
    setPassword('');
    setStep('email_password');
  };

  const openCaptcha = () => {
    setCaptchaValue(0);
    setCaptchaStatus('idle');
    setCaptchaOpen(true);
  };

  const handlePasswordSubmit = () => {
    if (passwordErrorCount >= 5) {
      setPasswordFeedback('locked');
      return;
    }
    if (!password.trim()) {
      showToast(emailPasswordMode === 'initial' ? '请输入初始密码' : '请输入密码');
      return;
    }

    // 原型模拟后台校验结果：正式接入时以登录接口返回的“密码错误”为准。
    const correctPassword = emailPasswordMode === 'initial' ? 'Init@2026' : 'Gtja@2026';
    const passwordCorrect = password === correctPassword;

    if (!passwordCorrect) {
      openCaptcha();
      return;
    }

    if (emailPasswordMode === 'initial') {
      showToast('验证通过，请继续重置密码');
      setStep('email_reset');
      return;
    }
    onLogin();
  };

  const refreshCaptcha = () => {
    setCaptchaScene((value) => (value + 1) % 3);
    setCaptchaValue(0);
    setCaptchaStatus('idle');
  };

  const verifyCaptcha = (value: number) => {
    setCaptchaValue(value);
    if (value < 82 || captchaStatus === 'success') return;
    setCaptchaStatus('success');
    setTimeout(() => {
      setCaptchaOpen(false);
      setCaptchaValue(0);
      setCaptchaStatus('idle');
      const nextErrorCount = passwordErrorCount + 1;
      setPasswordErrorCount(nextErrorCount);
      if (nextErrorCount >= 5) {
        const unlockAt = new Date(Date.now() + 10 * 60 * 1000);
        setLockedUntil(unlockAt.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }));
        setPasswordFeedback('locked');
      } else {
        setPasswordFeedback('error');
      }
    }, 500);
  };

  const handleResetPassword = () => {
    if (!newPassword.trim() || !confirmPassword.trim()) {
      showToast('请先完成新密码设置');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('两次输入的新密码不一致');
      return;
    }
    if (!isValidPassword(newPassword)) {
      showToast('密码需为8-16位，且必须包含数字和英文，不超过6位重复或连续字符');
      return;
    }
    showToast('密码已重置，请使用新密码登录');
    onLogin();
  };

  const renderMaskedPhone = (p: string) => {
    if (p.length === 11) {
      return p.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    }
    return p;
  };

  return (
    <div className="fixed inset-0 bg-black/45 z-[10000] flex flex-col justify-end md:justify-center items-center md:p-4 animate-[fadeIn_0.2s]">
      <div className="absolute inset-0 z-0" onClick={onClose}></div>
      <div className="w-full max-w-[400px] bg-white rounded-t-3xl md:rounded-3xl shadow-[var(--sc)] overflow-hidden relative z-10 animate-[slideUp_0.3s_ease-out] md:animate-[rpFadeIn_0.2s] pb-6">
        
        {toastMsg && (
          <div className="absolute top-[30%] left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2.5 rounded-lg text-[13px] z-50 animate-[fadeIn_0.2s] whitespace-nowrap shadow-lg">
            {toastMsg}
          </div>
        )}

        <button onClick={onClose} className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-[var(--bb)] hover:bg-[var(--bh)] text-[var(--ts)] transition-colors">
          <X size={18} />
        </button>

        {/* Login Options / Forms */}
        <div className="p-6 md:p-8 pt-12 md:pt-12">
          {step === 'phone' && (
            <div className="animate-[fadeIn_0.2s] flex flex-col items-center">
              <h2 className="text-[20px] font-bold text-[var(--tm)] mb-8">登录获取机构专属服务</h2>

              {/* Phone Number Display / Edit */}
              <div className="flex items-center justify-center h-[48px] mb-2 w-full px-4">
                {!isEditingPhone ? (
                  <div 
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => { setIsEditingPhone(true); setPhone(''); }}
                  >
                    <span className="text-[28px] font-bold text-[var(--tm)] tracking-[2px]">
                      {renderMaskedPhone(phone)}
                    </span>
                    <Edit3 size={20} className="text-[var(--p)] group-hover:opacity-80" />
                  </div>
                ) : (
                  <div className="relative w-full flex items-center justify-center">
                    <input 
                      type="text" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))}
                      placeholder="请输入手机号" 
                      autoFocus
                      className="w-full text-center text-[28px] font-bold text-[var(--tm)] tracking-[2px] outline-none bg-transparent placeholder:text-[var(--ts)] placeholder:font-normal placeholder:text-[20px]"
                    />
                    <button 
                      onClick={() => {
                        setIsEditingPhone(false);
                        setPhone(defaultPhone);
                      }}
                      className="absolute right-0 text-[14px] text-[var(--p)] font-medium hover:opacity-80 bg-white px-2"
                    >
                      取消
                    </button>
                  </div>
                )}
              </div>
              
              {/* Action Button */}
              <div className="w-full mb-6 relative">
                {isDefaultPhone && (
                  <div className="absolute -top-[30px] right-2 bg-[#333] text-white text-[10px] px-2 py-1 rounded-md after:content-[''] after:absolute after:-bottom-1 after:right-4 after:w-2 after:h-2 after:bg-[#333] after:rotate-45">
                    上次登录
                  </div>
                )}
                <button 
                  onClick={handleNext}
                  className={`w-full py-3.5 rounded-full font-bold text-[16px] transition-all shadow-sm ${
                    (isDefaultPhone || phone.length >= 11) 
                      ? 'bg-[var(--p)] text-white hover:bg-[var(--ph)] hover:shadow-md' 
                      : 'bg-[#E5E6EB] text-[#86909C] cursor-not-allowed'
                  }`}
                >
                  {isDefaultPhone ? '一键登录' : '下一步'}
                </button>
              </div>

              {/* Other Methods */}
              <div className="flex flex-col items-center mb-10 mt-8">
                <button 
                  onClick={() => setStep('email_entry')} 
                  className="w-12 h-12 rounded-full bg-[var(--bb)] text-[var(--ts)] hover:text-white hover:bg-[var(--p)] transition-all flex items-center justify-center shadow-sm"
                >
                  <Mail size={24} />
                </button>
                <span className="text-[11px] text-[var(--ts)] mt-2">邮箱</span>
              </div>

              {/* Agreement */}
              <div 
                className="flex items-start gap-2 text-[11px] text-[var(--tt)] cursor-pointer"
                onClick={() => setAgreed(!agreed)}
              >
                <div className="shrink-0 mt-0.5">
                  {agreed ? (
                    <CheckCircle2 size={14} className="text-[var(--p)]" />
                  ) : (
                    <Circle size={14} className="text-[var(--ts)]" />
                  )}
                </div>
                <span className="leading-[1.5]">
                  我已阅读并同意 
                  <a href="#" className="text-[var(--ts)] hover:text-[var(--p)]" onClick={(e) => e.stopPropagation()}>《用户协议》</a> 
                  <a href="#" className="text-[var(--ts)] hover:text-[var(--p)]" onClick={(e) => e.stopPropagation()}>《隐私政策》</a>
                </span>
              </div>
            </div>
          )}

          {step === 'password' && (
            <div className="animate-[fadeIn_0.2s]">
              <div className="flex items-center mb-8">
                <button onClick={() => setStep('email_entry')} className="p-1 -ml-1 text-[var(--ts)] hover:text-[var(--p)] transition-colors">
                  <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-bold text-[var(--tm)] flex-1 text-center pr-6">密码登录</h2>
              </div>
              
              <div className="text-center mb-8">
                <p className="text-[14px] text-[var(--tt)]">已为您当前账号</p>
                <p className="text-[20px] font-bold text-[var(--tm)] mt-2 tracking-[1px]">
                  {renderMaskedPhone(phone)}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-2">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder={emailPasswordMode === 'initial' ? '请输入初始密码' : '请输入密码'}
                    className="w-full px-4 py-4 bg-[var(--bb)] border border-transparent focus:bg-white focus:border-[var(--p)] rounded-xl outline-none transition-all text-[16px] text-center font-bold tracking-widest"
                  />
                </div>
                <button onClick={handlePasswordSubmit} className="w-full py-4 bg-[var(--p)] text-white rounded-full font-bold text-[16px] mt-2 shadow-sm hover:shadow-md hover:bg-[var(--ph)] transition-all">
                  {emailPasswordMode === 'initial' ? '下一步' : '登 录'}
                </button>
                <div className="flex justify-end items-center text-[13px] px-2 mt-4">
                  <span className="text-[var(--p)] font-medium cursor-pointer" onClick={() => setStep('email_code')}>验证码登录</span>
                </div>
              </div>
            </div>
          )}

          {step === 'code' && (
            <div className="animate-[fadeIn_0.2s]">
              <div className="flex items-center mb-8">
                <button onClick={() => setStep('email_entry')} className="p-1 -ml-1 text-[var(--ts)] hover:text-[var(--p)] transition-colors">
                  <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-bold text-[var(--tm)] flex-1 text-center pr-6">输入验证码</h2>
              </div>
              
              <div className="text-center mb-8">
                <p className="text-[14px] text-[var(--tt)]">验证码已发送至</p>
                <p className="text-[20px] font-bold text-[var(--tm)] mt-2 tracking-[1px]">
                  {renderMaskedPhone(phone)}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-2">
                  <input type="text" placeholder="请输入6位验证码" maxLength={6} className="w-full px-4 py-4 bg-[var(--bb)] border border-transparent focus:bg-white focus:border-[var(--p)] rounded-xl outline-none transition-all text-[20px] text-center font-bold tracking-widest" />
                </div>
                <button onClick={onLogin} className="w-full py-4 bg-[var(--p)] text-white rounded-full font-bold text-[16px] mt-2 shadow-sm hover:shadow-md hover:bg-[var(--ph)] transition-all">
                  登 录
                </button>
                <div className="flex justify-between items-center text-[13px] px-2 mt-4">
                  <span className="text-[var(--p)] cursor-pointer hover:opacity-80">重新获取验证码</span>
                  <span className="text-[var(--p)] font-medium cursor-pointer" onClick={() => setStep('password')}>密码登录</span>
                </div>
              </div>
            </div>
          )}

          {step === 'email_entry' && (
            <div className="animate-[fadeIn_0.2s]">
              <div className="flex items-center mb-8">
                <button onClick={() => setStep('phone')} className="p-1 -ml-1 text-[var(--ts)] hover:text-[var(--p)] transition-colors">
                  <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-bold text-[var(--tm)] flex-1 text-center pr-6">邮箱登录</h2>
              </div>
              <div className="space-y-5">
                <div className="space-y-1">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="请输入机构邮箱" 
                    className="w-full px-4 py-3.5 bg-[var(--bb)] border border-transparent focus:bg-white focus:border-[var(--p)] rounded-xl outline-none transition-all text-[15px]" 
                  />
                </div>
                <button 
                  onClick={handleEmailNext}
                  className="w-full py-4 bg-[var(--p)] text-white rounded-full font-bold text-[16px] mt-2 shadow-sm hover:shadow-md hover:bg-[var(--ph)] transition-all"
                >
                  下一步
                </button>

                {/* Agreement for Email */}
                <div 
                  className="flex items-start gap-2 text-[11px] text-[var(--tt)] cursor-pointer mt-2"
                  onClick={() => setAgreed(!agreed)}
                >
                  <div className="shrink-0 mt-0.5">
                    {agreed ? <CheckCircle2 size={14} className="text-[var(--p)]" /> : <Circle size={14} className="text-[var(--ts)]" />}
                  </div>
                  <span className="leading-[1.5]">我已阅读并同意 <a href="#" className="text-[var(--ts)] hover:text-[var(--p)]" onClick={(e) => e.stopPropagation()}>《用户协议》</a> <a href="#" className="text-[var(--ts)] hover:text-[var(--p)]" onClick={(e) => e.stopPropagation()}>《隐私政策》</a></span>
                </div>
              </div>
            </div>
          )}

          {step === 'email_password' && (
            <div className="animate-[fadeIn_0.2s]">
              <div className="flex items-center mb-8">
                <button onClick={() => setStep('email_entry')} className="p-1 -ml-1 text-[var(--ts)] hover:text-[var(--p)] transition-colors">
                  <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-bold text-[var(--tm)] flex-1 text-center pr-6">邮箱登录</h2>
              </div>

              <div className="text-center mb-8">
                <p className="text-[14px] text-[var(--tt)]">当前邮箱账号</p>
                <p className="text-[18px] font-bold text-[var(--tm)] mt-2 tracking-[0.5px] break-all">{email}</p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-2">
                  <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="请输入密码" className="w-full px-4 py-4 bg-[var(--bb)] border border-transparent focus:bg-white focus:border-[var(--p)] rounded-xl outline-none transition-all text-[16px] text-center font-bold tracking-widest" />
                </div>
                <button onClick={handlePasswordSubmit} className="w-full py-4 bg-[var(--p)] text-white rounded-full font-bold text-[16px] mt-2 shadow-sm hover:shadow-md hover:bg-[var(--ph)] transition-all">
                  登 录
                </button>
                <div className="flex justify-end items-center text-[13px] px-2 mt-4">
                  <span className="text-[var(--p)] font-medium cursor-pointer" onClick={() => setStep('email_code')}>验证码登录</span>
                </div>
              </div>
            </div>
          )}

          {step === 'email_code' && (
            <div className="animate-[fadeIn_0.2s]">
              <div className="flex items-center mb-8">
                <button onClick={() => setStep('email_entry')} className="p-1 -ml-1 text-[var(--ts)] hover:text-[var(--p)] transition-colors">
                  <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-bold text-[var(--tm)] flex-1 text-center pr-6">邮箱登录</h2>
              </div>

              <div className="text-center mb-8">
                <p className="text-[14px] text-[var(--tt)]">验证码已发送至</p>
                <p className="text-[18px] font-bold text-[var(--tm)] mt-2 tracking-[0.5px] break-all">{email}</p>
              </div>

              <div className="space-y-5">
                <div className="flex gap-2">
                  <input type="text" placeholder="请输入验证码" className="w-full px-4 py-3.5 bg-[var(--bb)] border border-transparent focus:bg-white focus:border-[var(--p)] rounded-xl outline-none transition-all text-[15px]" />
                  <button className="shrink-0 px-5 py-3.5 bg-[var(--pl)] text-[var(--p)] rounded-xl text-[14px] font-medium hover:bg-[var(--pll)] transition-colors">获取验证码</button>
                </div>

                <div 
                  className="flex items-start gap-2 text-[11px] text-[var(--tt)] cursor-pointer mt-2"
                  onClick={() => setAgreed(!agreed)}
                >
                  <div className="shrink-0 mt-0.5">
                    {agreed ? <CheckCircle2 size={14} className="text-[var(--p)]" /> : <Circle size={14} className="text-[var(--ts)]" />}
                  </div>
                  <span className="leading-[1.5]">我已阅读并同意 <a href="#" className="text-[var(--ts)] hover:text-[var(--p)]" onClick={(e) => e.stopPropagation()}>《用户协议》</a> <a href="#" className="text-[var(--ts)] hover:text-[var(--p)]" onClick={(e) => e.stopPropagation()}>《隐私政策》</a></span>
                </div>

                <button 
                  onClick={() => {
                    if(!agreed) { showToast("请先阅读并同意用户协议与隐私政策"); return; }
                    onLogin();
                  }} 
                  className="w-full py-4 bg-[var(--p)] text-white rounded-full font-bold text-[16px] mt-2 shadow-sm hover:shadow-md hover:bg-[var(--ph)] transition-all"
                >
                  登 录
                </button>
              </div>
            </div>
          )}

          {step === 'email_reset' && (
            <div className="animate-[fadeIn_0.2s]">
              <div className="flex items-center mb-8">
                <button onClick={() => setStep('email_password')} className="p-1 -ml-1 text-[var(--ts)] hover:text-[var(--p)] transition-colors">
                  <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-bold text-[var(--tm)] flex-1 text-center pr-6">重置密码</h2>
              </div>

              <div className="rounded-2xl bg-[var(--bb)] p-4 mb-5 border border-[var(--bl)]">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[var(--p)] shrink-0">
                    <LockKeyhole size={20} />
                  </div>
                  <div>
                    <p className="text-[15px] font-bold text-[var(--tm)]">请设置新密码</p>
                    <p className="text-[12px] text-[var(--tt)] mt-1 leading-[1.6]">
                      密码仅支持 8-16 位数字、英文及特殊字符，必须包含数字和英文，不超过 6 位重复或连续字符。
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <input 
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="请输入新密码"
                    className="w-full px-4 py-3.5 bg-[var(--bb)] border border-transparent focus:bg-white focus:border-[var(--p)] rounded-xl outline-none transition-all text-[15px]"
                  />
                  <input 
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="请再次确认新密码"
                    className="w-full px-4 py-3.5 bg-[var(--bb)] border border-transparent focus:bg-white focus:border-[var(--p)] rounded-xl outline-none transition-all text-[15px]"
                  />
                </div>

                <button
                  onClick={handleResetPassword}
                  className="w-full py-4 bg-[var(--p)] text-white rounded-full font-bold text-[16px] mt-2 shadow-sm hover:shadow-md hover:bg-[var(--ph)] transition-all"
                >
                  完成重置并登录
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {captchaOpen && (
        <div className="fixed inset-0 z-[10020] bg-black/35 flex items-center justify-center p-5 animate-[fadeIn_0.18s]">
          <div className="w-full max-w-[340px] bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="h-14 px-5 flex items-center justify-between border-b border-[var(--bl)]">
              <h3 className="text-[16px] font-bold text-[var(--tm)]">请拖动滑块完成拼图</h3>
              <button onClick={() => setCaptchaOpen(false)} className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--ts)] hover:bg-[var(--bb)]"><X size={19} /></button>
            </div>

            <div className="p-5">
              <div className={`relative h-[142px] rounded-xl overflow-hidden border border-[var(--bl)] ${captchaStatus === 'loadingFailed' ? 'bg-[var(--bb)]' : ''}`}>
                {captchaStatus === 'loadingFailed' ? (
                  <button onClick={refreshCaptcha} className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[13px] text-[var(--tt)]">
                    <RefreshCw size={22} />
                    加载失败，点击重试
                  </button>
                ) : (
                  <>
                    <div className={`absolute inset-0 ${captchaScene === 0 ? 'bg-[linear-gradient(180deg,#ff9a76_0%,#6c5b7b_44%,#17324d_45%,#081f2c_100%)]' : captchaScene === 1 ? 'bg-[linear-gradient(160deg,#9fd8ff_0%,#bfe3ca_45%,#567d46_46%,#243d2d_100%)]' : 'bg-[linear-gradient(180deg,#f7bd75_0%,#c86b70_42%,#33455f_43%,#142230_100%)]'}`} />
                    <div className="absolute inset-x-0 bottom-0 h-[58px] opacity-70 bg-[radial-gradient(ellipse_at_10%_100%,#04131f_0_18%,transparent_19%),radial-gradient(ellipse_at_40%_100%,#071924_0_25%,transparent_26%),radial-gradient(ellipse_at_80%_100%,#06151f_0_22%,transparent_23%)]" />
                    <div className="absolute top-8 right-14 w-10 h-10 rounded-md border-2 border-white/80 bg-black/20 flex items-center justify-center text-white"><Puzzle size={23} /></div>
                    <div className="absolute top-8 w-10 h-10 rounded-md border-2 border-white shadow-lg bg-white/35 flex items-center justify-center text-white transition-[left] duration-75" style={{ left: `calc(12px + ${captchaValue} * (100% - 76px) / 100)` }}><Puzzle size={23} /></div>
                  </>
                )}
              </div>

              <div className={`mt-3 relative h-11 rounded-lg border overflow-hidden ${captchaStatus === 'failed' ? 'border-red-300 bg-red-50' : captchaStatus === 'success' ? 'border-emerald-300 bg-emerald-50' : 'border-[var(--bl)] bg-[var(--bb)]'}`}>
                <div className="absolute inset-0 flex items-center justify-center text-[13px] font-medium text-[var(--tt)] pointer-events-none">
                  {captchaStatus === 'success' ? '验证成功' : captchaStatus === 'failed' ? '验证失败，请重试' : '向右拖动滑块'}
                </div>
                <input aria-label="滑动验证码" type="range" min="0" max="100" value={captchaValue} onInput={(e) => verifyCaptcha(Number((e.target as HTMLInputElement).value))} className="absolute inset-0 z-10 w-full h-full opacity-[0.01] cursor-grab active:cursor-grabbing touch-none" />
                <div className={`absolute top-0 bottom-0 left-0 pointer-events-none transition-colors ${captchaStatus === 'success' ? 'bg-emerald-100/70' : 'bg-blue-100/60'}`} style={{ width: `${captchaValue}%` }} />
                <div className="absolute top-0 w-11 h-11 bg-white border-r border-[var(--bl)] flex items-center justify-center text-[var(--p)] pointer-events-none" style={{ left: `calc(${captchaValue} * (100% - 44px) / 100)` }}>→</div>
              </div>

              <div className="mt-3 flex justify-end gap-4 text-[13px]">
                <button onClick={() => setCaptchaStatus('loadingFailed')} className="text-[var(--ts)] hover:text-[var(--p)]">模拟加载失败</button>
                <button onClick={refreshCaptcha} className="text-[var(--p)] font-medium flex items-center gap-1"><RefreshCw size={14} />换一张</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {passwordFeedback && (
        <div className="fixed inset-0 z-[10030] bg-black/35 flex items-center justify-center p-5 animate-[fadeIn_0.18s]">
          <div className="w-full max-w-[340px] bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="h-14 px-5 flex items-center justify-between border-b border-[var(--bl)]">
              <h3 className="text-[18px] font-bold text-[var(--tm)]">
                {passwordFeedback === 'locked' ? '账户锁定' : '密码错误'}
              </h3>
              <button onClick={() => setPasswordFeedback(null)} className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--ts)] hover:bg-[var(--bb)]"><X size={20} /></button>
            </div>
            <div className="px-6 py-6 text-[16px] leading-[1.7] text-[var(--tm)]">
              {passwordFeedback === 'locked' ? (
                <>
                  <p className="font-bold">您的账户已被锁定</p>
                  <p>账户将在 {lockedUntil || '10分钟后'} 自动解锁。</p>
                  <p>请稍后再试，或联系管理员重置密码。</p>
                </>
              ) : (
                <>
                  <p>剩余密码输入次数：<strong>{Math.max(0, 5 - passwordErrorCount)}次</strong></p>
                  <p>连续输入错误后，您的账户将在10分钟内被锁定！</p>
                </>
              )}
            </div>
            <div className="px-6 pb-6 flex justify-end">
              <button onClick={() => { setPasswordFeedback(null); setPassword(''); }} className="min-w-[108px] py-2.5 px-5 rounded-lg bg-[var(--p)] text-white font-bold hover:bg-[var(--ph)] transition-colors">确定</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
