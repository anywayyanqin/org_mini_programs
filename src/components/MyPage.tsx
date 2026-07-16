import React, { useState } from 'react';
import { User, ChevronRight, Star, Clock, Download, Bell, Settings, HelpCircle, Phone, ArrowRightLeft, LogIn, LogOut } from 'lucide-react';
import BenefitsPage from './BenefitsPage';
import OrdersPage from './OrdersPage';
import MyInfoPage from './MyInfoPage';

interface MyPageProps {
  isLoggedIn: boolean;
  userRole: string;
  getUserDisplayName: () => string;
  getRoleDisplayName: () => string;
  renderAvatar: (size: 'small' | 'large') => React.ReactNode;
  onLoginClick: () => void;
  onSwitchRole: () => void;
}

export default function MyPage({ 
  isLoggedIn, 
  userRole, 
  getUserDisplayName, 
  getRoleDisplayName, 
  renderAvatar,
  onLoginClick,
  onSwitchRole
}: MyPageProps) {
  const isInstitution = userRole === '机构身份';
  const [activeSubPage, setActiveSubPage] = useState<'main' | 'benefits' | 'orders' | 'info'>('main');

  if (activeSubPage === 'info') {
    return <MyInfoPage onBack={() => setActiveSubPage('main')} userRole={userRole} />;
  }

  if (activeSubPage === 'benefits') {
    return <BenefitsPage onBack={() => setActiveSubPage('main')} />;
  }

  if (activeSubPage === 'orders') {
    return <OrdersPage onBack={() => setActiveSubPage('main')} />;
  }

  return (
    <div className="flex-1 overflow-auto bg-[var(--bb)] h-full pb-6">
      {/* Header Profile Section */}
      <div className="bg-[var(--bc)] p-6 pt-10 border-b border-[var(--bl)]">
        <div className="flex items-center gap-4">
          <div 
            className="flex items-center gap-4 flex-1 cursor-pointer" 
            onClick={() => {
              if (isLoggedIn) {
                setActiveSubPage('info');
              } else {
                onLoginClick();
              }
            }}
          >
            <div className="w-16 h-16 rounded-full bg-[var(--bb)] flex items-center justify-center shrink-0 shadow-sm border border-[var(--bl)]">
              {renderAvatar('large')}
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-2 mb-1.5">
                    <h2 className="text-xl font-bold text-[var(--tm)] truncate">{getUserDisplayName()}</h2>
                    {isInstitution && (
                      <div className="flex items-center text-[#B25F2A] text-[10px] rounded overflow-hidden leading-none shrink-0 h-[18px]">
                        <span className="bg-[#EFCFB2] px-1.5 h-full flex items-center font-medium">企</span>
                        <span className="bg-[#FCE6D3] px-1.5 h-full flex items-center">已签约</span>
                      </div>
                    )}
                  </div>
                  <div className="text-[13px] text-[var(--tt)] flex items-center gap-1">
                    <span>{getRoleDisplayName()}</span>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-[var(--tm)] mb-1">未登录</h2>
                  <p className="text-[13px] text-[var(--tt)]">点击登录获取专属服务</p>
                </>
              )}
            </div>
          </div>
          
          <div className="shrink-0 ml-4">
            {!isLoggedIn ? (
              <button 
                onClick={onLoginClick}
                className="px-5 py-2 rounded-full bg-[var(--p)] text-white text-[14px] font-bold shadow-sm"
              >
                登录 / 注册
              </button>
            ) : (
              <button 
                onClick={onSwitchRole}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[var(--p)] text-[var(--p)] text-[13px] font-medium bg-[var(--pl)]"
              >
                <ArrowRightLeft size={14} />
                切换身份
              </button>
            )}
          </div>
        </div>

        {/* Institution Status Card */}
        {isLoggedIn && isInstitution && (
          <div className="mt-6 bg-gradient-to-r from-[#FCE6D3] to-[#F5D4B5] rounded-xl p-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-[#8A4A1C] text-[15px] mb-1">机构专属服务已激活</h3>
              <p className="text-[#A56839] text-[12px]">畅享全量研报、专属路演及高级数据权限</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center shrink-0 text-[#8A4A1C]">
              <Star size={20} className="fill-current" />
            </div>
          </div>
        )}
      </div>

      {/* Menu Blocks */}
      <div className="px-4 py-4 space-y-4">
        {/* Block 1 */}
        <div className="bg-[var(--bc)] rounded-2xl shadow-sm border border-[var(--bl)] overflow-hidden">
          {[
            { iconText: '信', label: '我的信息' },
            { iconText: '权', label: '我的权益' },
            { iconText: '单', label: '我的订单' },
            { iconText: '客', label: '金牌客服' },
            { iconText: '经', label: '我的客户经理' },
            { iconText: '关', label: '我的关注' },
          ].map((item, i, arr) => (
            <div 
              key={i} 
              onClick={() => {
                if (item.label === '我的信息') {
                  setActiveSubPage('info');
                } else if (item.label === '我的权益') {
                  setActiveSubPage('benefits');
                } else if (item.label === '我的订单') {
                  setActiveSubPage('orders');
                }
              }}
              className={`flex items-center p-4 active:bg-[var(--bh)] transition-colors cursor-pointer ${i !== arr.length - 1 ? 'border-b border-[var(--bl)]' : ''}`}
            >
              <div className="w-6 h-6 rounded shrink-0 mr-3 flex items-center justify-center bg-[#F2F6FF] text-[#2B65D9] text-[12px] font-bold">
                {item.iconText}
              </div>
              <span className="text-[14px] text-[var(--tm)] flex-1">{item.label}</span>
              <ChevronRight size={16} className="text-[var(--ts)] shrink-0" />
            </div>
          ))}
        </div>

        {/* Block 2 */}
        <div className="bg-[var(--bc)] rounded-2xl shadow-sm border border-[var(--bl)] overflow-hidden">
          {[
            { iconText: '关', label: '关于我们' },
            { iconText: '隐', label: '隐私政策' },
            { iconText: '摘', label: '隐私政策摘要' },
            { iconText: '清', label: '已收集个人信息清单' },
            { iconText: '共', label: '与第三方共享个人信息清单' },
          ].map((item, i, arr) => (
            <div key={i} className={`flex items-center p-4 active:bg-[var(--bh)] transition-colors cursor-pointer ${i !== arr.length - 1 ? 'border-b border-[var(--bl)]' : ''}`}>
              <div className="w-6 h-6 rounded shrink-0 mr-3 flex items-center justify-center bg-[#F2F6FF] text-[#2B65D9] text-[12px] font-bold">
                {item.iconText}
              </div>
              <span className="text-[14px] text-[var(--tm)] flex-1">{item.label}</span>
              <ChevronRight size={16} className="text-[var(--ts)] shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {isLoggedIn && (
        <div className="px-4 pb-8">
          <button 
            onClick={onSwitchRole} // Would be logout, but mapping to switch role/logout for now
            className="w-full py-3.5 bg-white text-[var(--er)] font-bold text-[15px] rounded-xl border border-[var(--bl)] hover:bg-red-50 transition-colors shadow-sm"
          >
            退出登录
          </button>
        </div>
      )}
    </div>
  );
}
