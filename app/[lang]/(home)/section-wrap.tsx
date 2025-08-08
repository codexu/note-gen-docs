"use client";
export default function SectionWrap({ children, className = '', isPadding = true }: { children: React.ReactNode, className?: string, isPadding?: boolean }) {
  return <div className='border-b border-fd-border border-dashed'>
    <div className={`
      xl:max-w-fd-container xl:w-fd-container xl:mx-auto
      xl:border-r xl:border-l xl:border-fd-border xl:border-dashed
      ${isPadding ? 'p-12' : ''}
      ${className}
    `}>
      {children}
    </div>
  </div>
}
