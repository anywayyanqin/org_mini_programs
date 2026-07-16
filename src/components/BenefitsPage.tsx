import React, { useState } from 'react';
import { ArrowLeft, Share2, AlertCircle, CircleCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BenefitsPageProps {
  onBack: () => void;
}

interface BenefitItem {
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

export default function BenefitsPage({ onBack }: BenefitsPageProps) {
  const [activeTab, setActiveTab] = useState<'quant' | 'strategy' | 'reports'>('quant');
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  // Core benefits data matched with screenshot
  const benefitsData: BenefitItem[] = [
    // 研究策略
    {
      id: 'strategy-1',
      title: '油脂油料产业链策略',
      author: '谢义钦',
      tag: '策略',
      expiryDate: '2026-10-07',
      category: 'strategy',
      price: '1999元/季度'
    },
    {
      id: 'strategy-2',
      title: '油脂油料产业链策略全景',
      author: '李隽钰',
      tag: '策略',
      expiryDate: '2026-10-07',
      category: 'strategy',
      price: '2999元/季度'
    },
    {
      id: 'strategy-3',
      title: '铂钯产业链策略',
      author: '杨蕤',
      tag: '策略',
      expiryDate: '2026-10-07',
      category: 'strategy',
      price: '1599元/季度'
    },
    {
      id: 'strategy-4',
      title: '谷物策略',
      author: '尹恺宜',
      tag: '策略',
      expiryDate: '2026-10-07',
      category: 'strategy',
      price: '1899元/季度'
    },
    // 量化指标
    {
      id: 'quant-0',
      title: '多因子择时信号',
      tag: '指标',
      expiryDate: '2026-09-26',
      category: 'quant',
      price: '4999元/年',
      details: '白糖、沪铝、玻璃、纯碱、豆粕、豆油、沪金、热卷、沪铜、苯乙烯、铁矿、沪银、螺纹、甲醇、PTA、原油、沪锌、焦煤、PVC、棕榈油、十债、五债、三十债、二债',
      remainingDays: 72
    },
    {
      id: 'quant-1',
      title: '商品跨期套利极值信号系统',
      author: '量化策略部',
      tag: '指标',
      expiryDate: '2026-08-15',
      category: 'quant',
      price: '4999元/年',
      details: '螺纹、铁矿、焦煤、焦炭、动力煤、玻璃、纯碱、PTA、甲醇、乙二醇',
      remainingDays: 30
    },
    {
      id: 'quant-2',
      title: '黑色系持仓龙虎榜多空情绪指数',
      author: 'CTA团队',
      tag: '指标',
      expiryDate: '2026-09-01',
      category: 'quant',
      price: '3899元/年',
      details: '螺纹、铁矿石、焦炭、焦煤、动力煤主力合约资金情绪与净头寸分析',
      remainingDays: 47
    },
    {
      id: 'quant-3',
      title: '有色金属期现套利动力指标',
      author: '量化策略部',
      tag: '指标',
      expiryDate: '2026-07-31',
      category: 'quant',
      price: '2999元/年',
      details: '沪铜、沪铝、沪锌、沪铅、沪镍、沪锡期现基差与库存联动分析',
      remainingDays: 16
    },
    // 研究报告
    {
      id: 'report-1',
      title: '每日早间前瞻与期现策略晨报',
      author: '国泰研究所',
      tag: '报告',
      expiryDate: '2026-12-31',
      category: 'reports',
      price: '899元/年'
    },
    {
      id: 'report-2',
      title: '黑色金属及建材周度链条深度报告',
      author: '黑色组',
      tag: '报告',
      expiryDate: '2026-10-25',
      category: 'reports',
      price: '1299元/年'
    },
    {
      id: 'report-3',
      title: '大类资产配置及全球宏观洞察月报',
      author: '宏观研究组',
      tag: '报告',
      expiryDate: '2026-11-15',
      category: 'reports',
      price: '1499元/年'
    }
  ];

  const filteredItems = benefitsData.filter(item => item.category === activeTab);

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F5F6FA] text-[var(--tm)]">
      {/* Top Header */}
      <div className="bg-white shrink-0 h-[56px] px-4 border-b border-[var(--bl)] flex items-center gap-3">
        <button 
          onClick={onBack}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--bh)] active:scale-95 transition-all text-[var(--tm)]"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-[17px] font-bold">我的权益</h1>
      </div>

      {/* Tabs Menu */}
      <div className="bg-white shrink-0 border-b border-[var(--bl)] px-4 flex">
        {[
          { key: 'quant', label: '量化指标' },
          { key: 'strategy', label: '研究策略' },
          { key: 'reports', label: '研究报告' }
        ].map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className="flex-1 py-3 text-center text-[14px] relative font-medium transition-colors"
            >
              <span className={isActive ? 'text-[#2B65D9] font-bold' : 'text-[var(--ts)]'}>
                {tab.label}
              </span>
              {isActive && (
                <motion.div 
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[3px] bg-[#2B65D9] rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Benefits Content Items */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              onClick={() => setExpandedItemId(expandedItemId === item.id ? null : item.id)}
              className="bg-white rounded-xl p-4 md:p-5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col relative z-10 transition-all hover:shadow-md cursor-pointer"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F2F6FF] text-[#2B65D9] flex items-center justify-center shrink-0 mt-0.5">
                    <Share2 size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[15px] font-bold text-slate-800">
                        {item.title} {item.author && `【${item.author}】`}
                      </span>
                      <span className="text-[11px] text-[#2B65D9] border border-[#AEC6FF] bg-[#F2F6FF] px-1.5 py-0.5 rounded font-medium shrink-0">
                        {item.tag}
                      </span>
                    </div>
                    <div className="text-[12px] font-medium text-slate-600 mt-2">
                      有效期至{item.expiryDate}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-1.5 rounded-full bg-[#F0FFF4] px-3 py-1.5 text-[12px] font-medium text-[var(--ok)]">
                  <CircleCheck size={14} />
                  使用中
                </div>
              </div>

              {/* Expandable Details */}
              <AnimatePresence>
                {expandedItemId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden border-t border-gray-100"
                  >
                    <div className="pt-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-[3px] h-3.5 bg-[#2B65D9] rounded-full"></div>
                        <h4 className="text-[14px] font-bold text-slate-800 leading-none">当前权益状态概览</h4>
                        {/* 服务资费 display added per user request */}
                        <span className="ml-auto text-[12px] text-slate-500 font-medium">
                          服务资费: <span className="text-[#F5A623] font-bold">{item.price}</span>
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-[#2B65D9] rounded-full shrink-0 mt-1.5"></div>
                        <div className="flex-1 flex justify-between items-end gap-4 text-[13px] text-slate-700 leading-relaxed">
                          <div className="flex-1">
                            {item.details || '暂无详细概览数据'}
                          </div>
                          {item.remainingDays !== undefined && (
                            <div className="shrink-0 whitespace-nowrap text-slate-500">
                              有效期剩余: <span className="text-[#2B65D9] font-bold">{item.remainingDays}</span> 天
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredItems.length === 0 && (
          <div className="h-48 flex flex-col items-center justify-center text-[var(--tt)] gap-2">
            <AlertCircle size={28} className="opacity-40" />
            <span className="text-[13px]">暂无该分类权益</span>
          </div>
        )}
      </div>
    </div>
  );
}
