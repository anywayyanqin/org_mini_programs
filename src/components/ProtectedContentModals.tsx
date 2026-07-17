import React from 'react';
import { ArrowRight, Building2, FileText, ShieldCheck, TrendingUp, X } from 'lucide-react';

export interface ProtectedContent {
  kind: '研报' | '策略';
  title: string;
  access?: 'institution' | 'none';
}

interface AccessPromptProps {
  content: ProtectedContent;
  onClose: () => void;
  onSwitchAndOpen: () => void;
}

export function ContentAccessPrompt({ onClose, onSwitchAndOpen }: AccessPromptProps) {
  return (
    <div className="fixed inset-0 z-[10000] flex items-end md:items-center justify-center bg-black/45 md:p-4 animate-[rpFadeIn_0.2s]">
      <div className="w-full max-w-[400px] overflow-hidden rounded-t-2xl md:rounded-2xl bg-[var(--bc)] shadow-xl animate-[slideUp_0.24s_ease-out] md:animate-none pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-start gap-3 p-5 pb-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--pl)] text-[var(--p)]">
            <ShieldCheck size={21} />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-[16px] font-bold text-[var(--tm)]">切换身份查看</h2>
            <p className="mt-1 text-[12px] leading-5 text-[var(--tt)]">
              当前身份暂无权限，可切换至已有权益的身份查看。
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="关闭"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[var(--tt)] hover:bg-[var(--bh)]"
          >
            <X size={19} />
          </button>
        </div>

        <div className="px-4 pb-5">
          <div className="mb-4 flex items-center gap-3 rounded-xl border border-[var(--p)] bg-[var(--pl)] p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5A623] text-[11px] font-bold text-white">国泰</div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-[13px] font-semibold text-[var(--tm)]">国泰君安期货有限公司</p>
                <span className="shrink-0 rounded-full bg-[#FCE6D3] px-2 py-0.5 text-[10px] font-medium leading-none text-[#A56839]">
                  已签约
                </span>
              </div>
              <p className="text-[11px] text-[var(--tt)]">王燕勤</p>
            </div>
          </div>

          <button
            onClick={onSwitchAndOpen}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--p)] py-3 text-[14px] font-bold text-white active:bg-[var(--ph)]"
          >
            切换后查看
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function NoContentAccessPrompt({ content, onClose }: Pick<AccessPromptProps, 'content' | 'onClose'>) {
  return (
    <div className="fixed inset-0 z-[10000] flex items-end md:items-center justify-center bg-black/45 md:p-4 animate-[rpFadeIn_0.2s]">
      <div className="w-full max-w-[400px] overflow-hidden rounded-t-2xl md:rounded-2xl bg-[var(--bc)] shadow-xl animate-[slideUp_0.24s_ease-out] md:animate-none pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-start gap-3 border-b border-[var(--bl)] p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--bb)] text-[var(--tt)]">
            <ShieldCheck size={21} />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-[16px] font-bold text-[var(--tm)]">暂无查看权限</h2>
            <p className="mt-1 text-[12px] leading-5 text-[var(--tt)]">
              当前已有身份均未开通该权益，如需查看，请联系客户经理申请开通。
            </p>
          </div>
          <button onClick={onClose} aria-label="关闭" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[var(--tt)] hover:bg-[var(--bh)]">
            <X size={19} />
          </button>
        </div>
        <div className="p-4">
          <div className="rounded-xl border border-[var(--bl)] bg-[var(--bb)] p-4">
            <span className="rounded bg-white px-2 py-0.5 text-[11px] text-[var(--tt)]">当前内容</span>
            <p className="mt-3 text-[14px] font-semibold leading-6 text-[var(--tm)]">{content.title}</p>
          </div>
          <button onClick={onClose} className="mt-4 w-full rounded-xl bg-[var(--p)] py-3 text-[14px] font-bold text-white active:bg-[var(--ph)]">
            我知道了
          </button>
        </div>
      </div>
    </div>
  );
}

interface ContentPreviewProps {
  content: ProtectedContent;
  onClose: () => void;
}

export function ContentPreview({ content, onClose }: ContentPreviewProps) {
  const ContentIcon = content.kind === '研报' ? FileText : TrendingUp;

  return (
    <div className="fixed inset-0 z-[9999] flex justify-end bg-black/45 animate-[rpFadeIn_0.2s]">
      <div className="flex h-full w-full flex-col bg-[var(--bc)] shadow-xl md:max-w-[560px] animate-[rpSlideIn_0.25s_ease-out]">
        <div className="flex h-[56px] shrink-0 items-center border-b border-[var(--bl)] px-4">
          <button
            onClick={onClose}
            aria-label="关闭内容"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--tt)] hover:bg-[var(--bh)]"
          >
            <X size={20} />
          </button>
          <span className="flex-1 text-center text-[15px] font-semibold text-[var(--tm)]">{content.kind}详情</span>
          <div className="w-8" aria-hidden="true" />
        </div>

        <div className="flex-1 overflow-auto bg-[var(--bb)] p-4 md:p-6">
          <article className="rounded-xl border border-[var(--bl)] bg-[var(--bc)] p-5 shadow-[var(--sc)]">
            <div className="mb-4 flex items-center gap-2 text-[11px] text-[var(--p)]">
              <ContentIcon size={15} />
              <span>{content.kind}</span>
              <span className="rounded bg-[#FCE6D3] px-1.5 py-0.5 text-[#A56839]">机构专属</span>
            </div>
            <h1 className="text-[20px] font-bold leading-8 text-[var(--tm)]">{content.title}</h1>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-[var(--tt)]">
              <Building2 size={14} />
              国泰君安期货研究团队 · 今日更新
            </div>

            <div className="my-5 h-px bg-[var(--bl)]" />
            <h2 className="mb-3 text-[15px] font-semibold text-[var(--tm)]">核心观点</h2>
            <p className="text-[13px] leading-7 text-[var(--ts)]">
              这是身份切换流程的内容预览示例。完成机构身份切换后，系统会自动回到用户刚才点击的内容，无需再次查找。
            </p>
            <div className="mt-5 rounded-lg bg-[var(--pll)] p-4 text-[12px] leading-6 text-[var(--ts)]">
              当前查看身份：机构身份 · 国泰君安期货有限公司
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
