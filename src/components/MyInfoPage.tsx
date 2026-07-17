import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

interface MyInfoPageProps {
  onBack: () => void;
  userRole: string;
  isProfileIncomplete?: boolean;
}

export default function MyInfoPage({ onBack, userRole, isProfileIncomplete = false }: MyInfoPageProps) {
  const [managerId, setManagerId] = useState('');
  const isInstitution = userRole === '机构身份';

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F5F6FA] text-[var(--tm)] overflow-hidden">
      {/* Red Header matching screenshot */}
      <div className="bg-[#E23838] shrink-0 h-[56px] px-4 flex items-center relative select-none">
        <button 
          onClick={onBack}
          aria-label="返回"
          title="返回"
          className="absolute left-4 w-8 h-8 rounded-full flex items-center justify-center active:scale-95 transition-all text-white"
        >
          <ChevronLeft size={28} strokeWidth={2} className="-ml-1" />
        </button>
        <h1 className="flex-1 text-center text-[17px] font-bold text-white">我的信息</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Institution Info */}
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          <div className="flex items-center gap-2 px-4 py-4 border-b border-[#F0F0F0]">
            <div className="w-1 h-3.5 bg-[#E23838] rounded-full"></div>
            <h2 className="text-[15px] font-bold">机构信息</h2>
          </div>
          <div className="px-4">
            <div className="flex justify-between items-center py-4 border-b border-[#F0F0F0]">
              <span className="text-[14px] text-[#333]">机构名称</span>
              <span className="text-[14px] text-[#999]">{isProfileIncomplete ? '未填写' : (isInstitution ? '国泰君安期货有限公司' : '国泰海通证券有限公司')}</span>
            </div>
          </div>
        </div>

        {/* Identity Info */}
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          <div className="flex items-center gap-2 px-4 py-4 border-b border-[#F0F0F0]">
            <div className="w-1 h-3.5 bg-[#E23838] rounded-full"></div>
            <h2 className="text-[15px] font-bold">身份信息</h2>
          </div>
          <div className="px-4">
            <div className="flex justify-between items-center py-4 border-b border-[#F0F0F0]">
              <span className="text-[14px] text-[#333]">姓名</span>
              <span className="text-[14px] text-[#999]">{isProfileIncomplete ? '未填写' : '王**'}</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-[#F0F0F0]">
              <span className="text-[14px] text-[#333]">手机号</span>
              <span className="text-[14px] text-[#999]">153****5848</span>
            </div>
            <div className="flex justify-between items-center py-4">
              <span className="text-[14px] text-[#333]">邮箱</span>
              <span className="text-[14px] text-[#999]">wangyanqin.123321@gmail.com</span>
            </div>
          </div>
        </div>

        <div className="px-1 py-2">
          <p className="text-[12px] text-[#D47E3B] leading-relaxed">
            “我的信息”中资料如需修改，请至机构服务平台网页版(vip.gtjaqh.com)修改，或联系专属客户经理。
          </p>
        </div>
      </div>
    </div>
  );
}
