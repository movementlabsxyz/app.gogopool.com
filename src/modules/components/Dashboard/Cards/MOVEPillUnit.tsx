export function MOVEPillUnit({ value = null }) {
  return (
    <span className="pointer-events-none flex h-full flex-row items-center justify-start space-x-2 rounded-full bg-indigo-700 p-1.5 pl-2 pr-4 text-xs text-white">
      <img src="/assets/img/movement.svg"></img>
      <div className="font-bold tracking-widest">MOVE</div>
      {value ? <div>{(Math.round(value * 100) / 100).toFixed(2).replace(/\.?0+$/, '')}</div> : null}
    </span>
  )
}
