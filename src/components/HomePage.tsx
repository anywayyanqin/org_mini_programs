import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { followData, researchersData, heatmapData } from '../data';

interface HomePageProps {
  onOpenResearcher: (name: string) => void;
}

export default function HomePage({ onOpenResearcher }: HomePageProps) {
  const [heatmapTab, setHeatmapTab] = useState<'chg' | 'vol'>('chg');
  const [strategyFilter, setStrategyFilter] = useState('全部品种');

  const hmColor = (chg: number) => {
    const abs = Math.abs(chg);
    const t = Math.min(1, abs / 3);
    if (chg > 0) return `rgb(255,${Math.round(180 - t * 160)},${Math.round(180 - t * 160)})`;
    if (chg < 0) return `rgb(${Math.round(180 - t * 160)},255,${Math.round(180 - t * 160)})`;
    return '#f5f5f5';
  };

  return (
    <div className="p-3 md:p-5">
      {/* Banner */}
      <div className="w-full aspect-[2.5/1] md:aspect-[10/1] bg-[var(--pg)] rounded-[var(--rl)] flex items-center px-5 py-4 md:py-[10px] text-white mb-4 relative overflow-hidden">
        <div className="absolute -right-[40px] -top-[40px] w-[200px] h-[200px] border-[30px] border-white/10 rounded-full"></div>
        <div className="relative z-10">
          <h1 className="text-[18px] md:text-[16px] font-bold mb-1">国泰君安期货</h1>
          <p className="text-[13px] opacity-80">中金所1号会员 · 机构服务一站式平台</p>
        </div>
      </div>

      {/* 我的关注 */}
      <div className="bg-[var(--bc)] rounded-[var(--rl)] p-3 md:p-4 shadow-[var(--sc)] mb-4">
        <div className="text-[14px] md:text-[15px] font-semibold flex items-center gap-1.5 mb-3">
          <span className="w-1 h-4 bg-[var(--p)] rounded-full inline-block"></span>
          我的关注
          <span className="ml-auto text-[12px] text-[var(--tt)] cursor-pointer font-normal flex items-center">管理 <ChevronRight size={14} /></span>
        </div>
        <div className="flex overflow-x-auto gap-3 snap-x snap-mandatory no-scrollbar pb-1">
          {followData.map((f, i) => (
            <div key={i} className="snap-start min-w-[160px] max-w-[180px] md:min-w-[200px] md:max-w-[220px] shrink-0 bg-[var(--bb)] rounded-[var(--rm)] p-2.5 md:p-3 flex flex-col gap-1.5">
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full w-fit ${
                f.type === 'research' ? 'bg-[#EBF3FF] text-[var(--p)]' :
                f.type === 'comment' ? 'bg-[#FFF7E6] text-[#D46B08]' :
                'bg-[#FFF1F0] text-[var(--er)]'
              }`}>
                {f.typeText}
              </span>
              <div className="text-[12px] font-medium leading-[1.4] line-clamp-2">{f.title}</div>
              <div className="text-[10px] text-[var(--tt)] mt-auto">{f.author} · {f.time}</div>
              {f.status && (
                <span className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-lg w-fit mt-1 ${
                  f.status === 'live' || f.status === 'upcoming' ? 'bg-[#FFF1F0] text-[var(--er)]' : 'bg-[var(--bb)] text-[var(--tt)]'
                }`}>
                  {f.status === 'live' ? '● 直播中' : f.status === 'upcoming' ? '● 即将开始' : ''}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 明星研究员 */}
      <div className="bg-[var(--bc)] rounded-[var(--rl)] p-3 md:p-4 shadow-[var(--sc)] mb-4">
        <div className="text-[14px] md:text-[15px] font-semibold flex items-center gap-1.5 mb-3">
          <span className="w-1 h-4 bg-[var(--p)] rounded-full inline-block"></span>
          明星研究员
          <span className="ml-auto text-[12px] text-[var(--tt)] cursor-pointer font-normal flex items-center">更多 <ChevronRight size={14} /></span>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
          {researchersData.map((r, i) => (
            <div key={i} className="min-w-[80px] text-center cursor-pointer shrink-0 relative" onClick={() => onOpenResearcher(r.n)}>
              {r.live === 1 && (
                <>
                  <span className="absolute -top-1 left-1/2 -ml-[31px] w-[62px] h-[62px] rounded-full animate-[livePulse_1.5s_ease-out_infinite] pointer-events-none z-0"></span>
                  <span className="absolute top-[44px] left-1/2 -translate-x-1/2 bg-[var(--er)] text-white text-[8px] font-bold px-1.5 py-[1px] rounded-md tracking-[0.5px] z-10 border-[1.5px] border-white whitespace-nowrap">LIVE</span>
                </>
              )}
              <div className="w-14 h-14 rounded-full mx-auto mb-1.5 overflow-hidden bg-[var(--pl)] flex items-center justify-center text-xl text-[var(--p)] font-semibold relative z-0">
                {r.n[0]}
              </div>
              <div className="text-[12px] font-medium mt-1 mb-0.5">{r.n}</div>
              <div className="text-[10px] text-[var(--tt)]">{r.t}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 行情热力图 */}
      <div className="bg-[var(--bc)] rounded-[var(--rl)] p-3 md:p-4 shadow-[var(--sc)] mb-4">
        <div className="text-[14px] md:text-[15px] font-semibold flex items-center gap-1.5 mb-3">
          <span className="w-1 h-4 bg-[var(--p)] rounded-full inline-block"></span>
          行情热力图
          <div className="ml-auto flex gap-1 md:hidden">
            <span onClick={() => setHeatmapTab('chg')} className={`px-2.5 py-0.5 rounded-full text-[11px] cursor-pointer transition-colors ${heatmapTab === 'chg' ? 'bg-[var(--p)] text-white' : 'bg-[var(--bb)] text-[var(--ts)]'}`}>涨跌幅</span>
            <span onClick={() => setHeatmapTab('vol')} className={`px-2.5 py-0.5 rounded-full text-[11px] cursor-pointer transition-colors ${heatmapTab === 'vol' ? 'bg-[var(--p)] text-white' : 'bg-[var(--bb)] text-[var(--ts)]'}`}>成交金额</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
          <div className={`flex-1 min-w-0 ${heatmapTab === 'chg' ? 'block' : 'hidden md:block'}`}>
            <div className="text-[11px] text-[var(--tt)] font-medium mb-1.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--er)] inline-block"></span> 涨跌幅
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-1 md:gap-1.5">
              {heatmapData.slice(0, 8).map((d, i) => (
                <div key={i} className="rounded-md p-1.5 md:p-2 text-center cursor-pointer transition-transform hover:scale-105 hover:shadow-lg min-h-[48px] md:min-h-[56px] flex flex-col items-center justify-center relative hover:z-10" style={{ background: hmColor(d.ch) }}>
                  <div className="text-[10px] md:text-[11px] font-semibold text-white truncate max-w-full drop-shadow-sm mb-0.5">{d.n}</div>
                  <div className="text-[11px] md:text-[12px] font-bold text-white tabular-nums drop-shadow-sm">
                    {d.ch > 0 ? '+' : ''}{d.ch.toFixed(2)}%
                  </div>
                  <div className="text-[9px] text-white/80 mt-px">{d.c}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={`flex-1 min-w-0 ${heatmapTab === 'vol' ? 'block' : 'hidden md:block'}`}>
            <div className="text-[11px] text-[var(--tt)] font-medium mb-1.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--info)] inline-block"></span> 成交金额
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-1 md:gap-1.5">
              {heatmapData.slice(0, 8).map((d, i) => (
                <div key={i} className="rounded-md p-1.5 md:p-2 text-center cursor-pointer transition-transform hover:scale-105 hover:shadow-lg min-h-[48px] md:min-h-[56px] flex flex-col items-center justify-center relative hover:z-10" style={{ background: hmColor(d.ch) }}>
                  <div className="text-[10px] md:text-[11px] font-semibold text-white truncate max-w-full drop-shadow-sm mb-0.5">{d.n}</div>
                  <div className="text-[11px] md:text-[12px] font-bold text-white tabular-nums drop-shadow-sm">
                    {d.vol.toFixed(1)}亿
                  </div>
                  <div className="text-[9px] text-white/80 mt-px">{d.c}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 策略信号 */}
      <div className="bg-[var(--bc)] rounded-[var(--rl)] p-3 md:p-4 shadow-[var(--sc)] mb-4">
        <div className="text-[14px] md:text-[15px] font-semibold flex items-center gap-1.5 mb-2.5">
          <span className="w-1 h-4 bg-[var(--p)] rounded-full inline-block"></span>
          策略信号
          <span className="ml-auto text-[12px] text-[var(--tt)] cursor-pointer font-normal flex items-center">更多策略 <ChevronRight size={14} /></span>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {['基本面周度观点', '多因子择时信号', '套保信号'].map(t => (
            <span key={t} className={`px-2.5 md:px-3 py-1 rounded-full text-[11px] md:text-[12px] cursor-pointer transition-colors border ${t === '基本面周度观点' ? 'bg-[var(--p)] text-white border-[var(--p)]' : 'bg-[var(--bb)] text-[var(--ts)] border-[var(--bl)] hover:border-[var(--p)] hover:text-[var(--p)]'}`}>
              {t}
            </span>
          ))}
        </div>
        <div className="flex md:grid md:grid-cols-3 overflow-x-auto gap-2.5 md:gap-3 snap-x snap-mandatory no-scrollbar">
          {[
            { n: '螺纹钢', s1: '看涨', c1: 'text-[var(--er)]', s2: '+2.01%', c2: 'text-[var(--er)]' },
            { n: '沪银', s1: '看涨', c1: 'text-[var(--er)]', s2: '+3.12%', c2: 'text-[var(--er)]' },
            { n: '原油', s1: '看跌', c1: 'text-[var(--ok)]', s2: '-1.2%', c2: 'text-[var(--ok)]' }
          ].map((s, i) => (
            <div key={i} className="min-w-[130px] max-w-[140px] md:max-w-none md:min-w-0 shrink-0 snap-start bg-[var(--bb)] rounded-[var(--rm)] p-2.5 md:p-3">
              <div className="text-[10px] md:text-[11px] text-[var(--tt)] mb-0.5">品种</div>
              <div className="text-[13px] md:text-[14px] font-semibold">{s.n}</div>
              <div className="mt-1.5 md:mt-2">
                <div className="text-[10px] md:text-[11px] text-[var(--tt)]">周度信号</div>
                <div className={`text-[12px] md:text-[13px] font-semibold ${s.c1}`}>{s.s1}</div>
              </div>
              <div className="mt-1.5 md:mt-2">
                <div className="text-[10px] md:text-[11px] text-[var(--tt)]">周度涨跌幅</div>
                <div className={`text-[12px] md:text-[13px] font-semibold ${s.c2}`}>{s.s2}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2.5 flex gap-2 flex-wrap items-center">
          <span className="text-[11px] text-[var(--tt)]">筛选：</span>
          {['全部品种', '黑色系', '贵金属', '能化', '农产品'].map(t => (
            <span key={t} onClick={() => setStrategyFilter(t)} className={`text-[11px] px-2 py-0.5 rounded-full cursor-pointer transition-colors border ${strategyFilter === t ? 'bg-[var(--p)] text-white border-[var(--p)]' : 'bg-[var(--bb)] text-[var(--ts)] border-[var(--bl)] hover:border-[var(--p)] hover:text-[var(--p)]'}`}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* 公告通知 + 实时行情资讯 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
        <div className="bg-[var(--bc)] rounded-[var(--rl)] p-3 md:p-4 shadow-[var(--sc)]">
          <div className="text-[14px] md:text-[15px] font-semibold flex items-center gap-1.5 mb-2.5">
            <span className="w-1 h-4 bg-[var(--info)] rounded-full inline-block"></span>
            公告通知
            <span className="ml-auto text-[12px] text-[var(--tt)] cursor-pointer font-normal flex items-center">更多 <ChevronRight size={14} /></span>
          </div>
          <div className="flex flex-wrap gap-1 mb-2.5">
            {['公司公告', '交易所公告'].map(t => (
              <span key={t} className={`px-2.5 md:px-3 py-1 rounded-full text-[11px] md:text-[12px] cursor-pointer transition-colors border ${t === '公司公告' ? 'bg-[var(--p)] text-white border-[var(--p)]' : 'bg-[var(--bb)] text-[var(--ts)] border-[var(--bl)] hover:border-[var(--p)] hover:text-[var(--p)]'}`}>
                {t}
              </span>
            ))}
          </div>
          <div>
            {[
              { type: '公司', tag: 'bg-[#EBF3FF] text-[var(--info)]', title: '关于端午节假期交易保证金调整的通知', date: '06-24' },
              { type: '交易所', tag: 'bg-[#E6F0FF] text-[var(--p)]', title: '上期所关于调整螺纹钢期货手续费的通知', date: '06-23' },
              { type: '公司', tag: 'bg-[#EBF3FF] text-[var(--info)]', title: '国泰君安期货APP版本更新公告 V3.2.0', date: '06-22' },
              { type: '交易所', tag: 'bg-[#E6F0FF] text-[var(--p)]', title: '大商所关于多晶硅期货上市交易有关事项的通知', date: '06-21' }
            ].map((n, i) => (
              <div key={i} className={`flex items-center gap-2 py-1.5 ${i > 0 ? 'border-t border-[var(--bl)]' : ''}`}>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${n.tag}`}>{n.type}</span>
                <span className="flex-1 text-[11px] md:text-[12px] truncate">{n.title}</span>
                <span className="text-[11px] text-[var(--tt)] shrink-0">{n.date}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-[var(--bc)] rounded-[var(--rl)] p-3 md:p-4 shadow-[var(--sc)]">
          <div className="text-[14px] md:text-[15px] font-semibold flex items-center gap-1.5 mb-2.5">
            <span className="w-1 h-4 bg-[var(--er)] rounded-full inline-block"></span>
            实时行情资讯
            <span className="ml-auto text-[12px] text-[var(--tt)] cursor-pointer font-normal flex items-center">实时刷新 <ChevronRight size={14} /></span>
          </div>
          <div>
            {[
              { name: '原油', title: '布伦特原油突破85美元，OPEC+减产预期升温', chg: '+1.8%', c: 'text-[var(--er)]' },
              { name: '黄金', title: '国际金价震荡走高，避险情绪支撑价格', chg: '+0.6%', c: 'text-[var(--er)]' },
              { name: '多晶硅', title: '多晶硅期货上市首日交投活跃，关注产业链价格传导', chg: '+2.1%', c: 'text-[var(--er)]' },
              { name: '工业硅', title: '工业硅供应宽松，下游需求复苏缓慢', chg: '-0.9%', c: 'text-[var(--ok)]' },
              { name: '尿素', title: '尿素市场淡储启动，价格底部支撑显现', chg: '+0.4%', c: 'text-[var(--er)]' }
            ].map((n, i) => (
              <div key={i} className={`flex items-center gap-2 py-1.5 ${i > 0 ? 'border-t border-[var(--bl)]' : ''}`}>
                <span className="w-10 text-[11px] md:text-[12px] font-semibold shrink-0">{n.name}</span>
                <span className="flex-1 text-[11px] md:text-[12px] truncate">{n.title}</span>
                <span className={`text-[11px] shrink-0 ${n.c}`}>{n.chg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 深度研报 */}
      <div className="bg-[var(--bc)] rounded-[var(--rl)] p-3 md:p-4 shadow-[var(--sc)]">
        <div className="text-[14px] md:text-[15px] font-semibold flex items-center gap-1.5 mb-2.5">
          <span className="w-1 h-4 bg-[var(--p)] rounded-full inline-block"></span>
          深度研报
          <span className="ml-auto text-[12px] text-[var(--tt)] cursor-pointer font-normal flex items-center">查看更多 <ChevronRight size={14} /></span>
        </div>
        <div className="flex flex-wrap gap-1 mb-2.5">
          {['宏观研究', '商品策略', '金融工程', '资产配置', '其他'].map(t => (
            <span key={t} className={`px-2.5 md:px-3 py-1 rounded-full text-[11px] md:text-[12px] cursor-pointer transition-colors border ${t === '宏观研究' ? 'bg-[var(--p)] text-white border-[var(--p)]' : 'bg-[var(--bb)] text-[var(--ts)] border-[var(--bl)] hover:border-[var(--p)] hover:text-[var(--p)]'}`}>
              {t}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <div>
            <div className="text-[12px] font-semibold mb-2 text-[var(--ts)]">热度榜</div>
            <div>
              {[
                { tag: '热', tagC: 'bg-[#FFF1F0] text-[var(--er)]', title: '6月宏观经济运行分析报告', team: '宏观团队', date: '06-24' },
                { tag: '热', tagC: 'bg-[#FFF1F0] text-[var(--er)]', title: '商品期货市场季度策略展望', team: '策略团队', date: '06-23' },
                { tag: '新', tagC: 'bg-[#E6F0FF] text-[var(--p)]', title: '股指期货多因子模型最新研究成果', team: '金工团队', date: '06-22' }
              ].map((r, i) => (
                <div key={i} className={`flex items-start gap-2 py-2 ${i > 0 ? 'border-t border-[var(--bl)]' : ''}`}>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${r.tagC}`}>{r.tag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-medium mb-0.5 leading-[1.4]">{r.title}</div>
                    <div className="text-[10px] text-[var(--tt)] flex gap-2">
                      <span>{r.team}</span>
                      <span>{r.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[12px] font-semibold mb-2 text-[var(--ts)]">新发布</div>
            <div>
              {[
                { tag: '新', tagC: 'bg-[#F0FFF0] text-[var(--ok)]', title: '大类资产配置月报：权益优先', team: '配置团队', date: '06-24' },
                { tag: '新', tagC: 'bg-[#F0FFF0] text-[var(--ok)]', title: '能化产业链深度调研报告', team: '能化团队', date: '06-23' },
                { tag: '精', tagC: 'bg-[#E6F0FF] text-[var(--p)]', title: '黑色系供需格局与价格展望', team: '黑色团队', date: '06-22' }
              ].map((r, i) => (
                <div key={i} className={`flex items-start gap-2 py-2 ${i > 0 ? 'border-t border-[var(--bl)]' : ''}`}>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${r.tagC}`}>{r.tag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-medium mb-0.5 leading-[1.4]">{r.title}</div>
                    <div className="text-[10px] text-[var(--tt)] flex gap-2">
                      <span>{r.team}</span>
                      <span>{r.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
