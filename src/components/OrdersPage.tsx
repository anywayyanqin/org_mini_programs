import React, { useState } from 'react';
import { ArrowLeft, Share2, Calendar, AlertCircle, FileText, CheckCircle2, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OrdersPageProps {
  onBack: () => void;
}

interface OrderItem {
  id: string;
  orderNo: string;
  dateTime: string;
  status: 'pending' | 'paid' | 'expired' | 'refunded';
  statusText: string;
  title: string;
  tags: string[];
  duration: string;
  subTitle: string;
  unitPrice: string;
  totalPrice: string;
}

export default function OrdersPage({ onBack }: OrdersPageProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'paid' | 'expired' | 'refunded'>('all');

  // Exact data from user's screenshot
  const ordersData: OrderItem[] = [
    {
      id: 'order-1',
      dateTime: '2026-06-24 16:14:03',
      orderNo: '202606242069695537979850752',
      status: 'expired',
      statusText: '已失效',
      title: '钢矿产业链策略',
      tags: ['主观策略'],
      duration: '1.0个月',
      subTitle: '包含钢矿产业链策略',
      unitPrice: '8000.00元/1.0月',
      totalPrice: '8000'
    },
    {
      id: 'order-2',
      dateTime: '2026-06-18 14:36:41',
      orderNo: '202606182067496706114584576',
      status: 'expired',
      statusText: '已失效',
      title: '碳排放系列专题报告',
      tags: ['研报', '订阅'],
      duration: '1.0年',
      subTitle: '包含碳排放系列专题报告',
      unitPrice: '49999.00元/年',
      totalPrice: '49999'
    }
  ];

  const tabs = [
    { key: 'all', label: '全部' },
    { key: 'pending', label: '待支付' },
    { key: 'paid', label: '已支付' },
    { key: 'expired', label: '已失效' },
    { key: 'refunded', label: '已退款' }
  ];

  const filteredOrders = ordersData.filter(order => {
    if (activeTab === 'all') return true;
    return order.status === activeTab;
  });

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
        <h1 className="text-[17px] font-bold">我的订单</h1>
      </div>

      {/* Tabs Menu */}
      <div className="bg-white shrink-0 border-b border-[var(--bl)] px-4 flex">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className="flex-1 py-3 text-center text-[13.5px] relative font-medium transition-colors"
            >
              <span className={isActive ? 'text-[#2B65D9] font-bold' : 'text-[var(--ts)]'}>
                {tab.label}
              </span>
              {isActive && (
                <motion.div 
                  layoutId="activeOrderTabUnderline"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-[#2B65D9] rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Orders List */}
      <div className="flex-1 overflow-auto p-3.5 space-y-3.5">
        <AnimatePresence mode="popLayout">
          {filteredOrders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="bg-white rounded-xl overflow-hidden border border-[var(--bl)] shadow-xs"
            >
              {/* Order Metadata Header */}
              <div className="bg-[#F8FAFC] px-4 py-2.5 border-b border-[var(--bl)] flex justify-between items-center text-[11px] text-[var(--tt)]">
                <div className="flex flex-col gap-0.5">
                  <div>{order.dateTime}</div>
                  <div className="font-mono text-gray-400">订单号: {order.orderNo}</div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  <span className="font-medium text-slate-500">{order.statusText}</span>
                </div>
              </div>

              {/* Product Info Section */}
              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#F0F4FF] text-[#2B65D9] flex items-center justify-center shrink-0 mt-0.5">
                    <Share2 size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[14px] font-bold text-slate-800">
                        {order.title}
                      </span>
                      {order.tags.map((tag, idx) => (
                        <span 
                          key={idx} 
                          className={`text-[10px] px-1 rounded font-medium shrink-0 border ${
                            tag === '订阅' 
                              ? 'text-[#F5A623] border-[#FFE6BF] bg-[#FFF8F0]'
                              : 'text-[#2B65D9] border-[#AEC6FF] bg-[#F2F6FF]'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-[16px] font-extrabold text-slate-800">{order.duration}</span>
                      <span className="text-[12px] text-[var(--tt)]">{order.subTitle}</span>
                    </div>
                  </div>
                </div>

                {/* Price Summary Panel */}
                <div className="border-t border-dashed border-gray-100 pt-3 flex items-center justify-between text-[12px] text-[var(--tt)]">
                  <div>
                    {order.unitPrice}
                  </div>
                  <div className="font-semibold text-slate-600">
                    ¥{order.totalPrice}
                  </div>
                  <div className="font-bold text-slate-800 text-[13px]">
                    总额: <span className="text-[14px] text-slate-900 font-extrabold">¥{order.totalPrice}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredOrders.length === 0 && (
          <div className="h-48 flex flex-col items-center justify-center text-[var(--tt)] gap-2">
            <AlertCircle size={28} className="opacity-40" />
            <span className="text-[13px]">暂无该状态订单</span>
          </div>
        )}
      </div>
    </div>
  );
}
