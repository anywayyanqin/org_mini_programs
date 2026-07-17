import React, { useState } from 'react';
import {
  ArrowLeft,
  BarChart3,
  CalendarDays,
  ChevronRight,
  Clock3,
  FileText,
  RefreshCw,
  ShieldAlert,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

export interface BenefitContentItem {
  id: string;
  title: string;
  author?: string;
  tag: string;
  expiryDate: string;
  category: 'quant' | 'strategy' | 'reports';
  price: string;
  details?: string;
  remainingDays?: number;
}

interface BenefitContentPageProps {
  item: BenefitContentItem;
  onBack: () => void;
}

const signalRows = [
  { product: '沪铝 AL', direction: '偏多', strength: 86, change: '+1.8%', updatedAt: '14:45' },
  { product: '螺纹钢 RB', direction: '偏多', strength: 72, change: '+0.9%', updatedAt: '14:45' },
  { product: '豆粕 M', direction: '观望', strength: 48, change: '-0.1%', updatedAt: '14:45' },
  { product: 'PTA TA', direction: '偏空', strength: 31, change: '-1.2%', updatedAt: '14:45' },
  { product: '沪金 AU', direction: '偏空', strength: 24, change: '-1.6%', updatedAt: '14:45' },
];

const historyBars = [42, 58, 51, 67, 72, 63, 78, 84, 69, 76, 88, 82];

export default function BenefitContentPage({ item, onBack }: BenefitContentPageProps) {
  const [activeSection, setActiveSection] = useState<'content' | 'overview'>('content');
  const [refreshing, setRefreshing] = useState(false);

  const refreshContent = () => {
    setRefreshing(true);
    window.setTimeout(() => setRefreshing(false), 700);
  };

  const isMultiFactor = item.id === 'quant-0';

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F5F6FA] text-[var(--tm)] overflow-hidden">
      <div className="bg-white shrink-0 h-[56px] px-4 border-b border-[var(--bl)] flex items-center gap-3">
        <button
          onClick={onBack}
          aria-label="返回我的权益"
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--bh)] active:scale-95 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-[16px] font-bold truncate">{item.title}</h1>
          <p className="text-[10px] text-slate-400 mt-0.5">权益内容中心</p>
        </div>
        <button
          onClick={refreshContent}
          aria-label="刷新内容"
          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100"
        >
          <RefreshCw size={17} className={refreshing ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="bg-white shrink-0 px-4 flex border-b border-[var(--bl)]">
        {[
          { key: 'content', label: isMultiFactor ? '最新信号' : '最新内容' },
          { key: 'overview', label: '权益说明' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveSection(tab.key as 'content' | 'overview')}
            className={`flex-1 py-3 text-[14px] font-medium relative ${activeSection === tab.key ? 'text-[#2B65D9] font-bold' : 'text-slate-500'}`}
          >
            {tab.label}
            {activeSection === tab.key && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[3px] bg-[#2B65D9] rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeSection === 'content' && isMultiFactor && (
          <>
            <section className="rounded-2xl p-5 bg-gradient-to-br from-[#1559B7] to-[#2B65D9] text-white shadow-[0_8px_24px_rgba(43,101,217,0.18)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-[12px] text-blue-100">
                    <Sparkles size={14} /> 今日综合信号
                  </div>
                  <div className="mt-3 flex items-end gap-2">
                    <span className="text-[32px] font-extrabold leading-none">偏多</span>
                    <span className="text-[12px] text-blue-100 pb-1">强度 78 / 100</span>
                  </div>
                </div>
                <div className="text-right text-[11px] text-blue-100 leading-relaxed">
                  <div>2026-07-17</div>
                  <div>14:45 更新</div>
                </div>
              </div>
              <div className="mt-5 h-14 flex items-end gap-1.5" aria-label="近十二期信号强度趋势">
                {historyBars.map((height, index) => (
                  <div key={index} className="flex-1 rounded-t-sm bg-white/25 overflow-hidden h-full flex items-end">
                    <div className="w-full rounded-t-sm bg-white/80" style={{ height: `${height}%` }} />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-blue-100 mt-2">
                <span>近12期</span><span>当前</span>
              </div>
            </section>

            <section className="grid grid-cols-3 gap-3">
              {[
                { label: '覆盖品种', value: '24', unit: '个' },
                { label: '偏多信号', value: '9', unit: '个' },
                { label: '偏空信号', value: '6', unit: '个' },
              ].map((metric) => (
                <div key={metric.label} className="bg-white rounded-xl border border-slate-100 p-3 text-center shadow-sm">
                  <div className="text-[11px] text-slate-400">{metric.label}</div>
                  <div className="mt-1 text-[20px] font-extrabold text-slate-800">
                    {metric.value}<span className="text-[10px] font-normal text-slate-400 ml-0.5">{metric.unit}</span>
                  </div>
                </div>
              ))}
            </section>

            <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-4 py-3.5 flex items-center gap-2 border-b border-slate-100">
                <BarChart3 size={17} className="text-[#2B65D9]" />
                <h2 className="text-[14px] font-bold flex-1">品种择时信号</h2>
                <span className="text-[10px] text-slate-400">盘中更新</span>
              </div>
              <div className="divide-y divide-slate-100">
                {signalRows.map((row) => {
                  const bullish = row.direction === '偏多';
                  const neutral = row.direction === '观望';
                  return (
                    <button key={row.product} className="w-full px-4 py-3.5 flex items-center gap-3 text-left hover:bg-slate-50 active:bg-slate-100">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${bullish ? 'bg-red-50 text-red-500' : neutral ? 'bg-slate-100 text-slate-500' : 'bg-emerald-50 text-emerald-600'}`}>
                        {bullish ? <TrendingUp size={16} /> : neutral ? <BarChart3 size={16} /> : <TrendingDown size={16} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-bold text-slate-800">{row.product}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded ${bullish ? 'bg-red-50 text-red-500' : neutral ? 'bg-slate-100 text-slate-500' : 'bg-emerald-50 text-emerald-600'}`}>{row.direction}</span>
                        </div>
                        <div className="mt-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div className={`h-full rounded-full ${bullish ? 'bg-red-400' : neutral ? 'bg-slate-400' : 'bg-emerald-500'}`} style={{ width: `${row.strength}%` }} />
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className={`text-[12px] font-bold ${row.change.startsWith('+') ? 'text-red-500' : 'text-emerald-600'}`}>{row.change}</div>
                        <div className="text-[10px] text-slate-400 mt-1">{row.updatedAt}</div>
                      </div>
                      <ChevronRight size={14} className="text-slate-300" />
                    </button>
                  );
                })}
              </div>
            </section>
          </>
        )}

        {activeSection === 'content' && !isMultiFactor && (
          <>
            <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="w-11 h-11 rounded-xl bg-[#F2F6FF] text-[#2B65D9] flex items-center justify-center">
                <FileText size={22} />
              </div>
              <h2 className="text-[17px] font-bold text-slate-800 mt-4">{item.title}</h2>
              <p className="text-[12px] text-slate-500 mt-2 leading-relaxed">
                {item.category === 'strategy'
                  ? '最新策略观点、产业链跟踪与风险提示将在此持续更新。'
                  : item.category === 'reports'
                    ? '您已获得本项报告权益，可在此查看最新一期及历史内容。'
                    : '最新指标结果与覆盖品种数据将在此持续更新。'}
              </p>
            </section>
            {[1, 2, 3].map((index) => (
              <button key={index} className="w-full bg-white rounded-xl border border-slate-100 shadow-sm p-4 text-left flex items-center gap-3 hover:shadow-md">
                <div className="w-10 h-10 rounded-lg bg-slate-50 text-[#2B65D9] flex items-center justify-center shrink-0"><FileText size={18} /></div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[13px] font-bold text-slate-800 truncate">{item.title} · 第{index}期</h3>
                  <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-1.5">
                    <span className="flex items-center gap-1"><CalendarDays size={11} /> 2026-07-{18 - index}</span>
                    <span className="flex items-center gap-1"><Clock3 size={11} /> 08:30</span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-slate-300" />
              </button>
            ))}
          </>
        )}

        {activeSection === 'overview' && (
          <>
            <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <ShieldAlert size={18} className="text-[#2B65D9]" />
                <h2 className="text-[15px] font-bold">当前权益</h2>
                <span className="ml-auto text-[11px] text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">生效中</span>
              </div>
              <div className="space-y-3 text-[13px]">
                <div className="flex justify-between gap-4"><span className="text-slate-400">权益类型</span><span className="font-medium">{item.tag}</span></div>
                <div className="flex justify-between gap-4"><span className="text-slate-400">服务团队</span><span className="font-medium">{item.author || '国泰君安期货研究团队'}</span></div>
                <div className="flex justify-between gap-4"><span className="text-slate-400">有效期至</span><span className="font-medium">{item.expiryDate}</span></div>
                <div className="flex justify-between gap-4"><span className="text-slate-400">服务资费</span><span className="font-bold text-[#F5A623]">{item.price}</span></div>
              </div>
            </section>
            <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h2 className="text-[14px] font-bold">服务范围</h2>
              <p className="text-[12px] text-slate-500 leading-7 mt-2">{item.details || '提供对应权益内容的持续更新、历史内容查询与重要变化提醒。具体服务范围以签约内容为准。'}</p>
            </section>
            <p className="px-1 text-[11px] text-slate-400 leading-relaxed">页面信息仅供参考，不构成任何投资建议。市场有风险，投资需谨慎。</p>
          </>
        )}
      </div>
    </div>
  );
}
