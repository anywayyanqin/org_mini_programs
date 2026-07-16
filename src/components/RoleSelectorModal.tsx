import React from 'react';
import { X, Check, UserCircle, LogOut } from 'lucide-react';

interface RoleSelectorModalProps {
  currentRole: string;
  onSelectRole: (role: string) => void;
  onClose: () => void;
  onLogout: () => void;
}

export default function RoleSelectorModal({ currentRole, onSelectRole, onClose, onLogout }: RoleSelectorModalProps) {
  const roles = [
    { id: '机构身份', name: '国泰君安期货有限公司', subText: '王燕勤', signed: true },
    { id: '零售身份', name: '国泰海通证券有限公司', subText: '王燕勤', signed: false }
  ];

  return (
    <div className="fixed inset-0 bg-black/45 z-[10000] flex items-end md:items-center justify-center md:p-4 animate-[rpFadeIn_0.2s]">
      <div className="bg-[var(--bc)] w-full max-w-[400px] rounded-t-2xl md:rounded-2xl shadow-xl overflow-hidden flex flex-col animate-[slideUp_0.24s_ease-out] md:animate-none pb-[env(safe-area-inset-bottom)]">
        <div className="p-5 border-b border-[var(--bl)] flex items-center justify-between">
          <div>
            <h2 className="text-[16px] font-bold text-[var(--tm)]">切换身份</h2>
            <p className="text-[12px] text-[var(--tt)] mt-1">切换后将展示对应身份的服务与权益</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--bh)] text-[var(--tt)] hover:text-[var(--tm)] transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 space-y-3">
          {roles.map(role => {
            const isActive = currentRole === role.id;
            return (
              <button
                key={role.id}
                onClick={() => {
                  onSelectRole(role.id);
                  onClose();
                }}
                className={`w-full flex items-center p-4 rounded-xl border-2 text-left transition-all ${
                  isActive 
                    ? 'border-[var(--p)] bg-[var(--pl)] shadow-sm' 
                    : 'border-[var(--bl)] bg-[var(--bc)] hover:border-[var(--p)] hover:bg-[var(--pll)]'
                }`}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 mr-3 text-white font-bold text-[14px] tracking-tight bg-[#F5A623]">
                  国泰
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[14px] font-bold truncate max-w-[140px] ${isActive ? 'text-[var(--p)]' : 'text-[var(--tm)]'}`}>
                      {role.name}
                    </span>
                    {role.signed && (
                      <div className="flex items-center text-[#B25F2A] text-[10px] rounded overflow-hidden leading-none shrink-0 h-[18px]">
                        <span className="bg-[#EFCFB2] px-1.5 h-full flex items-center font-medium">企</span>
                        <span className="bg-[#FCE6D3] px-1.5 h-full flex items-center">已签约</span>
                      </div>
                    )}
                  </div>
                  <div className="text-[12px] text-[var(--tt)]">
                    {role.subText}
                  </div>
                </div>
                {isActive && (
                  <Check size={20} className="text-[#3b82f6] shrink-0 ml-3" />
                )}
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-[var(--bl)] bg-[var(--bb)]">
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white border border-[var(--bl)] text-[var(--er)] font-medium hover:bg-[#FFF1F0] hover:border-[var(--er)] transition-colors shadow-sm"
          >
            <LogOut size={18} />
            退出登录
          </button>
        </div>
      </div>
    </div>
  );
}
