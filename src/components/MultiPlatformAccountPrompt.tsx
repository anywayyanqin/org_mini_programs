import React from 'react';
import { Link2, X, ChevronRight, CircleCheckBig } from 'lucide-react';

interface MultiPlatformAccountPromptProps {
  onClose: () => void;
  onBind: () => void;
  onSkip: () => void;
}

export default function MultiPlatformAccountPrompt({ onClose, onBind, onSkip }: MultiPlatformAccountPromptProps) {
  return (
    <div className="fixed inset-0 z-[10020] flex items-end justify-center bg-black/45 md:items-center md:p-4 animate-[rpFadeIn_0.2s]">
      <div className="flex h-[100dvh] w-full flex-col overflow-hidden bg-[var(--bb)] shadow-xl md:h-auto md:max-h-[760px] md:max-w-[430px] md:rounded-3xl md:bg-[var(--bc)] animate-[slideUp_0.24s_ease-out] md:animate-none pb-[env(safe-area-inset-bottom)]">
        <div className="flex h-[56px] shrink-0 items-center justify-between border-b border-[var(--bl)] bg-[var(--bc)] px-4 md:px-5">
          <button
            onClick={onClose}
            aria-label="关闭"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--tt)] hover:bg-[var(--bh)]"
          >
            <X size={20} />
          </button>
          <h2 className="text-[18px] font-bold text-[var(--tm)]">欢迎来到国泰君安期货</h2>
          <div className="h-8 w-8" aria-hidden="true" />
        </div>

        <div className="flex-1 overflow-auto bg-[var(--bb)] px-4 py-4 md:px-5">
          <div className="rounded-2xl bg-[var(--bc)] p-4 shadow-sm border border-[var(--bl)]">
            <div className="flex items-center gap-2 text-[15px] font-bold text-[var(--tm)]">
              <Link2 size={17} className="text-[var(--p)]" />
              发现更多平台账户
            </div>
            <p className="mt-1 text-[12px] leading-5 text-[var(--tt)]">
              您可以关联更多平台账户，打通双边权益。
            </p>
          </div>

          <div className="mt-4 rounded-2xl bg-[var(--bc)] p-4 shadow-sm border border-[var(--bl)]">
            <div className="flex items-center gap-2 text-[15px] font-bold text-[var(--tm)]">
              权益互通内容
            </div>
            <div className="mt-4 space-y-4">
              <div className="flex items-start gap-2 text-[13px] text-[var(--tm)]">
                <CircleCheckBig size={16} className="mt-0.5 shrink-0 text-[var(--p)]" />
                <span>直播研报同步内容订阅和观看权限</span>
              </div>
              <div className="flex items-start gap-2 text-[13px] text-[var(--tm)]">
                <CircleCheckBig size={16} className="mt-0.5 shrink-0 text-[var(--p)]" />
                <span>交易咨询服务一次开通，多端共享</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--bl)] bg-[var(--bb)] p-4">
          <button
            onClick={onBind}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--p)] py-3.5 text-[15px] font-bold text-white shadow-sm transition-colors hover:bg-[var(--ph)]"
          >
            一键关联
            <ChevronRight size={18} />
          </button>
          <button
            onClick={onSkip}
            className="mt-3 flex w-full items-center justify-center rounded-xl border border-[var(--bl)] bg-white py-3.5 text-[15px] font-medium text-[var(--ts)] shadow-sm transition-colors hover:bg-[var(--bh)]"
          >
            暂不关联
          </button>
        </div>
      </div>
    </div>
  );
}
