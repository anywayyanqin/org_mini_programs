import React, { useState } from 'react';
import { Search, Bell, Home, FileText, Users, BarChart2, Tv, User, X, ArrowRightLeft, LogIn } from 'lucide-react';
import { futuresData } from './data';
import HomePage from './components/HomePage';
import LoginModal from './components/LoginModal';
import RoleSelectorModal from './components/RoleSelectorModal';
import MyPage from './components/MyPage';
import MessageCenterModal from './components/MessageCenterModal';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('机构身份');
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  
  const getUserDisplayName = () => {
    if (!isLoggedIn) return '游客';
    return userRole === '机构身份' ? '国泰' : '王燕勤';
  };

  const getRoleDisplayName = () => {
    if (!isLoggedIn) return '未登录';
    return userRole;
  };

  const handleUserClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      setShowRoleModal(true);
    }
  };

  const renderAvatar = (size: 'small' | 'large') => {
    const pxSize = size === 'small' ? 'w-6 h-6' : 'w-8 h-8';
    const fontSize = size === 'small' ? 'text-[10px]' : 'text-[12px]';
    const iconSize = size === 'small' ? 14 : 16;

    if (!isLoggedIn) {
      return (
        <div className={`${pxSize} rounded-full flex items-center justify-center shrink-0 bg-white text-[var(--ts)]`}>
          <User size={iconSize} />
        </div>
      );
    }
    
    if (userRole === '机构身份') {
      return (
        <div className={`${pxSize} rounded-full flex items-center justify-center shrink-0 bg-[#F5A623] text-white font-bold tracking-tight ${fontSize}`}>
          国泰
        </div>
      );
    }
    
    return (
      <div className={`${pxSize} rounded-full flex items-center justify-center shrink-0 bg-[#2B65D9] text-white font-bold tracking-tight ${fontSize}`}>
        王燕
      </div>
    );
  };
  
  const [activeTab, setActiveTab] = useState('home');
  const [researcherPanel, setResearcherPanel] = useState<{ isOpen: boolean; title: string }>({ isOpen: false, title: '' });

  const navItems = [
    { id: 'home', icon: Home, label: '首页' },
    { id: 'reports', icon: FileText, label: '研报' },
    { id: 'team', icon: Users, label: '研究团队' },
    { id: 'data', icon: BarChart2, label: '数据' },
    { id: 'roadshow', icon: Tv, label: '路演' },
    { id: 'my', icon: User, label: '我的' },
  ];

  return (
    <div className="flex h-screen w-full bg-[var(--bb)] text-[var(--tm)] text-[14px]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-[200px] bg-[var(--bc)] border-r border-[var(--bl)] h-full shrink-0">
        <div className="flex items-center gap-3 p-4 border-b border-[var(--bl)]">
          <div className="w-8 h-8 rounded-full bg-[var(--p)] text-white flex items-center justify-center font-bold text-lg shrink-0">君</div>
          <div className="flex flex-col">
            <span className="font-bold text-[14px]">国泰君安期货</span>
            <span className="text-[10px] text-[var(--tt)]">机构一站式服务</span>
          </div>
        </div>
        
        <nav className="flex-1 py-4 flex flex-col gap-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] transition-colors ${
                  isActive 
                    ? 'bg-[var(--pl)] text-[var(--p)] font-medium' 
                    : 'text-[var(--ts)] hover:bg-[var(--bh)]'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-[var(--p)]' : 'text-[var(--tt)]'} />
                {item.label}
              </button>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-[var(--bl)]">
          <button 
            onClick={handleUserClick}
            className="flex items-center gap-2 w-full px-2 py-2 rounded-lg bg-[var(--bb)] hover:bg-[var(--bh)] transition-colors text-left"
          >
            {renderAvatar('large')}
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-[13px] font-medium text-[var(--tm)] truncate">{getUserDisplayName()}</span>
              <span className={`text-[11px] truncate font-semibold ${isLoggedIn ? 'text-[var(--p)]' : 'text-[var(--ts)]'}`}>{getRoleDisplayName()}</span>
            </div>
            {isLoggedIn ? <ArrowRightLeft size={14} className="text-[var(--ts)] shrink-0" /> : <LogIn size={14} className="text-[var(--ts)] shrink-0" />}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-full relative">
        {/* Topbar */}
        <header className="h-[56px] bg-[var(--bc)] border-b border-[var(--bl)] flex items-center px-3 md:px-5 shrink-0 gap-3">
          <button 
            onClick={handleUserClick}
            className="md:hidden flex items-center justify-center p-1.5 rounded-full bg-[var(--bb)] hover:bg-[var(--bh)] transition-colors shrink-0"
          >
            {renderAvatar('small')}
          </button>
          
          <div className="flex-1 min-w-[120px] max-w-[400px] relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--tt)]" />
            <input 
              type="text" 
              placeholder="搜索研报、图表、研究员..." 
              className="w-full h-[34px] pl-9 pr-4 rounded-full bg-[var(--bb)] text-[13px] border border-transparent focus:bg-white focus:border-[var(--p)] outline-none transition-all"
            />
          </div>
          
          <div className="ml-auto flex items-center shrink-0">
            <button 
              onClick={() => setShowMessageModal(true)}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[var(--bh)] transition-colors relative"
            >
              <Bell size={20} className="text-[var(--ts)]" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--er)] rounded-full border-2 border-[var(--bc)]"></span>
            </button>
          </div>
        </header>

        {/* Ticker Bar */}
        <div className="h-[36px] bg-[var(--bc)] border-b border-[#eee] flex items-center overflow-hidden shrink-0">
          <div className="flex whitespace-nowrap animate-[tickerScroll_60s_linear_infinite]">
            {[...futuresData, ...futuresData].map((d, i) => (
              <React.Fragment key={i}>
                <div className="inline-flex items-center gap-2 px-4 text-[12px] text-[#333] shrink-0">
                  <span className="font-semibold">{d.n}</span>
                  <span className="text-[#999] text-[11px]">{d.c}</span>
                  <span className="font-medium tabular-nums font-mono">{d.p.toLocaleString('zh-CN', { minimumFractionDigits: d.p % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 })}</span>
                  <span className={`text-[11px] font-semibold tabular-nums ${d.ch > 0 ? 'text-[var(--er)]' : d.ch < 0 ? 'text-[var(--ok)]' : ''}`}>
                    {d.ch > 0 ? '+' : ''}{d.ch.toFixed(2)}%
                  </span>
                </div>
                <div className="flex-none w-[1px] h-[14px] bg-[#eee]"></div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Frame Content */}
        <div className="flex-1 overflow-auto bg-[var(--bb)] md:pb-0 pb-[56px] relative z-0">
          {activeTab === 'home' && <HomePage onOpenResearcher={(name) => setResearcherPanel({ isOpen: true, title: name })} />}
          {activeTab === 'my' && (
            <MyPage 
              isLoggedIn={isLoggedIn}
              userRole={userRole}
              getUserDisplayName={getUserDisplayName}
              getRoleDisplayName={getRoleDisplayName}
              renderAvatar={renderAvatar}
              onLoginClick={() => setShowLoginModal(true)}
              onSwitchRole={() => setShowRoleModal(true)}
            />
          )}
          {activeTab !== 'home' && activeTab !== 'my' && (
            <div className="h-full flex items-center justify-center text-[var(--tt)]">
              {navItems.find(t => t.id === activeTab)?.label} 页面开发中...
            </div>
          )}
        </div>
      </main>

      {/* Mobile Bottom Tabs */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-[56px] bg-[var(--bc)] border-t border-[var(--bl)] z-50 flex">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 text-[10px] ${isActive ? 'text-[var(--p)]' : 'text-[var(--tt)]'}`}
            >
              <Icon size={20} className={isActive ? 'text-[var(--p)]' : 'text-[var(--tt)]'} />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Researcher Overlay */}
      {researcherPanel.isOpen && (
        <div className="fixed inset-0 bg-black/45 z-[9999] flex justify-end animate-[rpFadeIn_0.2s]">
          <div className="w-full md:w-1/2 md:max-w-[560px] md:min-w-[360px] h-full bg-[var(--bc)] shadow-[-4px_0_24px_rgba(0,0,0,0.2)] flex flex-col animate-[rpSlideIn_0.25s_ease-out]">
            <div className="flex items-center p-4 border-b border-[var(--bl)] shrink-0">
              <span className="text-[15px] font-semibold flex-1">研究员 - {researcherPanel.title}</span>
              <button 
                onClick={() => setResearcherPanel({ isOpen: false, title: '' })}
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[var(--bh)] text-[var(--tt)] hover:text-[var(--tm)] transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-8 flex items-center justify-center bg-[var(--bb)]">
              <div className="text-center text-[var(--tt)]">
                <Users size={48} className="mx-auto mb-4 opacity-50" />
                <p>研究员 {researcherPanel.title} 的主页加载中...</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Role Selector Modal */}
      {showRoleModal && (
        <RoleSelectorModal 
          currentRole={userRole} 
          onSelectRole={setUserRole} 
          onClose={() => setShowRoleModal(false)} 
          onLogout={() => {
            setIsLoggedIn(false);
            setShowRoleModal(false);
          }}
        />
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal 
          onLogin={() => {
            setIsLoggedIn(true);
            setShowLoginModal(false);
          }}
          onClose={() => setShowLoginModal(false)}
        />
      )}

      {/* Message Center Modal */}
      {showMessageModal && (
        <MessageCenterModal 
          onClose={() => setShowMessageModal(false)}
        />
      )}
    </div>
  );
}
