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
  isProfileIncomplete?: boolean;
}

export default function MyPage({ 
  isLoggedIn, 
  userRole, 
  getUserDisplayName, 
  getRoleDisplayName, 
  renderAvatar,
  onLoginClick,
  onSwitchRole,
  isProfileIncomplete = false
}: MyPageProps) {
  const isInstitution = userRole === '机构身份';
  const rawDisplayName = isProfileIncomplete ? '' : getRoleDisplayName().trim();
  const rawIdentityName = isProfileIncomplete ? '' : (isInstitution ? getUserDisplayName() : '国泰海通证券有限公司').trim();
  const displayName = rawDisplayName || '用户 · 尾号5848';
  const identityName = rawIdentityName || '暂未关联机构';
  const hasCompleteInstitution = Boolean(rawIdentityName);
  const showSignedInstitution = isInstitution && hasCompleteInstitution;
  const [activeSubPage, setActiveSubPage] = useState<'main' | 'benefits' | 'orders' | 'info'>('main');

  if (activeSubPage === 'info') {
    return <MyInfoPage onBack={() => setActiveSubPage('main')} userRole={userRole} isProfileIncomplete={isProfileIncomplete} />;
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
      <div className="bg-[var(--bc)] px-5 py-7 md:p-6 md:pt-10 border-b border-[var(--bl)]">
        <div className="flex items-center gap-3">
          <div 
            className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer" 
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
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-[19px] font-bold text-[var(--tm)] truncate">{displayName}</h2>
                    {showSignedInstitution && (
                      <div className="flex items-center text-[#B25F2A] text-[10px] rounded overflow-hidden leading-none shrink-0 h-[18px]">
                        <span className="bg-[#EFCFB2] px-1.5 h-full flex items-center font-medium">企</span>
                        <span className="bg-[#FCE6D3] px-1.5 h-full flex items-center">已签约</span>
                      </div>
                    )}
                  </div>
                  <div className="text-[12px] text-[var(--tt)] min-w-0 flex items-center">
                    <span className="truncate">{identityName}</span>
                    {!hasCompleteInstitution && (
                      <span className="ml-2 text-[var(--p)] font-medium shrink-0">完善资料</span>
                    )}
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
          
          <div className="shrink-0 ml-1">
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
                aria-label="切换身份"
                title="切换身份"
                className="w-12 h-12 flex flex-col items-center justify-center gap-0.5 rounded-xl border border-[var(--bl)] text-[var(--ts)] bg-[var(--bb)] active:bg-[var(--bh)] active:text-[var(--p)] transition-colors"
              >
                <ArrowRightLeft size={16} />
                <span className="text-[10px] leading-none">切换</span>
              </button>
            )}
          </div>
        </div>

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
