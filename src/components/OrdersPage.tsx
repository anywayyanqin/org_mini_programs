import React, { useState } from 'react';
import { ArrowLeft, Share2, AlertCircle, ReceiptText, X, ExternalLink } from 'lucide-react';
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
  invoiceStatus?: 'available' | 'requesting' | 'issued';
}

export default function OrdersPage({ onBack }: OrdersPageProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'paid' | 'expired' | 'refunded'>('all');
  const [invoiceOrder, setInvoiceOrder] = useState<OrderItem | null>(null);
  const [invoiceViewOrder, setInvoiceViewOrder] = useState<OrderItem | null>(null);
  const [invoiceTitleType, setInvoiceTitleType] = useState<'personal' | 'enterprise'>('enterprise');
  const [invoiceType, setInvoiceType] = useState<'normal' | 'special'>('normal');

  // Exact data from user's screenshot
  const ordersData: OrderItem[] = [
    {
      id: 'order-paid-1',
      dateTime: '2026-06-22 18:33:05',
      orderNo: '202606222069005748850917376',
      status: 'paid',
      statusText: '已支付',
      title: '能化全产业链套利策略【陈鑫超】',
      tags: ['研报', '订阅'],
      duration: '1个月',
      subTitle: '包含能化全产业链套利策略【陈鑫超】',
      unitPrice: '0.10元/1月',
      totalPrice: '0.10',
      invoiceStatus: 'issued'
    },
    {
      id: 'order-paid-2',
      dateTime: '2026-06-12 16:45:02',
      orderNo: '202606122065354678060711936',
      status: 'paid',
      statusText: '已支付',
      title: '煤炭产业链策略【樊园园】',
      tags: ['主观策略'],
      duration: '1个月',
      subTitle: '包含煤炭产业链策略【樊园园】',
      unitPrice: '1500.00元/1月',
      totalPrice: '1500',
      invoiceStatus: 'requesting'
    },
    {
      id: 'order-paid-3',
      dateTime: '2026-06-05 09:18:30',
      orderNo: '202606052062445318670012304',
      status: 'paid',
      statusText: '已支付',
      title: '商品期货市场季度策略展望',
      tags: ['研报'],
      duration: '1个月',
      subTitle: '包含商品期货市场季度策略展望',
      unitPrice: '299.00元/1月',
      totalPrice: '299',
      invoiceStatus: 'available'
    },
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

  const openInvoiceModal = (order: OrderItem) => {
    if (order.invoiceStatus === 'requesting' || order.invoiceStatus === 'issued') {
      setInvoiceViewOrder(order);
      return;
    }

    setInvoiceOrder(order);
    setInvoiceTitleType(userRoleIsInstitution ? 'enterprise' : 'personal');
    setInvoiceType('normal');
  };

  const userRoleIsInstitution = true;

  const invoicePrimaryText = invoiceType === 'special' ? '申请开具专用发票' : '申请开具普通发票';
  const getInvoiceMeta = (order: OrderItem) => {
    if (order.invoiceStatus === 'issued') {
      return { hint: '发票已开具', action: '查看发票' };
    }
    if (order.invoiceStatus === 'requesting') {
      return { hint: '开票申请处理中', action: '开票中' };
    }
    return { hint: '可申请电子发票', action: '索取发票' };
  };

  const Field = ({ label, required, placeholder, value }: { label: string; required?: boolean; placeholder: string; value?: string }) => (
    <label className="block">
      <div className="mb-1.5 flex items-center gap-1 text-[13px] font-medium text-slate-700">
        {required && <span className="text-[#E23838]">*</span>}
        <span>{label}</span>
      </div>
      <input
        defaultValue={value}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-[var(--bl)] bg-white px-3 text-[14px] text-slate-800 outline-none focus:border-[#2B65D9] focus:ring-2 focus:ring-[#2B65D9]/10"
      />
    </label>
  );

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

                {order.status === 'paid' && (
                  <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[12px] text-[var(--tt)]">
                      <ReceiptText size={15} className="text-[#2B65D9]" />
                      <span>{getInvoiceMeta(order).hint}</span>
                    </div>
                    <button
                      onClick={() => openInvoiceModal(order)}
                      className={`rounded-full border px-3 py-1.5 text-[12px] font-bold active:bg-[#F2F6FF] ${
                        order.invoiceStatus === 'requesting'
                          ? 'border-[#D9A441] text-[#A56800]'
                          : 'border-[#2B65D9] text-[#2B65D9]'
                      }`}
                    >
                      {getInvoiceMeta(order).action}
                    </button>
                  </div>
                )}
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

      {invoiceOrder && (
        <div className="fixed inset-0 z-[100000] flex items-end justify-center bg-black/45 md:items-center md:p-4">
          <div className="flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-xl md:max-w-[430px] md:rounded-2xl">
            <div className="flex h-[56px] shrink-0 items-center border-b border-[var(--bl)] px-4">
              <div className="flex items-center gap-2">
                <span className="h-5 w-1 rounded-full bg-[#2B65D9]" />
                <h2 className="text-[17px] font-bold text-slate-900">
                  {invoiceTitleType === 'enterprise' ? '企业开票' : '个人开票'}
                </h2>
              </div>
              <button
                onClick={() => setInvoiceOrder(null)}
                aria-label="关闭"
                className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-[var(--tt)] active:bg-[var(--bh)]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-[#F5F6FA] px-4 py-4">
              <div className="rounded-xl bg-white p-3 text-[12px] text-slate-500">
                <div className="font-medium text-slate-800">{invoiceOrder.title}</div>
                <div className="mt-1 flex justify-between">
                  <span>订单金额</span>
                  <span className="font-bold text-slate-900">¥{invoiceOrder.totalPrice}</span>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-white p-3">
                <div className="mb-2 text-[13px] font-bold text-slate-800">发票抬头</div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: 'personal', label: '个人发票' },
                    { key: 'enterprise', label: '企业发票' }
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => {
                        setInvoiceTitleType(item.key as 'personal' | 'enterprise');
                        if (item.key === 'personal') setInvoiceType('normal');
                      }}
                      className={`rounded-xl border py-2.5 text-[13px] font-bold ${
                        invoiceTitleType === item.key
                          ? 'border-[#2B65D9] bg-[#F2F6FF] text-[#2B65D9]'
                          : 'border-[var(--bl)] bg-white text-slate-600'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {invoiceTitleType === 'enterprise' && (
                <div className="mt-4 rounded-xl bg-white p-3">
                  <div className="mb-2 text-[13px] font-bold text-slate-800">发票类型</div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: 'normal', label: '增值税普通发票' },
                      { key: 'special', label: '增值税专用发票' }
                    ].map((item) => (
                      <button
                        key={item.key}
                        onClick={() => setInvoiceType(item.key as 'normal' | 'special')}
                        className={`rounded-xl border px-2 py-2.5 text-[13px] font-bold ${
                          invoiceType === item.key
                            ? 'border-[#2B65D9] bg-[#F2F6FF] text-[#2B65D9]'
                            : 'border-[var(--bl)] bg-white text-slate-600'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 rounded-xl bg-white p-3">
                <div className="mb-3 text-[13px] font-bold text-slate-800">电子发票信息</div>
                <div className="space-y-3">
                  {invoiceTitleType === 'enterprise' ? (
                    <>
                      <Field label="企业/公司名称" required placeholder="请输入企业/公司名称" value="国泰君安期货有限公司" />
                      <Field label="纳税人识别号" required placeholder="请输入纳税人识别号" value="virtual_gtjaqh_test" />
                    </>
                  ) : (
                    <>
                      <Field label="个人姓名" required placeholder="请输入个人姓名" value="刘文字" />
                      <Field label="纳税人识别号" placeholder="请输入纳税人识别号" />
                    </>
                  )}
                  <Field label="邮箱" placeholder="请输入接收发票邮箱" />
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-white p-3">
                <div className="mb-3 text-[13px] font-bold text-slate-800">开票类目</div>
                <label className="block">
                  <div className="mb-1.5 text-[13px] font-medium text-slate-700">开票类目</div>
                  <select className="h-11 w-full rounded-xl border border-[var(--bl)] bg-white px-3 text-[14px] font-bold text-slate-800 outline-none focus:border-[#2B65D9]">
                    <option>按明细</option>
                    <option>按订单</option>
                  </select>
                </label>
              </div>

              {invoiceTitleType === 'personal' && (
                <div className="mt-3 rounded-xl bg-[#FFF8F0] p-3 text-[12px] leading-5 text-[#8A5A24]">
                  个人账户在线支付订单暂只提供增值税电子普通发票，不提供增值税专用发票。如有疑问请联系您的客户经理。
                </div>
              )}
            </div>

            <div className="shrink-0 border-t border-[var(--bl)] bg-white p-4 pb-[calc(72px+env(safe-area-inset-bottom))] md:pb-4">
              <div className="grid grid-cols-[108px_1fr] gap-3">
                <button
                  onClick={() => setInvoiceOrder(null)}
                  className="rounded-xl border border-[var(--bl)] bg-white py-3 text-[14px] font-bold text-slate-700 active:bg-[var(--bh)]"
                >
                  取消
                </button>
                <button className="rounded-xl bg-[#0B63F6] py-3 text-[14px] font-bold text-white active:bg-[#0757D8]">
                  {invoicePrimaryText}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {invoiceViewOrder && (
        <div className="fixed inset-0 z-[100000] flex items-end justify-center bg-black/45 md:items-center md:p-4">
          <div className="flex max-h-[88dvh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-xl md:max-w-[430px] md:rounded-2xl">
            <div className="flex h-[56px] shrink-0 items-center border-b border-[var(--bl)] px-4">
              <div className="flex items-center gap-2">
                <ReceiptText size={19} className="text-[#2B65D9]" />
                <h2 className="text-[17px] font-bold text-slate-900">发票详情</h2>
              </div>
              <button
                onClick={() => setInvoiceViewOrder(null)}
                aria-label="关闭"
                className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-[var(--tt)] active:bg-[var(--bh)]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-[#F5F6FA] p-4">
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-slate-500">开票状态</span>
                  <span className={`rounded-full px-2.5 py-1 text-[12px] font-bold ${
                    invoiceViewOrder.invoiceStatus === 'issued'
                      ? 'bg-[#E9F8EF] text-[#16A34A]'
                      : 'bg-[#FFF8E6] text-[#A56800]'
                  }`}>
                    {invoiceViewOrder.invoiceStatus === 'issued' ? '已开具' : '开票中'}
                  </span>
                </div>
                <div className="mt-4 space-y-3 text-[13px]">
                  <div className="flex justify-between gap-4">
                    <span className="shrink-0 text-slate-500">发票抬头</span>
                    <span className="text-right font-medium text-slate-900">国泰君安期货有限公司</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="shrink-0 text-slate-500">发票类型</span>
                    <span className="text-right font-medium text-slate-900">增值税普通发票</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="shrink-0 text-slate-500">开票金额</span>
                    <span className="text-right font-bold text-slate-900">¥{invoiceViewOrder.totalPrice}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="shrink-0 text-slate-500">接收邮箱</span>
                    <span className="text-right font-medium text-slate-900">wangyanqin.123321@gmail.com</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 rounded-xl bg-white p-4 shadow-sm">
                <div className="text-[13px] font-bold text-slate-900">{invoiceViewOrder.title}</div>
                <div className="mt-2 text-[12px] leading-5 text-slate-500">
                  订单号：{invoiceViewOrder.orderNo}
                </div>
                <div className="mt-1 text-[12px] leading-5 text-slate-500">
                  提交时间：{invoiceViewOrder.dateTime}
                </div>
              </div>

              {invoiceViewOrder.invoiceStatus === 'issued' && (
                <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[#2B65D9] bg-white py-3 text-[14px] font-bold text-[#2B65D9] active:bg-[#F2F6FF]">
                  查看真实发票
                  <ExternalLink size={16} />
                </button>
              )}
            </div>

            <div className="shrink-0 border-t border-[var(--bl)] bg-white p-4 pb-[calc(72px+env(safe-area-inset-bottom))] md:pb-4">
              <button
                onClick={() => setInvoiceViewOrder(null)}
                className="w-full rounded-xl bg-[#0B63F6] py-3 text-[14px] font-bold text-white active:bg-[#0757D8]"
              >
                我知道了
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
