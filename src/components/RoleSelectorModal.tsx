import React from 'react';
import { X, Check, LogOut, ChevronRight } from 'lucide-react';

interface RoleSelectorModalProps {
  currentRole: string;
  onSelectRole: (role: string) => void;
  onClose: () => void;
  onLogout: () => void;
  mode?: 'entry' | 'switch';
}

export default function RoleSelectorModal({
  currentRole,
  onSelectRole,
  onClose,
  onLogout,
  mode = 'switch',
}: RoleSelectorModalProps) {
  const roles = [
    { id: '机构身份', name: '国泰君安期货有限公司', subText: '王燕勤', signed: true, badge: '国泰' },
    { id: '零售身份', name: '用户SZHYd6U', subText: '', signed: false, badge: '缺省图' }
  ];

  return (
    <div className="fixed inset-0 z-[10000] flex items-end justify-center bg-black/45 md:items-center md:p-4 animate-[rpFadeIn_0.2s]">
      <div className="flex h-[100dvh] w-full flex-col overflow-hidden bg-[var(--bb)] shadow-xl md:h-auto md:max-h-[760px] md:max-w-[430px] md:rounded-3xl md:bg-[var(--bc)] animate-[slideUp_0.24s_ease-out] md:animate-none pb-[env(safe-area-inset-bottom)]">
        <div className="flex h-[56px] shrink-0 items-center justify-between border-b border-[var(--bl)] bg-[var(--bc)] px-4 md:px-5">
          <button
            onClick={onClose}
            aria-label="关闭"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--tt)] hover:bg-[var(--bh)]"
          >
            <X size={20} />
          </button>
          <h2 className="text-[18px] font-bold text-[var(--tm)]">
            {mode === 'entry' ? '您可进入以下企业' : '选择身份'}
          </h2>
          <div className="h-8 w-8" aria-hidden="true" />
        </div>

        <div className="flex-1 overflow-auto bg-[var(--bb)] px-4 py-4 md:px-5">
          {mode === 'entry' ? (
            <div className="h-2" aria-hidden="true" />
          ) : (
            <div className="mb-4 rounded-2xl bg-[var(--bc)] px-4 py-4 shadow-sm border border-[var(--bl)]">
              <p className="text-[16px] font-bold text-[var(--tm)]">切换身份</p>
              <p className="mt-1 text-[12px] text-[var(--tt)]">切换后将展示对应身份的服务与权益</p>
            </div>
          )}

          <div className="space-y-3">
          {roles.map(role => {
            const isActive = currentRole === role.id;
            return (
              <button
                key={role.id}
                onClick={() => {
                  onSelectRole(role.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
                  isActive
                    ? 'border-[var(--p)] bg-[var(--pll)] shadow-sm'
                    : 'border-[var(--bl)] bg-[#efefef] hover:border-[var(--p)] hover:bg-[var(--pll)]'
                }`}
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[var(--p)] bg-white text-[13px] font-bold text-[var(--tm)]">
                  {role.badge}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`max-w-[180px] truncate text-[18px] font-bold ${isActive ? 'text-[var(--p)]' : 'text-[var(--tm)]'}`}>
                      {role.name}
                    </span>
                    {role.signed && (
                      <div className="flex h-[20px] items-center overflow-hidden rounded text-[10px] leading-none text-[#B25F2A]">
                        <span className="flex h-full items-center bg-[#EFCFB2] px-1.5 font-medium">企</span>
                        <span className="flex h-full items-center bg-[#FCE6D3] px-1.5">已签约</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-1 text-[14px] font-bold text-[var(--tm)]">
                    {role.subText}
                  </div>
                </div>
                {isActive ? (
                  <Check size={20} className="shrink-0 text-[#3b82f6]" />
                ) : (
                  <ChevronRight size={22} className="shrink-0 text-[var(--tt)]" />
                )}
              </button>
            );
          })}
        </div>
        </div>

        {mode === 'switch' && (
          <div className="border-t border-[var(--bl)] bg-[var(--bb)] p-4">
            <button
              onClick={onLogout}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--bl)] bg-white py-3 font-medium text-[var(--er)] shadow-sm transition-colors hover:border-[var(--er)] hover:bg-[#FFF1F0]"
            >
              <LogOut size={18} />
              退出登录
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
