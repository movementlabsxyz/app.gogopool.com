import clsx from 'clsx'

export function Container({ className = '', ...props }) {
  return <div className={clsx('lg:px-12 mx-auto max-w-5xl px-4 sm:px-6', className)} {...props} />
}
