import React, { useState } from 'react';
import { 
  X, ChevronRight, Check, Trash2, Bell, Sparkles, Inbox, 
  Tv, UserCheck, Gift, Megaphone, Heart, MessageSquare, 
  TrendingUp, Calendar, CheckCheck, BellRing,
  ArrowLeft, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MessageCenterModalProps {
  onClose: () => void;
}

interface MessageItem {
  id: string;
  category: 'subscription' | 'processing' | 'activity' | 'announcement' | 'benefits' | 'news' | 'market' | 'transaction';
  time: string;
  title: string;
  content: string;
  read: boolean;
}

interface CategoryConfig {
  key: MessageItem['category'];
  label: string;
  icon: React.ComponentType<any>;
  bgColor: string;
  defaultSub: string;
}

export default function MessageCenterModal({ onClose }: MessageCenterModalProps) {
  const [activeCategory, setActiveCategory] = useState<MessageItem['category'] | null>(null);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [showPushPrompt, setShowPushPrompt] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Core messages maintaining the original content and categories, plus a few screenshot-matched items
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: 'msg-1',
      category: 'subscription',
      time: '09:58',
      title: '关注内容更新',
      content: '您关注的高宇飞更新内容【商品QIS自研指数周报 (7.6-7.10) 】, 可点击查看详情。点击消息内容跳转到内容详情页。',
      read: false
    },
    {
      id: 'msg-2',
      category: 'subscription',
      time: '07-09 10:18',
      title: '关注内容更新',
      content: '您关注的高宇飞更新内容【商品QIS自研指数周报 (6.29-7.3) 】, 可点击查看详情。点击消息内容跳转到内容详情页。',
      read: true
    },
    {
      id: 'msg-3',
      category: 'subscription',
      time: '07-09 08:54',
      title: '关注内容更新',
      content: '您关注的高宇飞更新内容【商品QIS自研指数周报 (6.29-7.3) 】, 可点击查看详情。点击消息内容跳转到内容详情页。',
      read: true
    },
    {
      id: 'msg-4',
      category: 'processing',
      time: '07-08 14:22',
      title: '账户认证审核通过',
      content: '您的机构身份认证已审核通过。专属投研权益已激活，有效期至2026-10-07。',
      read: true
    },
    {
      id: 'msg-5',
      category: 'activity',
      time: '07-07 16:00',
      title: '最新线上路演邀约',
      content: '由首席宏观分析师主讲的《2026下半年大宗商品投资策略展望》线上路演将于明日15:00开始，欢迎预约。',
      read: false
    },
    {
      id: 'msg-6',
      category: 'announcement',
      time: '07-01 09:00',
      title: '系统升级维护公告',
      content: '为了提供更优质的投研服务，平台将于本周末（7月4日 00:00 - 04:00）进行系统升级。期间部分查询可能出现延迟。',
      read: true
    },
    {
      id: 'msg-7',
      category: 'benefits',
      time: '06-28 11:30',
      title: '我的权益生效通知',
      content: '您购买的「钢矿产业链策略」已成功开通，请前往【我的权益】进行查看和下载最新的服务内容。',
      read: true
    },
    {
      id: 'msg-8',
      category: 'news',
      time: '昨天 17:47',
      title: '美国6月CPI数据点评',
      content: '美国6月CPI意外“爆冷”降温，市场对9月份降息预期大幅飙升。黄金主力合约短线拉升。',
      read: false
    },
    {
      id: 'msg-9',
      category: 'market',
      time: '14:01',
      title: '主力合约异动提醒',
      content: '商品期货行情监控：铁矿石主力合约大单瞬时流入，价格快速攀升逾1.8%，多头力量占优。',
      read: false
    },
    {
      id: 'msg-10',
      category: 'transaction',
      time: '07-10 10:18',
      title: '交易通知书',
      content: '您的多因子择时信号服务扣款成功，已自动续期1个月，相关费用从您的专有投研账户中扣减。',
      read: true
    }
  ]);

  // Categories configuration matching the visual icons and styles in the screenshot
  const categories: CategoryConfig[] = [
    { 
      key: 'subscription', 
      label: '订阅服务', 
      icon: Tv, 
      bgColor: 'bg-[#E03F3F]', 
      defaultSub: '您关注的研究员最新观点更新' 
    },
    { 
      key: 'benefits', 
      label: '我的权益', 
      icon: Heart, 
      bgColor: 'bg-[#3A82F6]', 
      defaultSub: '特权开通及专属服务动态' 
    },
    { 
      key: 'announcement', 
      label: '公告通知', 
      icon: Megaphone, 
      bgColor: 'bg-[#2B65D9]', 
      defaultSub: '暂无新公告通知' 
    },
    { 
      key: 'activity', 
      label: '活动通知', 
      icon: Gift, 
      bgColor: 'bg-[#F25F5C]', 
      defaultSub: '限时投研福利及路演活动' 
    }
  ];

  // Show a visual toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  // Mark all messages as read (Sweep/Clear action in "消息盒子")
  const markAllAsRead = () => {
    setMessages(prev => prev.map(m => ({ ...m, read: true })));
    triggerToast('已全部标记为已读');
  };

  // 进入分类即视为已读，不再提供额外的“全部已读”操作。
  const enterCategory = (cat: MessageItem['category']) => {
    setMessages(prev => prev.map(m => m.category === cat ? { ...m, read: true } : m));
    setActiveCategory(cat);
  };

  // Get unread count for a specific category
  const getUnreadCount = (cat: MessageItem['category']) => {
    return messages.filter(m => m.category === cat && !m.read).length;
  };

  // Get the latest message for a specific category to show as the list row preview text
  const getLatestMessage = (cat: MessageItem['category']) => {
    const catMsgs = messages.filter(m => m.category === cat);
    if (catMsgs.length === 0) return null;
    // Return latest by sorting or just taking first in array
    return catMsgs[0];
  };

  // Handle refresh
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      triggerToast('已刷新并同步最新消息');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-xs p-0 md:p-4">
      {/* Dark background click back */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Container - Styled like a premium smartphone screen emulator on desktop, full screen on mobile */}
      <motion.div 
        initial={{ y: '100%', opacity: 0.8 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0.8 }}
        transition={{ type: 'spring', damping: 28, stiffness: 240 }}
        className="bg-white w-full max-w-md h-full md:h-[80vh] md:max-h-[720px] md:rounded-3xl shadow-2xl relative z-10 flex flex-col overflow-hidden border border-gray-100"
      >
        {/* Header - Styled perfectly like the Wechat mini-program screen title bar */}
        <div className="bg-white text-slate-800 h-[60px] px-4 border-b border-gray-100 flex items-center justify-between shrink-0 relative z-10">
          <div className="flex items-center gap-2">
            <button 
              onClick={activeCategory ? () => setActiveCategory(null) : onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 text-slate-700 active:scale-90 transition-all"
            >
              <ArrowLeft size={20} className="stroke-[2.5]" />
            </button>
            <span className="font-bold text-[17px] text-slate-900">
              {activeCategory 
                ? categories.find(c => c.key === activeCategory)?.label 
                : '消息盒子'
              }
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {!activeCategory && (
              <button 
                onClick={markAllAsRead}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600 active:scale-90 transition-all relative"
                title="一键已读"
              >
                <CheckCheck size={18} />
              </button>
            )}
            <div className="w-[1px] h-4 bg-gray-200 mx-1"></div>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 text-slate-500 font-medium active:scale-90 transition-all"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Sub-panels container (Settings or Message List) */}
        <div className="flex-1 overflow-hidden relative bg-[#F5F6FA] flex flex-col">
          
          <AnimatePresence mode="wait">
            {/* 1. Push Notification Setup Prompt */}
            {showPushPrompt && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-6"
              >
                <div className="bg-white rounded-2xl p-5 w-full max-w-[280px] text-center shadow-xl animate-[scaleUp_0.2s_ease-out]">
                  <div className="w-12 h-12 bg-blue-50 text-[#2B65D9] rounded-full flex items-center justify-center mx-auto mb-3">
                    <BellRing size={24} className="animate-bounce" />
                  </div>
                  <h4 className="text-[15px] font-bold text-slate-800 mb-1">开启系统通知</h4>
                  <p className="text-[12px] text-slate-500 leading-relaxed mb-4">
                    「国泰君安一站式服务」小程序想申请向您发送重要政策动态、研究报告及风控预警消息。
                  </p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setShowPushPrompt(false)}
                      className="flex-1 py-2 text-[12px] font-medium text-slate-500 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      拒绝
                    </button>
                    <button 
                      onClick={() => {
                        setShowPushPrompt(false);
                        setPushEnabled(true);
                        setBannerVisible(false);
                        triggerToast('通知开启成功，您将第一时间收到推送');
                      }}
                      className="flex-1 py-2 text-[12px] font-bold text-white bg-[#2B65D9] hover:bg-[#1E4EB0] rounded-lg transition-colors shadow-sm"
                    >
                      允许
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          {/* MAIN CONTAINER CONTENT - CHANNELS OR SUB MESSAGES */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <AnimatePresence mode="wait">
              {!activeCategory ? (
                /* VIEW A: MESSAGE BOX CATEGORIES (THE HOME LIST OF MINI-PROGRAM) */
                <motion.div 
                  key="categories-list"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.15 }}
                  className="flex-1 flex flex-col overflow-hidden"
                >
                  {/* Announcement banner "立即开启推送..." */}
                  {bannerVisible && !pushEnabled && (
                    <div className="bg-[#EBF3FF] text-[#2B65D9] px-4 py-3 flex items-center justify-between text-[12px] border-b border-blue-100 gap-2">
                      <div className="flex-1">
                        <span className="font-bold">立即开启推送</span>
                        <p className="text-[11px] text-slate-500 mt-0.5">最新资讯、业务进度、重要消息不再错过</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setShowPushPrompt(true)}
                          className="bg-[#2B65D9] text-white font-bold px-3 py-1.5 rounded-full text-[11px] active:scale-95 transition-transform shrink-0 shadow-[0_2px_6px_rgba(43,101,217,0.15)]"
                        >
                          去开启
                        </button>
                        <button 
                          onClick={() => setBannerVisible(false)}
                          className="p-1 hover:bg-blue-100 rounded text-slate-400 active:scale-90 transition-transform"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Channel categories list */}
                  <div className="flex-1 overflow-auto bg-white">
                    {categories.map((cat, idx) => {
                      const latest = getLatestMessage(cat.key);
                      const unreadCount = getUnreadCount(cat.key);
                      const Icon = cat.icon;

                      return (
                        <div 
                          key={cat.key}
                          onClick={() => enterCategory(cat.key)}
                          className={`flex items-center gap-3.5 px-4.5 py-3.5 hover:bg-slate-50 active:bg-slate-100 cursor-pointer transition-colors relative ${idx !== categories.length - 1 ? 'border-b border-gray-100/60' : ''}`}
                        >
                          {/* Left circular colorful icon */}
                          <div className={`w-11 h-11 rounded-full ${cat.bgColor} flex items-center justify-center text-white shadow-sm shrink-0`}>
                            <Icon size={20} className="stroke-[2.2]" />
                          </div>

                          {/* Middle Category Info */}
                          <div className="flex-1 min-w-0 pr-2">
                            <div className="flex justify-between items-baseline mb-1">
                              <span className="text-[14px] font-bold text-slate-800">{cat.label}</span>
                              {latest && (
                                <span className="text-[11px] text-slate-400 font-mono font-medium">{latest.time}</span>
                              )}
                            </div>
                            <p className="text-[12px] text-slate-500 truncate leading-relaxed">
                              {latest ? latest.content : cat.defaultSub}
                            </p>
                          </div>

                          {/* Right unread red dot */}
                          {unreadCount > 0 && (
                            <span className="w-2 h-2 bg-[#FF4D4F] rounded-full shrink-0" />
                          )}
                        </div>
                      );
                    })}

                    <div className="bg-[#F5F6FA] py-8 text-center text-[12px] text-slate-400">
                      所有通道加载完毕
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* VIEW B: MESSAGE DETAIL VIEW FOR AN ACTIVE CATEGORY */
                <motion.div 
                  key="detail-list"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.15 }}
                  className="flex-1 flex flex-col overflow-hidden"
                >
                  {/* Messages within the selected category */}
                  <div className="flex-1 overflow-auto p-4 space-y-4">
                    {messages.filter(m => m.category === activeCategory).map((msg) => (
                      <div key={msg.id} className="flex flex-col gap-2">
                        {/* Time heading */}
                        <div className="text-center">
                          <span className="text-[11px] text-slate-400 bg-gray-200/40 px-2.5 py-0.5 rounded-full font-mono font-medium">
                            {msg.time}
                          </span>
                        </div>

                        {/* Interactive message card */}
                        <div 
                          onClick={() => {
                            // Mark single message as read
                            setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, read: true } : m));
                          }}
                          className={`bg-white rounded-xl p-4 border border-gray-100 shadow-xs relative hover:shadow-md transition-shadow cursor-pointer ${!msg.read ? 'border-l-4 border-l-[#2B65D9]' : ''}`}
                        >
                          <div className="flex justify-between items-start gap-2 mb-1.5">
                            <h4 className="text-[13.5px] font-bold text-slate-800">{msg.title}</h4>
                            {!msg.read && (
                              <span className="bg-red-50 text-[#FF4D4F] text-[10px] font-bold px-1.5 py-0.5 rounded">未读</span>
                            )}
                          </div>
                          <p className="text-[12px] text-slate-500 leading-relaxed">
                            {msg.content}
                          </p>
                          
                          <div className="border-t border-gray-100 mt-3 pt-2.5 flex justify-between items-center text-[11px] text-slate-400">
                            <span>一站式机构研报通道</span>
                            <span className="text-[#2B65D9] font-semibold flex items-center gap-0.5">
                              去查看 <ChevronRight size={12} />
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                    {messages.filter(m => m.category === activeCategory).length === 0 && (
                      <div className="h-48 flex flex-col items-center justify-center text-slate-400 gap-2">
                        <Inbox size={32} className="opacity-30" />
                        <span className="text-[12px]">此分类下暂无消息</span>
                      </div>
                    )}
                  </div>

                  {/* Back button at the bottom of the list detail to ensure best flow */}
                  <div className="bg-white px-4 py-3 border-t border-gray-100 shrink-0 flex gap-2">
                    <button 
                      onClick={() => setActiveCategory(null)}
                      className="flex-1 py-2.5 border border-gray-200 text-slate-600 hover:bg-slate-50 active:scale-95 text-[13px] font-medium rounded-xl transition-all flex items-center justify-center gap-1"
                    >
                      返回消息列表
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Visual Toast */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div 
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white text-[12px] font-medium px-4 py-2.5 rounded-full z-[100] shadow-lg whitespace-nowrap pointer-events-none text-center"
            >
              {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
