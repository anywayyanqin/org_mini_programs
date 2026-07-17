import React, { useState } from 'react';
import { ShieldCheck, X, ArrowLeft, Mail, Edit3, CheckCircle2, Circle } from 'lucide-react';

interface LoginModalProps {
  onLogin: () => void;
  onClose: () => void;
}

export default function LoginModal({ onLogin, onClose }: LoginModalProps) {
  const defaultPhone = '13812348888';
  const [phone, setPhone] = useState(defaultPhone);
  const [step, setStep] = useState<'phone' | 'password' | 'code' | 'email_code'>('phone');
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  
  const isDefaultPhone = phone === defaultPhone && !isEditingPhone;

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2000);
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
        setStep('password');
      }
    }
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
                  onClick={() => setStep('email_code')} 
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
                <button onClick={() => setStep('phone')} className="p-1 -ml-1 text-[var(--ts)] hover:text-[var(--p)] transition-colors">
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
                  <input type="password" placeholder="请输入密码" className="w-full px-4 py-4 bg-[var(--bb)] border border-transparent focus:bg-white focus:border-[var(--p)] rounded-xl outline-none transition-all text-[16px] text-center font-bold tracking-widest" />
                </div>
                <button onClick={onLogin} className="w-full py-4 bg-[var(--p)] text-white rounded-full font-bold text-[16px] mt-2 shadow-sm hover:shadow-md hover:bg-[var(--ph)] transition-all">
                  登 录
                </button>
                <div className="flex justify-end items-center text-[13px] px-2 mt-4">
                  <span className="text-[var(--p)] font-medium cursor-pointer" onClick={() => setStep('code')}>验证码登录</span>
                </div>
              </div>
            </div>
          )}

          {step === 'code' && (
            <div className="animate-[fadeIn_0.2s]">
              <div className="flex items-center mb-8">
                <button onClick={() => setStep('phone')} className="p-1 -ml-1 text-[var(--ts)] hover:text-[var(--p)] transition-colors">
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

          {step === 'email_code' && (
            <div className="animate-[fadeIn_0.2s]">
              <div className="flex items-center mb-8">
                <button onClick={() => setStep('phone')} className="p-1 -ml-1 text-[var(--ts)] hover:text-[var(--p)] transition-colors">
                  <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-bold text-[var(--tm)] flex-1 text-center pr-6">邮箱登录</h2>
              </div>
              <div className="space-y-5">
                <div className="space-y-1">
                  <input type="email" placeholder="请输入机构邮箱" className="w-full px-4 py-3.5 bg-[var(--bb)] border border-transparent focus:bg-white focus:border-[var(--p)] rounded-xl outline-none transition-all text-[15px]" />
                </div>
                <div className="flex gap-2">
                  <input type="text" placeholder="请输入验证码" className="w-full px-4 py-3.5 bg-[var(--bb)] border border-transparent focus:bg-white focus:border-[var(--p)] rounded-xl outline-none transition-all text-[15px]" />
                  <button className="shrink-0 px-5 py-3.5 bg-[var(--pl)] text-[var(--p)] rounded-xl text-[14px] font-medium hover:bg-[var(--pll)] transition-colors">获取验证码</button>
                </div>
                
                {/* Agreement for Email */}
                <div 
                  className="flex items-center gap-2 text-[12px] text-[var(--tt)] cursor-pointer mt-4"
                  onClick={() => setAgreed(!agreed)}
                >
                  <div className="shrink-0">
                    {agreed ? <CheckCircle2 size={16} className="text-[var(--p)]" /> : <Circle size={16} className="text-[var(--ts)]" />}
                  </div>
                  <span>登录即代表同意 <a href="#" className="text-[var(--ts)] hover:text-[var(--p)]" onClick={(e) => e.stopPropagation()}>《用户协议》</a> 与 <a href="#" className="text-[var(--ts)] hover:text-[var(--p)]" onClick={(e) => e.stopPropagation()}>《隐私政策》</a></span>
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
        </div>
      </div>
    </div>
  );
}
