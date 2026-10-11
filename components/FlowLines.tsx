export default function FlowLines({ className = "" }: { className?: string }) {
  return <svg className={`flow-lines ${className}`} viewBox="0 0 1200 700" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
    {[0, 1, 2, 3, 4, 5, 6].map(i => <path key={i} d={`M-80 ${630 + i * 22} C240 ${600 + i * 10} 170 ${150 + i * 18} 490 ${240 + i * 16} S760 ${660 - i * 18} 900 ${320 - i * 16} S1150 ${100 + i * 8} 1290 ${80 + i * 20}`} />)}
  </svg>;
}
